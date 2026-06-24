import { motion } from "framer-motion";

const insightsData = [
  {
    date: "Apr 12, 2025",
    author: "Velora Research Team",
    title: "Green Chemistry: How Bio-Based Feedstocks Are Reshaping Industrial Supply Chains",
    description: "The global chemical industry is accelerating its shift to sustainable feedstocks. We explore what this means for manufacturers across Asia and Europe in 2025.",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
  },
  {
    date: "Mar 28, 2025",
    author: "Export Intelligence Desk",
    title: "India's Specialty Chemical Exports Cross $30 Billion: What It Means for Global Buyers",
    description: "India has emerged as the world's fastest-growing chemical export hub. Velora Chemicals is positioned at the heart of this growth, serving buyers in 30+ countries.",
    image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=600&q=80",
  },
  {
    date: "Feb 15, 2025",
    author: "Quality & Compliance Team",
    title: "EcoVadis Gold to ISO 9001: Inside Velora's Quality & Sustainability Certifications",
    description: "Achieving EcoVadis Gold places Velora in the top 5% of companies globally for ESG performance. Here's what our certification journey means for your supply chain.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=600&q=80",
  },
];

// ─── Inline style constants ─────────────────────────────────────────────────
const outerWrap: React.CSSProperties = {
  width: "100%",
  maxWidth: "1440px",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
  paddingRight: "clamp(1.5rem, 5vw, 5rem)",
  boxSizing: "border-box",
};

export default function Insights() {
  return (
    <section style={{ width: "100%", background: "#fff", paddingTop: "4rem", paddingBottom: "5rem" }}>

      {/* ── Centered wrapper ── */}
      <div style={outerWrap}>

        {/* Heading */}
        <motion.h2 className="font-[Outfit]"
          style={{
            textAlign: "center",
            color: "var(--brand)",
            fontSize: "clamp(1.4rem, 2.5vw, 2.25rem)",
            fontWeight: 600,
            marginBottom: "3rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Insights and Announcements
        </motion.h2>

        {/* Mobile: horizontal scroll strip | Desktop: 3-col grid */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {insightsData.map((insight, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[78vw] max-w-[300px]"
              style={{
                borderRadius: '1.25rem',
                border: '1px solid #eaedf2',
                background: '#fff',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ aspectRatio: '4/3', width: '100%', overflow: 'hidden', background: '#f0f4f8', flexShrink: 0 }}>
                <img src={insight.image} alt={insight.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontWeight: 700, color: 'var(--brand)', fontSize: '0.875rem', lineHeight: 1.4, marginBottom: '0.5rem' }}>{insight.title}</h3>
                <p style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>{insight.description}</p>
                <button style={{ padding: '0.4rem 1.25rem', borderRadius: '999px', border: '1px solid #cbd5e1', fontSize: '0.7rem', fontWeight: 700, color: 'var(--brand)', background: 'transparent', cursor: 'pointer' }}>Read More</button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop 3-col grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {insightsData.map((insight, i) => (
            <motion.div
              key={i}
              style={{
                borderRadius: "1.25rem",
                border: "1px solid #eaedf2",
                background: "#fff",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                transition: "box-shadow 0.3s",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
            >
              {/* Image */}
              <div style={{ aspectRatio: "4/3", width: "100%", overflow: "hidden", background: "#f0f4f8", flexShrink: 0 }}>
                <img
                  src={insight.image}
                  alt={insight.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                />
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>

                {/* Meta */}
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a0aabf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#d1a847" }}>{insight.date}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#a0aabf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "#d1a847" }}>{insight.author}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 style={{ fontWeight: 700, color: "var(--brand)", fontSize: "1rem", lineHeight: 1.4, marginBottom: "0.75rem" }}>
                  {insight.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.65, marginBottom: "1.25rem", flex: 1 }}>
                  {insight.description}
                </p>

                {/* Button */}
                <div>
                  <button style={{
                    padding: "0.5rem 1.5rem",
                    borderRadius: "999px",
                    border: "1px solid #cbd5e1",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--brand)",
                    background: "transparent",
                    cursor: "pointer",
                    transition: "background 0.2s, border-color 0.2s",
                  }}>
                    Read More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vertical divider */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "4rem" }}>
          <motion.div
            style={{ width: "1px", background: "#cbd5e1", transformOrigin: "top" }}
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "7rem", opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          />
        </div>

      </div>
    </section>
  );
}
