import React, { useState, useEffect, useRef } from 'react';

const AnimatedCounter: React.FC<{ end: number; duration?: number }> = ({ end, duration = 3000 }) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function: easeOutCubic (smoother, less aggressive than Expo)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeProgress * end);

            setCount((prev) => {
                if (prev !== currentCount) return currentCount;
                return prev;
            });

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [hasStarted, end, duration]);

    return <span ref={elementRef}>{count}</span>;
};

const Glance: React.FC = () => {
    return (
        <section className="w-full min-h-screen flex items-center bg-white font-['Inter'] relative py-20">


            <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 lg:px-20 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-12 lg:gap-32 lg:pt-8">

                {/* Left Side: Content */}
                <div className="w-full lg:max-w-[380px] shrink-0 flex flex-col gap-8 lg:gap-16">
                    <h2 className="text-[var(--brand)] text-[2.75rem] font-semibold text-center lg:text-left font-['Outfit'] tracking-tight">
                        At a Glance
                    </h2>
                    <p className="text-black font-dm-sans text-[16px] leading-[1.8] text-left ">
                        With a commitment to precision, reliability, and responsible sourcing, Velora Chemicals supports industries with high-quality industrial and specialty chemicals. Our expanding capabilities and global outlook reflect our dedication to consistent supply and long-term partnerships.
                    </p>
                </div>

                {/* Right Side: Stats Grid */}
                <div className="w-full max-w-[800px] grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-6 h-auto md:h-[600px]">

                    {/* First Column */}
                    <div className="flex flex-col gap-6 md:flex-[0.7]">
                        <div className="bg-[#f0f4f8] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center min-h-[160px] md:h-[220px] transition-transform hover:scale-[1.02]">
                            <div className="text-[var(--brand)] text-6xl md:text-[4.5rem] font-semibold mb-2 tracking-tight leading-none">
                                <AnimatedCounter end={25} />+
                            </div>
                            <div className="text-[var(--brand)] text-[15px] font-dm-sans">years of experience</div>
                        </div>
                        <div className="bg-white border border-[#dce4f0] rounded-[2rem] px-8 pb-8 flex flex-col items-center justify-start text-center flex-1 min-h-[160px] md:min-h-[220px] transition-transform hover:scale-[1.02]">
                            <div className="h-10"></div>
                            <div className="text-[var(--brand)] text-6xl md:text-[4.5rem] font-semibold mb-2 tracking-tight leading-none">
                                <AnimatedCounter end={100} />+
                            </div>
                            <div className="text-[var(--brand)] text-[15px] font-dm-sans">Chemical Products</div>
                        </div>
                    </div>

                    {/* Second Column */}
                    <div className="flex flex-col gap-6 md:flex-[1.2]">
                        <div className="bg-white border border-[#dce4f0] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center min-h-[160px] md:h-[220px] transition-transform hover:scale-[1.02]">
                            <div>
                                <div className="text-[var(--brand)] text-6xl md:text-[4.5rem] font-semibold mb-2 tracking-tight leading-none">
                                    <AnimatedCounter end={50} />+
                                </div>
                                <div className="text-[var(--brand)] text-[15px] font-dm-sans">Countries Served</div>
                            </div>
                        </div>
                        <div className="bg-[#f0f4f8] rounded-[2rem] px-8 pb-8 flex flex-col items-center justify-start text-center flex-1 min-h-[160px] md:min-h-[220px] transition-transform hover:scale-[1.02]">
                            <div className="h-10"></div>
                            <div>
                                <div className="text-[var(--brand)] text-6xl md:text-[4.5rem] font-semibold mb-2 tracking-tight leading-none">
                                    <AnimatedCounter end={10} />+
                                </div>
                                <div className="text-[var(--brand)] text-[15px] font-dm-sans">Industries Supported</div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Glance;
