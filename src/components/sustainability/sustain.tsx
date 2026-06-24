import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sus1 from "../../assets/sustainability/sus1.webp";
import sus2 from "../../assets/sustainability/sus2.webp";
import sus3 from "../../assets/sustainability/sus3.webp";

const images = [sus1, sus2, sus3];
const quotes = [
  '"True progress is measured not just by what we produce, but by how responsibly we protect the planet while doing it."',
  '"Strong businesses are built on strong communities—people, trust, and shared responsibility drive lasting impact."',
  '"Integrity in leadership isn’t optional—it’s the foundation of transparency, accountability, and sustainable growth."'
];
const AUTOPLAY_INTERVAL = 5000;

export default function Sustain() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 md:px-8 flex justify-center w-full">
      <div className="relative w-full max-w-[1400px] mx-auto aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2.2/1] rounded-3xl overflow-hidden shadow-2xl">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Sustainability visual ${currentIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091522]/90 via-[#091522]/40 to-transparent"></div>

        {/* Content Container */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 lg:p-16 xl:p-20 flex flex-col justify-end h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="max-w-5xl"
            >
              <p className="text-white text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-[45px] font-['Outfit'] md:translate-x-5 md:translate-y-[-60px] leading-[1.2] mb-6 md:mb-12 md:mb-16 tracking-tight">
                {quotes[currentIndex]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-3 md:gap-4 md:translate-y-[-10px]">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative h-1 md:h-1.5 w-12 md:w-16 lg:w-24 bg-white/30 rounded-full overflow-hidden focus:outline-none transition-transform hover:scale-105"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex && (
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: "linear" }}
                    key={`progress-${currentIndex}`}
                  />
                )}
                {index < currentIndex && (
                  <div className="absolute top-0 left-0 h-full w-full bg-white rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
