import { motion } from 'framer-motion';
import { Activity, BarChart3, PieChart } from 'lucide-react';

export default function ExportCards() {
  return (
    <div className="px-4 sm:px-6 lg:px-12 pt-4 relative z-20 max-w-[1920px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          className="rounded-[2rem] overflow-hidden relative h-[300px] bg-[url('/images/about.webp')] bg-cover bg-center group cursor-pointer border border-slate-100 shadow-sm"
        >
          <div className="absolute inset-0 bg-[#102b5e]/60 group-hover:bg-[#102b5e]/90 transition-colors duration-500"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 z-10">
            <Activity className="text-[#75c834] mb-3" size={40} strokeWidth={1.5} />
            <span className="text-white text-3xl font-['Outfit'] font-medium">99.9%</span>
            <span className="text-white/70 text-sm font-light mt-1">On-time Delivery Rate</span>
          </div>

          <div className="absolute bottom-8 left-8 right-8 group-hover:opacity-0 transition-opacity duration-300">
            <h3 className="text-white text-2xl font-['Outfit'] font-medium leading-tight">Advanced Real-Time <br/>Tracking System</h3>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-[2rem] overflow-hidden relative h-[300px] bg-[#75c834] p-6 sm:p-10 flex flex-col justify-center text-[#102b5e] border border-[#75c834]/50 shadow-sm group cursor-pointer"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-500 z-10 bg-[#102b5e] rounded-[2rem]">
            <BarChart3 className="text-[#75c834] mb-3" size={40} strokeWidth={1.5} />
            <span className="text-white text-3xl font-['Outfit'] font-medium">15k+</span>
            <span className="text-white/70 text-sm font-light mt-1">Shipments Annually</span>
          </div>

          <div className="group-hover:opacity-0 transition-opacity duration-300">
            <div className="mb-4">
              <h2 className="text-6xl font-['Outfit'] font-medium tracking-tighter">25</h2>
            </div>
            <p className="text-sm font-medium opacity-80 mb-2 tracking-wide">Years of experience</p>
            <h3 className="text-2xl font-['Outfit'] font-medium leading-tight">Fully Transparent <br/>Freight Pricing</h3>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-[2rem] overflow-hidden relative h-[300px] bg-[url('/images/hero.webp')] bg-cover bg-center group cursor-pointer border border-slate-100 shadow-sm"
        >
          <div className="absolute inset-0 bg-[#102b5e]/60 group-hover:bg-[#102b5e]/90 transition-colors duration-500"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 z-10">
            <PieChart className="text-[#75c834] mb-3" size={40} strokeWidth={1.5} />
            <span className="text-white text-3xl font-['Outfit'] font-medium">100%</span>
            <span className="text-white/70 text-sm font-light mt-1">Hazmat Compliant</span>
          </div>

          <div className="absolute bottom-8 left-8 right-8 group-hover:opacity-0 transition-opacity duration-300">
            <h3 className="text-white text-2xl font-['Outfit'] font-medium leading-tight">Comprehensive Customs <br/>and Compliance</h3>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
