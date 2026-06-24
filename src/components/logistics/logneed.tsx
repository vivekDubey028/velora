import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import images
import log1 from '../../assets/logistics/log1.webp';
import log2 from '../../assets/logistics/log2.webp';
import log3 from '../../assets/logistics/log3.webp';
import log4 from '../../assets/logistics/log4.webp';
import log5 from '../../assets/logistics/log5.webp';

const ServiceItem = ({ service }: { service: any }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Starts 140px below, rises to 0 as it enters the viewport
    const y = useTransform(scrollYProgress, [0, 0.45], [140, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity }}
            className="group flex flex-col gap-5 md:gap-8"
        >
            <div className="flex flex-col gap-3 md:gap-4">
                {/* Bullet point and ID Row */}
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full border-[3px] border-accent shrink-0" />
                    <span className="text-[13px] font-roboto-mono text-black font-semibold tracking-wider">
                        {service.id}
                    </span>
                </div>

                {/* Title */}
                {/* MOBILE: text-2xl. DESKTOP: md:text-4xl lg:text-[2.5rem] */}
                <h3 className="text-2xl md:text-4xl lg:text-[2.5rem] font-medium text-black tracking-tight font-dm-sans leading-tight">
                    {service.title}
                </h3>
            </div>

            {/* Image Container */}
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-2xl md:rounded-t-[2.5rem] rounded-b-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-neutral-100">
                <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                />

                {/* The blue Cover Overlay - Animates off once and stays off */}
                <motion.div
                    initial={{ x: "0%" }}
                    whileInView={{ x: "100%" }}
                    transition={{
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.1
                    }}
                    viewport={{ once: true, amount: 0.4 }}
                    className="absolute inset-0 bg-brand z-20"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40 z-10 pointer-events-none" />
            </div>
        </motion.div>
    );
};

const LogNeed = () => {
    const services = [
        {
            id: '01',
            title: 'National & International Freight',
            image: log1
        },
        {
            id: '02',
            title: 'Regional Distribution',
            image: log2
        },
        {
            id: '03',
            title: 'Warehousing & Fulfillment',
            image: log3
        },
        {
            id: '04',
            title: 'Refrigerated Transport',
            image: log4
        },
        {
            id: '05',
            title: '3PL Subcontracting',
            image: log5
        },
    ];

    return (
        /* MOBILE: pt-10 pb-12. DESKTOP: md:pt-32 md:pb-64 lg:pt-48 lg:pb-[25vh] */
        <section className="bg-white pt-10 pb-10 md:pt-32 md:pb-64 lg:pt-48 lg:pb-[25vh] overflow-visible font-dm-sans">
            <div className="max-w-[1440px] mx-auto px-5 md:px-16 lg:px-24">
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-40 items-start">

                    {/* Left Side: Sticky Content */}
                    {/* MOBILE: no translate, normal flow. DESKTOP: lg:sticky lg:translate-x-15 */}
                    <div className="lg:w-[50%] lg:sticky lg:top-32 self-start lg:translate-x-10" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                        {/* MOBILE: text-[1.8rem]. DESKTOP: md:text-5xl lg:text-[4.5rem] */}
                        <h2 className="text-[1.8rem] md:text-5xl lg:text-[4.5rem] font-medium text-black leading-[1.05] tracking-tight font-outfit" style={{ marginBottom: '0.5rem' }}>
                            Logistics that <br />
                            fit your needs.
                        </h2>
                        {/* Heading Description - DM Sans */}
                        <p className="text-xs md:text-xl text-black max-w-xs md:max-w-md leading-snug font-dm-sans font-normal opacity-70">
                            From temperature-controlled transport to{' '}
                            regional distribution — we've got it covered.
                        </p>
                    </div>

                    {/* Right Side: Scrolling Items */}
                    {/* MOBILE: gap-8 pt-1. DESKTOP: md:gap-60 lg:pt-[25vh] */}
                    <div className="lg:w-[50%] flex flex-col gap-8 md:gap-60 lg:pt-[25vh] pt-1" style={{ paddingBottom: '0.5rem' }}>
                        {services.map((service) => (
                            <ServiceItem key={service.id} service={service} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LogNeed;
