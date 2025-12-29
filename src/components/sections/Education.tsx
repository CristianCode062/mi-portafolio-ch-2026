import React from "react";

/* =========================
   CONTENEDOR BASE (Glass)
========================= */
const GlassCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div
    className="
      rounded-2xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      p-6
      transition-all
      hover:border-cyan-400/40
    "
  >
    <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
    {children}
  </div>
);

/* =========================
   EDUCACIÓN
========================= */
const Education = () => (
  <GlassCard title="Educación">
    <div className="space-y-4 text-sm text-gray-300">
      <div>
        <p className="font-semibold text-white">Ingeniería Informática</p>
        <p>Universidad Santo Tomás · 2016 – 2021</p>
      </div>

      <div>
        <p className="font-semibold text-white">
          Educación Media Técnico Profesional
        </p>
        <p>Liceo Politécnico Holanda · 2010 – 2013</p>
      </div>

      <div>
        <p className="font-semibold text-white">
          Automatización e Inteligencia Artificial
        </p>
        <p>n8n · 2025</p>
      </div>
    </div>
  </GlassCard>
);

/* =========================
   PERFIL
========================= */
const Profile = () => (
  <GlassCard title="Perfil Profesional">
    <p className="text-sm text-gray-300 leading-relaxed">
      Desarrollador Fullstack con formación en ingeniería informática,
      orientado a la creación de soluciones escalables, automatización
      de procesos y buenas prácticas de desarrollo. Enfocado en la
      mejora continua y en entregar valor real mediante software.
    </p>
  </GlassCard>
);

/* =========================
   METAS
========================= */
const Goals = () => (
  <GlassCard title="Metas Profesionales">
    <p className="text-sm text-gray-300 leading-relaxed">
      Consolidarme como desarrollador senior, participar en proyectos
      de alto impacto tecnológico y especializarme en arquitectura de
      software, automatización e inteligencia artificial aplicada a
      procesos reales.
    </p>
  </GlassCard>
);

/* =========================
   HABILIDADES CLAVES (BLANDAS + PERSONALES)
========================= */
const KeySkills = () => (
  <GlassCard title="Habilidades Claves">
    <ul className="space-y-2 text-sm text-gray-300">
      <li>✔ Pensamiento analítico y resolución de problemas</li>
      <li>✔ Autonomía y aprendizaje autodidacta</li>
      <li>✔ Comunicación efectiva con equipos técnicos y de negocio</li>
      <li>✔ Responsabilidad y compromiso profesional</li>
      <li>✔ Capacidad de adaptación a nuevos desafíos</li>
      <li>✔ Enfoque en calidad, buenas prácticas y mejora continua</li>
    </ul>
  </GlassCard>
);

/* =========================
   HABILIDADES DURAS
========================= */
const HardSkills = () => (
  <GlassCard title="Habilidades Duras">
    <div className="space-y-3 text-sm text-gray-300">
      <p>
        <span className="text-white font-semibold">Frontend:</span>{" "}
        React, Angular, Tailwind CSS
      </p>
      <p>
        <span className="text-white font-semibold">Backend:</span>{" "}
        Node.js, Java
      </p>
      <p>
        <span className="text-white font-semibold">Bases de Datos:</span>{" "}
        PostgreSQL, MongoDB
      </p>
      <p>
        <span className="text-white font-semibold">Arquitectura:</span>{" "}
        APIs REST, Microservicios
      </p>
      <p>
        <span className="text-white font-semibold">DevOps:</span>{" "}
        Docker, Git, CI/CD
      </p>
      <p>
        <span className="text-white font-semibold">Automatización:</span>{" "}
        n8n, Integración de APIs, IA
      </p>
    </div>
  </GlassCard>
);

/* =========================
   SECCIÓN PRINCIPAL
========================= */
const EducationSkillsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-white mb-4">
        Educación & Competencias
      </h2>

      <p className="text-gray-400 mb-12 max-w-3xl">
        Formación académica, habilidades técnicas y competencias clave
        que respaldan mi desarrollo como ingeniero de software.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* IZQUIERDA */}
        <div className="lg:col-span-2 space-y-8">
          <Education />
          <Profile />
          <Goals />
        </div>

        {/* DERECHA */}
        <div className="lg:col-span-1 space-y-8">
          <KeySkills />
          <HardSkills />
        </div>
      </div>
    </section>
  );
};

export default EducationSkillsSection;
