import { WorldMap } from "../ui/map";
import { motion } from "framer-motion";

export default function MapSection() {
  const dots = [
    {
      start: { lat: 64.2008, lng: -149.4937, label: "Fairbanks" },
      end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
    },
    {
      start: { lat: 64.2008, lng: -149.4937, label: "Fairbanks" },
      end: { lat: -15.7975, lng: -47.8919, label: "Brasília" },
    },
    {
      start: { lat: -15.7975, lng: -47.8919, label: "Brasília" },
      end: { lat: 38.7223, lng: -9.1393, label: "Lisbon" },
    },
    {
      start: { lat: 51.5074, lng: -0.1278, label: "London" },
      end: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
    },
    {
      start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
      end: { lat: 43.1332, lng: 131.9113, label: "Vladivostok" },
    },
    {
      start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
      end: { lat: -1.2921, lng: 36.8219, label: "Nairobi" },
    },
  ];

  return (
    <div className="min-h-[500px] md:h-screen bg-white w-full flex flex-col items-center relative overflow-hidden py-12 md:py-0">
      <div className="h-10 w-full" /> {/* TOP SPACER */}

      <div className="max-w-7xl mx-auto text-center px-4 relative shrink-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className=" text-2xl md:text-4xl font-['Outfit'] text-[var(--brand)] max-w-5xl mx-auto leading-tight text-center">
            Seamlessly Connecting Global Supply Chains to <br className="hidden md:block" />
            Deliver Reliable Chemical Solutions Worldwide
          </h2>
        </motion.div>
      </div>

      <div className="h-10 w-full" /> {/* SPACER */}

      <div className="w-full flex-1 relative min-h-0 px-4 md:px-10">
        <WorldMap
          lineColor="var(--brand)"
          dots={dots}
        />
      </div>
    </div>
  );
}
