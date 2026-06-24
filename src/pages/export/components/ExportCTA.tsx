import { ArrowRight } from 'lucide-react';

export default function ExportCTA() {
  return (
    <section className="bg-[#f8fafd] py-16 px-4 sm:px-6 mt-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <h2 className="text-2xl md:text-3xl font-['Outfit'] font-medium text-[#102b5e] text-center md:text-left">Ready to ship your cargo?</h2>
        <button className="bg-[#102b5e] text-white hover:bg-[#051125] px-8 py-3.5 rounded-full font-medium text-sm tracking-wide transition-colors shrink-0 flex items-center gap-3 cursor-pointer">
          Get Started <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
