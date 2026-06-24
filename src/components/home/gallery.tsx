import { motion } from "framer-motion";

const Gallery = () => {
  return (
    <section className="w-full pt-16 pb-16 md:pt-32 md:pb-32 px-6 md:px-12 lg:px-24 bg-white overflow-hidden flex flex-col items-center gap-18">
      {/* Header Section */}
      <div className="flex flex-col items-center w-full">
        <div className="w-[1.5px] h-24 bg-[var(--brand)] mb-10 opacity-80" />
        <h2 className="text-3xl md:text-[40px] font-['Outfit'] text-[var(--brand)] text-center tracking-tight leading-none">
          Capabilities That Go Beyond Chemistry
        </h2>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-[1100px] w-full grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Top Row */}
        <motion.div
          className="md:col-span-8 aspect-[2/1] md:aspect-auto bg-[#e5e5e5] rounded-[24px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        />
        <motion.div
          className="md:col-span-4 aspect-[1/1] bg-[#e5e5e5] rounded-[24px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        />

        {/* Bottom Row */}
        <motion.div
          className="md:col-span-4 aspect-[1/1] bg-[#e5e5e5] rounded-[24px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        />
        <motion.div
          className="md:col-span-8 aspect-[2/1] md:aspect-auto bg-[#e5e5e5] rounded-[24px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        />
      </div>

      <div className="h-10 w-full" />
    </section>
  );
};

export default Gallery;
