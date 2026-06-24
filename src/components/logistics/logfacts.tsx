import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

const Counter = ({ from = 0, to, duration = 2, decimals = 0 }: { from?: number, to: number, duration?: number, decimals?: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true, amount: 0.5 });

    useEffect(() => {
        if (inView) {
            const controls = animate(from, to, {
                duration,
                ease: "easeOut",
                onUpdate(value) {
                    if (nodeRef.current) {
                        nodeRef.current.textContent = value.toFixed(decimals);
                    }
                },
            });
            return () => controls.stop();
        }
    }, [inView, from, to, duration, decimals]);

    return <span ref={nodeRef}>{from.toFixed(decimals)}</span>;
};

const BackgroundPattern = () => (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden opacity-[0.04] pointer-events-none ">
        <svg width="200%" height="300" xmlns="http://www.w3.org/2000/svg" className="translate-y-[20%]">
            <defs>
                <pattern id="arrow-pattern" x="0" y="0" width="180" height="300" patternUnits="userSpaceOnUse">
                    {/* Horizontal Line */}
                    <line x1="0" y1="150" x2="180" y2="150" stroke="black" strokeWidth="24" />
                    {/* Arrow head */}
                    <path d="M50 30 L170 150 L50 270" fill="none" stroke="black" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
                </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#arrow-pattern)" />
        </svg>
    </div>
);

const LogFacts = () => {
    return (
        /* MOBILE: py-16 min-h-0. DESKTOP: lg:py-0 md:min-h-screen */
        <section className="relative w-full flex items-center bg-white py-14 md:py-24 lg:py-0 md:min-h-screen overflow-hidden font-dm-sans">
            <BackgroundPattern />

            <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 lg:px-24 relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 lg:min-h-screen items-start lg:items-center">
                {/* Left Content */}
                {/* MOBILE: no translate. DESKTOP: lg:translate-y-38 lg:pt-48 */}
                <div className="flex flex-col self-start lg:translate-y-2 lg:pt-48 pb-2 lg:pb-0">
                    <div className="flex items-center gap-2.5 mb-3">
                        {/* MOBILE: no translate. DESKTOP: lg:translate-x-15 */}
                        <div className="w-3.5 h-3.5 rounded-full lg:translate-x-4 border-[4px] border-accent shrink-0" />
                        <span className="text-xs lg:translate-x-4 text-black uppercase tracking-widest">
                            Quick Facts
                        </span>
                    </div>
                    {/* MOBILE: text-[1.9rem]. DESKTOP: md:text-5xl lg:text-[3rem] */}
                    <h2 className="text-[1.9rem] md:text-5xl lg:text-[2.9rem] font-medium text-black lg:translate-x-4 max-w-4xl leading-tight">
                        Trusted by dozens of <br />
                        Companies across Industries.
                    </h2>
                </div>

                {/* Right Content - Stats Grid */}
                {/* MOBILE: no translate, no extra left padding. DESKTOP: lg:pl-16 lg:translate-y-[-30%] */}
                <div className="w-full grid grid-cols-2 gap-y-8 gap-x-6 lg:pl-16 xl:pl-24 lg:self-end pb-8 lg:pb-4 lg:translate-y-[-30%]">
                    {/* Stat 1 */}
                    <div className="flex flex-col">
                        <div className="text-[2.2rem] md:text-[5rem] lg:text-[4.5rem] leading-none font-medium text-black mb-1.5 md:mb-3 flex items-baseline tracking-tight">
                            <Counter to={98.6} decimals={1} />%
                        </div>
                        <p className="text-neutral-800 text-xs md:text-lg font-light leading-snug">
                            On-Time Delivery Rate.
                        </p>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex flex-col">
                        <div className="text-[2.2rem] md:text-[5rem] lg:text-[4.5rem] leading-none font-medium text-black mb-1.5 md:mb-3 flex items-baseline tracking-tight">
                            <Counter to={24} />/7
                        </div>
                        <p className="text-neutral-800 text-xs md:text-lg font-light leading-snug">
                            GPS Tracking Coverage.
                        </p>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex flex-col">
                        <div className="text-[2.2rem] md:text-[5rem] lg:text-[4.5rem] leading-none font-medium text-black mb-1.5 md:mb-3 flex items-baseline tracking-tight">
                            +<Counter to={20} />
                        </div>
                        <p className="text-neutral-800 text-xs md:text-lg font-light leading-snug">
                            Countries covered daily.
                        </p>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex flex-col">
                        <div className="text-[2.2rem] md:text-[5rem] lg:text-[4.5rem] leading-none font-medium text-black mb-1.5 md:mb-3 flex items-baseline tracking-tight">
                            +<Counter to={2.5} decimals={1} />K
                        </div>
                        <p className="text-neutral-800 text-xs md:text-lg font-light leading-snug">
                            Monthly Orders Fulfilled.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LogFacts;
