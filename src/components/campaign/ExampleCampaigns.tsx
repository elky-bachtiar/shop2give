import React from 'react';
import { motion } from 'framer-motion';
import { Category, categoryInfo } from '../../lib/categoryDetection';

interface ExampleCampaign {
  title: string;
  description: string;
  imageUrl: string;
  raised: number;
  goal: number;
}

const exampleCampaigns: Record<Category, ExampleCampaign[]> = {
  medical: [{
    title: "Help Sarah's Cancer Treatment",
    description: "Supporting Sarah's journey through cancer treatment and recovery.",
    imageUrl: "https://images.pexels.com/photos/3738179/pexels-photo-3738179.jpeg",
    raised: 45000,
    goal: 50000
  }],
  education: [{
    title: "Send Maria to University",
    description: "Help Maria pursue her dream of becoming a teacher.",
    imageUrl: "https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg",
    raised: 8500,
    goal: 12000
  }],
  mission: [{
    title: "Support Youth Mission Trip",
    description: "Enabling young people to serve communities abroad.",
    imageUrl: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg",
    raised: 15000,
    goal: 20000
  }],
  community: [{
    title: "Rebuild Community Center",
    description: "Restoring our local community hub for everyone.",
    imageUrl: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    raised: 25000,
    goal: 30000
  }],
  emergency: [{
    title: "Emergency Flood Relief",
    description: "Immediate assistance for families affected by flooding.",
    imageUrl: "https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg",
    raised: 18000,
    goal: 25000
  }]
};

interface ExampleCampaignsProps {
  category: Category;
}

export function ExampleCampaigns({ category }: ExampleCampaignsProps) {
  const campaigns = exampleCampaigns[category];
  const info = categoryInfo[category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <h3 className="mb-4 text-lg font-medium text-gray-900">
        Similar Successful Campaigns
      </h3>
      <div className="space-y-4">
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className={`rounded-lg ${info.bgColor} ${info.borderColor} border p-4`}
          >
            <div className="flex gap-4">
              <img
                src={campaign.imageUrl}
                alt={campaign.title}
                className="h-24 w-24 rounded-md object-cover"
              />
              <div className="flex-1">
                <h4 className={`font-medium ${info.color}`}>{campaign.title}</h4>
                <p className="mt-1 text-sm text-gray-600">{campaign.description}</p>
                <div className="mt-2">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full ${info.color.replace('text', 'bg')}`}
                      style={{
                        width: `${(campaign.raised / campaign.goal) * 100}%`
                      }}
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    €{campaign.raised.toLocaleString()} raised of €{campaign.goal.toLocaleString()} goal
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}