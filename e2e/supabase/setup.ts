/**
 * Supabase E2E Test Configuration
 * 
 * This file defines configuration settings for Supabase E2E tests.
 * - Environment variables
 * - Connection settings
 * - Test timeouts and retry policy
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

// Load environment variables from .env file if present
const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);
const projectRoot = path.resolve(currentDir, '../..');

// Try to load environment from .env file at project root
try {
  const envPath = path.join(projectRoot, '.env.test');
  if (fs.existsSync(envPath)) {
    console.log(`Loading environment from ${envPath}`);
    dotenv.config({ path: envPath });
  }
} catch (error) {
  console.warn('Failed to load .env file:', error);
}

// Default configuration with fallbacks to environment variables
export const testConfig = {
  // Supabase connection settings
  supabaseUrl: process.env.SUPABASE_URL || 'http://localhost:54321',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  
  // Edge Functions settings
  edgeFunctionsUrl: process.env.EDGE_FUNCTIONS_URL || null,
  
  // Stripe settings
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  
  // Test configuration
  testTimeout: 30000, // Default test timeout in milliseconds
  retryCount: 1,      // Number of times to retry failed tests
};

// Export config for use in tests
export default testConfig;
