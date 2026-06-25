import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Molecule3D } from "../components/3d/Molecule3D";
import { productDatabase } from "../data/productsData";
import Certifications from "../components/common/certifications";

export default function ProductDetail() {
  const { id } = useParams();
  const product = productDatabase.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);
  }, [id]);

  if (!product) return <Navigate to="/products" />;

  const nameMatch = product.name.match(/(.*?)\s+\[(.*)\]/);
  const cleanName = nameMatch ? nameMatch[1].trim() : product.name;
  const tag = nameMatch ? nameMatch[2].trim() : "Industrial Chemical";

  const truncateStat = (v?: string) => {
    if (!v) return v;
    return v.replace(/\s+at\s+\d+\s*°C.*$/i, "").trim();
  };
  const isStatValid = (v?: string) =>
    v && v !== "—" && !v.toLowerCase().startsWith("n/a") && v.length <= 35;

  const statCandidates = [
    { label: "PURITY",   value: truncateStat(product.purity) },
    { label: "DENSITY",  value: truncateStat(product.density) },
    { label: "FLASH PT", value: truncateStat(product.flashPoint) },
    { label: "MELTING",  value: truncateStat(product.meltingPoint) },
    { label: "pH",       value: truncateStat(product.pH) },
  ].filter(p => isStatValid(p.value));
  const properties = statCandidates.slice(0, 5);

  const specs = [
    { param: "CAS Number",       value: product.casNumber },
    { param: "HS Code",          value: product.hsCode },
    { param: "Chemical Formula", value: product.chemicalFormula },
    { param: "Appearance",       value: product.appearance },
    { param: "Odour",            value: product.odour },
    { param: "Boiling Point",    value: product.boilingPoint },
    { param: "Flash Point",      value: product.flashPoint },
    { param: "Melting Point",    value: product.meltingPoint },
    { param: "Solubility",       value: product.solubility },
    { param: "pH",               value: product.pH },
    { param: "Packaging",        value: product.packaging },
  ].filter(s => s.value && s.value !== "" && s.value !== "—" && s.value.toLowerCase() !== "n/a");

  const applicationItems = product.applications
    .split(/\s*;\s*/)
    .flatMap(chunk =>
      chunk.includes("&") || chunk.split(",").length <= 2
        ? [chunk.trim()]
        : chunk.split(/\s*,\s*/).map(s => s.trim())
    )
    .filter(Boolean)
    .slice(0, 4);

  return (
    <>
      <style>{`
        /* ── ProductDetail responsive styles ── */
        .pdet-bg   { min-height: 100vh; width: 100%; background: #f5f7fb; }
        .pdet-wrap {
          max-width: 1440px;
          margin: 0 auto;
          padding: 104px 48px 72px;
        }

        /* Hero */
        .pdet-hero-inner {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          min-height: 340px;
        }
        .pdet-hero-text  { flex: 0 0 50%; padding: 40px 36px 40px 48px; display: flex; flex-direction: column; justify-content: center; }
        .pdet-hero-mol   { flex: 1; display: flex; align-items: center; justify-content: center; min-height: 340px; }
        .pdet-hero-mol-top { display: none; }   /* molecule on top — mobile only */

        /* Stats bar */
        .pdet-stats { display: flex; align-items: stretch; flex-wrap: nowrap; }
        .pdet-stat-cell {
          flex: 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: 22px 12px;
        }

        /* Overview + specs grid */
        .pdet-overview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        /* Applications grid */
        .pdet-apps-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* CTA */
        .pdet-cta-inner {
          display: flex;
          flex-direction: row;
          min-height: 260px;
        }
        .pdet-cta-text { flex: 0 0 55%; padding: 48px 48px 48px 52px; display: flex; flex-direction: column; justify-content: center; position: relative; z-index: 2; }
        .pdet-cta-img  { flex: 1; position: relative; overflow: hidden; }

        /* ── MOBILE ── */
        @media (max-width: 767px) {
          .pdet-wrap {
            padding: 80px 16px 40px;
          }

          /* Hero stacks — molecule on top */
          .pdet-hero-inner  { flex-direction: column; min-height: auto; }
          .pdet-hero-mol    { display: none; }
          .pdet-hero-mol-top {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
            background: #edf1f8;
          }
          .pdet-hero-text   { flex: none; padding: 20px 18px 24px; }

          /* Stats bar wraps 3 per row */
          .pdet-stats { flex-wrap: wrap; }
          .pdet-stat-cell {
            flex: 1 1 33%;
            padding: 14px 8px;
            border-right: none !important;
            border-bottom: 1px solid #cdd2de;
          }
          .pdet-stat-cell:nth-child(3n) { border-bottom: 1px solid #cdd2de; }
          .pdet-stat-cell:last-child { border-bottom: none; }

          /* Single column overview */
          .pdet-overview-grid { grid-template-columns: 1fr; gap: 20px; }

          /* Single column apps */
          .pdet-apps-grid { grid-template-columns: 1fr; }

          /* CTA stacks */
          .pdet-cta-inner { flex-direction: column; min-height: auto; }
          .pdet-cta-text  { flex: none; padding: 28px 20px; }
          .pdet-cta-img   { min-height: 180px; }
        }
      `}</style>

      <div className="pdet-bg">

        {/* Page wrapper */}
        <div className="pdet-wrap">

          {/* Back link */}
          <div style={{ marginBottom: '12px' }}>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#0a2f5e] transition-colors group"
            >
              <svg className="w-3 h-3 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Catalog
            </Link>
          </div>

          {/* ══ SECTION 1 · Hero ══ */}
          <motion.div
            style={{ borderRadius: '24px', overflow: 'hidden', marginBottom: '10px', background: '#edf1f8' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
          >
            {/* Molecule on TOP (mobile only) */}
            <div className="pdet-hero-mol-top">
              <Molecule3D chemicalFormula={product.chemicalFormula} />
            </div>

            <div className="pdet-hero-inner">
              {/* Text */}
              <div className="pdet-hero-text">
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span className="text-white text-[10px] font-extrabold uppercase tracking-[0.1em] rounded-full" style={{ background: '#5ba11c', padding: '5px 13px' }}>
                    {tag}
                  </span>
                  <span className="text-[#3a3a3a] text-[10px] font-extrabold uppercase tracking-[0.1em] rounded-full" style={{ border: '1.5px solid #c4c8d4', padding: '4px 13px' }}>
                    Industrial Chemical
                  </span>
                </div>

                <h1 className="font-extrabold text-[#0b2653] leading-[1.08] tracking-tight"
                  style={{ fontSize: 'clamp(26px, 3.5vw, 50px)', marginBottom: '10px' }}>
                  {cleanName}
                </h1>

                <p className="text-[#6b7a94] leading-relaxed" style={{ fontSize: '13px', marginBottom: '16px' }}>
                  {product.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '999px', border: '1px solid #c8cdd8', padding: '6px 12px', background: 'rgba(255,255,255,0.6)' }}>
                    <span className="text-[9px] font-bold text-[#9ca3af] uppercase tracking-widest">CAS NO</span>
                    <span className="text-[11px] font-extrabold text-[#0b2653]">{product.casNumber}</span>
                  </div>
                  {product.hsCode && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '999px', border: '1px solid #c8cdd8', padding: '6px 12px', background: 'rgba(255,255,255,0.6)' }}>
                      <span className="text-[9px] font-bold text-[#9ca3af] uppercase tracking-widest">HS CODE</span>
                      <span className="text-[11px] font-extrabold text-[#0b2653]">{product.hsCode}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', borderRadius: '999px', border: '1px solid #c8cdd8', padding: '6px 12px', background: 'rgba(255,255,255,0.6)' }}>
                    <span className="text-[9px] font-bold text-[#9ca3af] uppercase tracking-widest">GRADE</span>
                    <span className="text-[11px] font-extrabold text-[#0b2653]">Industrial</span>
                  </div>
                </div>
              </div>

              {/* Molecule — desktop right side */}
              <div className="pdet-hero-mol">
                <Molecule3D chemicalFormula={product.chemicalFormula} />
              </div>
            </div>
          </motion.div>

          {/* ══ SECTION 2 · Stats Bar ══ */}
          {properties.length > 0 && (
            <motion.div
              className="pdet-stats"
              style={{ borderRadius: '18px', marginBottom: '48px', background: '#edf1f8' }}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
            >
              {properties.map((prop, idx) => (
                <div
                  key={idx}
                  className="pdet-stat-cell"
                  style={{ borderRight: idx < properties.length - 1 ? '1px solid #cdd2de' : 'none' }}
                >
                  <span className="uppercase font-bold text-[#9ca3af]"
                    style={{ fontSize: '9px', letterSpacing: '0.12em', marginBottom: '5px', display: 'block' }}>
                    {prop.label}
                  </span>
                  <span className="font-black text-[#0b2653] leading-tight"
                    style={{ fontSize: prop.value && prop.value.length > 12 ? 'clamp(13px, 1.3vw, 17px)' : 'clamp(15px, 1.9vw, 24px)', whiteSpace: 'nowrap' }}>
                    {prop.value}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* ══ SECTION 3 · Overview + Specs ══ */}
          <motion.div
            className="pdet-overview-grid"
            style={{ marginBottom: '48px' }}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22 }}
          >
            {/* Overview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 style={{ fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 900, color: '#0a2f5e', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                Product Overview
              </h2>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.7, fontWeight: 500 }}>
                {product.applications}
              </p>
              <div style={{ borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f0f4fa', padding: '16px 18px' }}>
                <p style={{ fontSize: '9.5px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Storage Guidelines</p>
                <p style={{ color: '#475569', fontSize: '13px', lineHeight: 1.65 }}>{product.storage}</p>
              </div>
              <div style={{ borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', padding: '16px 18px' }}>
                <p style={{ fontSize: '9.5px', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>Packaging</p>
                <p style={{ color: '#334155', fontSize: '13px', lineHeight: 1.65 }}>{product.packaging}</p>
              </div>
            </div>

            {/* Tech Specs table */}
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #e8edf5', boxShadow: '0 8px 40px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ padding: '20px 20px 0' }}>
                <h3 style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', fontWeight: 800, color: '#0a2f5e', marginBottom: '16px' }}>
                  Technical Specifications
                </h3>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', textAlign: 'left', fontSize: '13px', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#c8d0da' }}>
                    <tr>
                      <th style={{ padding: '10px 16px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569' }}>Parameter</th>
                      <th style={{ padding: '10px 16px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', textAlign: 'right' }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specs.map((spec, i) => (
                      <tr key={i} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                        <td style={{ padding: '9px 16px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', whiteSpace: 'nowrap' }}>{spec.param}</td>
                        <td style={{ padding: '9px 16px', fontSize: '12px', textAlign: 'right', color: '#0a2f5e', fontWeight: 600 }}>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* ══ SECTION 4 · Key Applications ══ */}
          {applicationItems.length > 0 && (
            <motion.div
              style={{ marginBottom: '48px' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }}
            >
              <h2 style={{ fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 900, color: '#0a2f5e', textTransform: 'uppercase', letterSpacing: '-0.02em', marginBottom: '20px' }}>
                Key Applications
              </h2>
              <div className="pdet-apps-grid">
                {applicationItems.map((app, idx) => (
                  <motion.div
                    key={idx}
                    style={{ background: '#dce8f5', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.07 * idx }} viewport={{ once: true }}
                  >
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg style={{ width: '15px', height: '15px', color: '#0a2f5e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h4 style={{ fontSize: '12px', fontWeight: 900, color: '#0a2f5e', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.35 }}>{app}</h4>
                    <p style={{ fontSize: '11.5px', color: '#4a6080', lineHeight: 1.6, fontWeight: 500 }}>
                      Industrial-grade supply with verified quality standards and full traceability for {app.toLowerCase()} processes.
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ══ SECTION 5 · CTA Banner ══ */}
          <motion.div
            style={{ borderRadius: '28px', background: '#0a2f5e', overflow: 'hidden', position: 'relative', width: '100%' }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          >
            <div className="pdet-cta-inner">
              <div className="pdet-cta-text">
                <svg style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.08, pointerEvents: 'none' }} width="400" height="220" viewBox="0 0 400 220" fill="none">
                  <path d="M0 220 C160 180 240 80 400 0" stroke="white" strokeWidth="1.5" />
                  <path d="M0 260 C180 220 260 110 400 30" stroke="white" strokeWidth="1" opacity="0.5" />
                </svg>
                <span style={{ display: 'inline-block', background: '#5ba11c', color: '#fff', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.16em', padding: '5px 14px', borderRadius: '999px', marginBottom: '16px', width: 'fit-content' }}>
                  {tag}
                </span>
                <h2 style={{ fontSize: 'clamp(20px, 2.8vw, 38px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '12px' }}>
                  Need Custom Chemical Formulations?
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.65, marginBottom: '24px' }}>
                  Velora can design custom chemical blends and specialized applications to meet your exact industrial requirements with full traceability.
                </p>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fff', color: '#0a2f5e', fontWeight: 900, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '12px 24px', borderRadius: '999px', border: 'none', cursor: 'pointer', width: 'fit-content' }}>
                  Consult us Now
                  <svg style={{ width: '13px', height: '13px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="pdet-cta-img">
                <img
                  src="/images/cta_laboratory.webp"
                  alt="Chemical laboratory formulation"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', opacity: 0.85 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a2f5e 0%, transparent 35%)' }} />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Certifications */}
        <Certifications hideCta />

      </div>
    </>
  );
}
