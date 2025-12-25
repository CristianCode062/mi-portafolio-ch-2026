import { motion } from "framer-motion";

export default function PortfolioLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Matrix-style loader */}
        <motion.div
          className="text-green-400 text-3xl font-mono tracking-widest"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          LOADING
        </motion.div>

        {/* Animated bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-green-900/40">
          <motion.div
            className="h-full bg-green-400"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
