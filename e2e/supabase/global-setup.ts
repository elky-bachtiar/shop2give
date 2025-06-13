/**
 * Global setup for Playwright tests that runs once before all tests
 * This starts Supabase and checks that Edge Functions are available
 */

import { FullConfig } from '@playwright/test';
import SupabaseTestUtils from './tests/helpers/supabase-utils';

// Create singleton instance of SupabaseTestUtils for global usage
export const supabaseUtils = new SupabaseTestUtils();

// Global state accessible across all test files
export const globalTestState = {
  edgeFunctionsAvailable: false,
  initialCounts: {},
  stripeClient: null as any, // Allow any type to avoid strict typing issues
  testUsers: {
    campaignOwner: null as string | null,
    admin: null as string | null
  }
};

// Global setup function
async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global setup...');
  
  try {
    // Try to start Supabase with setup script first
    console.log('Attempting to start Supabase with setup script...');
    let supabaseRunning = await supabaseUtils.startSupabase(true);
    
    // If that fails, try without setup script
    if (!supabaseRunning) {
      console.log('Retrying Supabase start without setup script...');
      supabaseRunning = await supabaseUtils.startSupabase(false);
    }
    
    console.log(`Supabase running: ${supabaseRunning}`);
    
    if (!supabaseRunning) {
      console.error('❌ Failed to start Supabase. Please ensure Docker is running and you have the Supabase CLI installed.');
      console.log('You can try starting Supabase manually with:');
      console.log('  cd /Users/in615bac/Documents/givio/shop2give/supabase');
      console.log('  supabase start');
      process.exit(1);
    }
    
    // Get Stripe client if available
    const stripeClient = supabaseUtils.getStripeClient();
    if (stripeClient) {
      globalTestState.stripeClient = stripeClient;
      console.log('Stripe client initialized successfully');
    } else {
      console.log('⚠️ No Stripe client available. Tests requiring Stripe will be skipped.');
    }
    
    // Get initial record counts for comparison in tests
    globalTestState.initialCounts = await supabaseUtils.logDatabaseCounts();
    
    // Create test users for different roles
    console.log('Creating test users...');
    try {
      // Create a campaign owner user
      globalTestState.testUsers.campaignOwner = await supabaseUtils.createOrAuthenticateTestUser('campaign_owner');
      console.log(`Campaign owner user ${globalTestState.testUsers.campaignOwner ? 'created/authenticated' : 'failed'}`);
      
      // Create an admin user
      globalTestState.testUsers.admin = await supabaseUtils.createOrAuthenticateTestUser('admin');
      console.log(`Admin user ${globalTestState.testUsers.admin ? 'created/authenticated' : 'failed'}`);
      
      // Check which test users are available
      const testUsers = supabaseUtils.getTestUsers();
      console.log(`Available test users: ${Object.keys(testUsers).join(', ')}`);
    } catch (userError) {
      console.error('Error setting up test users:', userError);
      // Continue anyway - tests should handle missing users
    }
    
    console.log('✅ Global setup complete');
  } catch (error) {
    console.error('❌ Error in global setup:', error);
    process.exit(1);
  }
}

// Global teardown function - can be used to clean up resources
async function globalTeardown() {
  console.log('🧹 Running global teardown...');
  // Any cleanup could go here
}

export default globalSetup;
export { globalTeardown };
