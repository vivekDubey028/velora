import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coolChemImg from "../../assets/cool_chem_product.webp";

const ArrowUpRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#d1a847" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDownRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 7L17 17M17 17H7M17 17V7" stroke="#d1a847" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface ProductCategory {
  name: string;
  description: string;
}

const productCategories: ProductCategory[] = [
  {
    name: "Inorganic Acids & Salts",
    description:
      "High-purity Nitric Acid, Sulphuric Acid, Hydrochloric Acid, Ferric Aluminium Sulphate, and more. Ideal for water treatment, fertilisers, and industrial processing. Supplied with complete documentation for immediate use.",
  },
  {
    name: "Specialty Intermediates",
    description:
      "Advanced intermediates for pharmaceutical, agrochemical, and specialty chemical manufacturing. Custom synthesis available with full regulatory support.",
  },
  {
    name: "Industrial Chemicals & Solvents",
    description:
      "A comprehensive range of industrial-grade chemicals and solvents for manufacturing, cleaning, and processing applications across diverse sectors.",
  },
  {
    name: "Custom Blends & Formulations",
    description:
      "Tailored chemical blends and formulations designed to meet your exact specifications. Our R&D team works closely with you to develop optimal solutions.",
  },
];

const tabs = ["BY PRODUCTS", "SOLUTIONS BY INDUSTRY"] as const;

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

export default function Products() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("BY PRODUCTS");
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <section style={{ width: "100%", background: "#fff", paddingTop: "5rem", paddingBottom: "6rem" }}>

      {/* ── Centered wrapper ── */}
      <div style={outerWrap}>

        {/* Heading */}
        <motion.h2 className="font-['Outfit']"
          style={{
            textAlign: "center",
            color: "var(--brand)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 600,
            lineHeight: 1.3,
            marginBottom: "3.5rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Powering Industries with Specialty Chemicals that{" "}
          <span className="hidden sm:inline"><br /></span>
          Innovate, Scale, and Sustain
        </motion.h2>

        {/* Card block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
        >
          {/* Tab strip */}
          <div style={{ display: "flex", position: "relative", zIndex: 2, flexWrap: "wrap" }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    position: "relative",
                    top: "1px",
                    padding: "0.625rem 1rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    color: isActive ? "var(--brand)" : "var(--text-secondary)",
                    background: isActive ? "#f4f7fb" : "transparent",
                    border: isActive ? "1px solid #dce4f0" : "1px solid transparent",
                    borderBottom: isActive ? "1px solid #f4f7fb" : "1px solid transparent",
                    borderRadius: "1rem 1rem 0 0",
                    outline: "none",
                    transition: "color 0.25s ease, background 0.25s ease, border-color 0.25s ease",
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Card body */}
          <div style={{

            border: "1px solid #dce4f0",
            borderRadius: "0 2rem 2rem 2rem",
            overflow: "hidden",
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  padding: "1.5rem",
                }}
                className="md:!flex-row md:!gap-12 md:!p-12"
              >

                {/* Left: Accordion */}
                <div style={{ flex: 1, minWidth: "200px" }}>
                  {productCategories.map((category, index) => {
                    const isExpanded = expandedIndex === index;
                    return (
                      <div key={category.name}>
                        <button
                          onClick={() => handleToggle(index)}
                          style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            textAlign: "left",
                            padding: "0.875rem 0",
                            borderBottom: "1px solid #dce4f0",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                        >
                          <span style={{
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "var(--brand)",
                            textDecoration: isExpanded ? "underline" : "none",
                            textUnderlineOffset: "4px",
                          }}>
                            {category.name}
                          </span>
                          <span style={{ flexShrink: 0, marginLeft: "0.25rem" }}>
                            {isExpanded ? <ArrowDownRight /> : <ArrowUpRight />}
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                height: { duration: 0.35, ease: "easeInOut" },
                                opacity: { duration: 0.25 },
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <p style={{
                                fontSize: "0.8125rem",
                                lineHeight: 1.75,
                                color: "#4a5568",
                                padding: "0.75rem 1rem 0.75rem 0",
                                maxWidth: "420px",
                              }}>
                                {category.description}
                              </p>
                              <a
                                href="#"
                                style={{
                                  display: "inline-block",
                                  fontSize: "0.8125rem",
                                  fontWeight: 600,
                                  color: "#8cc63f",
                                  paddingBottom: "0.75rem",
                                  textDecoration: "none",
                                }}
                              >
                                View More
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Right: Product Image */}
                <div className="w-full md:w-[320px] shrink-0 flex items-center justify-center">
                  <motion.div
                    style={{ width: "100%" }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={coolChemImg}
                      alt="Cool Chem - Specialty Chemical Products"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </motion.div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
