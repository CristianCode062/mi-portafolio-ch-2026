"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const START_AT = 2;

  const handleLoadedData = () => {
    const video = videoRef.current;
    if (!video) return;

    // Forzar inicio en segundo 2
    video.currentTime = START_AT;

    // Asegurar reproducción
    video.play().catch(() => {});
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    // Loop suave antes del final
    if (video.currentTime >= video.duration - 0.2) {
      video.currentTime = START_AT;
      video.play().catch(() => {});
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-black overflow-hidden">

      {/* VIDEO RIGHT */}
      <div className="absolute top-0 right-0 h-full w-full lg:w-1/2 overflow-hidden">
        <video
          ref={videoRef}
          className="hero-video h-full w-full object-cover"
          src="/videos/hero.mp4"
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          loop={false}   // ❗ manejamos loop manual
          playsInline
          preload="auto"
          onLoadedData={handleLoadedData}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>

      {/* DEGRADADO AST */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/30 z-10" />

      {/* CONTENIDO */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Cristian Hernández
          </h1>

          <h2 className="text-xl md:text-2xl text-cyan-400 mb-6">
            Senior Software Engineer · Tech Lead · Project Manager
          </h2>

          <p className="text-slate-300 leading-relaxed mb-10">
            Ingeniero Informático especializado en el diseño, desarrollo y
            liderazgo de sistemas tecnológicos críticos de alta complejidad,
            integrando software, IoT, inteligencia artificial y automatización
            a escala industrial.
          </p>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition"
          >
            Contacto →
          </a>
        </motion.div>
      </div>

      {/* LÍNEA ROJA */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-red-600 z-30" />
    </section>
  );
}
