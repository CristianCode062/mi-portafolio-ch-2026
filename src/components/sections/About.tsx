"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, PanInfo, AnimatePresence } from "framer-motion";
import { 
  FaCamera, 
  FaPhone, 
  FaEnvelope, 
  FaSafari, 
  FaMusic, 
  FaAppStoreIos,
  FaCog,
  FaWifi,
  FaBatteryFull,
  FaSignal,
  FaHeart,
  FaComment,
  FaShare,
  FaChevronLeft,
  FaSearch,
  FaClock,
  FaMap,
  FaCalculator,
  FaBook,
  FaTiktok,
  FaPlay,
  FaPause
} from "react-icons/fa";
import { 
  IoLocationSharp,
  IoHome,
  IoCalendar,
  IoFitness,
  IoNewspaper
} from "react-icons/io5";
import { 
  MdMessage, 
  MdPhotoLibrary,
  MdContacts,
  MdNotes,
  MdNotifications
} from "react-icons/md";
import { BsGrid3X3Gap } from "react-icons/bs";
import { AiOutlineCompass } from "react-icons/ai";

/* ======================================================
   CONTENIDO - TUS VIDEOS Y FOTOS
====================================================== */
const tiktokVideos = [
  
  {
    url: "/videos/@neuroeac.cl_1.mp4",
    username: "@neuroeac.cl",
    description: "Construyendo el futuro con código limpio 💻 #DevLife",
    likes: "3.2K",
    comments: "220",
    shares: "110"
  },
  {
    url: "/videos/@neuroeac.cl_2.mp4",
    username: "@neuroeac.cl",
    description: "Arquitecturas distribuidas que escalan 📈",
    likes: "1.8K",
    comments: "95",
    shares: "45"
  },
  {
    url: "/videos/@neuroeac.cl_3.mp4",
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
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [isLiked, setIsLiked] = useState<{ [key: number]: boolean }>({});
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const [currentTime, setCurrentTime] = useState("9:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

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
    <section className="relative min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent z-10"></div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* iPhone 3D */}
        <div className="relative w-full h-screen flex items-center justify-center p-8">
          <motion.div
            ref={phoneRef}
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
            style={{ perspective: "2000px" }}
          >
            <motion.div
              animate={{ 
                rotateY: [0, 3, -3, 0],
                rotateX: [0, 1, -1, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="relative w-[380px] h-[780px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[60px] shadow-2xl border-[10px] border-slate-700"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Dynamic Island */}
              <motion.div 
                className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-full z-20 flex items-center justify-center gap-2 overflow-hidden"
                animate={{
                  width: currentScreen === "tiktok" && isPlaying ? "140px" : "128px"
                }}
              >
                <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
                {currentScreen === "tiktok" && isPlaying && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1"
                  >
                    <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="w-1 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  </motion.div>
                )}
              </motion.div>

              {/* Pantalla */}
              <div className="absolute inset-[14px] bg-black rounded-[50px] overflow-hidden">
                
                {/* HOME SCREEN */}
                {currentScreen === "home" && (
                  <HomeScreen 
                    setCurrentScreen={setCurrentScreen}
                    currentTime={currentTime}
                  />
                )}

                {/* TIKTOK SCREEN */}
                {currentScreen === "tiktok" && (
                  <TikTokScreen
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

                {/* PHOTOS SCREEN */}
                {currentScreen === "photos" && (
                  <PhotosScreen
                    photos={galleryPhotos}
                    setSelectedPhoto={setSelectedPhoto}
                    setCurrentScreen={setCurrentScreen}
                    currentTime={currentTime}
                  />
                )}

                {/* GALLERY SCREEN */}
                {currentScreen === "gallery" && (
                  <GalleryScreen
                    photos={galleryPhotos}
                    setCurrentScreen={setCurrentScreen}
                    currentTime={currentTime}
                  />
                )}

                {/* APPS SCREEN */}
                {currentScreen === "apps" && (
                  <AppsScreen
                    setCurrentScreen={setCurrentScreen}
                    currentTime={currentTime}
                  />
                )}

                {/* Modal de foto */}
                <AnimatePresence>
                  {selectedPhoto !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => setSelectedPhoto(null)}
                      className="absolute inset-0 bg-black/95 z-50 flex items-center justify-center"
                    >
                      <img 
                        src={galleryPhotos[selectedPhoto]} 
                        className="max-w-full max-h-full object-contain"
                        alt="Selected"
                      />
                      <button 
                        className="absolute top-8 right-8 text-white text-4xl"
                        onClick={() => setSelectedPhoto(null)}
                      >
                        ×
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botones físicos */}
              <div className="absolute left-[-10px] top-32 w-1 h-16 bg-slate-600 rounded-l-sm"></div>
              <div className="absolute left-[-10px] top-52 w-1 h-12 bg-slate-600 rounded-l-sm"></div>
              <div className="absolute left-[-10px] top-68 w-1 h-12 bg-slate-600 rounded-l-sm"></div>
              <div className="absolute right-[-10px] top-40 w-1 h-20 bg-slate-600 rounded-r-sm"></div>
            </motion.div>

            {/* Efectos de luz */}
            <motion.div
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 rounded-[60px] blur-2xl -z-10"
            ></motion.div>
          </motion.div>

          {/* Partículas */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 600 - 300, 
                y: Math.random() * 800 - 400,
                opacity: 0 
              }}
              animate={{
                y: [null, Math.random() * -150 - 100],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            ></motion.div>
          ))}
        </div>

        {/* Contenido texto */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-24">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full"
            >
              <span className="text-red-400 text-sm font-semibold">🤖 IA</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
                ACERCA DE MI 
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 mb-8"
            >
              <p className="text-slate-300 text-base leading-relaxed">
                Ingeniero y líder tecnológico especializado en <span className="font-semibold text-white">sistemas críticos, tiempo real y plataformas distribuidas de misión crítica</span>. Con más de una década de experiencia navegando la intersección entre infraestructura resiliente y soluciones escalables.
              </p>
              <p className="text-slate-300 text-base leading-relaxed">
                Diseño y opero arquitecturas que integran <span className="text-cyan-400 font-semibold">software, IoT, analítica avanzada y conectividad satelital</span>, priorizando resiliencia, observabilidad y escala.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 mb-8"
            >
              {[
                "⊕ Arquitecturas de sistemas críticos y tiempo real",
                "⊕ Liderazgo técnico en proyectos de alta complejidad",
                "⊕ Integración de IoT, IA y conectividad satelital"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3 px-5 py-3 bg-slate-800/30 border border-slate-700/30 rounded-lg hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300"
                >
                  <span className="text-slate-300 font-medium">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8"
            >
              <a 
                href="#proyectos"
                className="inline-block px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
              >
                Ver proyectos
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
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
      className="w-full h-full relative bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"
    >
      <StatusBar time={currentTime} />
      
      <div className="pt-20 pb-28 px-6 h-full">
        <div className="grid grid-cols-4 gap-6">
          <AppIcon icon={<FaPhone />} label="Teléfono" color="from-green-400 to-green-600" />
          <AppIcon icon={<FaSafari />} label="Safari" color="from-blue-400 to-blue-600" />
          <AppIcon icon={<MdMessage />} label="Mensajes" color="from-green-400 to-green-500" />
          <AppIcon icon={<FaEnvelope />} label="Mail" color="from-blue-500 to-blue-700" />
          
          <AppIcon 
            icon={<FaTiktok />} 
            label="TikTok" 
            color="from-black to-gray-900" 
            onClick={() => setCurrentScreen("tiktok")}
          />
          <AppIcon 
            icon={<MdPhotoLibrary />} 
            label="Fotos" 
            color="from-gradient-to-br from-yellow-400 via-red-400 to-pink-500" 
            onClick={() => setCurrentScreen("photos")}
          />
          <AppIcon icon={<FaCamera />} label="Cámara" color="from-gray-600 to-gray-800" />
          <AppIcon icon={<IoCalendar />} label="Calendario" color="from-white to-gray-200" textColor="text-red-500" />
          
          <AppIcon icon={<IoLocationSharp />} label="Mapas" color="from-blue-400 to-green-400" />
          <AppIcon icon={<FaClock />} label="Reloj" color="from-gray-800 to-black" />
          <AppIcon icon={<MdNotes />} label="Notas" color="from-yellow-300 to-yellow-500" />
          <AppIcon 
            icon={<BsGrid3X3Gap />} 
            label="Apps" 
            color="from-purple-500 to-pink-500" 
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
        className="w-full h-full"
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
            className="absolute inset-0"
          >
            {video.url.endsWith(".mp4") ? (
              <video
                ref={currentVideo === index ? videoRef : null}
                src={video.url}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              <img 
                src={video.url} 
                alt={`TikTok ${index + 1}`}
                className="w-full h-full object-cover"
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"></div>
            
            {/* Sidebar de interacciones */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col gap-6 z-10">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={(e) => handleLike(index, e)}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                  <FaHeart className={`text-2xl ${isLiked[index] ? 'text-red-500' : 'text-white'}`} />
                </div>
                <span className="text-white text-xs font-semibold">{video.likes}</span>
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                  <FaComment className="text-2xl text-white" />
                </div>
                <span className="text-white text-xs font-semibold">{video.comments}</span>
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                  <FaShare className="text-2xl text-white" />
                </div>
                <span className="text-white text-xs font-semibold">{video.shares}</span>
              </motion.button>
            </div>

            {/* Info del video */}
            <div className="absolute bottom-24 left-4 right-20 z-10">
              <p className="font-bold text-white text-base mb-2">{video.username}</p>
              <p className="text-white text-sm opacity-90 line-clamp-2">{video.description}</p>
            </div>

            {/* Animación de corazones */}
            <AnimatePresence>
              {hearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  initial={{ 
                    opacity: 1, 
                    scale: 0,
                    x: "50%",
                    y: "50%"
                  }}
                  animate={{ 
                    opacity: 0,
                    scale: [0, 1.5, 1],
                    x: `calc(50% + ${heart.x}px)`,
                    y: `calc(50% + ${heart.y}px)`,
                    rotate: Math.random() * 360
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute top-1/2 left-1/2 pointer-events-none z-50"
                >
                  <FaHeart className="text-red-500 text-4xl" />
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Indicador de play/pause */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <FaPlay className="text-white text-3xl ml-1" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Indicadores */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
        {videos.map((_: any, index: number) => (
          <motion.div
            key={index}
            animate={{
              scale: currentVideo === index ? 1.3 : 1,
              backgroundColor: currentVideo === index ? "#FFFFFF" : "#64748b"
            }}
            className="w-2 h-2 rounded-full"
          />
        ))}
      </div>

      {/* Header TikTok */}
      <div className="absolute top-12 left-0 right-0 flex justify-center gap-8 z-30">
        <span className="text-white/60 text-base font-semibold">Siguiendo</span>
        <span className="text-white text-base font-bold">Para ti</span>
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
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30 }}
      className="w-full h-full bg-black relative"
    >
      <StatusBar time={currentTime} />
      
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-6 pt-4 z-30">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentScreen("home")}
          className="text-cyan-400 text-lg font-semibold flex items-center gap-2"
        >
          <FaChevronLeft /> Atrás
        </motion.button>
        <span className="text-white font-bold text-xl">Fotos</span>
        <FaSearch className="text-white text-lg" />
      </div>

      <div className="pt-24 pb-28 px-4 h-full overflow-y-auto">
        <div className="grid grid-cols-3 gap-2">
          {photos.map((photo: string, index: number) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPhoto(index)}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer"
            >
              <img 
                src={photo} 
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
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
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="w-full h-full bg-gradient-to-br from-slate-900 to-black relative"
    >
      <StatusBar time={currentTime} />
      
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-6 pt-4 z-30">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentScreen("home")}
          className="text-cyan-400 text-lg font-semibold flex items-center gap-2"
        >
          <FaChevronLeft /> Atrás
        </motion.button>
        <span className="text-white font-bold text-xl">Álbumes</span>
        <FaSearch className="text-white text-lg" />
      </div>

      <div className="pt-24 pb-28 px-6 h-full overflow-y-auto">
        <div className="space-y-3">
          {photos.slice(0, 4).map((photo: string, index: number) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.98 }}
              className="w-full h-48 rounded-2xl overflow-hidden shadow-xl"
            >
              <img 
                src={photo} 
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
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
   APPS SCREEN
====================================================== */
function AppsScreen({ setCurrentScreen, currentTime }: any) {
  return (
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative"
    >
      <StatusBar time={currentTime} />

      <div className="pt-16 pb-28 px-6 h-full overflow-y-auto">
        <div className="grid grid-cols-4 gap-4">
          <AppIcon icon={<FaPhone />} label="Teléfono" color="from-green-400 to-green-600" />
          <AppIcon icon={<FaSafari />} label="Safari" color="from-blue-400 to-blue-600" />
          <AppIcon icon={<MdMessage />} label="Mensajes" color="from-green-400 to-green-500" />
          <AppIcon icon={<FaEnvelope />} label="Mail" color="from-blue-500 to-blue-700" />
          
          <AppIcon icon={<FaMusic />} label="Música" color="from-red-400 to-pink-500" />
          <AppIcon 
            icon={<MdPhotoLibrary />} 
            label="Fotos" 
            color="from-red-400 to-orange-500" 
            onClick={() => setCurrentScreen("photos")} 
          />
          <AppIcon icon={<FaCamera />} label="Cámara" color="from-gray-600 to-gray-800" />
          <AppIcon icon={<IoCalendar />} label="Calendario" color="from-white to-gray-200" textColor="text-red-500" />
          
          <AppIcon icon={<IoLocationSharp />} label="Mapas" color="from-blue-400 to-green-400" />
          <AppIcon icon={<FaClock />} label="Reloj" color="from-gray-800 to-black" />
          <AppIcon icon={<MdNotes />} label="Notas" color="from-yellow-300 to-yellow-500" />
          <AppIcon icon={<MdNotifications />} label="Recordatorios" color="from-blue-400 to-blue-600" />
          
          <AppIcon icon={<FaAppStoreIos />} label="App Store" color="from-blue-500 to-blue-700" />
          <AppIcon icon={<FaBook />} label="Libros" color="from-orange-400 to-red-500" />
          <AppIcon icon={<MdContacts />} label="Contactos" color="from-gray-500 to-gray-700" />
          <AppIcon icon={<FaCog />} label="Ajustes" color="from-gray-600 to-gray-800" />
          
          <AppIcon icon={<FaCalculator />} label="Calculadora" color="from-gray-700 to-gray-900" />
          <AppIcon icon={<IoFitness />} label="Salud" color="from-red-400 to-pink-500" />
          <AppIcon icon={<IoNewspaper />} label="Noticias" color="from-red-500 to-pink-500" />
          <AppIcon icon={<AiOutlineCompass />} label="Brújula" color="from-gray-700 to-black" />
          
          <AppIcon 
            icon={<FaTiktok />} 
            label="TikTok" 
            color="from-black to-gray-900" 
            onClick={() => setCurrentScreen("tiktok")}
          />
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-3 flex items-center gap-3">
          <FaSearch className="text-white/60 text-lg" />
          <span className="text-white/60">Buscar</span>
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
    <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 pt-3 text-white text-xs font-semibold z-30">
      <span>{time}</span>
      <div className="flex gap-2 items-center">
        <FaSignal className="text-xs" />
        <FaWifi className="text-xs" />
        <FaBatteryFull className="text-base" />
      </div>
    </div>
  );
}

function Dock({ setCurrentScreen, showTikTok = false }: any) {
  return (
    <motion.div 
      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-20 bg-white/10 backdrop-blur-2xl rounded-3xl flex items-center justify-around px-4 z-30"
      whileTap={{ scale: 0.95 }}
    >
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => setCurrentScreen("home")}
        className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
      >
        <IoHome className="text-white text-2xl" />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => setCurrentScreen(showTikTok ? "tiktok" : "photos")}
        className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
      >
        {showTikTok ? <FaTiktok className="text-white text-2xl" /> : <FaCamera className="text-white text-2xl" />}
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => setCurrentScreen("gallery")}
        className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg"
      >
        <MdPhotoLibrary className="text-white text-2xl" />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.85 }}
        className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg"
      >
        <FaMusic className="text-white text-2xl" />
      </motion.button>
    </motion.div>
  );
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
      whileTap={{ scale: 0.85 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1 cursor-pointer"
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg ${textColor}`}>
        <div className="text-2xl">
          {icon}
        </div>
      </div>
      <span className="text-white text-[10px] text-center leading-tight max-w-[60px]">
        {label}
      </span>
    </motion.div>
  );
}