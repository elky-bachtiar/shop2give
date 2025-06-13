import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, ShoppingBag, ShoppingCart, TrendingUp } from 'lucide-react';
import { FloatingIconsAnimation } from '@/components/animation';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero py-24 lg:py-48 min-h-[90vh] flex items-center">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full animate-bounce-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 bg-primary/5 rounded-full animate-float"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
            >
              Support causes by{' '}
              <span className="text-primary">shopping online</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
            >
              Purchase goods where proceeds go directly to fundraising campaigns that you care about.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
                animate={{ 
                  boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 8px rgba(236,72,153,0.4)", "0px 0px 0px rgba(0,0,0,0)"],
                }}
                transition={{ 
                  boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                  scale: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                <Button size="lg" className="text-lg px-8 py-4 group relative overflow-hidden">
                  <span className="relative z-10">Start a Shop2Give</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-400 opacity-0" 
                    whileHover={{ opacity: 0.15 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Browse Campaigns
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-8 text-center lg:text-left"
            >
              <div>
                <div className="text-2xl font-bold text-foreground">$2.4M+</div>
                <div className="text-sm text-muted-foreground">Donated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">15K+</div>
                <div className="text-sm text-muted-foreground">Campaigns</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Donors</div>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Animation Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <FloatingIconsAnimation
              width="100%"
              height={500}
              centerIcon={Heart}
              centerIconSize={20}
              centerIconColor="primary"
              centerIconFill={true}
              showConnectingLines={true}
              className="w-full h-96 lg:h-[500px] flex items-center justify-center"
              icons={[
                {
                  icon: ShoppingBag,
                  color: 'primary',
                  size: 8,
                  position: 'top-left',
                  delay: 0
                },
                {
                  icon: TrendingUp,
                  color: 'green-500',
                  size: 8,
                  position: 'top-right',
                  delay: 0.5
                },
                {
                  icon: Heart,
                  color: 'red-500',
                  size: 8,
                  position: 'bottom-left',
                  delay: 1,
                  fillCurrent: true
                },
                {
                  icon: ShoppingCart,
                  color: 'primary',
                  size: 10,
                  position: 'bottom-right',
                  delay: 0.2
                }
              ]}
            />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-pink-50"></div>
    </section>
  );
}
