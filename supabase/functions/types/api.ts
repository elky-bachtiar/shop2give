// Common API types for Supabase Edge Functions
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

// Campaign status types
export type CampaignStatus = 
  | 'active'
  | 'completed'
  | 'paused'
  | 'cancelled'
  | 'draft'
  | 'deleted'
  | 'example';

// User roles enum
export enum USER_ROLES {
  ADMIN = "admin",
  USER = "user",
  CUSTOMER = "customer",
  DONOR = "donor",
  CAMPAIGN_OWNER = "campaign_owner",
  CAMPAIGN_MANAGER = "campaign_manager", // Added from seed-example-campaigns/types.ts
  PLATFORM_ADMIN = "platform_admin", 
  STORE_OWNER = "store_owner",
  STORE_MANAGER = "store_manager"
}

// API response status constants
export const API_RESPONSE_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error'
};

// Generic API response type
export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

// User and UserProfile types from seed-example-campaigns/types.ts
export interface User {
  id: string;
  email: string;
  role?: USER_ROLES;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  phone?: string;
  date_of_birth?: string;
  country?: string;
  city?: string;
  postal_code?: string;
  address?: string;
  bio?: string;
  website_url?: string;
  social_links?: Record<string, string>;
  preferences?: {
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
    };
  };
  verification_status?: string;
  verification_documents?: any[];
  last_login_at?: string;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

// Category type
export type Category = 
  | 'medical'
  | 'memorial'
  | 'emergency'
  | 'nonprofit'
  | 'education'
  | 'animal'
  | 'environment'
  | 'business'
  | 'community'
  | 'competition'
  | 'creative'
  | 'event'
  | 'faith'
  | 'family'
  | 'sports'
  | 'travel'
  | 'volunteer'
  | 'wishes';

// Category constants
export const CATEGORIES: Category[] = [
  'medical',
  'memorial',
  'emergency',
  'nonprofit',
  'education',
  'animal',
  'environment',
  'business',
  'community',
  'competition',
  'creative',
  'event',
  'faith',
  'family',
  'sports',
  'travel',
  'volunteer',
  'wishes'
];

export const CAMPAIGNS_PER_CATEGORY = 3;
export const SEED_TAG = 'example_campaign_seed_20230501';

// Product-related types
export interface ProductRequest {
  action: string;
  productId?: string;
  campaignId?: string;
  name?: string;
  description?: string;
  images?: string[];
  metadata?: Record<string, string>;
  prices?: PriceData[];
  active?: boolean;
  type?: string;
}

export interface PriceData {
  id?: string;
  unitAmount: number; // in cents
  currency: string;
  recurring?: {
    interval: "day" | "week" | "month" | "year";
    intervalCount?: number;
  };
  metadata?: Record<string, string>;
}

export interface ProductData {
  id?: string;
  stripe_product_id?: string;
  stripeProductId?: string;
  name: string;
  description?: string;
  campaign_id?: string;
  campaignId?: string;
  active?: boolean;
  metadata?: Record<string, any>;
  prices?: PriceData[];
}

// Comprehensive Campaign type merged from both files
export interface Campaign {
  id: string;
  slug: string;
  title: string;
  description: string;
  featured_image_url: string;
  video_url?: string;
  currency: string;
  goal_amount: number;
  amount_raised: number;
  location: string;
  country?: string;
  category: Category;
  current_amount: number;
  donor_count: number;
  owner_id: string;
  status: CampaignStatus;
  start_date: string;
  end_date: string;
  is_urgent: boolean;
  is_featured: boolean;
  verification_status: string;
  verification_notes?: string;
  view_count: number;
  share_count: number;
  tags: string[];
  metadata: Record<string, any>;
  beneficiary_info?: Record<string, any>;
  bank_details?: Record<string, any>;
  social_links?: Record<string, string>;
  updates?: any[];
  faq?: any[];
  team_members?: any[];
  expenses?: any[];
  milestones?: any[];
  risk_factors?: string;
  impact_statement?: string;
  target_audience?: string;
  marketing_plan?: string;
  success_metrics?: Record<string, any>;
  external_links?: any[];
  press_coverage?: any[];
  endorsements?: any[];
  tag?: string;
  created_at: string;
  updated_at: string;
}

// Simplified CampaignData type (compatible with previous definition)
export interface CampaignData {
  id: string;
  title: string;
  description?: string;
  status: CampaignStatus;
  ownerId?: string;
  goal?: number;
  raised?: number;
  currency?: string;
  startDate?: string;
  endDate?: string;
  tags?: string[];
  slug?: string;
  featured_image_url?: string;
  category?: Category;
}
