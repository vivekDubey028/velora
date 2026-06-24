import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero1.webp';
import hero2 from '../../assets/hero2.webp';
import hero3 from '../../assets/hero3.webp';

const images = [heroImg, hero2, hero3];

const ProductHero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(Math.max(scrolled / (vh * 0.5), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    if (scrollProgress >= 1) {
      intervalId = setInterval(() => {
        setBgIndex((prev) => (prev + 1) % images.length);
      }, 5000);
    } else {
      setBgIndex(0);
    }
    return () => clearInterval(intervalId);
  }, [scrollProgress]);

  // Same morph math as PreHero / AboutHero
  const insetH = scrollProgress * 32;
  const frameTop = scrollProgress * 64;
  const frameHeight = `calc(100vh - ${frameTop + scrollProgress * 16}px)`;
  const borderRadius = scrollProgress * 20;

  const preheroOpacity = Math.max(1 - scrollProgress * 3, 0);
  const heroOpacity = Math.max((scrollProgress - 0.5) * 2, 0);

  return (
    <section className="relative w-full h-[200vh] bg-white">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-white z-0">

        {/* Morphing frame */}
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            left: `${insetH / 2}px`,
            right: `${insetH / 2}px`,
            top: `${frameTop}px`,
            height: frameHeight,
            borderRadius: `${borderRadius}px`,
            boxShadow: scrollProgress > 0.05 ? '0 20px 50px rgba(0,0,0,0.18)' : 'none',
          }}
        >
          {/* Background Images */}
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product catalog ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out ${bgIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
            />
          ))}

          {/* Gradient overlay — left-heavy like the screenshot */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-navy)]/90 via-[var(--bg-navy)]/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-navy)]/60 via-transparent to-transparent z-10 pointer-events-none" />

          {/* PRE-HERO: centered italic tagline */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity: preheroOpacity, transform: `translateY(${scrollProgress * 50}px)` }}
          >
            <h2 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-[4rem] font-[outfit] drop-shadow-2xl text-center px-4">
              Chemistry, precisely sourced.
            </h2>
            <div className="absolute bottom-10 hidden sm:flex flex-col items-center opacity-80 animate-bounce-slow">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 -mb-4"><path d="M7 13L12 18L17 13" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M7 13L12 18L17 13" /></svg>
              <span className="text-white text-sm font-medium tracking-widest mt-2 uppercase">Explore More</span>
            </div>
          </div>

          {/* HERO CONTENT — bottom-left, matches screenshot */}
          <div
            className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 md:left-16 lg:left-20 right-4 sm:right-auto z-20 flex flex-col pointer-events-none max-w-2xl"
            style={{ opacity: heroOpacity, transform: `translateY(${(1 - heroOpacity) * 20}px)` }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-1 text-white/60 text-xs md:text-sm font-medium tracking-wide mb-1">
              <Link to="/" className="hover:text-white transition-colors  font-dm-sans no-underline text-white/60">Home</Link>
              <span>›</span>
              <span className="text-white font-dm-sans ">Products</span>
            </div>

            {/* Tagline */}
            <div className="flex items-center gap-1 mb-4">
              <span className="text-accent font-bold text-base md:text-lg tracking-widest font-dm-sans">
                Chemical Ledger
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-white text-3xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.05] tracking-wide uppercase font-['Outfit'] drop-shadow-lg mb-4">
              Product Catalog
            </h1>

            {/* Description */}
            <p className="text-white text-xs md:text-sm font-dm-sans leading-relaxed max-w-md font-liberationsans">
              Access our comprehensive database of high-purity industrial chemicals. Every batch is validated through the Technical Ledger protocol for absolute precision in Engineering Applications.
            </p>
          </div>

          {/* Slide indicators (right side) */}
          <div
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-3 pointer-events-none"
            style={{ opacity: heroOpacity }}
          >
            <div className="pointer-events-auto flex flex-col gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setBgIndex(index)}
                  className={`w-1 transition-all duration-300 rounded-full ${bgIndex === index ? 'h-12 bg-[var(--accent)]' : 'h-8 bg-white/40 hover:bg-white/70'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductHero;
