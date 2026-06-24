import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Droplet, Layers, Beaker, Filter, Zap, ChevronDown } from 'lucide-react';
import type { ProductData } from '../../data/productsData';
import { productDatabase } from '../../data/productsData';
import moleculeImg from '../../assets/three_d_molecule.webp';

const categories = [
  { id: 'inorganic', label: 'Inorganic Salts', icon: FlaskConical },
  { id: 'solvents', label: 'Solvents', icon: Droplet },
  { id: 'surfactants', label: 'Surfactants', icon: Layers },
  { id: 'polymers', label: 'Polymers', icon: Beaker },
  { id: 'reagents', label: 'Reagents', icon: Filter },
  { id: 'catalysts', label: 'Catalysts', icon: Zap },
];

const CatalogueCard: React.FC<{ product: ProductData }> = ({ product }) => {
  // Extracting cleaner names and purity
  const cleanName = product.name.split('[')[0].trim();
  const cleanPurity = product.purity.match(/>?\d+\.?\d*%/) ? product.purity.match(/>?\d+\.?\d*%/)?.[0] : '>98%';
  const cleanDensity = product.density ? product.density.split(' ')[0] + ' g/cm³' : 'N/A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[24px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col items-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-shadow duration-300 relative group"
    >
      <div className="w-full flex justify-between items-start mb-2">
        <span className="text-[10px] font-black text-[var(--brand)] uppercase tracking-wider">
          INDUSTRIAL GRADE
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#8cc63f]" />
          <span className="text-[10px] font-bold text-[#8cc63f] tracking-wide uppercase">IN STOCK</span>
        </div>
      </div>

      {/* 3D Molecule - scale it appropriately to mimic the screenshot */}
      <div className="w-full h-40 flex items-center justify-center mb-6 overflow-hidden">
        <img
          src={moleculeImg}
          alt="Molecule Structure"
          className="h-[140%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>

      <div className="w-full text-left">
        <h3 className="text-xl md:text-2xl font-black text-[var(--brand)] mb-1 tracking-tight">
          {cleanName}
        </h3>
        <p className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">
          FORMULA — {product.chemicalFormula}
        </p>
      </div>

      <div className="w-full grid grid-cols-3 divide-x divide-gray-200 border-t border-gray-100 pt-4 mt-auto">
        <div className="flex flex-col items-center justify-center text-center px-1">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">CAS NO.</span>
          <span className="text-[11px] font-black text-[var(--brand)]">{product.casNumber}</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center px-1">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">PURITY</span>
          <span className="text-[11px] font-black text-[var(--brand)]">{cleanPurity}</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center px-1">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">DENSITY</span>
          <span className="text-[11px] font-black text-[var(--brand)]">{cleanDensity}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Catalogue: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('inorganic');
  const [visibleCount, setVisibleCount] = useState(6);

  // In a real app we'd filter by category properly, here we just randomize slowly or slice 
  // since the mock data doesn't map perfectly to these categories.
  const displayedProducts = productDatabase.slice(0, visibleCount);

  return (
    <section className="bg-[#f8fafd] py-16 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto min-h-screen font-['Inter']">

      {/* Top Filter Bar */}
      <div className="w-full bg-[#e6f0f9] rounded-[32px] p-4 flex flex-wrap items-center justify-around gap-4 mb-16 shadow-inner">
        {categories.map(cat => {
          const isActive = activeCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center gap-2 px-8 py-5 rounded-[24px] transition-all duration-300 ${isActive
                  ? 'bg-[#0f2b5b] text-[var(--accent)] shadow-lg scale-105'
                  : 'bg-transparent text-[var(--brand)] hover:bg-white/50'
                }`}
            >
              <Icon size={32} strokeWidth={isActive ? 2.5 : 1.5} className={isActive ? 'text-[#8cc63f]' : 'text-black'} />
              <span className={`text-[11px] uppercase tracking-widest font-black ${isActive ? 'text-[#8cc63f]' : 'text-black'}`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-12">

        {/* Sidebar */}
        <div className="w-full lg:w-[240px] shrink-0">
          <h2 className="text-[var(--brand)] font-black text-sm uppercase tracking-widest mb-8">
            Refine Results
          </h2>

          <div className="mb-8">
            <h3 className="text-[#8cc63f] font-black text-[11px] uppercase tracking-widest mb-4">
              Purity Grades
            </h3>
            <div className="relative">
              <select className="appearance-none w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:border-[#8cc63f]">
                <option>All Grades</option>
                <option>Technical Grade</option>
                <option>Reagent Grade</option>
                <option>Pharmaceutical</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <h3 className="text-[#8cc63f] font-black text-[11px] uppercase tracking-widest mb-4">
              Stock Status
            </h3>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-5 h-5 rounded border-2 border-[#8cc63f] bg-white flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-[#8cc63f] rounded-sm" />
                </div>
                <span className="text-sm font-bold text-gray-600 group-hover:text-[var(--brand)] transition-colors">Available Now</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-5 h-5 rounded border-2 border-gray-300 bg-white" />
                <span className="text-sm font-bold text-gray-600 group-hover:text-[var(--brand)] transition-colors">Made to Order</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {displayedProducts.map((product) => (
              <CatalogueCard key={product.id} product={product} />
            ))}
          </div>

          {visibleCount < productDatabase.length && (
            <div className="w-full flex justify-center mt-12">
              <button
                onClick={() => setVisibleCount(productDatabase.length)}
                className="px-10 py-4 bg-[var(--brand)] text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-[var(--accent)] hover:text-[var(--brand)] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                View All {productDatabase.length} Products
              </button>
            </div>
          )}
        </div>
      </div>

    </section>
  );
};

export default Catalogue;
