import { motion } from "framer-motion";
import ProfileCard from "@/components/ui/ProfileCard";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 bg-black/40">
      <div className="max-w-4xl text-center relative z-20">
        {/* ProfileCard React Bits */}
        <div className="flex justify-center mb-12">
          <ProfileCard
            avatarUrl="/CH.jpeg"
            name=""
            title=""
            handle="cristiancodes"
            status="Online"
            contactText="Contact Me"
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={false}
            behindGlowEnabled={false}
            behindGlowColor="rgba(6, 182, 212, 0.5)"
            behindGlowSize="50%"
            innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
            onContactClick={() => {
              const contactSection = document.getElementById("contacto");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </div>

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

      {/* Barra roja decorativa al final de la sección */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
    </div>
  );
}