// Common API types used by Supabase edge functions

// Campaign related types
export type CampaignStatus = 'draft' | 'published' | 'archived' | 'deleted';

export const CATEGORIES = ['animals', 'environment', 'education', 'health', 'community'] as const;
export type Category = typeof CATEGORIES[number];

export const SEED_TAG = 'example-seed';

export interface Campaign {
  id: string;
  name: string;
  slug: string;
  description: string;
  owner_id: string;
  status: CampaignStatus;
  image_url?: string;
  logo_url?: string;
  tags: string[];
  category: Category;
  goal_amount?: number;
  current_amount?: number;
  created_at?: string;
  updated_at?: string;
  published_at?: string;
  archived_at?: string;
}

// User related types
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MERCHANT: 'merchant',
  CAMPAIGN_MANAGER: 'campaign_manager'
};

export interface User {
  id: string;
  email: string;
  password?: string;
  role: string;
  user_metadata?: Record<string, any>;
}

export interface UserProfile {
  id: string;
  user_id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}
