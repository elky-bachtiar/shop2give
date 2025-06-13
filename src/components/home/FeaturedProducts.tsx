import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Mock data - replace with actual data from your API
const mockProducts = [
  {
    id: '1',
    name: 'Handmade Bracelet',
    description: 'Beautiful handcrafted bracelet',
    price: 1500, // €15.00 in cents
    imageUrl: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Jewelry',
    donationPercentage: 50,
    linkedCampaigns: ['Medical Treatment for Sarah']
  },
  {
    id: '2',
    name: 'Eco-Friendly Tote',
    description: 'Reusable tote bag made from recycled materials',
    price: 2500, // €25.00 in cents
    imageUrl: 'https://images.pexels.com/photos/3731256/pexels-photo-3731256.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Accessories',
    donationPercentage: 30,
    linkedCampaigns: ['Education Fund for Children in Kenya']
  },
  {
    id: '3',
    name: 'Artisanal Soap Set',
    description: 'Handmade soaps with natural ingredients',
    price: 3500, // €35.00 in cents
    imageUrl: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Beauty',
    donationPercentage: 40,
    linkedCampaigns: ['Community Garden Project']
  }
];

export function FeaturedProducts() {
  return (
    <section className="py-20 brand-pink-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold brand-charcoal-text mb-6">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Shop with purpose. Every purchase supports meaningful causes and makes a difference.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    €{(product.price / 100).toFixed(2)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {product.donationPercentage}% supports {product.linkedCampaigns[0]}
                </p>
                <Button className="w-full mt-4">
                  Add to cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" className="group">
            Browse All Products
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
