import { Mail, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section id="contacto" className="py-20 px-4">
      <h2 className="text-4xl text-white font-bold text-center mb-12">
        Contacto
      </h2>

      <div className="max-w-xl mx-auto text-center text-gray-300 space-y-6">
        <p>
          Disponible para proyectos, liderazgo técnico y oportunidades senior.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="mailto:emilianohu@icloud.com"
            className="text-cyan-400 hover:underline"
          >
            <Mail />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="text-cyan-400"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com/CristianCode062"
            target="_blank"
            className="text-cyan-400"
          >
            <Github />
          </a>
        </div>
      </div>
    </section>
  );
}
