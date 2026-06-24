import React from 'react';
import { motion } from 'framer-motion';

const pillars = [
    {
        number: '01',
        headerBg: '#052349',
        cardBg: '#f3f8fc',
        title: 'Reliable Sourcing',
        titleColor: '#5b8a5d',
        body: "We work with a carefully vetted network of suppliers to ensure every raw material meets strict quality, consistency, and traceability standards. Our sourcing approach is built around long-term reliability, so customers can count on stable supply, dependable specifications, and fewer disruptions across the value chain.",
    },
    {
        number: '02',
        headerBg: '#70c5ff',
        cardBg: '#e9f6ff',
        title: 'Seamless Exports',
        titleColor: '#5b8a5d',
        body: "Velora manages export operations with the kind of precision that keeps timelines, documentation, and logistics aligned from end to end. From packaging and compliance to shipment coordination and customs readiness, we help customers move products smoothly across markets with minimal friction.",
    },
    {
        number: '03',
        headerBg: '#4a8d11',
        cardBg: '#f2fbe8',
        title: 'Customer-Centric Solutions',
        titleColor: '#4a8d11',
        body: "We don't just supply chemicals — we adapt to the needs of each industry, application, and business model. Whether it's technical support, customized supply formats, or responsive service, our goal is to make every engagement practical, efficient, and easy to scale.",
    },
];

const AboutBrand: React.FC = () => {
    return (
        <section className="py-16 md:py-32 px-5 md:px-16 lg:px-24 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-center">
            {/* Header section matched to mockup */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-20"
            >
                <div className="flex items-center gap-3 mb-0 md:translate-x-4">
                    <div className="w-8 h-[1px] bg-accent" />
                    <span className="text-accent font-bold font-dm-sans text-[12px] md:text-[15px] uppercase">
                        Brand Pillars
                    </span>
                </div>
                <h2 className="text-[1.75rem] md:text-[3rem] font-bold font-['Outfit'] text-black leading-tight mb-8 md:mb-4 tracking-tight md:translate-x-4">
                    Clear strengths, Clearly delivered.
                </h2>
                <p className="text-neutral-500 text-[17px] font-dm-sans font-bold opacity-80 max-w-5xl leading-relaxed md:translate-x-4">
                    Velora's positioning is built around dependable sourcing, seamless export execution, and tailored customer solutions for industrial buyers worldwide.
                </p>
            </motion.div>
            <div className="h-2 md:h-2" />

            {/* Pillar Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:translate-x-0 max-w-[1400px]">
                {pillars.map((pillar, idx) => (
                    <motion.div
                        key={pillar.number}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex flex-col items-stretch group"
                    >
                        {/* 01. The Header Pill */}
                        <div
                            className="h-11 rounded-full flex items-center px-10 transition-transform duration-300 shadow-sm"
                            style={{ backgroundColor: pillar.headerBg }}
                        >
                            <span className="text-white font-bold text-xs tracking-widest md:translate-x-5">{pillar.number}</span>
                        </div>

                        {/* Gap Spacer */}
                        <div className="h-6 md:h-4" />

                        {/* 02. The Content Box */}
                        <div
                            className="flex-1 px-8 py-16 rounded-[1.5rem] shadow-sm min-h-[250px]"
                            style={{ backgroundColor: pillar.cardBg }}
                        >
                            <h3
                                className="text-[17px] md:text-[18px] font-['Outfit'] font-medium mb-12 leading-tight md:translate-x-6"
                                style={{ marginTop: "10px", color: pillar.titleColor, marginBottom: "20px" }}
                            >
                                {pillar.title}
                            </h3>
                            <p className="text-black font-dm-sans text-[13px] md:text-[14px] leading-[1.6] font-normal opacity-90 md:translate-x-4 max-w-[400px]">
                                {pillar.body}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AboutBrand;
