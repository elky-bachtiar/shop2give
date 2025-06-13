import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, ShoppingBag, ShoppingCart, TrendingUp } from 'lucide-react';

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
                  boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 15px rgba(236,72,153,0.5)", "0px 0px 0px rgba(0,0,0,0)"],
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
            <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
              {/* Central Heart */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute z-10"
              >
                <Heart className="w-20 h-20 text-primary fill-current" />
              </motion.div>

              {/* Floating Icons */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4"
              >
                <ShoppingBag className="w-8 h-8 text-primary" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-3/4 right-1/4"
              >
                <ShoppingBag className="w-10 h-10 text-foreground" />
              </motion.div>
              
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.2
                }}
                className="absolute top-1/3 right-1/3"
              >
                <ShoppingCart className="w-12 h-12 text-primary" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/3 right-1/4"
              >
                <TrendingUp className="w-10 h-10 text-primary" />
              </motion.div>

              <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 left-1/3"
              >
                <Heart className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-pink-50"></div>
    </section>
  );
}
