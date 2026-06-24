import { motion } from "framer-motion";
import arrowImg from "../../assets/Group 1 2.webp";

const Footer = () => {
  const sections = [
    {
      title: "COMPANY",
      links: [
        { label: "Who We Are", href: "/about" },
        { label: "Our Story", href: "/about" },
        { label: "Industries We Serve", href: "/products" },
        { label: "Global Reach", href: "/export" },
      ],
    },
    {
      title: "SUSTAINABILITY",
      links: [
        { label: "Sustainability Overview", href: "/sustainability" },
        { label: "Environment", href: "/sustainability" },
        { label: "Social, Health & Safety", href: "/sustainability" },
        { label: "Responsible Supply Chain", href: "/sustainability" },
        { label: "Sustainability Reports", href: "/sustainability" },
      ],
    },
    {
      title: "CONNECT",
      links: [
        { label: "Contact Us", href: "/contact" },
        { label: "Logistics & Supply", href: "/logistics" },
        { label: "Export Services", href: "/export" },
        { label: "Product Catalogue", href: "/products" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#eeeeee] rounded-t-[28px] md:rounded-t-[40px] relative overflow-hidden mt-16 md:mt-20 min-h-[600px] flex flex-col">
      {/* Decorative arrows */}
      <div className="hidden md:block absolute top-0 right-0 pointer-events-none select-none">
        <svg
          width="800"
          height="800"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-15"
        >
          <path d="M95 30 V5 H70" stroke="#8cc63f" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M75 38 V23 H60" stroke="#8cc63f" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10 flex-1" style={{ paddingTop: '64px', paddingLeft: 'clamp(20px, 4vw, 96px)', paddingRight: 'clamp(20px, 4vw, 96px)' }}>
        <div className="flex flex-col gap-12 md:gap-20">

          {/* Logo */}
          <div className="shrink-0 flex justify-start mt-8 md:mt-40 md:-translate-y-32 md:translate-x-5">
            <div className="flex flex-col">
              <div className="relative flex items-center text-[32px] md:text-[42px] font-bold tracking-tight leading-none w-max">
                <span className="text-brand">Velora</span>
                <img src={arrowImg} alt="" className="absolute -top-[10px] -right-[24px] w-[28px] md:w-[32px] h-[28px] md:h-[32px] object-contain z-10" />
              </div>
              <span className="text-[#72b01d] font-bold text-base md:text-base tracking-wide -mt-1 ml-12 md:ml-32 md:-translate-x-12">Chemicals</span>
            </div>
          </div>

          {/* Nav sections */}
          <div className="flex flex-wrap gap-8 md:gap-12 mt-6 md:-mt-32 md:pl-26 md:translate-x-4">
            {sections.map((section, idx) => (
              <motion.div
                key={section.title}
                className="flex flex-col gap-6"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-[13px] font-bold text-[var(--brand)] tracking-[0.15em] uppercase">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[12px] text-neutral-500 hover:text-[var(--brand)] transition-colors duration-200 font-roboto-mono"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full border-t border-neutral-300 mt-auto">
        <div className="max-w-[1400px] mx-auto w-full h-[100px] md:h-[50px] flex flex-col md:flex-row justify-between items-center gap-3" style={{ paddingLeft: 'clamp(20px, 4vw, 96px)', paddingRight: 'clamp(20px, 4vw, 96px)' }}>
          <p className="text-[11px] text-neutral-400 md:translate-x-8 font-medium font-liberationsans">
            © 2026 Velora Chemicals. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/contact" className="text-[11px] text-neutral-500 hover:text-[var(--brand)] transition-colors font-medium font-liberationsans">
              Privacy Policy
            </a>
            <a href="/sitemap.xml" className="text-[11px] text-neutral-500 hover:text-[var(--brand)] transition-colors font-medium font-liberationsans">
              Sitemap
            </a>
            <a href="/contact" className="text-[11px] text-neutral-500 hover:text-[var(--brand)] transition-colors font-medium font-liberationsans">
              Job Fraud Alert
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
