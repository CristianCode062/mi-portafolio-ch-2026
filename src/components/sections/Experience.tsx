export default function Experience() {
  return (
    <div className="max-w-6xl mx-auto py-24 px-6">
      <h3 className="text-3xl font-semibold mb-10">Experiencia Profesional</h3>

      <div className="space-y-10">
        <div>
          <h4 className="text-xl font-semibold">
            AST Networks — Project Manager / Senior Software Engineer / Tech Lead
          </h4>
          <p className="text-sm text-slate-400 mb-3">2023 – 2025 · Chile</p>

          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>
              Liderazgo técnico y gestión de proyectos críticos para sectores
              acuícola, logístico y de seguridad.
            </li>
            <li>
              Diseño de arquitecturas backend capaces de procesar millones de
              eventos en tiempo real.
            </li>
            <li>
              Integración de radares, GPS satelital, sensores IoT e IA aplicada.
            </li>
            <li>
              Automatización inteligente con n8n, reduciendo tiempos de respuesta
              y dependencia humana.
            </li>
            <li>
              Integración de GPT-3.5 / GPT-4 y ElevenLabs para análisis y alertas por voz.
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold">
            Oxxean S.A. — Software Engineer
          </h4>
          <p className="text-sm text-slate-400 mb-3">2022 – 2023 · Chile</p>

          <p className="text-slate-300">
            Desarrollo de sistema de tickets y automatización de flujos para
            soporte TI, mejorando trazabilidad y tiempos de respuesta.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold">
            Clip Tecnología — Soporte Bancario / Sistemas
          </h4>
          <p className="text-sm text-slate-400 mb-3">2022 · Chile</p>

          <p className="text-slate-300">
            Soporte y operación de sistemas IBM AS400, administración de
            servidores y plataformas críticas para bancos de alto estándar.
          </p>
        </div>
      </div>
    </div>
  );
}
