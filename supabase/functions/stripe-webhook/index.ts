import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!;
const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;
const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Bolt Integration',
    version: '1.0.0',
  },
});

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

// Add logging table for audit trail
async function logWebhookEvent(event: any, status: 'success' | 'error', error?: string) {
  try {
    await supabase.from('webhook_logs').insert({
      event_type: event.type,
      event_id: event.id,
      status,
      error_message: error,
      timestamp: new Date().toISOString(),
    });
  } catch (logError) {
    console.error('Failed to log webhook event:', logError);
  }
}

Deno.serve(async (req) => {
  try {
    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: {
          'Allow': 'POST, OPTIONS'
        }
      });
    }

    // Verify Stripe signature
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response('No signature found', { status: 400 });
    }

    // Get raw body and verify webhook
    const body = await req.text();
    let event: Stripe.Event;

    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, stripeWebhookSecret);
    } catch (error: any) {
      await logWebhookEvent({ type: 'unknown', id: 'signature_failed' }, 'error', error.message);
      return new Response(`Webhook signature verification failed: ${error.message}`, { status: 400 });
    }

    // Log the incoming webhook
    await logWebhookEvent(event, 'success');

    // Process the webhook asynchronously
    EdgeRuntime.waitUntil(handleEvent(event));

    return new Response(JSON.stringify({ received: true }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    await logWebhookEvent({ type: 'error', id: 'processing_failed' }, 'error', error.message);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
});

async function handleEvent(event: Stripe.Event) {
  const stripeData = event?.data?.object ?? {};

  if (!stripeData) {
    await logWebhookEvent(event, 'error', 'No stripe data found');
    return;
  }

  if (!('customer' in stripeData)) {
    await logWebhookEvent(event, 'error', 'No customer found in stripe data');
    return;
  }

  if (event.type === 'payment_intent.succeeded' && event.data.object.invoice === null) {
    return;
  }

  const { customer: customerId } = stripeData;

  if (!customerId || typeof customerId !== 'string') {
    await logWebhookEvent(event, 'error', 'Invalid customer ID');
    console.error(`No customer received on event: ${JSON.stringify(event)}`);
    return;
  }

  let isSubscription = true;

  if (event.type === 'checkout.session.completed') {
    const { mode } = stripeData as Stripe.Checkout.Session;
    isSubscription = mode === 'subscription';
    console.info(`Processing ${isSubscription ? 'subscription' : 'one-time payment'} checkout session`);
  }

  const { mode, payment_status } = stripeData as Stripe.Checkout.Session;

  try {
    if (isSubscription) {
      console.info(`Starting subscription sync for customer: ${customerId}`);
      await syncCustomerFromStripe(customerId);
    } else if (mode === 'payment' && payment_status === 'paid') {
      const {
        id: checkout_session_id,
        payment_intent,
        amount_subtotal,
        amount_total,
        currency,
      } = stripeData as Stripe.Checkout.Session;

      // Verify the customer exists in our database
      const { data: customerData, error: customerError } = await supabase
        .from('stripe_customers')
        .select('user_id')
        .eq('customer_id', customerId)
        .single();

      if (customerError || !customerData) {
        throw new Error('Customer not found in database');
      }

      // Insert the order with transaction
      const { error: orderError } = await supabase.from('stripe_orders').insert({
        checkout_session_id,
        payment_intent_id: payment_intent,
        customer_id: customerId,
        amount_subtotal,
        amount_total,
        currency,
        payment_status,
        status: 'completed',
      });

      if (orderError) {
        throw orderError;
      }

      await logWebhookEvent(event, 'success');
      console.info(`Successfully processed one-time payment for session: ${checkout_session_id}`);
    }
  } catch (error: any) {
    await logWebhookEvent(event, 'error', error.message);
    console.error('Error processing webhook event:', error);
    throw error;
  }
}

async function syncCustomerFromStripe(customerId: string) {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 1,
      status: 'all',
      expand: ['data.default_payment_method'],
    });

    if (subscriptions.data.length === 0) {
      console.info(`No active subscriptions found for customer: ${customerId}`);
      const { error: noSubError } = await supabase.from('stripe_subscriptions').upsert(
        {
          customer_id: customerId,
          subscription_status: 'not_started',
        },
        {
          onConflict: 'customer_id',
        },
      );

      if (noSubError) {
        throw new Error('Failed to update subscription status in database');
      }
      return;
    }

    const subscription = subscriptions.data[0];

    const { error: subError } = await supabase.from('stripe_subscriptions').upsert(
      {
        customer_id: customerId,
        subscription_id: subscription.id,
        price_id: subscription.items.data[0].price.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        cancel_at_period_end: subscription.cancel_at_period_end,
        ...(subscription.default_payment_method && typeof subscription.default_payment_method !== 'string'
          ? {
              payment_method_brand: subscription.default_payment_method.card?.brand ?? null,
              payment_method_last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : {}),
        status: subscription.status,
      },
      {
        onConflict: 'customer_id',
      },
    );

    if (subError) {
      throw new Error('Failed to sync subscription in database');
    }

    console.info(`Successfully synced subscription for customer: ${customerId}`);
  } catch (error) {
    console.error(`Failed to sync subscription for customer ${customerId}:`, error);
    throw error;
  }
}