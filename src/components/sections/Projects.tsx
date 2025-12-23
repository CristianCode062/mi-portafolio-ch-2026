import { projects } from "../../data/projects";
import AnimatedNumber from "../effects/AnimatedNumber";

export default function Projects() {
  return (
    <section id="proyectos" className="py-20 px-4">
      <h2 className="text-4xl text-white font-bold text-center mb-12">
        Proyectos
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {projects.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.id}
              className="bg-slate-900/60 rounded-xl p-6 text-white"
            >
              <Icon size={32} className="text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="text-gray-300 mb-4">{p.description}</p>
              {Object.entries(p.stats).map(([k, v]) => (
                <div key={k}>
                  {k}: <AnimatedNumber value={v} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
