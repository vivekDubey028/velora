import React from 'react';
import { motion } from 'framer-motion';

const ContactHero: React.FC = () => {
  return (
    <section className="w-full bg-white pt-32 pb-0">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 text-[12px] font-roboto-mono text-[var(--text-secondary)]"
        >
          <a href="/" className="hover:text-[var(--brand)] transition-colors">Home</a>
          <span className="text-neutral-300">›</span>
          <span className="text-[var(--brand)]">Contact Us</span>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
