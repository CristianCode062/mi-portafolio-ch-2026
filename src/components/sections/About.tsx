import ScrollReveal from "../effects/ScrollReveal";

export default function About() {
  return (
    <section id="acerca" className="py-20 px-4">
      <ScrollReveal>
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Acerca de Mí
        </h2>
      </ScrollReveal>

      <div className="max-w-4xl mx-auto text-gray-300 space-y-4">
        <p>
          Líder tecnológico con fuerte base técnica, especializado en backend,
          IoT, IA y sistemas críticos.
        </p>
        <p>
          Experiencia real liderando proyectos end-to-end en producción,
          procesando millones de eventos por segundo.
        </p>
      </div>
    </section>
  );
}
