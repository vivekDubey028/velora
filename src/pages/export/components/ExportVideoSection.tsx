import { Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ExportVideoSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative rounded-[2rem] overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] group cursor-pointer border border-slate-100 shadow-sm">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-[-50px] bg-[url('/images/about.webp')] bg-cover bg-center origin-center"
      />
      <div className="absolute inset-0 bg-[#102b5e]/20 group-hover:bg-[#102b5e]/10 transition-colors duration-500"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-white group-hover:text-[#102b5e] transition-all duration-300">
          <Play size={28} strokeWidth={1.5} className="ml-1" />
        </div>
      </div>
    </div>
  );
}
