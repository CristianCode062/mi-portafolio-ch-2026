import { education } from "../../data/education";

export default function Education() {
  return (
    <section id="educacion" className="py-20 px-4">
      <h2 className="text-4xl text-white font-bold text-center mb-12">
        Educación
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {education.map((e, i) => (
          <div
            key={i}
            className="bg-slate-900/60 p-6 rounded-xl text-gray-300"
          >
            <h3 className="text-xl font-bold text-cyan-400">{e.title}</h3>
            <p>{e.institution}</p>
            <p className="text-sm text-gray-400">{e.year}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
