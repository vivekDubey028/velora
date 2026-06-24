import React, { useState, useEffect } from 'react';
import Navbar from '../common/navbar';
import heroImg from '../../assets/preherovelora.webp';
import hero1 from '../../assets/hero1.webp';
import hero2 from '../../assets/hero2.webp';
import hero3 from '../../assets/hero3.webp'

const images = [heroImg, hero1, hero2, hero3];

const Hero: React.FC = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    // Auto cycle through images every 5 seconds
    const intervalId = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col items-center pb-8">
      {/* Light Theme Navbar at the top */}
      <div className="w-full">
        <Navbar theme="light" />
      </div>

      {/* Hero Frame */}
      <div className="relative w-[calc(100%-24px)] md:w-[calc(100%-80px)] h-[calc(100svh-80px)] md:h-[calc(100vh-120px)] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-[var(--bg-navy-mid)] group">

        {/* Background Images */}
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Chemical Solutions ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${bgIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
          />
        ))}

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-navy)]/90 via-[var(--bg-navy-mid)]/60 to-transparent z-10 pointer-events-none"></div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end md:justify-center pb-10 md:pb-0 pointer-events-none">
          <div className="w-full max-w-[1440px] px-6 md:px-16 lg:px-20 mx-auto pointer-events-auto">
            <div className="max-w-6xl">

              {/* Tagline */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
                <span className="text-white text-sm md:text-base font-medium font-dm-sans tracking-wide">
                  Industrial & Specialty Chemical Supply
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-['Outfit'] leading-tight mb-6">
                Precision Chemical Solutions for Modern Industries
              </h1>

              {/* Description Paragraph */}
              <p className="text-gray-300 text-[11px] md:text-base lg:text-lg max-w-[260px] md:max-w-3xl mb-6 md:mb-10 leading-relaxed font-dm-sans">
                With strong quality controls and responsible sourcing, we ensure consistent product performance.
              </p>

              {/* CTA Button */}
              <button className="flex items-center gap-2 md:gap-3 bg-white text-[var(--brand)] font-semibold py-1.5 md:py-2 px-3 md:px-4 rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg">
                <span className="pl-2 md:pl-4 text-xs md:text-base">Explore Products</span>
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 md:w-4 md:h-4">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

            </div>
          </div>
        </div>

        {/* Pagination/Slider Indicators (Right Side) */}
        <div className="absolute right-3 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2 md:gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setBgIndex(index)}
              className={`w-1 transition-all duration-300 rounded-full ${bgIndex === index
                ? 'h-8 md:h-12 bg-[var(--accent)]'
                : 'h-4 md:h-8 bg-white/40 hover:bg-white/70'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
