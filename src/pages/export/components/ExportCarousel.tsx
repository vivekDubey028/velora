import { ArrowRight } from 'lucide-react';

export default function ExportCarousel() {
  return (
    <section className="pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-[1920px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
        {[
          { title: 'Global Cargo Tracking', img: '/images/hero.webp' },
          { title: 'Efficient Freight Solutions', img: '/images/about.webp' },
          { title: 'Customs Clearance', img: '/images/hero.webp' }
        ].map((item, i) => (
          <div
            key={i}
            className="w-full h-[280px] rounded-[2rem] bg-cover bg-center relative group cursor-pointer overflow-hidden border border-slate-100"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            <div className="absolute inset-0 bg-[#051125]/50 group-hover:bg-[#051125]/30 transition-colors duration-500 mix-blend-multiply"></div>
            <div className="absolute bottom-6 left-8 text-white z-10">
              <h3 className="font-['Outfit'] font-medium text-xl leading-tight mb-2">{item.title}</h3>
              <div className="flex items-center gap-2 text-[#75c834] text-sm opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                Explore <ArrowRight size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
