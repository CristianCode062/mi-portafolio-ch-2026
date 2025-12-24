import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  onClick: () => void;
}

export default function VideoCard({ title, onClick }: VideoCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-slate-900/60 p-6 rounded-xl text-left text-white hover:bg-slate-800 shadow-lg transition-shadow"
    >
      <Play className="text-cyan-400 mb-4" />
      <h3 className="font-bold text-lg">{title}</h3>
    </motion.button>
  );
}
