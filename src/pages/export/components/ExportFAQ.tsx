import { Plus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  'What methods of payment do you accept?',
  'How long does the customs clearance process take?',
  'Do you provide international cargo transport?',
  'What are the restrictions on shipping chemicals?',
  'How do you track my shipment in real-time?'
];

export default function ExportFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div>
          <span className="text-[#75c834] font-medium uppercase tracking-widest text-xs mb-4 block">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-['Outfit'] font-medium text-[#102b5e] mb-10 leading-tight">
            Common questions <br/>about our services
          </h2>
          <div className="rounded-[2rem] overflow-hidden border border-slate-100">
            <img src="/images/hero.webp" alt="Chemicals" className="w-full h-[280px] object-cover" />
          </div>
        </div>
        <div className="pt-2">
          <div className="flex gap-8 mb-8 border-b border-slate-100 pb-4">
            <button className="text-[#102b5e] font-medium text-sm tracking-wide">Shipping</button>
            <button className="text-slate-400 hover:text-[#102b5e] font-medium text-sm tracking-wide transition-colors">Storage</button>
          </div>
          <div className="space-y-0">
            {faqs.map((q, idx) => (
              <div key={idx} className="border-b border-slate-100 last:border-0">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="flex justify-between items-center w-full text-left text-slate-700 py-5 hover:text-[#102b5e] transition-colors group cursor-pointer text-sm"
                >
                  {q}
                  <Plus 
                    size={16} 
                    className={`text-slate-300 group-hover:text-[#75c834] transition-all duration-300 ${openIndex === idx ? 'rotate-45 text-[#75c834]' : ''}`} 
                  />
                </button>
                {openIndex === idx && (
                  <div className="pb-5 text-sm text-slate-500 font-light leading-relaxed">
                    Our team will be happy to answer your questions. Please contact us at contact@velorachem.com for more details about this topic.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
