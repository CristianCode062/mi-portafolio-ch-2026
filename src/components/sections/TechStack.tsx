import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { techStack } from "../../data/techStack";
import { useRef, useState, useEffect } from "react";

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Estado para controlar qué categoría se muestra
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-avanzar cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techStack.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentGroup = techStack[currentIndex];

  return (
    <section
      id="stack"
      ref={containerRef}
      className="relative overflow-hidden px-6 py-32 min-h-screen flex items-center bg-gradient-to-b from-slate-950 to-slate-900"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y }}
          className="absolute left-1/4 top-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-[150px]"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-purple-500/10 to-pink-500/10 blur-[130px]"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto">
        {/* Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="text-red-400 text-sm font-medium">
            ¿Qué buscas?
          </span>
        </motion.div>

        {/* Main Content - Layout estilo AST */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Title */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold mb-6"
            >
              <span className="text-white">Soluciones</span>
              <br />
              <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 bg-clip-text text-transparent">
                Productos
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 bg-clip-text text-transparent">
                Dispositivos
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-400 text-lg max-w-xl leading-relaxed"
            >
              Sabemos que la visibilidad total de sus activos, donde sea que estén, es esencial para su operación.
              Nosotros dominamos la tecnología y el proceso para lograrlo.
            </motion.p>
          </div>

          {/* Right Side - Tech Grid with Category */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Category Title */}
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-3xl font-bold text-white mb-8"
                >
                  {currentGroup.title}
                </motion.h3>

                {/* Tech Icons Grid */}
                <div className="grid grid-cols-4 gap-4">
                  {currentGroup.items.map((tech, idx) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: 0.3 + idx * 0.08,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.8 },
                      }}
                      className="group/icon relative"
                    >
                      {/* Icon Container - Estilo AST */}
                      <div className="relative aspect-square flex flex-col items-center justify-center rounded-lg border border-slate-700/50 bg-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/50 p-4">
                        {/* Icon */}
                        <div
                          className="text-4xl mb-3 transition-all duration-300 group-hover/icon:scale-110"
                          style={{ 
                            color: tech.color,
                          }}
                        >
                          {tech.icon}
                        </div>
                        
                        {/* Tech Name */}
                        <div className="text-xs text-slate-300 font-medium text-center">
                          {tech.name}
                        </div>

                        {/* Glow Effect on Hover */}
                        <div
                          className="absolute inset-0 rounded-lg opacity-0 blur-xl transition-opacity duration-300 group-hover/icon:opacity-30 -z-10"
                          style={{
                            background: `radial-gradient(circle, ${tech.color}40 0%, transparent 70%)`,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="flex gap-2 mt-8">
              {techStack.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="group relative"
                  aria-label={`Ver ${techStack[idx].title}`}
                >
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-12 bg-gradient-to-r from-red-500 to-pink-500"
                        : "w-8 bg-slate-700 group-hover:bg-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Barra roja decorativa al final de la sección */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-900 to-transparent"></div>
    </section>
  );
}