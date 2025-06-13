import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Mock data - replace with actual data from your API
const mockCampaigns = [
  {
    id: '1',
    slug: 'medical-treatment-sarah',
    title: 'Medical Treatment for Sarah',
    description: 'Help Sarah receive the life-saving medical treatment she desperately needs.',
    imageUrl: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=800',
    goal: 50000,
    amountRaised: 35750,
    location: 'Amsterdam, NL',
    category: 'medical',
    donorCount: 127,
    daysLeft: 15,
    isUrgent: true
  },
  {
    id: '2',
    slug: 'education-fund-kenya',
    title: 'Education Fund for Children in Kenya',
    description: 'Supporting education for underprivileged children in rural Kenya.',
    imageUrl: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=800',
    goal: 25000,
    amountRaised: 18900,
    location: 'Nairobi, Kenya',
    category: 'education',
    donorCount: 89,
    daysLeft: 8,
    isUrgent: false
  },
  {
    id: '3',
    slug: 'community-garden-project',
    title: 'Community Garden Project',
    description: 'Creating a sustainable community garden to provide fresh food for local families.',
    imageUrl: 'https://images.pexels.com/photos/4503821/pexels-photo-4503821.jpeg?auto=compress&cs=tinysrgb&w=800',
    goal: 15000,
    amountRaised: 12300,
    location: 'Rotterdam, NL',
    category: 'community',
    donorCount: 65,
    daysLeft: 22,
    isUrgent: false
  }
];

export function PopularCampaigns() {
  return (
    <section className="py-20 brand-cream-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold brand-charcoal-text mb-6">
            Popular Campaigns
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover and support amazing causes from around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={campaign.imageUrl} 
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                {campaign.isUrgent && (
                  <div className="absolute top-4 right-4 bg-destructive text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Urgent
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{campaign.title}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {campaign.category}
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {campaign.description}
                </p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-1">
                    <span>Raised: €{(campaign.amountRaised / 100).toLocaleString()}</span>
                    <span>Goal: €{(campaign.goal / 100).toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (campaign.amountRaised / campaign.goal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <span className="font-medium text-foreground">{campaign.donorCount}</span>
                    <span className="ml-1">donors</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">{campaign.daysLeft}</span> days left
                  </div>
                </div>
                
                <Button className="w-full">
                  Support this campaign
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" className="group">
            View All Campaigns
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
