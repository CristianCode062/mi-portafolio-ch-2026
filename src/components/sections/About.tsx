"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, PanInfo, AnimatePresence } from "framer-motion";
import { 
  FaCamera, FaPhone, FaEnvelope, FaSafari, FaMusic, FaAppStoreIos,
  FaCog, FaWifi, FaBatteryFull, FaSignal, FaHeart, FaComment,
  FaShare, FaChevronLeft, FaSearch, FaClock, FaBook, FaTiktok,
  FaPlay, FaCalculator
} from "react-icons/fa";
import { 
  IoLocationSharp, IoHome, IoCalendar, IoFitness, IoNewspaper 
} from "react-icons/io5";
import { 
  MdMessage, MdPhotoLibrary, MdContacts, MdNotes, MdNotifications 
} from "react-icons/md";
import { BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineCompass } from "react-icons/ai";

/* ======================================================
   DATOS DE DEMOSTRACIÓN (Reemplaza con tus propios videos)
====================================================== */
const tiktokVideos = [
  {
    url: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-308-large.mp4",
    username: "@neuroeac.cl",
    description: "Construyendo el futuro con código limpio 💻 #DevLife",
    likes: "3.2K",
    comments: "220",
    shares: "110"
  },
  {
    url: "https://assets.mixkit.co/videos/preview/mixkit-server-lights-in-a-data-center-3243-large.mp4",
    username: "@neuroeac.cl",
    description: "Arquitecturas distribuidas que escalan 📈",
    likes: "1.8K",
    comments: "95",
    shares: "45"
  },
  {
    url: "https://assets.mixkit.co/videos/preview/mixkit-artificial-intelligence-concept-animation-988-large.mp4",
    username: "@neuroeac.cl",
    description: "IoT + IA = Futuro 🤖 #TechInnovation",
    likes: "4.1K",
    comments: "305",
    shares: "175"
  }
];

const galleryPhotos = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300&h=300&fit=crop",
];

