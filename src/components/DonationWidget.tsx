import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from './ui/Button';
import { CircularProgress } from './ui/CircularProgress';
import { formatCurrency, calculateProgress } from '../lib/utils';
import { DonationForm } from './DonationForm';

type DonationWidgetProps = {
  campaignId: string;
  campaignTitle: string;
  amountRaised: number;
  goal: number;
  donorCount: number;
  donations: Array<{
    name: string;
    amount: number;
    message?: string;
  }>;
};

export function DonationWidget({ campaignId, campaignTitle, amountRaised, goal, donorCount, donations }: DonationWidgetProps) {
  const progress = calculateProgress(amountRaised, goal);
  const [showDonationForm, setShowDonationForm] = useState(false);

  // Toggle donation form visibility
  const toggleDonationForm = () => setShowDonationForm(!showDonationForm);
  
  // Handle successful donation
  const handleDonationSuccess = () => {
    setShowDonationForm(false);
    // Note: In a real implementation, we would refresh the campaign data
  };

  return (
    <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-blue-900">
            {formatCurrency(amountRaised)}
          </h3>
          <p className="text-sm text-gray-600">
            {donorCount} donations
          </p>
        </div>
        <CircularProgress 
          value={progress}
          size={60}
          strokeWidth={6}
          progressClassName="text-blue-600"
        />
      </div>

      <div className="mb-6">
        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div 
            className="h-full bg-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600">
          {formatCurrency(goal)} goal
        </p>
      </div>

      {showDonationForm ? (
        <div className="mb-6">
          <DonationForm 
            campaignId={campaignId}
            campaignTitle={campaignTitle}
            onSuccess={handleDonationSuccess}
            onCancel={() => setShowDonationForm(false)}
          />
        </div>
      ) : (
        <div className="mb-6 space-y-2">
          <Button className="w-full" size="lg" onClick={toggleDonationForm}>
            Donate now
          </Button>
          <Button variant="secondary" className="w-full" size="lg">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      )}

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Recent Donations</h4>
        <div className="space-y-3">
          {donations.slice(0, 3).map((donation, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="font-medium text-gray-900">{donation.name}</span>
              <span className="text-gray-600">{formatCurrency(donation.amount)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-2">
          <Button variant="secondary" className="flex-1" size="sm">
            See all
          </Button>
          <Button variant="secondary" className="flex-1" size="sm">
            See top
          </Button>
        </div>
      </div>
    </div>
  );
}