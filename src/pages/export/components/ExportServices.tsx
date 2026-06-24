import { FlaskConical, Globe2, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExportServices() {
  const services = [
    { icon: Truck, title: 'Trucking', desc: 'Reliable ground transportation solutions tailored for specific chemical transport.' },
    { icon: ShieldCheck, title: 'Air Freight', desc: 'Expedited global delivery networks prioritizing speed and compliance.' },
    { icon: Globe2, title: 'Sea Freight', desc: 'Cost-effective high-volume maritime transport for bulk chemicals.' },
    { icon: FlaskConical, title: 'Rail Freight', desc: 'Sustainable overland rail networks dedicated to heavy industrial distribution.' }
  ];
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto text-center">
      <motion.span 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="text-[#75c834] font-medium tracking-widest text-xs mb-4 block uppercase"
      >Our Services</motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl md:text-4xl font-['Outfit'] font-medium text-[#102b5e] mb-12 md:mb-20 max-w-2xl mx-auto leading-tight"
      >
        Trusted Logistics Partner <br className="hidden sm:inline" />for Worldwide Shipping
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-left">
        {services.map((srv, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * idx }}
            className="flex flex-col group cursor-pointer"
          >
            <div className="mb-6 relative text-[#75c834]">
              <srv.icon size={40} strokeWidth={1} className="group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-['Outfit'] font-medium text-[#102b5e] mb-3 group-hover:text-[#75c834] transition-colors">{srv.title}</h3>
            <p className="text-slate-500 text-sm font-light leading-relaxed">{srv.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
