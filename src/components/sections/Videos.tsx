import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { videos } from "../../data/videos";
import VideoCard from "./VideoCard";

export default function Videos() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="videos" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <h2 className="text-4xl text-white font-bold text-center mb-12">
        Videos & Demos
      </h2>

      <motion.div
        className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {videos.map((v) => (
          <VideoCard key={v.id} title={v.title} onClick={() => setActive(v.url)} />
        ))}
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Cerrar video"
                className="absolute -top-10 right-0 text-white"
              >
                <X size={32} />
              </button>
              <iframe
                src={active}
                title="Video Demo"
                className="w-full h-full rounded-xl shadow-2xl"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
