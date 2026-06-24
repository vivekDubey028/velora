import React from 'react';
import { motion } from 'framer-motion';

const AboutStat: React.FC = () => {
    const stats = [
        { value: "15+", label: "YEARS OF EXPERTISE" },
        { value: "60+", label: "COUNTRIES SERVED" },
        { value: "200+", label: "PREMIUM PRODUCTS" },
        { value: "100%", label: "REGULATORY COMPLIANCE" },
    ];

    return (
        <section className="relative w-full flex justify-center px-4 md:px-16 lg:px-24 -mt-8 md:-mt-16 z-30">
            <div className="w-full max-w-[1400px] bg-[#f4f8fb] rounded-[2rem] md:rounded-[2.5rem] min-h-auto md:min-h-[200px] flex items-center justify-center px-6 md:px-12 py-8 md:py-0 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/50">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 items-center justify-items-center w-full">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className={`flex flex-col items-center text-center relative w-full ${idx !== stats.length - 1 ? 'lg:after:content-[""] lg:after:absolute lg:after:right-[-10%] lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:h-12 lg:after:w-[1px] lg:after:bg-neutral-300' : ''
                                }`}
                        >
                            <span className="text-4xl md:text-5xl font-extrabold text-black mb-2 tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-[10px] md:text-xs font-dm-sans text-black uppercase font-bold leading-tight">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutStat;
