export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Cristian Hernández
        </h1>

        <h2 className="text-xl md:text-2xl text-blue-300 mb-6">
          Senior Software Engineer · Tech Lead · Project Manager
        </h2>

        <p className="text-slate-300 leading-relaxed mb-8">
          Ingeniero Informático especializado en el diseño, desarrollo y liderazgo
          de sistemas tecnológicos críticos de alta complejidad, integrando
          software, IoT, inteligencia artificial y automatización a escala industrial.
        </p>

        <div className="flex justify-center gap-4">
          <a href="#contacto" className="px-6 py-3 bg-blue-600 rounded-full">
            Contacto
          </a>
          <a href="#proyectos" className="px-6 py-3 border border-white/30 rounded-full">
            Ver proyectos
          </a>
        </div>
      </div>
    </div>
  );
}
