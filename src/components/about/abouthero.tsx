import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import aboutHeroImg from '../../assets/about_hero_chemistry_1775711291474.webp';

const AboutHero: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

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

    // Interpolate values based on scroll progress (matching PreHero logic)
    const insetH = scrollProgress * 32;   // total horizontal reduction (left+right)
    const frameTop = scrollProgress * 64; // distance from top (navbar space)
    const frameHeight = `calc(100vh - ${frameTop + scrollProgress * 16}px)`; // top + bottom gap
    const borderRadius = scrollProgress * 24; // 0px → 24px

    // Opacity for the breadcrumb and specific text
    const textOpacity = Math.max((scrollProgress - 0.2) * 1.5, 0);
    const initialTextOpacity = Math.max(1 - scrollProgress * 4, 0);

    return (
        <section className="relative w-full h-[200vh] bg-white">
            {/* Sticky container */}
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-white z-0">

                {/* The Frame element — on mobile, no inset/scroll animation */}
                <div
                    className="absolute overflow-hidden bg-[var(--bg-navy)]"
                    style={{
                        left: `${window.innerWidth < 768 ? 0 : insetH / 2}px`,
                        right: `${window.innerWidth < 768 ? 0 : insetH / 2}px`,
                        top: `${window.innerWidth < 768 ? 0 : frameTop}px`,
                        height: window.innerWidth < 768 ? '100%' : frameHeight,
                        borderRadius: window.innerWidth < 768 ? '0px' : `${borderRadius}px`,
                        boxShadow: scrollProgress > 0.05 && window.innerWidth >= 768 ? '0 20px 60px rgba(0,0,0,0.2)' : 'none',
                    }}
                >
                    {/* Background Image */}
                    <img
                        src={aboutHeroImg}
                        alt="The Brand Behind the Chemistry"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />

                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-navy)] via-transparent to-[var(--bg-navy)]/30 z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-navy)]/60 via-transparent to-transparent z-10 pointer-events-none"></div>

                    {/* Initial Full-Screen Text (Centered) - Optional, mimicking PreHero's "Explore More" vibe if needed */}
                    <div
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                        style={{ opacity: initialTextOpacity }}
                    >
                        <h2 className="text-white text-4xl md:text-6xl font-['Outfit'] text-center px-4 tracking-tight">
                            Our Heritage & Vision
                        </h2>
                    </div>

                    {/* Main Content (Breadcrumb and Headings) */}
                    <div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                            opacity: textOpacity,
                            transform: `translateY(${(1 - textOpacity) * 30}px)`
                        }}
                    >
                        <div className="absolute left-[10%] md:left-[20%] lg:left-[10%] top-[70%] -translate-y-1/2 max-w-4xl pointer-events-auto">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 mb-1 text-white/60 text-xs md:text-sm font-dm-sans tracking-wide">
                                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                                <span>&rsaquo;</span>
                                <span className="text-white">About Us</span>
                            </div>

                            {/* Tagline / Subheading */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="w-8 h-[2px] bg-[var(--accent)]"></span>
                                <span className="text-accent font-dm-sans font-bold text-lg md:text-xl tracking-wider uppercase">
                                    Who We Are
                                </span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-white text-4xl md:text-6xl lg:text-[3.5rem] font-['Outfit'] ">
                                The Brand Behind
                                the <span className="text-[var(--accent)]">Chemistry</span>
                            </h1>
                        </div>
                    </div>

                    {/* Scroll Indicator (Bottom) - Fades out */}
                    <div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-60"
                        style={{ opacity: initialTextOpacity }}
                    >
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
                        <span className="text-white text-[10px] uppercase tracking-[0.3em] font-medium">Scroll to Discover</span>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutHero;
