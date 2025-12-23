import { Mail, MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import SplitText from "../SplitText";

export default function Hero({ onScroll }: { onScroll: (id: string) => void }) {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <motion.h1 className="text-6xl font-bold mb-4">
          <SplitText text="Cristian Hernández" />
        </motion.h1>

        <p className="text-cyan-400 text-2xl mb-2">
          Project Manager – Full Stack
        </p>
        <p className="text-gray-300 mb-8">Ingeniero Informático</p>

        <div className="flex justify-center gap-4 mb-8">
          <a
            href="mailto:emilianohu@icloud.com"
            className="px-6 py-3 bg-blue-600 rounded-lg flex items-center gap-2"
          >
            <Mail /> Email
          </a>
          <span className="flex items-center gap-2 text-gray-300">
            <MapPin /> Puerto Montt
          </span>
        </div>

        <button onClick={() => onScroll("acerca")}>
          <ChevronDown size={40} />
        </button>
      </div>
    </section>
  );
}
