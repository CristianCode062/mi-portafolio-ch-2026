import { motion, Variants } from "framer-motion";
import { GraduationCap, Cpu, Workflow } from "lucide-react";
import { education } from "../../data/education";

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ---------------- Icon map ---------------- */

const iconByType = {
  degree: {
    icon: <GraduationCap size={20} />,
    color: "text-cyan-400 bg-cyan-400/10",
  },
  secondary: {
    icon: <Cpu size={20} />,
    color: "text-blue-400 bg-blue-400/10",
  },
  course: {
    icon: <Workflow size={20} />,
    color: "text-emerald-400 bg-emerald-400/10",
  },
};

/* ---------------- Component ---------------- */

export default function EducationCards() {
  return (
    <section id="educacion" className="relative px-6 py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mx-auto mb-20 max-w-4xl text-center"
      >
        <h2 className="text-5xl font-bold tracking-tight">Educación</h2>
        <p className="mt-6 text-lg text-slate-400">
          Formación académica y especialización continua orientada a ingeniería
          de software, sistemas y automatización.
        </p>
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3"
      >
        {education.slice(0, 3).map((e, i) => {
          const meta = iconByType[e.type];

          return (
            <motion.article
              key={i}
              variants={card}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Icon */}
              <div
                className={`relative mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${meta.color}`}
              >
                {meta.icon}
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-semibold">{e.title}</h3>
              <p className="relative mt-1 text-sm text-slate-400">
                {e.institution} · {e.period}
              </p>

              <p className="relative mt-5 text-slate-300 leading-relaxed">
                {e.description}
              </p>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
