import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const BackgroundPattern = () => (
  <div className="absolute inset-0 z-0 flex items-center justify-start overflow-hidden opacity-[0.06] pointer-events-none">
    <motion.svg
      style={{ width: "calc(100vw + 360px)", height: "300px" }}
      xmlns="http://www.w3.org/2000/svg"
      animate={{ x: [0, -180] }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
    >
      <defs>
        <pattern id="arrow-pattern-logmove" x="0" y="0" width="180" height="300" patternUnits="userSpaceOnUse">
          {/* Horizontal Line */}
          <line x1="0" y1="150" x2="180" y2="150" stroke="white" strokeWidth="24" />
          {/* Arrow head */}
          <path d="M50 30 L170 150 L50 270" fill="none" stroke="white" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#arrow-pattern-logmove)" />
    </motion.svg>
  </div>
);

const LogMove = () => {
  const containerRef = useRef<HTMLElement>(null);

  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.2
  });

  return (
    <section ref={containerRef} className="w-full bg-brand/60 overflow-hidden relative flex items-center justify-center h-[120px] md:h-[140px] border-y border-white/5">
      {/* Moving Arrows Background Pattern */}
      <BackgroundPattern />

      <div className="w-full px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 max-w-[1600px] mx-auto">

        {/* Headline with Thin Pill */}
        <div className="flex items-center gap-x-2 text-xl md:text-2xl lg:text-[26px] font-bold text-white tracking-wide whitespace-nowrap">
          <span className="font-dm-sans translate-x-15">Ready to m</span>

          {/* The Stretching Thin "o" Pill Track Wrapper */}
          <div className="w-[180px] md:w-[350px] lg:w-[700px] flex items-center justify-start">
            <motion.div
              className="relative h-[10px] md:h-[12px] border-2 border-accent  translate-x-15 rounded-full overflow-hidden"
              initial={{ width: "20px" }}
              animate={isInView ? { width: "100%" } : { width: "20px" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />
          </div>

          <span className="font-dm-sans translate-x-15">ve smarter?</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-1 shrink-0 -translate-x-4">
          <button
            className="flex items-center justify-center bg-gradient-to-b from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-white rounded-full px-8 py-3 transition-colors duration-300 h-[48px] shadow-lg shadow-accent/20 shrink-0 min-w-[220px] md:min-w-[260px]"
          >
            <span className="text-[13px] md:text-[14px] font-semibold tracking-wide font-roboto-mono">
              Get a Custom Quote
            </span>
          </button>

          <button className="w-[48px] h-[48px] rounded-full bg-gradient-to-b from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 flex items-center justify-center text-white transition-colors duration-300 shadow-lg shadow-accent/20 shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 12H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 8L18 12L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LogMove;
