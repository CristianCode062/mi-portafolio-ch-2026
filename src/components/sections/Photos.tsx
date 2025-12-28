import { motion } from "framer-motion";
import DomeGallery from "./DomeGallery";
import NeuralBackground from "../background/NeuralBackground";
import { photos } from "../../data/photos";

export default function Photos() {
  const images = photos.map(photo => ({
    src: photo.url,
    alt: photo.title,
  }));

  return (
    <section
      id="photos"
      className="
        relative
        w-full
        min-h-screen
        py-20
        overflow-visible
        bg-black
      "
    >
      {/* FONDO NEURONAL */}
      <NeuralBackground />

      {/* CONTENIDO */}
      <div className="relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-6 text-center mb-8"
        > 
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Galería <span className="text-blue-400">3D</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Exploración visual en un entorno neuronal interactivo.
          </p>
        </motion.div>

        {/* GALERÍA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full h-[450px] md:h-[500px]"
        >
          <DomeGallery
            images={images}
            fit={0.32}
            fitBasis="height"
            padFactor={0.15}
            overlayBlurColor="#000000"
            maxVerticalRotationDeg={14}
            dragSensitivity={14}
            enlargeTransitionMs={450}
            segments={36}
            dragDampening={1.4}
            openedImageWidth="85vw"
            openedImageHeight="80vh"
            imageBorderRadius="18px"
            openedImageBorderRadius="28px"
            grayscale={false}
          />
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 flex justify-center"
        >
          <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 text-sm text-gray-300">
            <span>🖱️ Arrastra</span>
            <span className="opacity-40">|</span>
            <span>👆 Click para ampliar</span>
            <span className="opacity-40">|</span>
            <span className="text-blue-400 font-semibold">
              {photos.length} fotos
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}