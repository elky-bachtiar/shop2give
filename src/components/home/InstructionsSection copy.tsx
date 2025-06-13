import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  Plus,
  Link2,
  Wallet,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  DollarSign,
  CreditCard,
  Receipt,
  FileText,
  Heart,
  Target
} from 'lucide-react';
import { FloatingIconsAnimation } from '@/components/animation';

const steps = [
  {
    number: 1,
    title: 'Create your fundraiser',
    description: "Click the 'Start a Shop2Give' button to begin. Our AI-powered system will guide you through setting up your fundraiser details and goals.",
    icon: <Plus className="w-6 h-6" />
  },
  {
    number: 2,
    title: 'Share your fundraiser link',
    description: 'Share your unique fundraiser link with friends and family. Track progress and engage supporters through your Shop2Give dashboard.',
    icon: <Link2 className="w-6 h-6" />
  },
  {
    number: 3,
    title: 'Receive funds securely',
    description: 'Add your bank details or invite your fundraiser beneficiary to receive donations directly and securely through our platform.',
    icon: <Wallet className="w-6 h-6" />
  }
];

export function InstructionsSection() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full animate-float animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            How Shop2Give Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Making a difference has never been easier. Follow these simple steps to start your fundraising journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Card Stack */}
          <div className="relative h-[500px] w-full">
            {/* Card 1 - Back */}
            <motion.div 
              className={`absolute w-full max-w-md h-64 rounded-2xl p-8 shadow-lg border border-border/50 ${
                activeCard === 0 
                  ? 'bg-background' 
                  : 'bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm'
              }`}
              initial={{ rotateY: 15, rotateX: -10, x: -20, y: 20, opacity: 0.8, zIndex: 1 }}
              animate={{ 
                rotateY: activeCard === 0 ? 0 : 15, 
                rotateX: activeCard === 0 ? 0 : -10, 
                x: activeCard === 0 ? 0 : -20, 
                y: activeCard === 0 ? 0 : 20, 
                zIndex: activeCard === 0 ? 30 : 1,
                opacity: activeCard === 0 ? 1 : 0.8,
                scale: activeCard === 0 ? 1 : 0.95
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              whileHover={{ y: -10, zIndex: 40, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-base font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Create your fundraiser</h3>
              </div>
              <div className="h-24 rounded-lg flex items-center justify-center relative">
                <div className="relative z-20">
                  <motion.div
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Plus className="w-12 h-12 text-primary" />
                  </motion.div>
                </div>
                
                <FloatingIconsAnimation
                  width="100%"
                  height="100%"
                  centerIcon={Plus}
                  centerIconSize={12}
                  centerIconColor="primary"
                  centerIconRotate={false}
                  showCenterIcon={false}
                  showConnectingLines={true}
                  className="absolute inset-0"
                  icons={[
                    {
                      icon: FileText,
                      color: 'blue-500',
                      size: 3,
                      position: 'top-right',
                      delay: 0
                    },
                    {
                      icon: Target,
                      color: 'pink-500',
                      size: 3,
                      position: 'bottom-left',
                      delay: 0.5
                    },
                    {
                      icon: Heart,
                      color: 'red-500',
                      size: 3,
                      position: 'bottom-right',
                      delay: 1,
                      fillCurrent: true
                    }
                  ]}
                />
              </div>
            </motion.div>

            {/* Card 2 - Middle */}
            <motion.div 
              className={`absolute w-full max-w-md h-64 rounded-2xl p-8 shadow-lg border border-border/50 ${
                activeCard === 1 
                  ? 'bg-background' 
                  : 'bg-gradient-to-br from-background to-background/90 backdrop-blur-sm'
              }`}
              initial={{ rotateY: -5, rotateX: 5, x: 0, y: 0, z: 20, opacity: 0.9, zIndex: 2 }}
              animate={{ 
                rotateY: activeCard === 1 ? 0 : -5, 
                rotateX: activeCard === 1 ? 0 : 5, 
                x: 0, 
                y: activeCard === 1 ? 0 : 0, 
                z: activeCard === 1 ? 40 : 20,
                zIndex: activeCard === 1 ? 30 : 2,
                opacity: activeCard === 1 ? 1 : 0.9,
                scale: activeCard === 1 ? 1 : 0.97
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              whileHover={{ y: -10, zIndex: 40, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Share your link</h3>
              </div>
              <div className="flex flex-col items-center justify-center gap-6 h-full relative"> 
                <div className="relative z-20 pt-3">
                  <motion.div
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Link2 className="w-10 h-10 text-primary" />
                  </motion.div>
                </div>
                
                {/* Social Media Icons using the reusable component */}
                <div className="absolute inset-0 w-full h-full">
                  <FloatingIconsAnimation
                    width="100%"
                    height="100%"
                    centerIcon={Link2}
                    centerIconSize={10}
                    centerIconColor="primary"
                    centerIconRotate={false}
                    showCenterIcon={false}
                    showConnectingLines={true}
                    className="w-full h-full"
                    icons={[
                      {
                        icon: Facebook,
                        color: 'blue-600',
                        size: 3,
                        position: 'top-right',
                        delay: 0
                      },
                      {
                        icon: Twitter,
                        color: 'black',
                        size: 3,
                        position: 'bottom-left',
                        delay: 0.5
                      },
                      {
                        icon: Instagram,
                        color: 'pink-600',
                        size: 3,
                        position: 'bottom-right',
                        delay: 1
                      },
                      {
                        icon: Linkedin,
                        color: 'blue-700',
                        size: 3,
                        position: 'top-left',
                        delay: 1.5
                      },
                      {
                        icon: Mail,
                        color: 'red-500',
                        size: 3,
                        position: 'center',
                        delay: 2
                      }
                    ]}
                  />
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Front */}
            <motion.div 
              className="absolute w-full max-w-md h-64 bg-background rounded-2xl p-8 shadow-xl border border-border/50"
              initial={{ rotateY: 5, rotateX: 5, x: 20, y: -20, z: 40, opacity: 1, zIndex: 3 }}
              animate={{ 
                rotateY: activeCard === 2 ? 0 : 5, 
                rotateX: activeCard === 2 ? 0 : 5, 
                x: activeCard === 2 ? 0 : 20, 
                y: activeCard === 2 ? 0 : -20, 
                z: activeCard === 2 ? 50 : 40,
                zIndex: activeCard === 2 ? 30 : 3,
                opacity: 1,
                scale: activeCard === 2 ? 1 : 0.99
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              whileHover={{ y: -10, zIndex: 40, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-base font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">Receive your funds</h3>
              </div>
              <div className="h-24 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="relative z-20">
                  <motion.div
                    animate={{ scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Wallet className="w-12 h-12 text-primary" />
                  </motion.div>
                </div>
                
                <FloatingIconsAnimation
                  width="100%"
                  height="100%"
                  centerIcon={Wallet}
                  centerIconSize={12}
                  centerIconColor="primary"
                  centerIconRotate={false}
                  showCenterIcon={false}
                  showConnectingLines={true}
                  className="absolute inset-0"
                  icons={[
                    {
                      icon: DollarSign,
                      color: 'green-500',
                      size: 5,
                      position: 'top-right',
                      delay: 0
                    },
                    {
                      icon: CreditCard,
                      color: 'blue-600',
                      size: 5,
                      position: 'bottom-left',
                      delay: 0.5
                    },
                    {
                      icon: Receipt,
                      color: 'purple-500',
                      size: 5,
                      position: 'bottom-right',
                      delay: 1.5
                    }
                  ]}
                />
              </div>
            </motion.div>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
              {[0, 1, 2].map((dot) => (
                <button
                  key={dot}
                  onClick={() => setActiveCard(dot)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeCard === dot ? 'bg-primary w-8' : 'bg-primary/20'
                  }`}
                  aria-label={`Go to step ${dot + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Steps List */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl border transition-all duration-300 group ${
                  activeCard === index 
                    ? 'bg-white border-primary/30 shadow-md' 
                    : 'bg-background/30 backdrop-blur-sm border-border/20 hover:border-primary/20 opacity-60 hover:opacity-80 blur-sm hover:blur-none'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center mt-1 transition-colors ${
                    activeCard === index 
                      ? 'bg-primary/10 group-hover:bg-primary/20' 
                      : 'bg-background/50 group-hover:bg-background/70'
                  }`}>
                    <span className={`text-lg font-bold ${
                      activeCard === index ? 'text-primary' : 'text-foreground/70'
                    }`}>
                      {step.number}
                    </span>
                  </div>
                  <div className={`transition-all duration-300 ${
                    activeCard === index ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'
                  }`}>
                    <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className={activeCard === index ? 'text-primary' : 'text-foreground/40'}>{step.icon}</span>
                      <span className={activeCard === index ? '' : 'opacity-70'}>{step.title}</span>
                    </h3>
                    <p className="text-muted-foreground/70">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button size="lg" className="text-lg px-8 py-4 group">
            Get Started for Free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required. Set up in minutes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
