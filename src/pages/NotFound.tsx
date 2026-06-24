import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-5 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-lg"
      >
        <span className="font-roboto-mono text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase">
          Error 404
        </span>
        <h1
          className="mt-4 font-['Outfit'] font-bold text-[var(--brand)] leading-none"
          style={{ fontSize: 'clamp(5rem, 18vw, 10rem)' }}
        >
          404
        </h1>
        <p className="mt-6 font-dm-sans text-[var(--text-secondary)] text-base leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 bg-[var(--brand)] text-white font-roboto-mono font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-[var(--accent)] transition-colors duration-300"
          >
            Back to Home
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-3 border border-[var(--brand)] text-[var(--brand)] font-roboto-mono font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-[var(--brand)] hover:text-white transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
