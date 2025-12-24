import { motion, Variants } from "framer-motion";
import {
  Briefcase,
  Radar,
  Brain,
  Cpu,
  Database,
  Users,
} from "lucide-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const card: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },
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

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="relative overflow-hidden px-6 py-32"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[140px]" />
        <div className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mb-24 max-w-4xl text-center"
      >
        <h2 className="text-5xl font-bold tracking-tight">
          Experiencia Profesional
        </h2>
        <p className="mt-6 text-lg text-slate-400">
          Construyendo plataformas críticas, liderando equipos técnicos y
          diseñando arquitecturas que operan en tiempo real en entornos
          industriales y de seguridad.
        </p>
      </motion.div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        className="mx-auto grid max-w-6xl gap-16"
      >
        {/* AST Networks */}
        <motion.article
          variants={card}
          whileHover={{ y: -6 }}
          className="relative rounded-3xl border border-white/10 bg-slate-900/70 p-10 backdrop-blur-xl"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 hover:opacity-100" />

          <header className="relative mb-8 flex flex-col gap-3">
            <span className="flex items-center gap-2 text-sm uppercase tracking-widest text-blue-400">
              <Briefcase size={16} />
              AST Networks · Chile
            </span>
            <h3 className="text-2xl font-semibold">
              Project Manager · Senior Software Engineer · Tech Lead
            </h3>
            <span className="text-sm text-slate-400">2023 — 2025</span>
          </header>

          <p className="relative mb-8 text-slate-300 leading-relaxed">
            Rol estratégico combinando <strong>liderazgo técnico</strong>,{" "}
            <strong>arquitectura de sistemas</strong> y{" "}
            <strong>gestión de proyectos</strong>. Responsable del diseño y
            ejecución de plataformas de alta criticidad para clientes del sector
            acuícola, logístico y de seguridad, operando con procesamiento de
            datos en tiempo real.
          </p>

          {/* Highlights */}
          <div className="relative grid gap-6 md:grid-cols-2">
            <Highlight
              icon={<Radar />}
              title="Plataformas de Seguridad en Tiempo Real"
              text="Integración de radares Spotter, GPS satelitales y sensores IoT,
              correlacionando millones de eventos por segundo con generación de
              alertas tempranas automáticas."
            />

            <Highlight
              icon={<Brain />}
              title="IA Aplicada y Automatización"
              text="Clasificación inteligente de personas y embarcaciones,
              análisis contextual con GPT-3.5 / GPT-4 y automatización de flujos
              mediante n8n, reduciendo intervención humana."
            />

            <Highlight
              icon={<Database />}
              title="Arquitectura y Datos"
              text="Diseño de arquitecturas backend escalables y resilientes,
              administración de bases de datos SQL y NoSQL de gran escala,
              optimizadas para alta concurrencia."
            />

            <Highlight
              icon={<Users />}
              title="Liderazgo Técnico"
              text="Definición de estándares, diseño de mockups y modelado de
              datos, liderazgo y mentoría de desarrolladores backend en proyectos
              críticos."
            />
          </div>

          <div className="relative mt-8 rounded-xl bg-black/30 p-4 text-sm text-slate-400">
            <strong>Clientes y proyectos:</strong> Aquachile, Salmones Austral,
            Yadran · Sistemas comparables a plataformas GMT adaptadas a entornos
            locales e industriales.
          </div>
        </motion.article>

        {/* Oxxean */}
        <motion.article
          variants={card}
          whileHover={{ y: -6 }}
          className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur"
        >
          <h3 className="text-xl font-semibold text-purple-400">
            Oxxean S.A. — Software Engineer
          </h3>
          <p className="mt-2 text-sm text-slate-400">2022 — 2023</p>
          <p className="mt-4 text-slate-300 leading-relaxed">
            Desarrollo de un sistema de tickets para soporte TI, automatizando
            flujos de atención, mejorando trazabilidad y reduciendo tiempos de
            respuesta del área de soporte.
          </p>
        </motion.article>

        {/* Clip */}
        <motion.article
          variants={card}
          whileHover={{ y: -6 }}
          className="rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur"
        >
          <h3 className="text-xl font-semibold text-emerald-400">
            Clip Tecnología — Soporte Bancario / Sistemas
          </h3>
          <p className="mt-2 text-sm text-slate-400">2022</p>
          <p className="mt-4 text-slate-300 leading-relaxed">
            Operación y soporte de sistemas bancarios IBM AS400, administración
            de servidores y plataformas críticas, asegurando continuidad
            operacional y seguridad para bancos de alto estándar.
          </p>
        </motion.article>
      </motion.div>
    </section>
  );
}

/* ---------- Highlight Card ---------- */

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
