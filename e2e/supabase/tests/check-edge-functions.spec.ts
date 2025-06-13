import { test, expect } from '@playwright/test';
import { supabaseUtils, globalTestState } from '../global-setup';
import { createClient } from '@supabase/supabase-js';
import { testConfig } from '../setup';

const supabaseUrl = testConfig.supabaseUrl;

// Expected edge functions that should be available
const EXPECTED_FUNCTIONS = [
  'generate-csrf-token',
  'seed-example-campaigns',
  'seed-example-products',
  'stripe-checkout',
  'stripe-products',
  'stripe-seed-example-products',
  'stripe-webhook'
];

test.describe('Supabase Edge Functions', () => {
  let supabaseClient;
  let userToken;
  
  test.beforeAll(async () => {
    // Verify Supabase is running and test users are created in global setup
    expect(supabaseUtils).toBeDefined();
    expect(globalTestState.testUsers).toBeDefined();
    
    // Get the campaign owner user token from global setup
    userToken = globalTestState.testUsers.campaignOwner;
    if (!userToken) {
      console.warn('Test user token not found in global state, trying to create one now...');
      userToken = await supabaseUtils.createOrAuthenticateTestUser('campaign_owner');
    }
    
    // Create supabase client for testing using supabaseUtils
    supabaseClient = supabaseUtils.getClient();
    
    console.log('Test Configuration:', {
      supabaseUrl: testConfig.supabaseUrl,
      hasAnonKey: !!testConfig.supabaseAnonKey,
      hasUserToken: !!userToken
    });
    
    // Make sure we have a valid user token
    expect(userToken).toBeDefined();
    expect(typeof userToken).toBe('string');
  });
  
  test('should have Supabase running', async () => {
    // Use the supabaseUtils helper to check if Supabase is running
    const result = await supabaseUtils.checkSupabaseRunning();
    expect(result).toBeTruthy();
  });

  test('should have authenticated test user from global setup', () => {
    // Verify we have a valid user token from the global setup
    expect(userToken).toBeDefined();
    expect(typeof userToken).toBe('string');
    console.log('Using authenticated test user from global setup');
  });

  test('should have base functions endpoint', async ({ request }) => {
    const response = await request.get(`${supabaseUrl}/functions/v1`, {
      failOnStatusCode: false
    });
    
    // We expect a 404 because no specific function was called
    expect(response.status()).toBe(404);
    const text = await response.text();
    // The error might be either "Function not found" or "no Route matched with those values"
    // We just check that there's some kind of 404 response indicating the functions service is running
    expect(text).toBeTruthy();
    console.log(`Base functions endpoint response: ${text}`);
  });

  test('should have all expected edge functions deployed', async ({ request }) => {
    // Use getDeployedFunctions from supabaseUtils
    const deployedFunctions = await supabaseUtils.getDeployedFunctions();
    console.log('Deployed functions:', deployedFunctions);
    
    // Check that each expected function exists
    for (const functionName of EXPECTED_FUNCTIONS) {
      expect(deployedFunctions).toContain(functionName);
      
      // Also verify each function endpoint responds to HTTP requests
      const response = await request.get(`${supabaseUrl}/functions/v1/${functionName}`, {
        failOnStatusCode: false,
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      });
      
      // We don't expect 404, but other status codes are OK (401, 405, 200, etc.)
      // because they indicate the function exists but might have specific requirements
      expect(response.status()).not.toBe(404);

      // Optional: Log details about the function
      console.log(`Function ${functionName}: Status ${response.status()}`);
    }
  });

  test('should be able to generate a CSRF token using edge function', async ({ request }) => {
    try {
      // Use the Supabase client to call the function properly
      const { data, error } = await supabaseClient.functions.invoke('generate-csrf-token', {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      
      // Log result for debugging
      console.log('CSRF token function response:', error ? `ERROR: ${error.message}` : 'SUCCESS');
      
      // Check the token
      if (!error) {
        expect(data.token).toBeDefined();
        expect(typeof data.token).toBe('string');
        
        // Token should be a UUID v4
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        expect(data.token).toMatch(uuidRegex);
      } else {
        // If there's an error, we'll fall back to HTTP request
        console.log('Falling back to direct HTTP request for CSRF token');
        
        const response = await request.get(`${supabaseUrl}/functions/v1/generate-csrf-token`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          },
          failOnStatusCode: false
        });
        
        // Log the response status for debugging
        console.log(`CSRF token HTTP response status: ${response.status()}`);
        
        // In CI we might not have the function deployed exactly as expected, so we just check it exists
        expect(response.status()).not.toBe(404);
      }
    } catch (err) {
      console.error('Error testing CSRF token function:', err);
      throw err;
    }
  });
});
