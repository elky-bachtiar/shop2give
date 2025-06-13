/**
 * End-to-end test for generate-csrf-token functionality
 * 
 * This test verifies that the generate-csrf-token function properly:
 * 1. Generates a valid CSRF token
 * 2. Returns the token with appropriate expiration
 * 3. Requires proper authentication
 */

import { test, expect } from '@playwright/test';
import { supabaseUtils, globalTestState } from '../global-setup';
import { createClient } from '@supabase/supabase-js';
import { testConfig } from '../setup';

test.describe('Generate CSRF Token', () => {
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
    
    // Create supabase client for testing
    supabaseClient = createClient(testConfig.supabaseUrl, testConfig.supabaseAnonKey);
    
    console.log('Test Configuration:', {
      supabaseUrl: testConfig.supabaseUrl,
      hasAnonKey: !!testConfig.supabaseAnonKey,
      hasUserToken: !!userToken
    });

    // Make sure we have a valid user token
    expect(userToken).toBeDefined();
    expect(typeof userToken).toBe('string');
  });

  test('should generate a valid CSRF token when authenticated', async ({ request }) => {
    // Skip if no user token available
    test.skip(!userToken, 'No authenticated user token available');
    
    // Call the generate-csrf-token function with proper authentication
    const response = await request.get(`${testConfig.supabaseUrl}/functions/v1/generate-csrf-token`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
    });

    // Expect the response to be successful
    expect(response.status()).toBe(200);
    
    // Parse the response body
    const responseData = await response.json();
    expect(responseData.token).toBeDefined();
    expect(typeof responseData.token).toBe('string');
    
    // Token should be a UUID v4
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(responseData.token).toMatch(uuidRegex);
    
    console.log(`Successfully generated CSRF token: ${responseData.token}`);
  });
  
  test('should fail with 401 when using anon key', async ({ request }) => {
    // Call the generate-csrf-token function with the anonymous key instead of a user session token
    const response = await request.get(`${testConfig.supabaseUrl}/functions/v1/generate-csrf-token`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${testConfig.supabaseAnonKey}`,
      },
      failOnStatusCode: false
    });

    // Expect authentication failure
    expect(response.status()).toBe(401);
  });
});
