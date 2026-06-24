import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import susHeroBg from '../../assets/sustainability/sus_hero_bg.webp';

const SusHero: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const vh = window.innerHeight;
            const progress = Math.min(Math.max(scrolled / (vh * 0.5), 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll-morphing frame (same pattern as abouthero)
    const insetH = scrollProgress * 32;
    const frameTop = scrollProgress * 64;
    const frameHeight = `calc(100vh - ${frameTop + scrollProgress * 16}px)`;
    const borderRadius = scrollProgress * 24;

    const textOpacity = Math.max((scrollProgress - 0.2) * 1.5, 0);
    const initialTextOpacity = Math.max(1 - scrollProgress * 4, 0);

    return (
        <section className="relative w-full h-[200vh] bg-white font-['Outfit']">
            {/* Sticky container */}
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-white z-0">

                {/* The morphing frame */}
                <div
                    className="absolute overflow-hidden"
                    style={{
                        left: `${insetH / 2}px`,
                        right: `${insetH / 2}px`,
                        top: `${frameTop}px`,
                        height: frameHeight,
                        borderRadius: `${borderRadius}px`,

                        background: '#0a1628',
                        transition: 'box-shadow 0.1s',
                    }}
                >
                    {/* Background Image */}
                    <img
                        src={susHeroBg}
                        alt="Industrial sustainability background"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ opacity: 0.75 }}
                    />

                    {/* Multi-layer dark gradient overlays */}
                    <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgba(5,15,35,0.55) 0%, rgba(5,15,35,0.15) 40%, rgba(5,15,35,0.70) 100%)',
                        }}
                    />
                    <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            background:
                                'linear-gradient(to right, rgba(5,15,35,0.70) 0%, rgba(5,15,35,0.20) 55%, transparent 100%)',
                        }}
                    />

                    {/* ── Centered initial title (fades out on scroll) ── */}
                    <div
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                        style={{ opacity: initialTextOpacity }}
                    >
                        <h2
                            className="text-white text-4xl md:text-6xl font-semibold text-center px-6 tracking-tight"
                            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
                        >
                            Our Commitment to the Planet
                        </h2>
                    </div>

                    {/* ── Main content: breadcrumb + heading (fades in on scroll) ── */}
                    <div
                        className="absolute inset-0 z-20 pointer-events-none"
                        style={{
                            opacity: textOpacity,
                            transform: `translateY(${(1 - textOpacity) * 30}px)`,
                        }}
                    >
                        <div className="absolute left-[6%] md:left-[8%] lg:left-[6%] top-[65%] -translate-y-1/2 max-w-3xl pointer-events-auto">

                            {/* Breadcrumb */}
                            <div className="flex items-center gap-1.5 mb-1 text-white/60 text-xs md:text-sm font-dm-sans tracking-wide">
                                <span className="text-white/50">›</span>
                                <Link to="/" className="hover:text-white/90 transition-colors">
                                    Home
                                </Link>
                                <span className="text-white/40">›</span>
                                <span className="text-white/80">Sustainability</span>
                            </div>

                            {/* Green label */}
                            <div className="flex items-center gap-3 mb-4">
                                {/* Animated pulse dot */}
                                <span
                                    className="inline-block w-2 h-2 rounded-full bg-accent"

                                />
                                <span
                                    className="text-sm md:text-base font-bold text-accent tracking-wide"

                                >
                                    Sustainability &amp; ESG Initiatives
                                </span>

                            </div>

                            {/* Main heading */}
                            <h1
                                className="text-white text-[32px] md:text-[32px] lg:text-[3.7rem] font-bold leading-[1.08] tracking-tight mb-6"
                                style={{

                                    textShadow: '0 4px 28px rgba(0,0,0,0.45)',
                                    maxWidth: '780px',
                                }}
                            >
                                Building a Sustainable Future<br />
                                Through Responsible <span className="text-accent">Growth</span>.
                            </h1>

                            {/* Description */}
                            <p
                                className="text-white  font-dm-sans 
                                leading-relaxed font-light"
                                style={{
                                    fontSize: 'clamp(0.8rem, 1.5vw, 1rem)',
                                    maxWidth: '480px',
                                    lineHeight: 1.75,
                                }}
                            >
                                Access our comprehensive database of high-purity industrial chemicals.
                                Every batch is validated through the Technical Ledger protocol for absolute
                                precision in Engineering Applications.
                            </p>
                        </div>
                    </div>

                    {/* ── Scroll indicator ── */}
                    <div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
                        style={{ opacity: initialTextOpacity * 0.7 }}
                    >
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
                        <span className="text-white/50 text-[10px] uppercase tracking-[0.3em] font-medium">
                            Scroll to Explore
                        </span>
                    </div>

                    {/* ── Bottom accent line ── */}
                    <div
                        className="absolute bottom-0 left-0 w-full h-[2px] z-30"
                        style={{
                            background:
                                'linear-gradient(to right, transparent, #b1f542 40%, #b1f542 60%, transparent)',
                            opacity: 0.4,
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default SusHero;
