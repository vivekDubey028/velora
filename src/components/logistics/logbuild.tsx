import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Import background and industry images
import logbuildbg from '../../assets/logistics/logbuildbg.webp';
import logbuild1 from '../../assets/logistics/logbuild1.webp';
import logbuild2 from '../../assets/logistics/logbuild2.webp';
import logbuild3 from '../../assets/logistics/logbuild3.webp';
import logbuild4 from '../../assets/logistics/logbuild4.webp';
import logbuild5 from '../../assets/logistics/logbuild5.webp';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Industry {
    id: string;
    title: string;
    image: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const industries: Industry[] = [
    {
        id: '01',
        title: 'Food & Beverages',
        image: logbuild1,
    },
    {
        id: '02',
        title: 'Pharmaceutical',
        image: logbuild2,
    },
    {
        id: '03',
        title: 'Industrial & Manufacturing',
        image: logbuild3,
    },
    {
        id: '04',
        title: 'Electronics & Technology',
        image: logbuild4,
    },
    {
        id: '05',
        title: 'Retail & E-Commerce',
        image: logbuild5,
    },
];

// ─── Text Reveal Component (whileInView masked reveal) ──────────────────────
const TextReveal = ({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) => {
    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1], // Custom easing for premium feel
                delay: delay,
            }}
        >
            {children}
        </motion.div>
    );
};

// ─── Industry Card ─────────────────────────────────────────────────────────────
const IndustryCard = ({ industry }: { industry: Industry }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 0.45], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity }}
            className="group flex flex-col gap-0"
        >
            {/* Image */}
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-2xl md:rounded-t-[2rem] rounded-b-none bg-neutral-900">
                <motion.img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Red wipe-reveal overlay (permanently reveals) */}
                <motion.div
                    initial={{ x: '0%' }}
                    whileInView={{ x: '100%' }}
                    transition={{
                        duration: 1.3,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.05,
                    }}
                    viewport={{ once: true, amount: 0.35 }}
                    className="absolute inset-0 bg-brand z-20"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none" />

                {/* ID badge */}
                <div className="absolute top-5 left-5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[11px] font-roboto-mono tracking-[0.2em] text-white/60 uppercase">
                        {industry.id}
                    </span>
                </div>
            </div>

            {/* Title strip */}
            <div className="flex items-center justify-between px-1 pt-4 pb-1">
                <div className="flex items-center gap-3 md:gap-4">
                    <span className="text-[11px] font-roboto-mono tracking-[0.2em] text-white/30 uppercase">
                        {industry.id}
                    </span>
                    <div>
                        {/* MOBILE: text-xl. DESKTOP: md:text-3xl */}
                        <h3 className="text-xl md:text-3xl translate-y-[10%] font-medium text-white tracking-tight font-dm-sans leading-tight">
                            {industry.title}
                        </h3>
                    </div>
                </div>

                {/* Arrow icon */}
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </div>
            </div>

            {/* Bottom separator */}
            <div className="mt-3 h-px transalate-y-[-20%] w-full bg-white/10" />
        </motion.div>
    );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const LogBuild = () => {
    return (
        <section
            className="relative w-full overflow-visible font-outfit"
            style={{ backgroundColor: '#120700' }}
        >
            {/* Background image with dark tint */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={logbuildbg}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover object-center"
                />
                {/* Deep dark overlay so text stays readable */}
                <div className="absolute inset-0 bg-[#0e0500]/85" />
                {/* Subtle left-side vignette */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0e0500]/60 via-transparent to-transparent" />
            </div>

            {/* Decorative spine graphic (matches reference site) */}
            <div className="absolute left-0 top-0 h-full w-[2px] z-10"
                style={{
                    background: 'repeating-linear-gradient(180deg, transparent, transparent 28px, rgba(228,61,18,0.25) 28px, rgba(228,61,18,0.25) 30px)',
                }}
            />

            {/* Top edge line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#e43d12]/40 via-white/5 to-transparent z-10" />

            {/* ── Content ── */}
            {/* MOBILE: pt-10 pb-12. DESKTOP: md:pt-32 md:pb-64 lg:pt-48 lg:pb-[25vh] */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-16 lg:px-24 pt-10 pb-12 md:pt-32 md:pb-64 lg:pt-48 lg:pb-[25vh]">
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-32 items-start">

                    {/* ── LEFT: Sticky column ── */}
                    {/* MOBILE: no translate. DESKTOP: lg:translate-x-10 lg:sticky */}
                    <div className="lg:w-[40%] lg:sticky lg:top-32 self-start lg:translate-x-10" style={{ paddingBottom: '1rem' }}>

                        {/* Heading */}
                        <div style={{ paddingTop: '1rem' }}>
                            <TextReveal delay={0.1}>
                                {/* MOBILE: text-[1.8rem]. DESKTOP: md:text-5xl lg:text-[3.5rem] */}
                                <h2 className="text-[1.8rem] md:text-5xl lg:text-[3.5rem] font-medium text-white leading-[1.05] tracking-tight">
                                    Built for
                                    Critical<br />
                                    Industries.
                                </h2>
                            </TextReveal>
                        </div>

                        {/* Description */}
                        <div style={{ paddingTop: '0.75rem', paddingBottom: '1rem' }}>
                            <TextReveal delay={0.2}>
                                <p className="text-xs md:text-lg text-white font-dm-sans font-light leading-relaxed max-w-xs md:max-w-sm">
                                    We support companies in Food, Pharma, Retail, and Manufacturing with Tailored Logistics.
                                </p>
                            </TextReveal>
                        </div>



                    </div>

                    {/* ── RIGHT: Scrolling cards ── */}
                    {/* MOBILE: gap-8 pt-1. DESKTOP: md:gap-32 lg:pt-16 */}
                    <div className="lg:w-[60%] flex flex-col gap-8 md:gap-32" style={{ paddingTop: '0.25rem', paddingBottom: '0.5rem' }}>
                        {industries.map((industry) => (
                            <IndustryCard key={industry.id} industry={industry} />
                        ))}
                    </div>

                </div>
            </div>

            {/* Bottom edge line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e43d12]/30 to-transparent z-10" />
        </section>
    );
};

export default LogBuild;
