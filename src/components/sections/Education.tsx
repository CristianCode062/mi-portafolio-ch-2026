import { motion, Variants } from "framer-motion";
import { GraduationCap, Cpu, Workflow } from "lucide-react";
import { education } from "../../data/education";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const iconByType = {
  degree: <GraduationCap className="text-cyan-400" />,
  secondary: <Cpu className="text-blue-400" />,
  course: <Workflow className="text-emerald-400" />,
};

export default function Education() {
  return (
    <section id="educacion" className="relative px-6 py-32">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-20 max-w-4xl text-center"
      >
        <h2 className="text-5xl font-bold tracking-tight">Educación</h2>
        <p className="mt-6 text-lg text-slate-400">
          Formación académica y especialización continua orientada al desarrollo
          de sistemas complejos, automatización e ingeniería de software.
        </p>
      </motion.div>

      {/* Timeline */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto max-w-4xl space-y-10"
      >
        {education.map((e, i) => (
          <motion.article
            key={i}
            variants={item}
            whileHover={{ y: -6 }}
            className="relative rounded-2xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur-xl"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-500 hover:opacity-100" />

            <div className="relative flex gap-4">
              <div className="mt-1">{iconByType[e.type]}</div>

              <div>
                <h3 className="text-xl font-semibold text-white">
                  {e.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {e.institution} · {e.period}
                </p>
                <p className="mt-4 text-slate-300 leading-relaxed">
                  {e.description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
