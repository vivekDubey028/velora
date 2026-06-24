import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical, TestTubes, Waves, Network, Filter, Zap,
  Beaker, Sparkles, Droplets, SlidersHorizontal, X
} from "lucide-react";
import { productCategories } from "../../data/productCategories";
import { Molecule3D } from "../3d/Molecule3D";
import Certifications from "../common/certifications";

interface ProductFilterState {
  purity: string;
  stock: string;
}

const categoryIcons: Record<string, any> = {
  "solvents": TestTubes,
  "water-treatment": Droplets,
  "inorganic-acids": FlaskConical,
  "surfactants": Waves,
  "alkalis-bases": Network,
  "food-cosmetic": Filter,
  "detergent-additives": Sparkles,
  "specialty-chemicals": Zap,
};

const categoryShortNames: Record<string, string> = {
  "solvents": "Solvents",
  "water-treatment": "Treatment",
  "inorganic-acids": "Inorganic Salts",
  "surfactants": "Surfactants",
  "alkalis-bases": "Polymers",
  "food-cosmetic": "Reagents",
  "detergent-additives": "Additives",
  "specialty-chemicals": "Catalysts",
};

/* ── JS hook only used for the slide-in filter drawer ── */
function useIsMobile(bp = 768) {
  const [m, setM] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const h = () => setM(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);
  return m;
}

