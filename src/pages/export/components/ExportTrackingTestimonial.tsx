import { motion } from 'framer-motion';

export default function ExportTrackingTestimonial() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-[1920px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="bg-[#f8fafd] rounded-[2rem] p-6 sm:p-10 lg:p-16 relative overflow-hidden border border-slate-100"
        >
          <div className="relative z-10">
            <span className="text-[#75c834] font-medium uppercase tracking-widest text-xs mb-4 block">Track Your Package</span>
            <h2 className="text-4xl font-['Outfit'] font-medium text-[#102b5e] mb-8 md:mb-10">Quick Tracking</h2>
            <div className="flex flex-col sm:flex-row bg-white sm:rounded-full rounded-2xl p-1.5 mb-8 md:mb-12 border border-slate-200 max-w-lg focus-within:border-[#75c834] transition-colors gap-2 sm:gap-0">
              <input type="text" placeholder="Enter tracking number" className="flex-1 px-4 sm:px-6 py-3 sm:py-0 text-slate-700 font-light text-sm focus:outline-none bg-transparent placeholder-slate-400" />
              <button className="bg-[#102b5e] text-white px-8 py-3 rounded-xl sm:rounded-full text-sm font-medium tracking-wide hover:bg-[#051125] transition-colors cursor-pointer w-full sm:w-auto">Track</button>
            </div>
            <p className="text-slate-500 text-sm max-w-md leading-relaxed font-light">
              Track your cargo in real-time. We provide full visibility across the supply chain, ensuring you know exactly where your chemical shipments are at all times.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="bg-[url('/images/ceo.webp')] bg-cover bg-center rounded-[2rem] relative overflow-hidden min-h-[350px] sm:min-h-[400px]"
        >
          <div className="absolute inset-0 bg-[#051125]/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#051125]/90 via-[#051125]/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
            <div className="max-w-lg">
              <p className="text-white/90 text-lg font-['Outfit'] font-light mb-8 leading-relaxed">
                "Velora Exports is an incredible partner. Their chemical purity and logistics support have transformed our manufacturing process."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full overflow-hidden shrink-0">
                  <img src="/images/ceo.webp" alt="Client" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm mb-0.5">Sarah Jenkins</h4>
                  <p className="text-[#75c834] text-xs font-light tracking-wide">Operations Director</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
