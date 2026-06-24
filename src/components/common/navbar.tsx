import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import arrowImg from '../../assets/Group 1 2.webp';

// ─── Types ────────────────────────────────────────────────────────────────────
interface MegaGroup {
  heading: string;
  links: Array<{ label: string; href: string }>;
}
interface NavLink {
  label: string;
  href?: string;
  subLinks?: Array<{ label: string; href: string }>;
  mega?: { groups: MegaGroup[]; showImagePanel?: boolean };
}
interface NavbarProps {
  theme?: 'light' | 'dark';
  isVisible?: boolean;
  isAtTop?: boolean;
}

// ─── Mobile nav data ──────────────────────────────────────────────────────────
const ALL_MOBILE_NAV = [
  {
    num: '01',
    label: 'Company',
    href: null,
    sub: [
      { label: 'About', href: '/about' },
      { label: 'Logistics', href: '/logistics' },
      { label: 'Export', href: '/export' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  { num: '02', label: 'Products & Services', href: '/products', sub: null },
  { num: '03', label: 'Sustainability', href: '/sustainability', sub: null },
  { num: '04', label: 'Careers', href: '/#careers', sub: null },
  { num: '05', label: 'Resources', href: '/#resources', sub: null },
];

// ─── Mobile overlay (portal) ──────────────────────────────────────────────────
interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Reset expansion on close
  useEffect(() => { if (!open) setExpandedIdx(null); }, [open]);

  const overlay = (
    <AnimatePresence>
      {open && (
        <>
          {/* Dark backdrop */}
          <motion.div
            key="mob-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 99998,
              background: 'rgba(0,0,0,0.5)',
            }}
          />

          {/* Slide-in panel */}
          <motion.div
            key="mob-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '85%', maxWidth: '360px',
              zIndex: 99999,
              background: '#051125',
              display: 'flex', flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Top accent line */}
            <div style={{
              height: '2px',
              background: 'linear-gradient(90deg, #75C834 0%, transparent 100%)',
              flexShrink: 0,
            }} />

            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px 16px',
              borderBottom: '1px solid rgba(117,200,52,0.12)',
              flexShrink: 0,
            }}>
              <Link to="/" onClick={onClose} style={{ textDecoration: 'none', position: 'relative' }}>
                <span style={{
                  fontSize: '1.25rem', fontWeight: 700,
                  fontFamily: "'Montserrat', sans-serif",
                  color: '#fff', letterSpacing: '-0.02em',
                }}>
                  Velora
                </span>
                <img
                  src={arrowImg} alt=""
                  style={{
                    position: 'absolute', top: '-7px', right: '-18px',
                    width: '18px', height: '18px', objectFit: 'contain', opacity: 0.7,
                  }}
                />
              </Link>

              <button
                onClick={onClose}
                aria-label="Close menu"
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'transparent', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width="14" height="14">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ flex: 1, padding: '8px 0' }}>
              {ALL_MOBILE_NAV.map((item, idx) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderBottom: '1px solid rgba(117,200,52,0.08)' }}
                >
                  {/* Main row */}
                  {item.sub ? (
                    // Accordion trigger
                    <button
                      onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '18px 24px',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                        <span style={{
                          fontSize: '10px', fontFamily: "'Roboto Mono', monospace",
                          color: '#75C834', letterSpacing: '0.1em', lineHeight: 1,
                        }}>
                          {item.num}
                        </span>
                        <span style={{
                          fontSize: '1.25rem', fontFamily: "'Outfit', sans-serif",
                          fontWeight: 300, color: expandedIdx === idx ? '#fff' : 'rgba(255,255,255,0.65)',
                          letterSpacing: '-0.01em', lineHeight: 1.2,
                          transition: 'color 0.2s',
                        }}>
                          {item.label}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedIdx === idx ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          width: '24px', height: '24px', borderRadius: '50%',
                          border: '1px solid rgba(255,255,255,0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" width="10" height="10">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </motion.div>
                    </button>
                  ) : (
                    // Direct link
                    <Link
                      to={item.href!}
                      onClick={onClose}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '18px 24px', textDecoration: 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
                        <span style={{
                          fontSize: '10px', fontFamily: "'Roboto Mono', monospace",
                          color: '#e43d12', letterSpacing: '0.1em', lineHeight: 1,
                        }}>
                          {item.num}
                        </span>
                        <span style={{
                          fontSize: '1.25rem', fontFamily: "'Outfit', sans-serif",
                          fontWeight: 300, color: 'rgba(255,255,255,0.65)',
                          letterSpacing: '-0.01em', lineHeight: 1.2,
                        }}>
                          {item.label}
                        </span>
                      </div>
                      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" width="14" height="14">
                        <path strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    </Link>
                  )}

                  {/* Sub-links accordion */}
                  <AnimatePresence>
                    {item.sub && expandedIdx === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 24px 14px 24px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {item.sub.map((sub, si) => (
                            <motion.div
                              key={sub.label}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.04 * si, duration: 0.25 }}
                            >
                              <Link
                                to={sub.href}
                                onClick={onClose}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '10px',
                                  padding: '8px 0', textDecoration: 'none',
                                }}
                              >
                                <div style={{ width: '5px', height: '1px', background: '#75C834', opacity: 0.6, flexShrink: 0 }} />
                                <span style={{
                                  fontSize: '0.85rem', fontFamily: "'Outfit', sans-serif",
                                  fontWeight: 400, color: 'rgba(255,255,255,0.38)',
                                  letterSpacing: '0.01em',
                                }}>
                                  {sub.label}
                                </span>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </nav>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              style={{
                padding: '16px 24px',
                borderTop: '1px solid rgba(117,200,52,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <p style={{
                fontSize: '9px', fontFamily: "'Roboto Mono', monospace",
                color: 'rgba(117,200,52,0.35)', textTransform: 'uppercase',
                letterSpacing: '0.2em', margin: 0,
              }}>
                © 2026 Velora
              </p>
              <Link
                to="/contact"
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: '#75C834', color: '#051125',
                  padding: '8px 16px', borderRadius: '100px',
                  fontSize: '9px', fontFamily: "'Roboto Mono', monospace",
                  textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Get in Touch
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="10" height="10">
                  <path strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(overlay, document.body);
};