/* ======================================================
   COMPONENTE PRINCIPAL
====================================================== */
export default function About() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<"home" | "photos" | "gallery" | "apps" | "tiktok">("home");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  
  // TikTok State
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isLiked, setIsLiked] = useState<{ [key: number]: boolean }>({});
  const [isPlaying, setIsPlaying] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const dragX = useMotionValue(0);
  const [currentTime, setCurrentTime] = useState("09:41");

  // Reloj
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Manejo de reproducción de video al cambiar pantallas
  useEffect(() => {
    if (currentScreen === 'tiktok' && videoRef.current) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
    } else if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
    }
  }, [currentScreen]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setCurrentVideo((prev) => (prev + 1) % tiktokVideos.length);
    } else if (info.offset.x > threshold) {
      setCurrentVideo((prev) => (prev - 1 + tiktokVideos.length) % tiktokVideos.length);
    }
    dragX.set(0);
  };

  const handleLike = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLiked(prev => ({ ...prev, [index]: !prev[index] }));
    
    if (!isLiked[index]) {
      const heartBurst = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50
      }));
      setHearts(prev => [...prev, ...heartBurst]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => !heartBurst.find(b => b.id === h.id)));
      }, 2000);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-slate-950 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent z-10"></div>

      {/* Fondo Animado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black opacity-80 z-0" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen z-10">
        
        {/* LADO IZQUIERDO: iPhone 3D */}
        <div className="relative w-full h-screen flex items-center justify-center p-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
            style={{ perspective: "2000px" }}
          >
            <motion.div
              animate={{ 
                rotateY: [0, 5, -5, 0],
                rotateX: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-[360px] h-[740px] bg-slate-900 rounded-[60px] shadow-2xl border-[8px] border-slate-800"
              style={{ 
                  transformStyle: "preserve-3d",
                  boxShadow: "0 0 0 2px #334155, 0 20px 50px -10px rgba(0,0,0,0.5)"
               }}
            >
              {/* Dynamic Island */}
              <motion.div 
                className="absolute top-4 left-1/2 -translate-x-1/2 bg-black rounded-full z-50 flex items-center justify-center gap-2 overflow-hidden border border-slate-800/50"
                animate={{
                  width: currentScreen === "tiktok" && isPlaying ? "130px" : "110px",
                  height: "30px"
                }}
              >
                <div className="w-2 h-2 bg-slate-800 rounded-full"></div>
                {currentScreen === "tiktok" && isPlaying && (
                  <div className="flex items-center gap-1 h-full">
                    <span className="w-0.5 h-3 bg-green-500 animate-pulse rounded-full" />
                    <span className="w-0.5 h-4 bg-green-500 animate-pulse delay-75 rounded-full" />
                    <span className="w-0.5 h-2 bg-green-500 animate-pulse delay-150 rounded-full" />
                  </div>
                )}
              </motion.div>

              {/* Pantalla Interna */}
              <div className="absolute inset-[8px] bg-black rounded-[52px] overflow-hidden">
                
                <AnimatePresence mode="wait">
                    {currentScreen === "home" && (
                    <HomeScreen key="home" setCurrentScreen={setCurrentScreen} currentTime={currentTime} />
                    )}

                    {currentScreen === "tiktok" && (
                    <TikTokScreen
                        key="tiktok"
                        videos={tiktokVideos}
                        currentVideo={currentVideo}
                        handleDragEnd={handleDragEnd}
                        dragX={dragX}
                        handleLike={handleLike}
                        isLiked={isLiked}
                        hearts={hearts}
                        setCurrentScreen={setCurrentScreen}
                        currentTime={currentTime}
                        videoRef={videoRef}
                        isPlaying={isPlaying}
                        togglePlayPause={togglePlayPause}
                    />
                    )}

                    {currentScreen === "photos" && (
                    <PhotosScreen
                        key="photos"
                        photos={galleryPhotos}
                        setSelectedPhoto={setSelectedPhoto}
                        setCurrentScreen={setCurrentScreen}
                        currentTime={currentTime}
                    />
                    )}

                    {currentScreen === "gallery" && (
                    <GalleryScreen
                        key="gallery"
                        photos={galleryPhotos}
                        setCurrentScreen={setCurrentScreen}
                        currentTime={currentTime}
                    />
                    )}

                    {currentScreen === "apps" && (
                    <AppsScreen
                        key="apps"
                        setCurrentScreen={setCurrentScreen}
                        currentTime={currentTime}
                    />
                    )}
                </AnimatePresence>

                {/* Modal de foto */}
                <AnimatePresence>
                  {selectedPhoto !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => setSelectedPhoto(null)}
                      className="absolute inset-0 bg-black/95 z-[60] flex items-center justify-center p-2"
                    >
                      <img 
                        src={galleryPhotos[selectedPhoto]} 
                        className="max-w-full max-h-full object-contain rounded-md"
                        alt="Selected"
                      />
                      <button 
                        className="absolute top-10 right-6 text-white text-3xl opacity-80 hover:opacity-100"
                        onClick={() => setSelectedPhoto(null)}
                      >
                        ×
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Home Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-50 pointer-events-none" />
              </div>

              {/* Botones físicos (Estilo) */}
              <div className="absolute left-[-4px] top-28 w-[3px] h-8 bg-slate-700 rounded-l-md" />
              <div className="absolute left-[-4px] top-44 w-[3px] h-14 bg-slate-700 rounded-l-md" />
              <div className="absolute left-[-4px] top-60 w-[3px] h-14 bg-slate-700 rounded-l-md" />
              <div className="absolute right-[-4px] top-44 w-[3px] h-20 bg-slate-700 rounded-r-md" />

            </motion.div>
          </motion.div>
        </div>

        {/* LADO DERECHO: Contenido texto */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:pr-24 py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              <span className="text-blue-400 text-xs font-bold tracking-wider">PORTAFOLIO INTERACTIVO</span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
               Ingeniería <br/>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Full Stack
              </span>
            </h2>

            <div className="space-y-6 mb-8 text-slate-400 text-lg">
              <p>
                Ingeniero y líder tecnológico especializado en <span className="text-white font-medium">sistemas críticos</span> y plataformas distribuidas. 
              </p>
              <p>
                Diseño soluciones que integran <span className="text-cyan-400 font-medium">software, IoT e IA</span>, priorizando la escalabilidad y la experiencia de usuario.
              </p>
            </div>

            <div className="grid gap-4 mb-10">
              {[
                "Arquitecturas de Alta Disponibilidad",
                "Desarrollo Full Stack (Next.js / Python)",
                "Integración IoT & Machine Learning"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span className="text-slate-300 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="inline-flex px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
            >
                Ver Proyectos
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================
   HOME SCREEN
====================================================== */
function HomeScreen({ setCurrentScreen, currentTime }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full relative bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000')] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-black/20" />
      <StatusBar time={currentTime} />
      
      <div className="pt-16 pb-28 px-5 h-full relative z-10">
        <div className="grid grid-cols-4 gap-x-4 gap-y-6">
          <AppIcon icon={<FaPhone />} label="Teléfono" color="from-green-400 to-green-600" />
          <AppIcon icon={<FaSafari />} label="Safari" color="from-blue-400 to-blue-600" />
          <AppIcon icon={<MdMessage />} label="Mensajes" color="from-green-400 to-green-500" />
          <AppIcon icon={<FaMusic />} label="Música" color="from-red-400 to-pink-500" />
          
          <AppIcon 
            icon={<MdPhotoLibrary />} 
            label="Fotos" 
            color="from-yellow-400 via-red-400 to-pink-500" 
            onClick={() => setCurrentScreen("photos")}
          />
          <AppIcon icon={<FaCamera />} label="Cámara" color="from-gray-600 to-gray-800" />
          <AppIcon 
             icon={<FaTiktok />} 
             label="TikTok" 
             color="from-black to-gray-900" 
             onClick={() => setCurrentScreen("tiktok")}
           />
          <AppIcon icon={<IoLocationSharp />} label="Mapas" color="from-green-500 to-green-700" />
          
          <AppIcon icon={<FaClock />} label="Reloj" color="from-gray-800 to-black" />
          <AppIcon icon={<MdNotes />} label="Notas" color="from-yellow-300 to-yellow-500" />
          <AppIcon icon={<FaCog />} label="Ajustes" color="from-gray-500 to-gray-700" />
          <AppIcon 
            icon={<BsGrid3X3Gap />} 
            label="Apps" 
            color="from-indigo-500 to-purple-600" 
            onClick={() => setCurrentScreen("apps")}
          />
        </div>
      </div>

      <Dock setCurrentScreen={setCurrentScreen} />
    </motion.div>
  );
}

/* ======================================================
   TIKTOK SCREEN
====================================================== */
function TikTokScreen({ 
  videos, 
  currentVideo, 
  handleDragEnd, 
  dragX, 
  handleLike, 
  isLiked, 
  hearts,
  setCurrentScreen,
  currentTime,
  videoRef,
  isPlaying,
  togglePlayPause
}: any) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30 }}
      className="w-full h-full relative bg-black"
    >
      <StatusBar time={currentTime} />
      
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x: dragX }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onClick={togglePlayPause}
      >
        {videos.map((video: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentVideo === index ? 1 : 0,
              scale: currentVideo === index ? 1 : 0.95
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none" 
            // pointer-events-none en el wrapper para no bloquear el click, pero necesitamos que los botones sí funcionen
          >
            {/* Solo renderizamos el video si es el actual para ahorrar recursos */}
            {currentVideo === index && (
                <video
                    ref={videoRef}
                    src={video.url}
                    className="w-full h-full object-cover pointer-events-auto"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            )}
            {/* Si no es el actual, mostramos un div negro o placeholder */}
            {currentVideo !== index && <div className="w-full h-full bg-black" />}
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none"></div>
            
            {/* UI Overlay - visible solo si es el actual */}
            {currentVideo === index && (
                <>
                {/* Sidebar de interacciones */}
                <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col gap-6 z-20 pointer-events-auto">
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => handleLike(index, e)}
                    className="flex flex-col items-center gap-1"
                >
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <FaHeart className={`text-xl ${isLiked[index] ? 'text-red-500' : 'text-white'}`} />
                    </div>
                    <span className="text-white text-[10px] font-semibold">{video.likes}</span>
                </motion.button>
                
                <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <FaComment className="text-xl text-white" />
                    </div>
                    <span className="text-white text-[10px] font-semibold">{video.comments}</span>
                </div>
                
                <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <FaShare className="text-xl text-white" />
                    </div>
                    <span className="text-white text-[10px] font-semibold">{video.shares}</span>
                </div>
                </div>

                {/* Info del video */}
                <div className="absolute bottom-24 left-4 right-20 z-10 pointer-events-none text-left">
                <p className="font-bold text-white text-base mb-1 drop-shadow-md">{video.username}</p>
                <p className="text-white text-sm opacity-90 line-clamp-2 drop-shadow-md">{video.description}</p>
                </div>
                </>
            )}

            {/* Animación de corazones */}
            <AnimatePresence>
              {currentVideo === index && hearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  initial={{ opacity: 1, scale: 0, x: "50%", y: "50%" }}
                  animate={{ 
                    opacity: 0,
                    scale: [0, 1.5, 1],
                    x: `calc(50% + ${heart.x}px)`,
                    y: `calc(50% + ${heart.y}px)`,
                    rotate: Math.random() * 30 - 15
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 pointer-events-none z-50"
                >
                  <FaHeart className="text-red-500 text-5xl drop-shadow-lg" />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Indicador de play/pause */}
            <AnimatePresence>
              {!isPlaying && currentVideo === index && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                >
                  <FaPlay className="text-white/50 text-6xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Header TikTok */}
      <div className="absolute top-12 left-0 right-0 flex justify-center gap-4 z-30 pointer-events-none">
        <span className="text-white/60 text-sm font-semibold">Siguiendo</span>
        <span className="text-white text-sm font-bold border-b-2 border-white pb-0.5">Para ti</span>
      </div>

      <Dock setCurrentScreen={setCurrentScreen} showTikTok />
    </motion.div>
  );
}

/* ======================================================
   PHOTOS SCREEN
====================================================== */
function PhotosScreen({ photos, setSelectedPhoto, setCurrentScreen, currentTime }: any) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30 }}
      className="w-full h-full bg-white relative text-black"
    >
      <StatusBar time={currentTime} />
      
      <div className="absolute top-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-md flex items-end justify-between px-4 pb-3 z-30 border-b border-gray-200">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentScreen("home")}
          className="text-blue-500 text-lg font-medium flex items-center gap-1"
        >
          <FaChevronLeft size={16} /> Álbumes
        </motion.button>
        <span className="font-bold text-lg">Recientes</span>
        <span className="text-blue-500 text-sm font-medium">Seleccionar</span>
      </div>

      <div className="pt-24 pb-28 px-0.5 h-full overflow-y-auto bg-white">
        <div className="grid grid-cols-3 gap-0.5">
          {photos.map((photo: string, index: number) => (
            <motion.div
              key={index}
              onClick={() => setSelectedPhoto(index)}
              className="aspect-square relative cursor-pointer"
            >
              <img 
                src={photo} 
                alt={`Photo ${index}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <Dock setCurrentScreen={setCurrentScreen} />
    </motion.div>
  );
}

/* ======================================================
   GALLERY SCREEN
====================================================== */
function GalleryScreen({ photos, setCurrentScreen, currentTime }: any) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="w-full h-full bg-white relative text-black"
    >
      <StatusBar time={currentTime} />
      
      <div className="absolute top-0 left-0 right-0 h-28 bg-white flex items-end justify-between px-5 pb-2 z-30 border-b">
        <h1 className="font-bold text-3xl">Álbumes</h1>
        <FaSearch className="text-blue-500 text-xl mb-1" />
      </div>

      <div className="pt-28 pb-28 px-4 h-full overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col gap-2" onClick={() => setCurrentScreen("photos")}>
                 <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
                     <img src={photos[0]} className="w-full h-full object-cover" alt="" />
                     <span className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 rounded-full">{photos.length}</span>
                 </div>
                 <span className="text-sm font-medium">Recientes</span>
            </div>
            <div className="flex flex-col gap-2">
                 <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                     <FaHeart className="text-red-400 text-4xl" />
                 </div>
                 <span className="text-sm font-medium">Favoritos</span>
            </div>
        </div>
      </div>

      <Dock setCurrentScreen={setCurrentScreen} />
    </motion.div>
  );
}

/* ======================================================
   APPS SCREEN
====================================================== */
function AppsScreen({ setCurrentScreen, currentTime }: any) {
  return (
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full h-full bg-slate-800/50 backdrop-blur-xl relative"
    >
      <StatusBar time={currentTime} />

      <div className="pt-16 pb-28 px-5 h-full overflow-y-auto">
        
        <div className="mb-6 bg-gray-500/20 rounded-xl p-2 flex items-center gap-2">
             <FaSearch className="text-white/50 ml-1" />
             <span className="text-white/50 text-sm">Biblioteca de Apps</span>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <AppIcon icon={<FaPhone />} label="Teléfono" color="from-green-400 to-green-600" />
          <AppIcon icon={<MdMessage />} label="Mensajes" color="from-green-400 to-green-500" />
          <AppIcon icon={<FaSafari />} label="Safari" color="from-white to-gray-200" textColor="text-blue-500" />
          <AppIcon icon={<FaMusic />} label="Música" color="from-red-400 to-pink-500" />
          <AppIcon icon={<MdPhotoLibrary />} label="Fotos" color="from-white to-gray-100" textColor="text-black" onClick={() => setCurrentScreen("photos")} />
          <AppIcon icon={<FaCamera />} label="Cámara" color="from-gray-700 to-gray-900" />
          <AppIcon icon={<FaTiktok />} label="TikTok" color="from-black to-gray-800" onClick={() => setCurrentScreen("tiktok")} />
          <AppIcon icon={<IoLocationSharp />} label="Mapas" color="from-green-500 to-green-700" />
          <AppIcon icon={<FaClock />} label="Reloj" color="from-black to-gray-900" />
          <AppIcon icon={<MdNotes />} label="Notas" color="from-yellow-300 to-yellow-500" />
          <AppIcon icon={<FaCog />} label="Ajustes" color="from-gray-500 to-gray-700" />
          <AppIcon icon={<FaAppStoreIos />} label="App Store" color="from-blue-500 to-blue-700" />
          <AppIcon icon={<FaBook />} label="Libros" color="from-orange-400 to-red-500" />
          <AppIcon icon={<FaCalculator />} label="Calc" color="from-gray-700 to-gray-900" />
          <AppIcon icon={<IoFitness />} label="Fitness" color="from-black to-gray-900" textColor="text-green-500" />
          <AppIcon icon={<IoNewspaper />} label="News" color="from-pink-500 to-red-600" />
        </div>
      </div>

      <Dock setCurrentScreen={setCurrentScreen} />
    </motion.div>
  );
}

/* ======================================================
   COMPONENTES AUXILIARES
====================================================== */
function StatusBar({ time }: { time: string }) {
  return (
    <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6 pt-3 text-white text-[10px] font-bold z-50 pointer-events-none mix-blend-difference">
      <span>{time}</span>
      <div className="flex gap-1.5 items-center">
        <FaSignal />
        <FaWifi />
        <FaBatteryFull className="text-lg" />
      </div>
    </div>
  );
}

function Dock({ setCurrentScreen, showTikTok = false }: any) {
  return (
    <motion.div 
      className="absolute bottom-5 left-4 right-4 h-[75px] bg-white/20 backdrop-blur-2xl rounded-[30px] flex items-center justify-around px-2 z-50 border border-white/10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
    >
      <DockIcon onClick={() => setCurrentScreen("home")} color="from-blue-400 to-blue-600" icon={<IoHome className="text-2xl" />} />
      
      <DockIcon 
        onClick={() => setCurrentScreen(showTikTok ? "tiktok" : "photos")} 
        color={showTikTok ? "from-black to-gray-900" : "from-purple-400 to-pink-500"} 
        icon={showTikTok ? <FaTiktok className="text-xl" /> : <MdPhotoLibrary className="text-2xl" />} 
      />
      
      <DockIcon 
        onClick={() => setCurrentScreen("apps")} 
        color="from-green-400 to-green-600" 
        icon={<BsGrid3X3Gap className="text-2xl" />} 
      />
      
      <DockIcon color="from-orange-400 to-red-500" icon={<FaMusic className="text-2xl" />} />
    </motion.div>
  );
}

function DockIcon({ color, icon, onClick }: { color: string, icon: React.ReactNode, onClick?: () => void }) {
    return (
        <motion.button
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={`w-12 h-12 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white shadow-lg`}
        >
            {icon}
        </motion.button>
    )
}

function AppIcon({ 
  icon, 
  label, 
  color, 
  textColor = "text-white",
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  color: string; 
  textColor?: string;
  onClick?: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1 cursor-pointer"
    >
      <div className={`w-[52px] h-[52px] bg-gradient-to-br ${color} rounded-[14px] flex items-center justify-center shadow-md ${textColor}`}>
        <div className="text-2xl">
          {icon}
        </div>
      </div>
      <span className="text-white text-[10px] font-medium text-center truncate w-full">
        {label}
      </span>
    </motion.div>
  );
}