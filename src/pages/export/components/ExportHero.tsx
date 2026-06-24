import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ExportHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className="relative min-h-[560px] md:h-[80vh] md:min-h-[600px] lg:min-h-[650px] w-full overflow-hidden flex flex-col justify-center">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-[-100px] bg-[url('/images/hero.webp')] bg-cover bg-center origin-top"
      />
      <div className="absolute inset-0 bg-[#051125]/80 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#051125]/90 via-[#051125]/50 to-transparent"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 flex flex-col justify-center px-4 sm:px-8 lg:px-24 pt-24 pb-28 md:pt-28 md:pb-32"
      >
        <h1 className="!text-white text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] font-['Outfit'] font-semibold max-w-4xl leading-[1.1] mb-4 md:mb-6 tracking-tight">
          Global Chemical <br className="hidden sm:inline" />Coverage With <br className="hidden sm:inline" />Reliable Purity
        </h1>
        <p className="text-white/70 max-w-xl text-sm sm:text-base md:text-lg mb-6 md:mb-10 font-light leading-relaxed">
          Velora Exports provides high-purity chemical sourcing and secure worldwide distribution. We ensure your operations never face downtime.
        </p>
        <div>
          <button className="bg-[#75c834] hover:bg-opacity-90 text-[#102b5e] px-8 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300 flex items-center gap-3">
            Read More <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 w-full px-4 sm:px-8 lg:px-24 pb-8">
        <div className="grid grid-cols-2 md:flex md:justify-between gap-y-3 gap-x-4 text-white/60 text-[11px] sm:text-xs md:text-sm tracking-wide border-t border-white/10 pt-6">
          <span className="hover:text-[#75c834] cursor-pointer transition-colors text-left">Your Local Delivery</span>
          <span className="hover:text-[#75c834] cursor-pointer transition-colors text-right md:text-left">Reliable Cargo Tracking</span>
          <span className="hover:text-[#75c834] cursor-pointer transition-colors text-left">Secure Warehousing</span>
          <span className="hover:text-[#75c834] cursor-pointer transition-colors text-right md:text-left">Custom Clearance</span>
        </div>
      </div>
    </div>
  );
}
