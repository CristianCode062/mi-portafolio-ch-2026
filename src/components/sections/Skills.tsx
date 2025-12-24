export default function Skills() {
  const skills = [
    "Arquitectura de Software",
    "Liderazgo Técnico",
    "Backend Escalable",
    "IA Aplicada",
    "IoT",
    "DevOps",
    "Seguridad",
  ];

  return (
    <section id="skills" className="py-20 px-4">
      <h2 className="text-4xl text-white font-bold text-center mb-12">
        Habilidades Clave
      </h2>

      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
        {skills.map((s) => (
          <span
            key={s}
            className="px-4 py-2 bg-cyan-600/20 text-cyan-300 rounded-full"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
