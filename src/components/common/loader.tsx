import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import arrowImg from '../../assets/Group 1 2.webp';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  useEffect(() => {
    // Fire onComplete after hold time — AnimatePresence then runs the iris exit
    const timer = setTimeout(onComplete, 1900);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#fafafa' }}
      // Establish the clip-path so Framer knows the start value for the exit animation
      initial={{ clipPath: 'circle(150% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      // Iris-close exit — the white panel contracts as a perfect circle
      exit={{
        clipPath: 'circle(0% at 50% 50%)',
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Wordmark */}
      <div className="relative flex flex-col items-center gap-1.5">
        {/* Logo text + arrow */}
        <motion.div
          className="relative flex items-baseline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="font-['Montserrat'] font-bold text-[var(--brand)] tracking-tight select-none"
            style={{ fontSize: 'clamp(38px, 6vw, 58px)' }}
          >
            Velora
          </span>

          <motion.img
            src={arrowImg}
            alt=""
            className="absolute"
            style={{
              top: '-11px',
              right: '-24px',
              width: '22px',
              height: '22px',
              objectFit: 'contain',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.45, ease: 'backOut' }}
          />
        </motion.div>

        {/* Single green line — draws left to right */}
        <motion.div
          className="rounded-full bg-[var(--accent)]"
          style={{
            height: '1.5px',
            width: 'clamp(38px, 6vw, 58px)',
            transformOrigin: 'left center',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.72, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
