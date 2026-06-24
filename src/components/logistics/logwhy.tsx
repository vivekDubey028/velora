import { motion } from 'framer-motion';
import { Headset, MapPin, Package, ShieldCheck } from 'lucide-react';

const cards = [
    {
        title: 'Multilingual support across Europe and the US',
        icon: <Headset className="w-8 h-8 text-brand" />
    },
    {
        title: 'Real-Time Shipment Visibility',
        icon: <MapPin className="w-8 h-8 text-brand" />
    },
    {
        title: 'Fast Delivery across 20+ Countries',
        icon: <Package className="w-8 h-8 text-brand" />
    },
    {
        title: 'Certified and Compliant Fleet',
        icon: <ShieldCheck className="w-8 h-8 text-brand" />
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
};

const LogWhy = () => {
    return (
        /* MOBILE: py-12. DESKTOP: md:py-32 lg:min-h-screen lg:py-40 */
        <section className="bg-white flex items-center py-12 md:py-32 lg:min-h-screen lg:py-40 overflow-hidden font-dm-sans">
            <div className="max-w-[1440px] mx-auto px-5 md:px-16 lg:px-24 w-full">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start lg:items-start">

                    {/* Left Column: Text & CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:w-[40%] flex flex-col space-y-4 lg:space-y-8 lg:sticky lg:top-32"
                    >
                        {/* MOBILE: no translate. DESKTOP: lg:translate-x-15 */}
                        <div className="space-y-2 lg:translate-x-5">
                            <span className="text-[12px] font-bold text-accent uppercase font-dm-sans tracking-widest">
                                WHY VELORA
                            </span>
                            {/* MOBILE: text-[1.8rem]. DESKTOP: md:text-5xl lg:text-[3rem] */}
                            <h2 className="text-[1.8rem] md:text-5xl lg:text-[3rem] font-medium text-black leading-[1.1] font-outfit">
                                Why Leading <br /> Businesses Rely on Us
                            </h2>
                        </div>

                        {/* MOBILE: no translate. DESKTOP: lg:translate-x-15 */}
                        <p className="text-xs md:text-lg text-black leading-relaxed max-w-xs md:max-w-md font-dm-sans lg:translate-x-5">
                            We combine smart operations with real-world reliability to move what matters — faster, safer, and smarter.
                        </p>


                    </motion.div>

                    {/* Right Column: Feature Cards Grid */}
                    {/* MOBILE: 1-col stack. SM+: 2-col grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="lg:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 w-full"
                    >
                        {cards.map((card, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="bg-[#f4f4f5] rounded-[1.25rem] md:rounded-[2rem] p-4 md:p-8 flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-0 sm:min-h-[180px] md:min-h-[260px] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-transparent hover:border-gray-200 cursor-default"
                            >
                                {/* Icon Container */}
                                <div className="shrink-0 sm:flex-1 sm:flex sm:items-center sm:justify-center sm:w-full relative">
                                    {/* MOBILE: w-11 h-11. DESKTOP: w-20 h-20 */}
                                    <div className="relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-full bg-white shadow-sm sm:mb-3 md:mb-6 z-10">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-[-7px] sm:inset-[-10px] md:inset-[-12px] border border-dashed border-accent rounded-full"
                                        />
                                        <div className="absolute inset-[-3px] sm:inset-[-5px] md:inset-[-6px] border border-brand rounded-full" />
                                        <motion.div
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <div className="[&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-6 sm:[&>svg]:h-6 md:[&>svg]:w-8 md:[&>svg]:h-8">
                                                {card.icon}
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                                {/* Title — left-aligned on mobile, centered on sm+ */}
                                <h3 className="text-sm md:text-lg font-medium text-left sm:text-center text-black font-dm-sans leading-snug sm:mt-auto">
                                    {card.title}
                                </h3>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default LogWhy;
