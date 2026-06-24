import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExportFeatures() {
  const features = [
    { title: 'Fast Worldwide Cargo', desc: 'Secure reliable transport across all borders with complete oversight.' },
    { title: 'Fast Delivery Commitment', desc: 'Optimized routing for the quickest transit times available.' },
    { title: 'Transparent Pricing Policy', desc: 'No hidden fees. Full transparency in all our shipping quotes.' },
    { title: 'Full Hazmat Compliance', desc: 'Strict adherence to all safety regulations for chemical transport.' },
    { title: 'Comprehensive Customs', desc: 'Our experts handle all documentation and clearance protocols.' },
    { title: 'Secure Warehouse Facilities', desc: 'State-of-the-art storage facilities with climate control.' }
  ];
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-[#75c834] font-medium tracking-widest text-xs mb-4 block uppercase"
        >Why Choose Us</motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-['Outfit'] font-medium text-[#102b5e] max-w-2xl mx-auto leading-tight"
        >
          The minimal approach <br className="hidden sm:inline" />to global logistics
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12">
        {features.map((feat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * idx }}
            key={idx} className="flex gap-5 group"
          >
            <div className="text-[#75c834] shrink-0 pt-1">
              <Check size={20} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg font-['Outfit'] font-medium text-[#102b5e] mb-2">{feat.title}</h3>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{feat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
