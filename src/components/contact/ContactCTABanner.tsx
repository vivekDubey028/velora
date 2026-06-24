import React from 'react';
import { motion } from 'framer-motion';

const ContactCTABanner: React.FC = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-[1400px] mx-auto px-5 md:px-12 lg:px-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative w-full rounded-[28px] md:rounded-[36px] overflow-hidden bg-gradient-to-r from-[#002D5B] via-[#0a3d2f] to-[#478100]"
        >
          {/* Decorative curves */}
          <div className="absolute left-0 bottom-0 pointer-events-none opacity-30">
            <svg width="500" height="250" viewBox="0 0 500 250" fill="none">
              <path d="M0 250 C200 220 280 60 500 0" stroke="white" strokeWidth="0.6" />
              <path d="M0 280 C230 250 320 90 500 30" stroke="white" strokeWidth="0.6" opacity="0.6" />
              <path d="M0 310 C260 280 360 120 500 60" stroke="white" strokeWidth="0.6" opacity="0.35" />
            </svg>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#78c32c]/10 to-transparent pointer-events-none" />

          <div
            className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ padding: 'clamp(28px, 5vw, 56px) clamp(24px, 6vw, 80px)' }}
          >
            <div className="flex-1 min-w-0">
              <h2 className="text-white text-2xl md:text-3xl lg:text-[36px] font-['Outfit'] font-normal leading-[1.25] tracking-tight">
                Global-ready chemical solutions<br className="hidden md:block" />
                <span className="font-semibold"> backed by reliability and trust.</span>
              </h2>
            </div>

            <motion.a
              href="/products"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 flex items-center gap-3 bg-white text-[var(--brand)] font-roboto-mono font-semibold text-sm px-8 py-4 rounded-full hover:bg-[var(--accent)] hover:text-white transition-colors duration-300 whitespace-nowrap shadow-lg"
            >
              EXPLORE PRODUCTS
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTABanner;
