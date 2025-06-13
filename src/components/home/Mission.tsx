import { motion } from "framer-motion";

export function Mission() {
  return (
    <section className="bg-primary/10 py-20 text-primary relative" id="mission-section">
      <motion.div 
        className="container max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
        <p style={{ color: 'var(--brand-charcoal)', opacity: 0.8 }} className="mx-auto max-w-3xl text-lg leading-relaxed">
          "Shop2Give exists to empower people to make a difference — by connecting 
          everyday purchases with life-changing causes. Rooted in Christian values, 
          we bring communities together to support each other through transparent giving, 
          purposeful products, and sustainable impact."
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-16 gradient-mission"></div>
    </section>
  );
}