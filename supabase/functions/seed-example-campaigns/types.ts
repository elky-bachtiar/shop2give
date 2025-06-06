export type Campaign = {
  id: string;
  title: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  owner_id: string;
  status: 'active' | 'completed' | 'cancelled';
  start_date: string; // ISO date string
  end_date?: string | null; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  image_url: string;
  category: string;
  tag?: string; // For idempotency checking
};

export type Category = 
  | 'Medical'
  | 'Memorial'
  | 'Emergency'
  | 'Charity'
  | 'Education'
  | 'Animal'
  | 'Environment'
  | 'Business'
  | 'Community'
  | 'Competition'
  | 'Creative'
  | 'Event'
  | 'Faith'
  | 'Family'
  | 'Sports'
  | 'Travel'
  | 'Volunteer'
  | 'Wishes';

export const CATEGORIES: Category[] = [
  'Medical',
  'Memorial',
  'Emergency',
  'Charity',
  'Education',
  'Animal',
  'Environment',
  'Business',
  'Community',
  'Competition',
  'Creative',
  'Event',
  'Faith',
  'Family',
  'Sports',
  'Travel',
  'Volunteer',
  'Wishes'
];
