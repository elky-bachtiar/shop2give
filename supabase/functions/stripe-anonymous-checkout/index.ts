import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@17.7.0';
import { createClient } from 'npm:@supabase/supabase-js@2.49.1';

// Initialize Stripe
const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY');
if (!stripeSecret) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(stripeSecret, {
  appInfo: {
    name: 'Anonymous Checkout Integration',
    version: '1.0.0'
  }
});

// Helper function to create responses with CORS headers
function corsResponse(body: any, status = 200) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': '*'
  };
  
  // For 204 No Content, don't include Content-Type or body
  if (status === 204) {
    return new Response(null, {
      status,
      headers
    });
  }
  
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  });
}

// Validate the request parameters
function validateParameters(values: any, expected: any) {
  for (const parameter in expected) {
    const expectation = expected[parameter];
    const value = values[parameter];
    
    if (expectation === 'string') {
      if (value == null) {
        return `Missing required parameter ${parameter}`;
      }
      if (typeof value !== 'string') {
        return `Expected parameter ${parameter} to be a string got ${JSON.stringify(value)}`;
      }
    } else if (expectation.values) {
      if (!expectation.values.includes(value)) {
        return `Expected parameter ${parameter} to be one of ${expectation.values.join(', ')}`;
      }
    }
  }
  return undefined;
}

Deno.serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return corsResponse({}, 204);
    }
    
    if (req.method !== 'POST') {
      return corsResponse({
        error: 'Method not allowed'
      }, 405);
    }
    
    // Parse the request body
    const { 
      price_id, 
      success_url, 
      cancel_url, 
      mode = 'payment',
      email = null,
      metadata = {}
    } = await req.json();
    
    // Validate required parameters
    const error = validateParameters({
      price_id,
      success_url,
      cancel_url,
      mode
    }, {
      price_id: 'string',
      success_url: 'string',
      cancel_url: 'string',
      mode: {
        values: ['payment', 'subscription']
      }
    });
    
    if (error) {
      return corsResponse({
        error
      }, 400);
    }
    
    // Create checkout session directly without customer creation
    // This is the key difference from the authenticated version
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: price_id,
        quantity: 1
      }],
      mode,
      success_url,
      cancel_url,
      ...(email ? { customer_email: email } : {}), // Optionally set customer email if provided
      metadata: {
        anonymous: true,
        ...metadata
      }
    });
    
    console.log(`Created anonymous checkout session ${session.id}`);
    
    return corsResponse({
      sessionId: session.id,
      url: session.url
    });
    
  } catch (error) {
    console.error(`Anonymous checkout error: ${error.message}`);
    return corsResponse({
      error: error.message
    }, 500);
  }
});