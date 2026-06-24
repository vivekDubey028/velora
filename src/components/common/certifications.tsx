import { motion } from "framer-motion";
import iso50001 from "../../assets/certifications/ISO 50001 - 2018.png";
import responsibleCare from "../../assets/certifications/Responsible Care Certification.png";
import togetherForSustainability from "../../assets/certifications/Together For Sustainability.png";
import ecovadis from "../../assets/certifications/Ecovadis Gold Rating.png";
import iso27001 from "../../assets/certifications/ISO 27001 - 2022.png";
import cdpClimate from "../../assets/certifications/CDP Climate Change_ Leadership Band _A_.png";
import cdpWater from "../../assets/certifications/cdp water security.avif";

const Certifications = ({ hideCta = false }: { hideCta?: boolean }) => {
  const certs = [
    { name: "ISO 50001 - 2018", icon: iso50001 },
    { name: "Responsible Care Certification", icon: responsibleCare },
    { name: "Together For Sustainability", icon: togetherForSustainability },
    { name: "Ecovadis Gold Rating", icon: ecovadis },
    { name: "ISO 27001 - 2022", icon: iso27001 },
    { name: "CDP Climate Change: Leadership Band 'A'", icon: cdpClimate },
    { name: "CDP Water Security: Leadership Band 'A'", icon: cdpWater },
  ];

  return (
    <section className="w-full bg-white flex flex-col items-center">
      <div className="max-w-[1400px] w-full px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-[42px] font-['Outfit'] text-[var(--brand)] tracking-tight">
            Assurance of Credibility
          </h2>
        </div>

        <div className="h-20 w-full" />

        {/* Certifications — marquee on mobile, grid on md+ */}
        <div className="md:hidden overflow-hidden w-full mb-12">
          <div
            style={{
              display: 'flex',
              gap: '24px',
              animation: 'marquee-certs 22s linear infinite',
              width: 'max-content',
            }}
          >
            {[...certs, ...certs].map((cert, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-[90px] h-[68px] bg-neutral-50 rounded-[14px] flex items-center justify-center p-3 shadow-sm border border-neutral-100/50">
                  <img src={cert.icon} alt={cert.name} className="max-w-full max-h-full object-contain" />
                </div>
                <p className="text-[9px] font-medium text-neutral-500 text-center leading-tight max-w-[80px]">{cert.name}</p>
              </div>
            ))}
          </div>
          <style>{`
            @keyframes marquee-certs {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>

        <div className="hidden md:grid grid-cols-4 lg:grid-cols-7 gap-6 mb-24">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert.name}
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.05 * idx }}
              viewport={{ once: true }}
            >
              <div className="w-full aspect-[4/3] bg-neutral-50 rounded-[20px] flex items-center justify-center p-6 shadow-sm border border-neutral-100/50 hover:shadow-md transition-shadow duration-300">
                <img
                  src={cert.icon}
                  alt={cert.name}
                  className="max-w-full max-h-full object-contain transition-all duration-300"
                />
              </div>
              <p className="text-[11px] md:text-[12px] font-medium text-neutral-500 text-center leading-relaxed max-w-[120px]">
                {cert.name}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="h-20 w-full" />

        {/* CTA Banner Section */}
        {!hideCta && <motion.div
          className="w-full mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative w-full h-auto min-h-[300px] rounded-[32px] md:rounded-[40px] overflow-hidden bg-gradient-to-r from-[#002D5B] to-[#478100] group">
            {/* Background Decoration (Curved Lines) */}
            <div className="absolute left-0 bottom-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity scale-x-[-1]">
              <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="translate-y-4">
                <path d="M0 200 C150 180 200 50 400 0" stroke="white" strokeWidth="0.5" strokeOpacity="0.8" />
                <path d="M0 220 C180 200 250 80 400 20" stroke="white" strokeWidth="0.5" strokeOpacity="0.6" />
                <path d="M0 240 C210 220 300 110 400 40" stroke="white" strokeWidth="0.5" strokeOpacity="0.4" />
              </svg>
            </div>

            <div className="relative z-10 w-full h-full min-h-[300px] flex flex-col lg:flex-row items-center justify-between gap-8 xl:gap-16" style={{ paddingTop: '40px', paddingBottom: '40px', paddingLeft: 'clamp(20px, 7vw, 100px)', paddingRight: 'clamp(20px, 7vw, 100px)' }}>
              <div className="flex-1 w-full min-w-0 max-w-[700px] flex flex-col items-start">
                <h2
                  className="text-[22px] md:text-3xl lg:text-[40px] xl:text-[42px] font-['Outfit'] font-normal text-white tracking-tight leading-[1.2] mb-4"
                >
                  Experience reliable chemistry with a partner built for global movement.
                </h2>
                <p className="text-white/90 text-sm md:text-base leading-relaxed font-dm-sans max-w-[650px]">
                  From audited sourcing to export execution and logistics coordination, Velora is designed to make chemical supply more dependable, more transparent, and easier to scale.
                </p>
              </div>

              <div className="flex flex-col w-full lg:w-auto shrink-0 gap-4 xl:gap-5">
                <a href="/contact" className="bg-white font-roboto-mono text-black font-semibold text-sm xl:text-base px-6 xl:px-8 h-[50px] xl:h-[64px] rounded-full flex items-center justify-center gap-3 hover:bg-neutral-100 transition-colors duration-300 w-full lg:w-[280px] xl:w-[320px]">
                  GET YOUR QUOTE NOW <span className="text-xl leading-none font-normal">›</span>
                </a>
                <a href="/products" className="bg-white font-roboto-mono text-black font-semibold text-sm xl:text-base px-6 xl:px-8 h-[50px] xl:h-[64px] rounded-full flex items-center justify-center gap-3 hover:bg-neutral-100 transition-colors duration-300 w-full lg:w-[280px] xl:w-[320px]">
                  VIEW PRODUCTS <span className="text-xl leading-none font-normal">›</span>
                </a>
              </div>
            </div>
          </div>
          <div className="h-20 w-full" />
        </motion.div>}
      </div>
    </section>
  );
};

export default Certifications;
