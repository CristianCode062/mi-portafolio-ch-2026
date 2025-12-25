import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import { projects } from "../../data/projects";
import { useRef, useState, useEffect } from "react";
import { Sparkles, Code2, Zap, ExternalLink } from "lucide-react";

/* =========================
   MAIN SECTION
========================= */

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  return (
    <section
      id="proyectos"
      className="relative bg-black px-6 pt-32 pb-24 overflow-hidden"
    >
      {/* ANIMATED GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* FLOATING PARTICLES */}
      <FloatingParticles />

      {/* GRADIENT ORBS */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/30 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]"
      />

      <div className="max-w-7xl mx-auto relative">
        {/* HEADER */}
        <div ref={headerRef} className="overflow-hidden">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isHeaderInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <Sparkles className="w-12 h-12 text-red-500" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Sparkles className="w-12 h-12 text-purple-500 opacity-50" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h2
            initial={{ y: 100, opacity: 0, filter: "blur(10px)" }}
            animate={isHeaderInView ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="text-center text-5xl md:text-7xl font-bold text-white mb-4"
          >
            <span className="bg-gradient-to-r from-white via-red-100 to-purple-100 bg-clip-text text-transparent">
              Proyectos Destacados
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-slate-400 text-lg mb-8"
          >
            Experiencias digitales que inspiran y transforman
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isHeaderInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
            className="relative w-32 h-1 mx-auto mb-24 origin-center overflow-hidden rounded-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500" />
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
            />
          </motion.div>
        </div>

        {/* FEATURED PROJECTS */}
        <div>
          {projects
            .filter((p) => p.featured)
            .map((project, index, arr) => (
              <div key={project.id}>
                <FeaturedProject
                  project={project}
                  reverse={index % 2 !== 0}
                  index={index}
                />

                {/* SEPARATOR */}
                {index < arr.length - 1 && <ProjectDivider />}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   FLOATING PARTICLES
========================= */

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 20,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-red-500/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* =========================
   FEATURED PROJECT
========================= */

function FeaturedProject({
  project,
  reverse,
  index,
}: {
  project: any;
  reverse: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  const y = useTransform(smoothProgress, [0, 1], [80, -80]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const rotate = useTransform(smoothProgress, [0, 1], [reverse ? 2 : -2, reverse ? -2 : 2]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20 pb-12"
    >
      {/* VIDEO */}
      <motion.div
        style={{ y, scale, rotate }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`relative aspect-video group ${reverse ? "lg:order-2" : ""}`}
      >
        {/* MULTI-LAYER GLOW */}
        <motion.div
          animate={{
            opacity: isHovered ? [0.4, 0.8, 0.4] : 0,
            scale: isHovered ? [1, 1.08, 1] : 1,
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -inset-4 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl"
        />
        
        <motion.div
          animate={{
            opacity: isHovered ? 0.6 : 0,
            rotate: [0, 360],
          }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
          className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-0"
        />

        {/* VIDEO CONTAINER */}
        <div
          className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-2xl overflow-hidden border-2 border-slate-700/50 group-hover:border-red-500/50 transition-all duration-500"
        >
          {/* CORNER FRAMES */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-red-500 rounded-tl-2xl z-10"
          />
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-purple-500 rounded-tr-2xl z-10"
          />
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-pink-500 rounded-bl-2xl z-10"
          />
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-cyan-500 rounded-br-2xl z-10"
          />

          {/* VIDEO */}
          <video
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover relative z-0"
            style={{ willChange: 'auto' }}
          />

          {/* GRADIENT OVERLAY */}
          <motion.div
            animate={{ opacity: isHovered ? 0.2 : 0.5 }}
            className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-[1]"
          />

          {/* SCAN LINE EFFECT */}
          <motion.div
            animate={{ y: isHovered ? ["0%", "100%"] : "0%" }}
            transition={{ duration: 3, repeat: isHovered ? Infinity : 0, ease: "linear" }}
            className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent z-[2] pointer-events-none opacity-0 group-hover:opacity-100"
          />

          {/* STATS OVERLAY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-4 left-4 right-4 flex gap-4 z-[3]"
          >
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10">
              <Code2 className="w-4 h-4 text-red-500" />
              <span className="text-white text-sm font-semibold">Responsive</span>
            </div>
            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-white text-sm font-semibold">Optimizado</span>
            </div>
          </motion.div>
        </div>

        {/* FLOATING ICON */}
        <motion.div
          animate={{
            y: isHovered ? [-10, -15, -10] : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl"
        >
          <ExternalLink className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>

      {/* TEXT CONTENT */}
      <motion.div
        style={{ opacity }}
        className={reverse ? "lg:text-right" : ""}
      >
        <motion.span
          initial={{ opacity: 0, x: reverse ? 30 : -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.3 + 0.2 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-red-500 font-bold bg-gradient-to-r from-red-500/10 to-purple-500/10 px-5 py-2.5 rounded-full border border-red-500/30 backdrop-blur-sm"
        >
          <Sparkles className="w-3 h-3" />
          Proyecto destacado
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: index * 0.3 + 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black mt-6 mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            {project.title}
          </span>
        </motion.h3>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.3 + 0.4 }}
          className={`h-1 w-24 bg-gradient-to-r from-red-500 to-purple-500 rounded-full mb-6 ${
            reverse ? "lg:ml-auto" : ""
          }`}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.3 + 0.5 }}
          className="text-slate-300 text-xl leading-relaxed max-w-2xl"
        >
          {project.description}
        </motion.p>

        {/* TECH STACK */}
        {project.tech && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.3 + 0.6 }}
            className={`flex flex-wrap gap-3 mt-8 ${reverse ? "lg:justify-end" : ""}`}
          >
            {project.tech.map((tech: string, i: number) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: index * 0.3 + 0.7 + i * 0.08,
                  type: "spring",
                }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -5,
                  boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)",
                }}
                className="px-4 py-2 bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-md text-slate-200 text-sm font-semibold rounded-xl border border-slate-700/50 hover:border-red-500/50 transition-all cursor-default shadow-lg"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* =========================
   PROJECT DIVIDER
========================= */

function ProjectDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} className="relative w-full pt-16 pb-32">
      {/* FLOATING ICONS */}
      <div className="flex justify-center items-center gap-4 mb-12">
        {[Code2, Zap, Sparkles].map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { 
              scale: 1, 
              rotate: 0,
              y: [0, -10, 0],
            } : {}}
            transition={{
              scale: { duration: 0.6, delay: i * 0.1 },
              rotate: { duration: 0.6, delay: i * 0.1 },
              y: { duration: 2, repeat: Infinity, delay: i * 0.3 },
            }}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 border border-red-500/30 flex items-center justify-center backdrop-blur-sm"
          >
            <Icon className="w-4 h-4 text-red-400" />
          </motion.div>
        ))}
      </div>

      {/* ANIMATED LINE */}
      <div className="relative h-[3px] w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent rounded-full overflow-hidden">
        <motion.div
          style={{ scaleX }}
          className="absolute inset-0 origin-left bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 rounded-full"
        />
        
        <motion.div
          style={{ scaleX }}
          className="absolute inset-0 origin-left bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75"
        />

        <motion.div
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
        />
      </div>
    </div>
  );
}