import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.21.0';
import { Campaign, Category, CATEGORIES } from './types.ts';
import { generateCampaignDates } from '../utils/date-helpers.ts';

// Constants
const OWNER_ID = "00000000-0000-0000-0000-000000000001";
const SEED_TAG = "example-campaign-v1"; // For idempotency checking
const CAMPAIGNS_PER_CATEGORY = 3;

// Create a Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  try {
    // Allow only POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if campaigns with our seed tag already exist
    const { count } = await supabase
      .from('donation_campaigns')
      .select('id', { count: 'exact', head: true })
      .eq('tag', SEED_TAG);

    // If we already have seeded campaigns, don't insert duplicates
    if (count && count > 0) {
      return new Response(
        JSON.stringify({
          message: `Campaigns already seeded (found ${count} existing campaigns with tag '${SEED_TAG}')`,
          status: 'skipped',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate and insert campaigns
    const insertedCampaigns = await seedCampaigns();
    
    return new Response(
      JSON.stringify({
        message: 'Success! Example campaigns have been seeded.',
        count: insertedCampaigns.length,
        campaigns: insertedCampaigns.map(c => c.title),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error seeding campaigns:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to seed campaigns', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

async function seedCampaigns(): Promise<Campaign[]> {
  const insertedCampaigns: Campaign[] = [];
  
  // Process each category
  for (const category of CATEGORIES) {
    const categoryCampaigns = await generateCampaignsForCategory(category);
    
    // Insert campaigns for this category
    const { data, error } = await supabase
      .from('donation_campaigns')
      .insert(categoryCampaigns)
      .select();
      
    if (error) {
      console.error(`Error inserting ${category} campaigns:`, error);
      continue;
    }
    
    if (data) {
      insertedCampaigns.push(...data);
      console.log(`Inserted ${data.length} ${category} campaigns`);
    }
  }
  
  return insertedCampaigns;
}

/**
 * Generate campaign data for a specific category
 */
async function generateCampaignsForCategory(category: Category): Promise<Partial<Campaign>[]> {
  const campaigns: Partial<Campaign>[] = [];

  switch (category) {
    case 'Medical':
      campaigns.push(
        generateCampaign({
          title: "Life-Saving Surgery for Emma",
          description: "<p>Emma has recently been diagnosed with a rare heart condition that requires immediate surgical intervention. At just 7 years old, she's facing a complicated procedure that her family's insurance won't fully cover.</p><p>The specialized cardiac surgery will give Emma a chance at a normal childhood, but the medical expenses are overwhelming her parents who are already struggling with regular medical appointments and specialized care.</p><p>Your support will help cover the surgery costs, post-operative care, and rehabilitation therapy that Emma will need over the next year. Every contribution brings this brave little girl one step closer to running and playing with her friends again.</p>",
          goal_amount: 25000,
          image_url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
          category
        }),
        generateCampaign({
          title: "Specialized Wheelchair for Marcus",
          description: "<p>Marcus has been living with muscular dystrophy for over a decade, and his condition has progressed to the point where he now needs a specialized motorized wheelchair to maintain his independence.</p><p>The wheelchair he requires is custom-built with adaptations specifically designed for his condition, including pressure relief features, specialized controls, and positioning supports that will prevent further complications.</p><p>Unfortunately, his insurance will only cover a basic model that doesn't meet his medical needs. The difference in cost is substantial, but this specialized equipment will dramatically improve his quality of life and ability to continue working as a software developer.</p>",
          goal_amount: 16500,
          image_url: "https://images.unsplash.com/photo-1569937756447-1d44f657dc69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
          category
        }),
        generateCampaign({
          title: "Cancer Treatment Fund for Sophia",
          description: "<p>Sophia, a dedicated kindergarten teacher, was diagnosed with stage 3 breast cancer last month. She faces a challenging treatment journey including surgery, chemotherapy, and radiation therapy over the next year.</p><p>While focusing on her health should be her only priority right now, the mounting medical bills and time away from work have created significant financial stress. Even with insurance, the out-of-pocket expenses for specialized treatments, medications, and supportive care are substantial.</p><p>Funds raised will help cover Sophia's medical expenses, essential living costs during her treatment, and specialized supportive care to improve her chances of recovery. Your contribution will ease her financial burden so she can focus entirely on healing.</p>",
          goal_amount: 35000,
          image_url: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f50?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
          category
        })
      );
      break;

    // More categories will be added in subsequent files
    default:
      // Return empty array for categories we haven't implemented yet
      return [];
  }

  return campaigns;
}

/**
 * Helper function to generate a campaign with default values
 */
function generateCampaign(campaignData: Partial<Campaign>): Partial<Campaign> {
  const dates = generateCampaignDates();
  
  return {
    ...campaignData,
    id: crypto.randomUUID(),
    owner_id: OWNER_ID,
    current_amount: Math.floor(Math.random() * (campaignData.goal_amount || 1000) * 0.3), // Random progress up to 30%
    status: 'active',
    start_date: dates.start_date,
    end_date: dates.end_date,
    created_at: dates.created_at,
    updated_at: dates.updated_at,
    tag: SEED_TAG // For idempotency checking
  };
}