export default function ProductsDisplayNew() {
  const isMobile = useIsMobile();
  const initialCategory =
    productCategories.find(c => c.id === "inorganic-acids")?.id ||
    productCategories[0].id;
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [filter, setFilter] = useState<ProductFilterState>({ purity: "", stock: "" });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const category = productCategories.find(c => c.id === selectedCategory);
  const allProducts = category?.products ?? [];

  const purityOptions = useMemo(() => {
    const s = new Set<string>();
    allProducts.forEach(p => { if (p.purity) s.add(p.purity); });
    return Array.from(s);
  }, [allProducts]);

  const filteredProducts = allProducts.filter(p => {
    if (filter.purity && p.purity !== filter.purity) return false;
    if (filter.stock) {
      const stock = p.id.charCodeAt(0) % 2 === 0 ? "Available Now" : "Made to Order";
      if (filter.stock !== stock) return false;
    }
    return true;
  });

  const hasFilters = !!(filter.purity || filter.stock);

  /* ── Shared filter panel markup (used in both sidebar + drawer) ── */
  const FilterPanel = () => (
    <div>
      <h3 style={{ fontSize: '12px', fontWeight: 800, color: '#3a5264', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
        Refine Results
      </h3>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ fontSize: '10px', fontWeight: 700, color: '#6a873e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
          Purity Grades
        </h4>
        <div style={{ position: 'relative' }}>
          <select
            style={{ width: '100%', background: '#fff', border: '1px solid #e2e8f0', color: '#475569', borderRadius: '8px', padding: '9px 28px 9px 10px', fontSize: '11px', fontWeight: 600, appearance: 'none', cursor: 'pointer', outline: 'none' }}
            value={filter.purity}
            onChange={e => setFilter({ ...filter, purity: e.target.value })}
          >
            <option value="">All Grades</option>
            {purityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <svg style={{ width: '11px', height: '11px', color: '#94a3b8' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ fontSize: '10px', fontWeight: 700, color: '#6a873e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
          Stock Status
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {["Available Now", "Made to Order"].map(status => (
            <label key={status} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: `1px solid ${filter.stock === status ? '#64748b' : '#cbd5e1'}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {filter.stock === status && <div style={{ width: '9px', height: '9px', background: '#64748b', borderRadius: '2px' }} />}
              </div>
              <span style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>{status}</span>
              <input type="radio" name="stock" value={status} style={{ display: 'none' }}
                onChange={e => setFilter({ ...filter, stock: e.target.value })}
                checked={filter.stock === status} />
            </label>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={() => setFilter({ purity: "", stock: "" })}
          style={{ marginTop: '20px', width: '100%', padding: '9px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fff', fontSize: '11px', fontWeight: 700, color: '#64748b', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* ─── CSS media-query rules injected once ─── */}
      <style>{`
        .pd-section { width: 100%; background: #f5f7fb; font-family: inherit; }

        /* Page container */
        .pd-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 40px 48px 64px;
        }

        /* Category bar */
        .pd-catbar {
          background: #e9f0f8;
          border-radius: 28px;
          padding: 20px 24px;
          margin-bottom: 32px;
        }
        .pd-catbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .pd-catbtn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex: 1 1 0;
          min-width: 90px;
          height: 110px;
          border-radius: 18px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        /* Main row */
        .pd-row {
          display: flex;
          gap: 32px;
          align-items: flex-start;
        }
        .pd-sidebar {
          width: 180px;
          flex-shrink: 0;
          padding-top: 4px;
        }
        .pd-grid-wrap { flex: 1; min-width: 0; }
        .pd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
        }

        /* Product card */
        .pd-card {
          background: #fff;
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          min-height: 380px;
          transition: background 0.2s ease;
        }
        .pd-card:hover { background: #f8fafc; }

        /* Mobile filter bar */
        .pd-mob-filterbar { display: none; }

        /* CTA */
        .pd-cta {
          display: flex;
          flex-direction: row;
          min-height: 240px;
          border-radius: 28px;
          margin-top: 48px;
        }
        .pd-cta-text {
          flex: 0 0 58%;
          padding: 44px 48px;
        }
        .pd-cta-img { flex: 1; min-height: auto; }

        /* ── MOBILE ── */
        @media (max-width: 767px) {
          .pd-container {
            padding: 16px 16px 40px;
          }
          .pd-catbar {
            border-radius: 18px;
            padding: 10px 10px;
            margin-bottom: 14px;
          }
          .pd-catbar-inner {
            justify-content: flex-start;
            gap: 4px;
          }
          .pd-catbtn {
            flex: 0 0 auto;
            min-width: 68px;
            height: 72px;
            border-radius: 12px;
            gap: 6px;
            padding: 8px 6px;
          }
          .pd-catbtn-icon { width: 22px !important; height: 22px !important; }
          .pd-catbtn-label { font-size: 9px !important; }

          /* Hide desktop sidebar, show mobile filter bar */
          .pd-sidebar { display: none; }
          .pd-mob-filterbar {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 14px;
          }

          /* Full-width single column grid */
          .pd-grid { grid-template-columns: 1fr; }

          .pd-card {
            padding: 16px 16px 20px;
            min-height: auto;
          }

          .pd-cta {
            flex-direction: column;
            border-radius: 18px;
            margin-top: 28px;
          }
          .pd-cta-text {
            flex: none;
            padding: 28px 20px;
          }
          .pd-cta-img { min-height: 160px; }
        }
      `}</style>

      <section className="pd-section">

        {/* ── Mobile Filter Drawer ── */}
        <AnimatePresence>
          {isMobile && drawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setDrawerOpen(false)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200 }}
              />
              <motion.div
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', background: '#f5f7fb', zIndex: 201, padding: '24px 20px', overflowY: 'auto' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#0a2f5e' }}>Filters</span>
                  <button onClick={() => setDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748b' }}>
                    <X size={20} />
                  </button>
                </div>
                <FilterPanel />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="pd-container">

          {/* ══ Category Bar ══ */}
          <div className="pd-catbar">
            <div className="pd-catbar-inner">
              {productCategories.map(cat => {
                const Icon = categoryIcons[cat.id] || Beaker;
                const sel = selectedCategory === cat.id;
                const name = categoryShortNames[cat.id] || cat.name.split(" ")[0];
                return (
                  <button
                    key={cat.id}
                    className="pd-catbtn"
                    onClick={() => { setSelectedCategory(cat.id); setFilter({ purity: "", stock: "" }); }}
                    style={{ background: sel ? '#053259' : 'transparent', boxShadow: sel ? '0 4px 16px rgba(5,50,89,0.18)' : 'none' }}
                  >
                    <Icon
                      strokeWidth={sel ? 2 : 1.5}
                      className="pd-catbtn-icon"
                      style={{ width: '36px', height: '36px', color: sel ? '#a3dc24' : '#334155' }}
                    />
                    <span
                      className="pd-catbtn-label"
                      style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.02em', textAlign: 'center', lineHeight: 1.3, color: sel ? '#a3dc24' : '#334155' }}
                    >
                      {name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ══ Mobile filter trigger bar ══ */}
          <div className="pd-mob-filterbar">
            <button
              onClick={() => setDrawerOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '9px 14px', fontSize: '12px', fontWeight: 700, color: '#3a5264', cursor: 'pointer' }}
            >
              <SlidersHorizontal size={14} />
              Filters
              {hasFilters && (
                <span style={{ background: '#053259', color: '#a3dc24', borderRadius: '999px', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 900 }}>!</span>
              )}
            </button>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </span>
            {hasFilters && (
              <button onClick={() => setFilter({ purity: "", stock: "" })}
                style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 700, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Clear
              </button>
            )}
          </div>

          {/* ══ Sidebar + Grid ══ */}
          <div className="pd-row">

            {/* Desktop sidebar */}
            <div className="pd-sidebar">
              <FilterPanel />
            </div>

            {/* Product grid */}
            <div className="pd-grid-wrap">
              <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#e2e8f0' }}>
                <div className="pd-grid">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => {
                      const isAvailable = product.id.charCodeAt(0) % 2 === 0;
                      return (
                        <Link to={`/products/${product.id}`} key={product.id} className="pd-card">
                          {/* Top row */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: '#2a558c', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'underline', textDecorationColor: 'rgba(42,85,140,0.4)', textUnderlineOffset: '3px' }}>
                              Technical Sheet
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: isAvailable ? '#5b9a27' : '#f59e0b' }} />
                              <span style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: isAvailable ? '#5b9a27' : '#d97706' }}>
                                {isAvailable ? "In Stock" : "Made to Order"}
                              </span>
                            </div>
                          </div>

                          {/* Molecule */}
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '160px', marginBottom: '8px' }}>
                            <Molecule3D chemicalFormula={product.chemicalFormula} />
                          </div>

                          {/* Name */}
                          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0a2558', marginBottom: '4px', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
                            {product.name.replace(/\s+\[.*\]/, "")}
                          </h3>
                          <div style={{ fontSize: '9.5px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>
                            FORMULA {product.chemicalFormula ? `- ${product.chemicalFormula}` : ""}
                          </div>

                          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', marginBottom: '12px' }} />

                          {/* Stats */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                            {[
                              { label: 'CAS NO.', value: product.casNumber || 'N/A' },
                              { label: 'PURITY', value: product.purity || 'N/A' },
                              { label: 'Mol. Wt.', value: `${(product.casNumber.length * 15.3).toFixed(2)} g/mol` },
                            ].map((stat, i) => (
                              <div key={i} style={{
                                display: 'flex', flexDirection: 'column', gap: '4px',
                                textAlign: i === 0 ? 'left' : i === 1 ? 'center' : 'right',
                                borderLeft: i > 0 ? '1px solid #e2e8f0' : 'none',
                                paddingLeft: i > 0 ? '8px' : '0',
                                paddingRight: i < 2 ? '8px' : '0',
                              }}>
                                <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</span>
                                <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', lineHeight: 1.35, wordBreak: 'break-word' }}>{stat.value}</span>
                              </div>
                            ))}
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div style={{ gridColumn: '1 / -1', padding: '60px 20px', textAlign: 'center', background: '#fff' }}>
                      <FlaskConical size={48} style={{ margin: '0 auto 16px', opacity: 0.2, color: '#0a2558' }} />
                      <p style={{ fontSize: '15px', color: '#94a3b8', fontWeight: 500 }}>No products found matching criteria</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ══ CTA Banner ══ */}
          <motion.div
            className="pd-cta"
            style={{ background: '#0a2f5e', overflow: 'hidden', position: 'relative', width: '100%' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="pd-cta-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
              <svg style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.07, pointerEvents: 'none' }} width="380" height="200" viewBox="0 0 380 200" fill="none">
                <path d="M0 200 C150 160 230 70 380 0" stroke="white" strokeWidth="1.5" />
                <path d="M0 240 C170 200 250 100 380 30" stroke="white" strokeWidth="1" opacity="0.5" />
              </svg>
              <span style={{ display: 'inline-block', background: '#5ba11c', color: '#fff', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.16em', padding: '4px 13px', borderRadius: '999px', marginBottom: '14px', width: 'fit-content' }}>
                Polymer Grade
              </span>
              <h2 style={{ fontSize: 'clamp(20px, 2.4vw, 34px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Need Custom Polymer Formulations?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.65, marginBottom: '20px' }}>
                Velora can design molecular weight distributions for bio-architectures and design custom chemical blends for specialised applications.
              </p>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#0a2f5e', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '11px 22px', borderRadius: '999px', border: 'none', cursor: 'pointer', width: 'fit-content' }}>
                Consult us Now
                <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="pd-cta-img" style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80"
                alt="Chemical laboratory"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', opacity: 0.85 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a2f5e 0%, transparent 35%)' }} />
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <Certifications hideCta />
      </section>
    </>
  );
}
