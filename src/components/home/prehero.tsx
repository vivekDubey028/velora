import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/preherovelora.webp';
import hero1 from '../../assets/hero1.webp';
import hero2 from '../../assets/hero2.webp';

const images = [heroImg, hero1, hero2];

const PreHero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const vh = window.innerHeight;
      // Calculate progress from 0 to 1 over half the window height
      const progress = Math.min(Math.max(scrolled / (vh * 0.5), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    // Auto cycle images only after frame animation completes
    if (scrollProgress >= 1) {
      intervalId = setInterval(() => {
        setBgIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    } else {
      setBgIndex(0); // Reset to first image if scrolled back up
    }
    return () => clearInterval(intervalId);
  }, [scrollProgress]);

  // Interpolate values based on scroll progress
  // Pic 1: full screen (0 inset). Pic 2: 16px inset on each side, 64px top, 16px bottom, 24px radius
  const insetH = scrollProgress * 32;   // total horizontal reduction (left+right)
  const frameTop = scrollProgress * 64; // distance from top (navbar height)
  const frameHeight = `calc(100vh - ${frameTop + scrollProgress * 16}px)`; // top + small bottom gap
  const borderRadius = scrollProgress * 20; // 0px → 20px

  // Opacity controls for cross-fading text
  const preheroOpacity = Math.max(1 - scrollProgress * 3, 0);
  const heroOpacity = Math.max((scrollProgress - 0.5) * 2, 0);

  return (
    <section className="relative w-full h-[200vh] bg-white">
      {/* Sticky container — no flex centering so frame can be truly full-width */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-white z-0">

        {/* The Frame element that morphs from full-screen → framed card */}
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            left: `${insetH / 2}px`,
            right: `${insetH / 2}px`,
            top: `${frameTop}px`,
            height: frameHeight,
            borderRadius: `${borderRadius}px`,
            boxShadow: scrollProgress > 0.05 ? '0 20px 50px rgba(0,0,0,0.15)' : 'none',
          }}
        >
          {/* Background Images */}
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Chemical Solutions ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-in-out ${bgIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
            />
          ))}

          {/* Darkening Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-navy)]/90 via-[var(--bg-navy-mid)]/60 to-transparent z-10 pointer-events-none"></div>

          {/* PREHERO CONTENT (Centered) */}
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity: preheroOpacity, transform: `translateY(${scrollProgress * 50}px)` }}
          >
            <h2 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-[4rem] font-['Outfit'] tracking-wide drop-shadow-2xl text-center px-4">
              Chemistry that connects the world
            </h2>
            <div className="absolute bottom-10 hidden sm:flex flex-col items-center opacity-80 animate-bounce-slow">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 -mb-4"><path d="M7 13L12 18L17 13" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M7 13L12 18L17 13" /></svg>
              <span className="text-white text-sm font-medium tracking-widest mt-2 uppercase">Explore More</span>
            </div>
          </div>

          {/* HERO CONTENT — all anchored bottom-left as one block */}
          <div
            className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 md:left-14 lg:left-16 right-4 sm:right-auto z-20 flex flex-col gap-4 sm:gap-5 pointer-events-none max-w-2xl"
            style={{ opacity: heroOpacity, transform: `translateY(${(1 - heroOpacity) * 20}px)` }}
          >
            {/* Badge + Heading + Description */}
            <div className="pointer-events-auto">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
                <span className="text-white text-xs md:text-sm font-dm-sans tracking-wide">Industrial &amp; Specialty Chemical Supply</span>
              </div>
              <h1 className="text-white text-3xl md:text-5xl lg:text-[2.9rem] font-['Outfit'] leading-tight mb-4">
                Precision Chemical Solutions for Modern Industries
              </h1>
              <p className="text-white text-xs md:text-sm lg:text-base leading-relaxed font-dm-sans">
                With strong quality controls and responsible sourcing, we ensure consistent product performance. Our focus is on supporting industries with dependable supply and long-term partnerships.
              </p>
            </div>
            {/* CTA Button */}
            <Link to="/products" className="group pointer-events-auto self-start flex items-center justify-start bg-white hover:bg-[var(--accent)] font-roboto-mono text-[var(--brand)] hover:text-white py-1.5 pl-1.5 pr-6 w-[260px] md:w-[200px] rounded-full transition-all duration-500 hover:scale-105 shadow-lg gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)] group-hover:bg-transparent flex items-center justify-center text-white shrink-0 transition-transform duration-500 group-hover:translate-x-[215px] md:group-hover:translate-x-[155px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
              <span className="font-semibold text-sm whitespace-nowrap transition-all duration-500 group-hover:opacity-0 group-hover:-translate-x-4">Explore Products</span>
            </Link>
          </div>


          {/* Pagination Indicators (Right side) fades in exactly like Hero content */}
          <div
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col gap-3 pointer-events-none"
            style={{ opacity: heroOpacity }}
          >
            <div className="pointer-events-auto flex flex-col gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setBgIndex(index)}
                  className={`w-1 transition-all duration-300 rounded-full ${bgIndex === index ? 'h-12 bg-[var(--accent)]' : 'h-8 bg-white/40 hover:bg-white/70'}`}
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

export default PreHero;
