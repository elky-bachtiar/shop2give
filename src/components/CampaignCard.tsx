import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { ProgressBar } from './ui/ProgressBar';
import { CircularProgress } from './ui/CircularProgress';
import { MapPin } from 'lucide-react';
import { Campaign } from '../data/campaigns';
import { calculateProgress, formatCurrency } from '../lib/utils';

type CampaignCardProps = {
  campaign: Campaign;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = calculateProgress(campaign.amountRaised, campaign.goal);
  const isFullyFunded = progress >= 100;

  return (
    <Link 
      to={`/campaigns/${campaign.slug}`} 
      className="group block transform transition-all duration-300 hover:-translate-y-1"
    >
      <Card className="h-full overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={campaign.imageUrl}
            alt={campaign.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isFullyFunded && (
            <div className="absolute right-4 top-4">
              <Badge variant="success\" showIcon>Fully Funded</Badge>
            </div>
          )}
        </div>
        <div className="bg-brand-pink/30 p-6">
          <div className="flex items-center gap-1 text-sm text-brand-charcoal/70">
            <MapPin className="h-3 w-3" />
            <span>{campaign.location}</span>
          </div>
          <h3 className="line-clamp-2 font-serif text-lg font-semibold text-brand-charcoal mt-2">
            {campaign.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-brand-charcoal/80">
            {campaign.description}
          </p>
          <div className="mt-4 flex items-center gap-4">
            <CircularProgress
              value={progress}
              size={40}
              category="mission"
            />
            <div className="flex-1">
              <ProgressBar value={progress} category="mission" />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-sm">
            <span className="text-brand-charcoal/70">Raised</span>
            <span className="font-bold text-brand-charcoal">
              {formatCurrency(campaign.amountRaised)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}