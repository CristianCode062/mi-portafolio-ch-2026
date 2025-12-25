import { motion, Variants } from "framer-motion";
import {
  Briefcase,
  Radar,
  Brain,
  Database,
  Users,
} from "lucide-react";

/* ---------------- Animations ---------------- */

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.25 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
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

/* ---------------- Page ---------------- */

export default function ExperienceTimeline() {
  return (
    <section id="experiencia" className="relative overflow-hidden px-6 py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mx-auto mb-24 max-w-4xl text-center"
      >
        <h2 className="text-5xl font-bold tracking-tight">
          Experiencia Profesional
        </h2>
        <p className="mt-6 text-lg text-slate-400">
          Rol actual como eje principal y experiencias anteriores representadas
          como nodos de evolución profesional.
        </p>
      </motion.div>

      {/* Layout */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[2fr_1fr]"
      >
        {/* MAIN EXPERIENCE */}
        <motion.article
          variants={card}
          whileHover={{ y: -6 }}
          className="relative rounded-3xl border border-white/10 bg-slate-900/70 p-10 backdrop-blur-xl"
        >
          <header className="mb-8 flex flex-col gap-3">
            <span className="flex items-center gap-2 text-sm uppercase tracking-widest text-blue-400">
              <Briefcase size={16} /> AST Networks · Chile
            </span>
            <h3 className="text-2xl font-semibold">
              Project Manager · Senior Software Engineer · Tech Lead
            </h3>
            <span className="text-sm text-slate-400">2023 — 2025</span>
          </header>

          <p className="mb-8 text-slate-300 leading-relaxed">
            Rol estratégico combinando <strong>liderazgo técnico</strong>,
            <strong> arquitectura de sistemas</strong> y
            <strong> gestión de proyectos</strong>. Diseño y ejecución de
            plataformas críticas con procesamiento de datos en tiempo real.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <Highlight
              icon={<Radar />}
              title="Plataformas de Seguridad"
              text="Integración de radares, GPS satelital e IoT con alertas automáticas en tiempo real."
            />
            <Highlight
              icon={<Brain />}
              title="IA & Automatización"
              text="Clasificación inteligente y automatización de flujos con GPT y n8n."
            />
            <Highlight
              icon={<Database />}
              title="Arquitectura & Datos"
              text="Backends escalables, SQL/NoSQL y sistemas resilientes de alta concurrencia."
            />
            <Highlight
              icon={<Users />}
              title="Liderazgo Técnico"
              text="Definición de estándares, mentoría y liderazgo de equipos backend."
            />
          </div>
        </motion.article>

        {/* TIMELINE */}
        <div className="relative flex flex-col gap-14 pl-10">
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-blue-500/40 via-purple-500/30 to-transparent" />

          <TimelineNode
            title="Oxxean S.A."
            role="Software Engineer"
            year="2022 — 2023"
            color="purple"
          >
            Desarrollo de sistema de tickets TI, automatizando flujos de soporte,
            mejorando trazabilidad y reduciendo tiempos de respuesta.
          </TimelineNode>

          <TimelineNode
            title="Clip Tecnología"
            role="Soporte Bancario / Sistemas"
            year="2022"
            color="emerald"
          >
            Operación y soporte de sistemas bancarios IBM AS400, administración de
            servidores y plataformas críticas.
          </TimelineNode>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------- Components ---------------- */

function Highlight({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
      <div className="mt-1 text-blue-400">{icon}</div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function TimelineNode({
  title,
  role,
  year,
  color,
  children,
}: {
  title: string;
  role: string;
  year: string;
  color: "purple" | "emerald" | "blue";
  children: React.ReactNode;
}) {
  const colorMap = {
    purple: "text-purple-400 bg-purple-400",
    emerald: "text-emerald-400 bg-emerald-400",
    blue: "text-blue-400 bg-blue-400",
  };

  return (
    <motion.div
      variants={card}
      whileHover={{ x: 4 }}
      className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur"
    >
      <span
        className={`absolute -left-[18px] top-7 h-3 w-3 rounded-full ${colorMap[color].split(" ")[1]}`}
      />

      <h3 className={`font-semibold ${colorMap[color].split(" ")[0]}`}>
        {title}
      </h3>
      <p className="text-sm text-slate-400">
        {role} · {year}
      </p>
      <p className="mt-3 text-sm text-slate-300 leading-relaxed">{children}</p>
    </motion.div>
  );
}
