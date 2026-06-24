import { Beaker, Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ExportNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Company', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Logistics', href: '/logistics' },
    { label: 'Sustainability', href: '/sustainability' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 left-0 w-full z-50 px-6 sm:px-8 lg:px-16 py-6 sm:py-8 flex items-center justify-between"
      >
        <div className="flex items-center gap-2 font-['Outfit'] font-normal text-2xl tracking-wide text-white">
          <Beaker className="text-[#75c834]" size={24} strokeWidth={1.5} />
          <span>Velora</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 text-white/90 text-sm tracking-wide">
          {menuItems.map(({ label, href }) => (
            <a key={label} href={href} className="relative group hover:text-white transition-colors py-2">
              {label}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#75c834] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </a>
          ))}
        </nav>
        
        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="/contact" className="border border-white/20 text-white rounded-full px-6 py-2.5 text-sm tracking-wide hover:bg-white/10 transition-all duration-300">
            Request Quote
          </a>
          <button className="text-white hover:text-[#75c834] transition-colors"><Search size={20} strokeWidth={1.5} /></button>
          <button className="text-white hover:text-[#75c834] transition-colors"><Menu size={24} strokeWidth={1.5} /></button>
        </div>

        {/* Mobile/Tablet Menu Button */}
        <div className="flex lg:hidden items-center gap-4 z-50">
          <button className="text-white hover:text-[#75c834] transition-colors"><Search size={20} strokeWidth={1.5} /></button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-[#75c834] transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-20 left-4 right-4 bg-[#051125] border border-white/10 rounded-2xl shadow-2xl z-40 p-6 flex flex-col gap-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4 text-white/90 text-base tracking-wide">
              {menuItems.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-[#75c834] transition-colors py-1"
                >
                  {label}
                </a>
              ))}
            </nav>
            <div className="h-px bg-white/10 w-full" />
            <a href="/contact" className="w-full bg-[#75c834] hover:bg-opacity-90 text-[#102b5e] rounded-full py-3 text-sm font-semibold tracking-wide transition-all duration-300 text-center block">
              Request Quote
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
