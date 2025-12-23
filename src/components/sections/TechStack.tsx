import { techStack } from "../../data/techStack";
import ScrollReveal from "../effects/ScrollReveal";

export default function TechStack() {
  return (
    <section id="stack" className="py-20 px-4">
      <ScrollReveal>
        <h2 className="text-4xl text-white font-bold text-center mb-12">
          Stack Tecnológico
        </h2>
      </ScrollReveal>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {Object.entries(techStack).map(([key, items]) => (
          <div
            key={key}
            className="bg-slate-900/60 rounded-xl p-6 text-gray-300"
          >
            <h3 className="text-xl font-bold text-cyan-400 mb-4 capitalize">
              {key}
            </h3>
            <ul className="space-y-1">
              {items.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
