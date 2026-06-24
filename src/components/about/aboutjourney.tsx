import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import journeyImg from '../../assets/aboutjourney.webp';

const phases = [
    {
        title: "Phase 1 – 2009 – 2015",
        desc: "Velora began by building trust in Gujarat's industrial belt, focusing on sourcing discipline, supplier reliability, and a strong understanding of chemical trading fundamentals.",
        bullet: "Built core quality and sourcing systems"
    },
    {
        title: "Phase 2 – 2015 – 2018",
        desc: "Expanded our operational reach beyond Gujarat, establishing key partnerships across the country and expanding our portfolio of high-grade chemical offerings.",
        bullet: "Expanded regional partnerships"
    },
    {
        title: "Phase 3 – 2018 – 2021",
        desc: "Pioneered sustainable sourcing practices and integrated advanced supply chain logistics to provide unparalleled value and reliability to our clients.",
        bullet: "Integrated sustainable sourcing"
    },
    {
        title: "Phase 4 – 2021 – 2023",
        desc: "Entered the global market by establishing international trade routes, ensuring our chemical distribution met stringent global compliance standards.",
        bullet: "Entered international markets"
    },
    {
        title: "Phase 5 – 2023 – Present",
        desc: "Continuing to lead the industry through innovation, strategic global partnerships, and a relentless commitment to protecting the planet while driving progress.",
        bullet: "Global leadership & innovation"
    }
];

const AboutJourney: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        let index = Math.floor(latest * phases.length);
        if (index >= phases.length) index = phases.length - 1;

        // Only increase the index so phases do not disappear when scrolling up
        setActiveIndex((prev) => Math.max(prev, index));
    });

    return (
        <section
            ref={targetRef}
            className="relative w-full bg-[#f8f9fa] pb-24 px-5 md:px-16 lg:px-20 w-full mx-auto"
        >
            <div className="h-16 md:h-24 lg:h-10" />
            {/* Header */}
            <div className="mb-16 md:mb-24">
                <p className="text-accent text-sm md:text-base font-dm-sans md:translate-x-10 font-bold tracking-wider uppercase flex items-center gap-3 mb-4">
                    <span className="w-8 h-[2px] bg-accent"></span>
                    OUR STORY
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold md:translate-x-10   text-brand tracking-tight font-['Outfit']">
                    From Gujarat to Global markets.
                </h2>
            </div>
            <div className="h-16 md:h-24 lg:h-10" />

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24 relative">

                {/* Left Side: Sticky Image */}
                <div className="relative hidden lg:block">
                    <div className="sticky top-32 w-full aspect-[4/3] lg:aspect-square rounded-[1rem] translate-x-10 overflow-hidden bg-gray-100 shadow-2xl">
                        <img
                            src={journeyImg}
                            alt="Velora Journey"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                </div>

                {/* Right Side: Timeline */}
                <div className="relative pt-4 lg:pt-8">
                    <div className="flex flex-col gap-32 md:gap-10  translate-y-2 relative z-10">
                        {phases.map((phase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                onViewportEnter={() => setActiveIndex(index)}
                                className="relative pl-12 md:pl-16 block w-full"
                            >
                                {/* Line connecting to next dot */}
                                {index !== phases.length - 1 && (
                                    <div className="absolute left-[11px] md:left-[15px] top-[20px] bottom-[-150px] w-[2px] bg-gray-200 z-0"></div>
                                )}

                                {/* Timeline Dot */}
                                <div className="absolute left-0 top-0.5 md:top-0 w-6 md:w-8 flex items-center justify-center bg-[#f8f9fa] py-2 z-10">
                                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm ${activeIndex === index ? 'bg-[#cbe0f4] scale-110' : 'bg-gray-200 scale-100'
                                        }`}>
                                        <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-colors duration-500 ${activeIndex === index ? 'bg-[#153448]' : 'bg-gray-400'
                                            }`}></div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className={`text-xl md:text-2xl font-dm-sans font-bold text-[#518A23] mb-4 md:translate-x-10 transition-all duration-500 ${activeIndex === index ? 'italic' : 'not-italic opacity-70'
                                        }`}>
                                        {phase.title}
                                    </h3>
                                    <p className="text-black font-dm-sans mb-5 md:translate-x-10 leading-relaxed text-base md:text-lg max-w-[700px]">
                                        {phase.desc}
                                    </p>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="h-16 md:h-24 lg:h-10" />
        </section>
    );
};

export default AboutJourney;