// ─── Main Navbar ──────────────────────────────────────────────────────────────
const Navbar: React.FC<NavbarProps> = ({ theme = 'light', isVisible = true, isAtTop = true }) => {
  const isDark = theme === 'dark';
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const links: NavLink[] = [
    {
      label: 'Company',
      href: '#',
      mega: {
        groups: [
          {
            heading: 'Know Velora',
            links: [
              { label: 'About', href: '/about' },
              { label: 'Logistics', href: '/logistics' },
              { label: 'Export', href: '/export' },
              { label: 'Sustainability', href: '/sustainability' },
              { label: 'Contact Us', href: '/contact' },
            ],
          },
        ],
        showImagePanel: true,
      },
      subLinks: [
        { label: 'About', href: '/about' },
        { label: 'Logistics', href: '/logistics' },
        { label: 'Export', href: '/export' },
        { label: 'Sustainability', href: '/sustainability' },
      ],
    },
    { href: '/products', label: 'Products & Services' },
    { href: '/sustainability', label: 'Sustainability' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 flex justify-center w-full z-[9999] transition-all duration-500 ease-in-out ${
          isAtTop
            ? 'bg-transparent backdrop-blur-none'
            : isDark
              ? 'bg-[#111111]/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none'
              : 'bg-white/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none'
        } ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center w-full max-w-[1440px] px-5 md:px-16 lg:px-20 py-2 md:py-3">

          {/* Logo */}
          <Link to="/" className="navbar-logo relative group no-underline md:-ml-8 lg:-ml-12">
            <h1 className={`text-2xl md:text-3xl font-bold tracking-tight m-0 font-['Montserrat'] transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-[var(--brand)]'
            }`}>
              Velora
            </h1>
            <img
              src={arrowImg}
              alt="Arrow"
              className="absolute -top-[10px] -right-[24px] w-[28px] h-[28px] object-contain z-10 transition-transform duration-300 group-hover:rotate-12"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex px-8 py-3 transition-all duration-300 bg-transparent">
            <ul className="flex list-none gap-8 m-0 p-0 font-roboto-mono relative">
              {links.map((link) => (
                <li
                  key={link.label}
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.mega ? (
                    <div className="relative py-2">
                      <button className={`flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-sm font-semibold transition-colors duration-300 ${
                        isDark ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-[var(--brand)]'
                      }`}>
                        {link.label}
                        <svg className={`w-3.5 h-3.5 transition-transform duration-500 ${hoveredLink === link.label ? 'rotate-180' : ''}`}
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <div className="absolute top-full left-0 w-full h-5" />

                      <div className={`absolute top-[calc(100%+8px)] left-0 transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] z-[10000] ${
                        hoveredLink === link.label
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}>
                        <div className="bg-white border border-gray-100 rounded-[20px] shadow-[0_8px_48px_rgba(0,0,0,0.10)]"
                          style={{ padding: '28px 32px', minWidth: '480px' }}>
                          <div className="flex gap-8">
                            <div className="flex flex-col gap-8">
                              {link.mega.groups.map((group) => (
                                <div key={group.heading}>
                                  <div className="flex items-center gap-2 mb-5">
                                    <span className="text-[13px] font-semibold font-roboto-mono tracking-wide"
                                      style={{ color: 'var(--brand)' }}>{group.heading}</span>
                                    <span className="text-gray-300 text-sm font-light leading-none select-none mt-px">+</span>
                                  </div>
                                  <div className="flex flex-col" style={{ gap: '14px' }}>
                                    {group.links.map((sub) => (
                                      <Link key={sub.label} to={sub.href} className="flex items-center gap-3 no-underline group/sub">
                                        <span className="text-sm font-light leading-none select-none" style={{ color: '#ccc', letterSpacing: '-0.5px' }}>—</span>
                                        <span className="text-sm font-roboto-mono transition-opacity duration-200 group-hover/sub:opacity-70"
                                          style={{ color: 'var(--accent)' }}>{sub.label}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            {link.mega.showImagePanel && (
                              <div className="flex-1 rounded-[14px]"
                                style={{ minWidth: '180px', minHeight: '200px', background: '#f3f4f6' }} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link to={link.href!} className={`no-underline text-sm font-semibold transition-colors duration-300 ${
                      isDark ? 'text-gray-200 hover:text-white' : 'text-gray-600 hover:text-[var(--brand)]'
                    }`}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Search + Hamburger */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              className="bg-transparent border-none cursor-pointer p-2 group"
              aria-label="Search"
              onClick={() => { setSearchOpen((o) => !o); setTimeout(() => searchInputRef.current?.focus(), 50); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
                className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${
                  isDark ? 'text-white opacity-80 group-hover:opacity-100' : 'text-[var(--brand)] opacity-60 group-hover:opacity-100'
                }`}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden bg-transparent border-none cursor-pointer p-2"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <div className="flex flex-col gap-[5px] w-6">
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`block w-full h-[1.5px] rounded-full origin-center ${isDark ? 'bg-white' : 'bg-[var(--brand)]'}`}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`block w-3.5 h-[1.5px] rounded-full ${isDark ? 'bg-white' : 'bg-[var(--brand)]'}`}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`block w-full h-[1.5px] rounded-full origin-center ${isDark ? 'bg-white' : 'bg-[var(--brand)]'}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Search overlay */}
        <div className={`absolute top-full left-0 right-0 transition-all duration-[350ms] ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${
          searchOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
        }`} style={{ zIndex: 9998 }}>
          <div className="mx-4 md:mx-16 lg:mx-20 mt-2 mb-3">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-5 py-3.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 shrink-0"
                style={{ color: 'var(--accent)' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search Velora..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-roboto-mono placeholder-gray-400"
                style={{ color: 'var(--brand)' }}
                onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
              />
              <button onClick={() => setSearchOpen(false)}
                className="bg-transparent border-none cursor-pointer p-1 rounded-lg transition-colors duration-200 hover:bg-gray-100"
                aria-label="Close search">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" className="w-4 h-4 text-gray-400">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu portal */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default Navbar;
