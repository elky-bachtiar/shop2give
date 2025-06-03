import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CreateCampaignChat } from '../components/campaign/CreateCampaignChat';
import { useAuth } from '../lib/auth';

type CampaignData = {
  title: string;
  description: string;
  goalAmount: number;
  category: string;
  imageUrl?: string;
};

export function CampaignAIPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [campaignData, setCampaignData] = useState<CampaignData>({
    title: '',
    description: '',
    goalAmount: 0,
    category: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleChatUpdate = (data: Partial<CampaignData>) => {
    setCampaignData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <CreateCampaignChat onUpdateForm={handleChatUpdate} />
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Campaign Preview</h2>
            {campaignData.title && (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-brand-teal">
                  {campaignData.title}
                </h1>
                {campaignData.imageUrl && (
                  <img
                    src={campaignData.imageUrl}
                    alt={campaignData.title}
                    className="h-48 w-full rounded-lg object-cover"
                  />
                )}
                <p className="text-gray-600">{campaignData.description}</p>
                {campaignData.goalAmount > 0 && (
                  <div className="rounded-lg bg-brand-pink/30 p-4">
                    <p className="text-lg font-bold text-brand-teal">
                      Goal: €{campaignData.goalAmount.toLocaleString()}
                    </p>
                  </div>
                )}
                {campaignData.category && (
                  <div className="inline-block rounded-full bg-brand-teal/10 px-3 py-1 text-sm font-medium text-brand-teal">
                    {campaignData.category}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}