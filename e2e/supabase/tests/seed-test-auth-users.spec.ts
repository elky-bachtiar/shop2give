/**
 * Seed Test Users - Playwright Test
 * 
 * This test seeds example users needed for authentication tests
 * Converted from the original script to Playwright test format
 */

import { test, expect } from '@playwright/test';
import { supabaseUtils, globalTestState } from '../global-setup';
import { createClient } from '@supabase/supabase-js';
import { testConfig } from '../setup';

// Example users for testing - exactly matching those in seed-example-campaigns function
const EXAMPLE_USERS = [
  {
    email: 'john.doe@example.com',
    password: 'Password123!john.doe@example.com',
    role: 'campaign_owner'
  },
  {
    email: 'jane.smith@example.com',
    password: 'Password123!jane.smith@example.com',
    role: 'campaign_owner'
  },
  {
    email: 'robert.johnson@example.com',
    password: 'Password123!robert.johnson@example.com',
    role: 'campaign_owner'
  },
  {
    email: 'sarah.wilson@example.com',
    password: 'Password123!sarah.wilson@example.com',
    role: 'campaign_owner'
  },
  {
    email: 'michael.brown@example.com',
    password: 'Password123!michael.brown@example.com',
    role: 'campaign_owner'
  }
];

interface UserProfile {
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  phone?: string;
  language_preference?: string;
  notification_preferences?: {
    email: boolean;
    push: boolean;
  };
}

// Do not run tests in parallel to avoid conflicts when creating users
test.describe.serial('Seed Test Auth Users', () => {
  let adminClient: ReturnType<typeof createClient>;
  
  test.beforeAll(async () => {
    // Verify we have the service role key needed for admin operations
    expect(testConfig.supabaseServiceRoleKey).toBeDefined();
    
    // Create admin client using service role key
    adminClient = createClient(
      testConfig.supabaseUrl,
      testConfig.supabaseServiceRoleKey!
    );
    
    // Test the Supabase connection
    const { error } = await adminClient.auth.getSession();
    expect(error).toBeNull();
  });
  
  test('verify Supabase auth service is healthy', async () => {
    // Try to connect to Supabase auth service
    const response = await fetch(`${testConfig.supabaseUrl}/auth/v1/health`, {
      headers: {
        'apikey': testConfig.supabaseServiceRoleKey!,
        'Authorization': `Bearer ${testConfig.supabaseServiceRoleKey!}`
      }
    });
    
    expect(response.ok).toBeTruthy();
    console.log('✅ Supabase auth service is healthy');
  });
  
  test('should create test users and profiles if they do not exist', async () => {
    test.setTimeout(60000); // Increase timeout for this test as it might take longer
    // Track results
    const results = {
      users: { created: 0, skipped: 0 },
      profiles: { created: 0, skipped: 0 }
    };
    
    // Process each example user
    for (const user of EXAMPLE_USERS) {
      console.log(`Processing user: ${user.email}`);
      
      // Check if user already exists by listing users and filtering
      const { data: usersData, error: listError } = await adminClient.auth.admin.listUsers();
      
      expect(listError).toBeNull();
      expect(usersData).toBeDefined();
      
      let userId: string | null = null;
      
      // Find user by email in the list
      const existingUser = usersData?.users.find(u => u.email === user.email);
      
      if (existingUser) {
        console.log(`User ${user.email} already exists, skipping creation`);
        userId = existingUser.id;
        results.users.skipped++;
      } else {
        // User doesn't exist, create them
        const { data: newUser, error: createError } = await adminClient.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true,
          user_metadata: {
            role: user.role
          }
        });
        
        if (createError) {
          // Don't fail the test, but log the error
          console.warn(`Error creating user ${user.email}:`, createError.message);
          
          // Try to retrieve the user again in case it was created in another test run
          const { data: retryList } = await adminClient.auth.admin.listUsers();
          const retryUser = retryList?.users.find(u => u.email === user.email);
          
          if (retryUser) {
            console.log(`Found user ${user.email} on retry`);
            userId = retryUser.id;
            results.users.skipped++;
          } else {
            console.error(`Failed to create user ${user.email} and couldn't find existing user`);
            continue;
          }
        } else {
          console.log(`Created user ${user.email} with ID ${newUser.user.id}`);
          userId = newUser.user.id;
          results.users.created++;
        }
      }
      
      expect(userId).toBeDefined();
      if (!userId) continue;
      
      // Check if profile exists
      const { data: existingProfiles, error: profileCheckError } = await adminClient
        .from('user_profiles')
        .select('id')
        .eq('user_id', userId)
        .limit(1);
      
      if (profileCheckError) {
        console.warn(`Error checking profile for ${user.email}:`, profileCheckError.message);
      }
      
      if (existingProfiles && existingProfiles.length > 0) {
        console.log(`Profile for user ${user.email} already exists, skipping creation`);
        results.profiles.skipped++;
      } else {
        // Create profile for user
        const profile: Record<string, unknown> = {
          user_id: userId,
          first_name: user.email.split('@')[0].split('.')[0],
          last_name: user.email.split('@')[0].split('.')[1] || '',
          notification_preferences: {
            email: true,
            push: true
          },
          language_preference: 'en'
        };
        
        // Use upsert instead of insert to handle race conditions
        const { error: upsertProfileError } = await adminClient
          .from('user_profiles')
          .upsert([profile], { onConflict: 'user_id' });
        
        if (upsertProfileError) {
          console.warn(`Error creating profile for ${user.email}:`, upsertProfileError.message);
        } else {
          console.log(`Created profile for ${user.email}`);
          results.profiles.created++;
        }
      }
    }
    
    console.log('✅ Seeding complete!', JSON.stringify(results));
    
    // Verify we have at least some users and profiles
    expect(results.users.created + results.users.skipped).toBe(EXAMPLE_USERS.length);
    expect(results.profiles.created + results.profiles.skipped).toBe(EXAMPLE_USERS.length);
  });
  
  test('should be able to authenticate as test users', async () => {
    test.setTimeout(30000); // Increase timeout for authentication
    // Try to authenticate as each user
    for (const user of EXAMPLE_USERS) {
      const { data, error } = await adminClient.auth.signInWithPassword({
        email: user.email,
        password: user.password
      });
      
      expect(error).toBeNull();
      expect(data.session).toBeDefined();
      expect(data.session?.access_token).toBeDefined();
      
      console.log(`✅ Successfully authenticated as ${user.email}`);
    }

    // Add a small delay between authentications to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  });
});
