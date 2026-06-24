
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import logheroVideo from '../../assets/videos/loghero.mp4';
import logheroPoster from '../../assets/videos/loghero_poster.webp';

const LogHero = () => {
    return (
        <div className="relative w-full h-screen overflow-x-hidden bg-black font-['Outfit']">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster={logheroPoster}
                className="absolute inset-0 w-full h-full object-cover opacity-70"
            >
                <source src={logheroVideo} type="video/mp4" />
            </video>

            {/* Grid Pattern Overlay at the Top */}


            {/* Dark Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-0" />

            {/* Main Content Container */}
            <div className="relative z-20 h-full flex flex-col justify-end md:justify-between px-5 md:px-16 lg:px-24 pt-10 pb-10 md:py-12">
                <div className="hidden md:block flex-1" /> {/* Spacer where the custom nav was */}

                {/* Middle: Value Proposition */}
                {/* MOBILE: no translate. DESKTOP: translate-y-[-10%] translate-x-15 */}
                <div className="w-full flex flex-col items-start mb-4 md:mb-0 md:translate-y-[-50%] md:translate-x-15">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* MOBILE: text-[1.9rem]. DESKTOP: text-8xl lg:text-[5.5rem] */}
                        <h2 className="text-white text-[1.7rem] leading-[1.15] mb-3 md:text-8xl md:leading-[0.95] md:mb-3 lg:text-[5.5rem]">
                            Your Freight, delivered<br />
                            with Precision.
                        </h2>

                        <div className="flex items-center gap-2.5">
                            <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                            <span className="text-white/90 text-xs md:text-xl font-dm-sans">
                                Across India and Global Hubs.
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom: Subtext and Action */}
                {/* MOBILE: flex-col, items-start, no translate. DESKTOP: flex-row, items-end, pb-6 */}
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end pb-0 md:pb-0 gap-2 md:gap-0">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="max-w-xs md:max-w-md"
                    >
                        {/* MOBILE: no translate. DESKTOP: translate-x-15 translate-y-[-10%] */}
                        <p className="text-white/80 text-xs md:text-xl leading-relaxed md:translate-x-15 md:translate-y-[-10%] font-dm-sans font-light">
                            Reliable transport. Real-time tracking.<br />
                            Tailored logistics for your business units.
                        </p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="group flex items-center gap-3 md:gap-12 bg-transparent border border-white/30 hover:border-accent transition-colors duration-500 rounded-full px-4 md:px-16 py-2 md:py-3 self-start md:self-auto"
                    >
                        {/* MOBILE: no translate. DESKTOP: translate-x-6 */}
                        <span className="text-white text-[10px] md:text-sm font-roboto-mono md:translate-x-6 uppercase tracking-[0.15em]">Know Our Services</span>
                        <div className="w-7 h-7 md:w-10 md:h-10 rounded-full bg-white/10 group-hover:bg-accent flex items-center justify-center transition-all duration-500">
                            <ArrowUpRight className="w-3.5 h-3.5 md:w-5 md:h-5 text-white" />
                        </div>
                    </motion.button>
                </div>

            </div>

            {/* Decorative Bottom Pattern (Optional, to match the vibe) */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#e43d12] to-transparent opacity-50" />
        </div>
    );
};

export default LogHero;
