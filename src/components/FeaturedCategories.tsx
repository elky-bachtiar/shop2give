import React from 'react';
import { Link } from 'react-router-dom';
import { CampaignCard } from './CampaignCard';
import { getRandomCategories, type Category } from '../lib/types';
import { campaigns } from '../data/campaigns';

function CategorySection({ category }: { category: Category }) {
  // Filter campaigns by category (for demo, we'll just take random ones)
  const categoryCampaigns = campaigns
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (categoryCampaigns.length === 0) return null;

  const Icon = category.icon;

  return (
    <section className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 stroke-1 text-gray-900" />
          <h2 className="text-2xl font-bold text-gray-900">
            {category.name} Fundraisers
          </h2>
        </div>
        <Link
          to={`/category/${category.slug}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          See more &gt;
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categoryCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  );
}

export function FeaturedCategories() {
  const featuredCategories = getRandomCategories(3);

  return (
    <div>
      {featuredCategories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  );
}