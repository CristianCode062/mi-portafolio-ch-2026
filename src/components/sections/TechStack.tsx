import { motion, useScroll, useTransform } from "framer-motion";
import { techStack } from "../../data/techStack";
import { useRef } from "react";

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="stack"
      ref={containerRef}
      className="relative overflow-hidden px-6 py-32 min-h-screen flex items-center"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y }}
          className="absolute left-1/4 top-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-[150px]"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
          className="absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-purple-500/20 to-pink-500/20 blur-[130px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-slate-900/80 to-slate-900" />
      </div>

      <div className="w-full">
        {/* Title with parallax */}
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-sm font-medium text-cyan-400">
              Tecnologías & Herramientas
            </span>
          </motion.div>
          
          <h2 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6">
            Stack Tecnológico
          </h2>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Ecosistema completo de tecnologías modernas para construir soluciones escalables,
            resilientes y de alto rendimiento en la nube.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative"
              >
                {/* Card Container */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-900/90 p-8 backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10">
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
                  
                  {/* Category Title */}
                  <div className="relative mb-8">
                    <motion.h3
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                      className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                    >
                      {group.title}
                    </motion.h3>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                      className="mt-3 h-0.5 w-16 bg-gradient-to-r from-cyan-500 to-transparent origin-left"
                    />
                  </div>

                  {/* Tech Icons Grid */}
                  <div className="relative grid grid-cols-4 gap-4">
                    {group.items.map((tech, idx) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          delay: i * 0.1 + idx * 0.05,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        whileHover={{
                          scale: 1.25,
                          rotate: [0, -5, 5, -5, 0],
                          transition: { duration: 0.4 },
                        }}
                        className="group/icon relative flex items-center justify-center"
                      >
                        {/* Icon Container */}
                        <div
                          className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-sm transition-all duration-300 group-hover/icon:border-white/30 group-hover/icon:from-slate-700/60 group-hover/icon:to-slate-800/90 group-hover/icon:shadow-lg"
                          style={{
                            boxShadow: `0 0 20px ${tech.color}20, inset 0 1px 0 rgba(255,255,255,0.1)`,
                          }}
                        >
                          {/* Glow Effect */}
                          <div
                            className="absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-300 group-hover/icon:opacity-70"
                            style={{
                              background: `radial-gradient(circle, ${tech.color}50 0%, transparent 70%)`,
                            }}
                          />
                          
                          {/* Icon */}
                          <div
                            className="relative text-2xl transition-all duration-300 group-hover/icon:scale-110 drop-shadow-lg"
                            style={{ 
                              color: tech.color,
                              filter: 'brightness(1.1) contrast(1.1)'
                            }}
                          >
                            {tech.icon}
                          </div>
                        </div>

                        {/* Tooltip */}
                        <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover/icon:opacity-100 group-hover/icon:-translate-y-1 z-50">
                          <div className="whitespace-nowrap rounded-lg bg-slate-950/95 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-xl border border-white/10 backdrop-blur-sm">
                            {tech.name}
                            <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-slate-950 border-l border-t border-white/10" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute bottom-0 right-0 h-32 w-32 bg-gradient-to-tl from-cyan-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-slate-500">
            Actualizado constantemente con las últimas tecnologías del mercado
          </p>
        </motion.div>
      </div>
    </section>
  );
}