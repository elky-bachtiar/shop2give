export type Category = 'medical' | 'education' | 'mission' | 'community' | 'emergency';

export interface CategorySuggestion {
  category: Category;
  confidence: number;
  keywords: string[];
}

export async function detectCategory(text: string): Promise<CategorySuggestion | null> {
  if (!text) return null;

  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/detect-category`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      console.error('Category detection failed:', await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error detecting category:', error);
    return null;
  }
}

export const categoryInfo = {
  medical: {
    icon: '🏥',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    description: 'Medical campaigns typically help with healthcare costs and treatments.'
  },
  education: {
    icon: '📚',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    description: 'Education campaigns support learning and academic opportunities.'
  },
  mission: {
    icon: '🙏',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    description: 'Mission & Faith campaigns support religious and spiritual endeavors.'
  },
  community: {
    icon: '👥',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    description: 'Community campaigns help local groups and neighborhoods.'
  },
  emergency: {
    icon: '⚡',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    description: 'Emergency campaigns address urgent and immediate needs.'
  }
};