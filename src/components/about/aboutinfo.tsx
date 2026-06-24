import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import hero1 from '../../assets/hero1.webp';
import hero2 from '../../assets/hero2.webp';
import hero3 from '../../assets/hero3.webp';

const images = [hero1, hero2, hero3];

const AboutInfo: React.FC = () => {
    const [currentImg, setCurrentImg] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentImg((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const goTo = (idx: number) => {
        setDirection(idx > currentImg ? 1 : -1);
        setCurrentImg(idx);
    };

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
    };

    return (
        <section className="min-h-screen flex items-center px-5 md:px-24 lg:pl-12 lg:pr-16 max-w-[1400px] mx-auto py-12 md:py-0">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 w-full">

                {/* ── Text Content ── */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="flex-1 md:translate-x-8"
                >
                    {/* Tagline */}
                    <div className="flex items-center gap-3 mt-12 mb-3">
                        <div className="w-8 h-[2px] bg-[var(--accent)] " />
                        <span className="text-accent font-bold font-dm-sans text-sm  uppercase ">
                            Knowing Velora
                        </span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-[2rem] md:text-[2.3rem] font-['Outfit'] text-[var(--brand)] leading-tight mb-2">
                        Global Chemistry. Trusted Solutions.

                    </h2>

                    {/* Spacer */}
                    <div className="h-10 md:h-6" />

                    {/* Body */}
                    <div className="space-y-4 text-black font-dm-sans text-[15px] md:text-[20px] leading-relaxed">
                        <p>
                            Velora Group is a dynamic, Ahmedabad-headquartered enterprise comprising Velora
                            Chemicals Private Limited and Velora Logistics Private Limited. Established in
                            Gujarat's thriving chemical hub, we combine decades of domain expertise in chemical
                            sourcing and trading with world-class export capabilities and end-to-end logistics
                            solutions. <br />
                        </p>
                        <p>
                            What truly distinguishes Velora is our unwavering focus on reliability, compliance,
                            and innovation. We source premium-grade inorganic acids, specialty intermediates,
                            and industrial chemicals directly from audited manufacturers — delivering seamlessly
                            to clients worldwide.
                        </p>
                    </div>

                    {/* Spacer */}
                    <div className="h-12 md:h-10" />

                    {/* Pills */}
                    <div className="flex flex-wrap gap-3 pt-6 justify-start lg:translate-x-30">
                        {['Chemical Trading', 'Petrochemical Distribution', 'Industrial Chemical Supply'].map((pill) => (
                            <span
                                key={pill}
                                className="px-5 md:px-8 py-3 md:py-4 rounded-full border border-[#8cc63f] text-brand font-dm-sans text-[13px] md:text-[15px] font-medium hover:bg-[#8cc63f]/5 transition-all duration-300 cursor-default"
                            >
                                {pill}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* ── Image Slider ── */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                    viewport={{ once: true }}
                    className="flex-1 w-full"
                >
                    {/* Portrait card — significantly shifted right */}
                    <div className="relative w-full aspect-[3/4] max-w-[480px] mx-auto lg:mx-0 lg:ml-[15%] lg:translate-x-24 rounded-[2rem] overflow-hidden bg-neutral-100 shadow-[0_20px_60px_rgba(0,0,0,0.10)]">
                        <AnimatePresence custom={direction} mode="popLayout">
                            <motion.img
                                key={currentImg}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                                src={images[currentImg]}
                                alt={`Velora operations ${currentImg + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {/* Dot indicators */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goTo(idx)}
                                    className={`rounded-full transition-all duration-500 ${idx === currentImg
                                        ? 'w-6 h-2 bg-white'
                                        : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                                        }`}
                                    aria-label={`Go to image ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutInfo;
