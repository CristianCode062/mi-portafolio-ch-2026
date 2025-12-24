import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "../../data/projects";
import { useRef, useState } from "react";
import { ExternalLink, ChevronRight } from "lucide-react";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section
      id="proyectos"
      ref={containerRef}
      className="relative overflow-hidden px-6 py-32 min-h-screen flex items-center"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          style={{ y }}
          className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-[150px]"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]) }}
          className="absolute right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-cyan-500/20 to-blue-500/20 blur-[130px]"
        />
      </div>

      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-sm font-medium text-purple-400">
              Portfolio de Proyectos
            </span>
          </motion.div>

          <h2 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6">
            Proyectos Destacados
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Soluciones empresariales escalables construidas con las mejores prácticas
            y tecnologías modernas
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const isHovered = hoveredId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onHoverStart={() => setHoveredId(project.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group relative h-full"
              >
                {/* Card */}
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900/90 via-slate-900/50 to-slate-900/90 backdrop-blur-xl transition-all duration-500 hover:border-white/10 hover:shadow-2xl hover:shadow-purple-500/10">
                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}40 0%, transparent 100%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative p-8 flex flex-col h-full">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="mb-6 inline-flex"
                    >
                      <div
                        className="p-4 rounded-2xl border border-white/10 bg-slate-950/50 backdrop-blur-sm"
                        style={{
                          boxShadow: `0 0 30px ${project.color}30`,
                        }}
                      >
                        <Icon size={32} style={{ color: project.color }} />
                      </div>
                    </motion.div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 mb-6 leading-relaxed flex-grow">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800/50 text-slate-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800/50 text-slate-400 border border-white/5">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-white/5">
                      {project.stats.map((stat, idx) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + idx * 0.05 }}
                          className="text-center"
                        >
                          <div className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
                            {stat.value}
                            {stat.suffix && (
                              <span className="text-lg" style={{ color: project.color }}>
                                {stat.suffix}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500 font-medium">
                            {stat.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors group/btn"
                    >
                      Ver detalles
                      <ChevronRight
                        size={16}
                        className="transition-transform group-hover/btn:translate-x-1"
                      />
                    </motion.button>
                  </div>

                  {/* Corner Accent */}
                  <div
                    className="absolute bottom-0 right-0 h-32 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(to top left, ${project.color}10 0%, transparent 100%)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-500 mb-4">
            ¿Tienes un proyecto en mente?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
          >
            Hablemos
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}