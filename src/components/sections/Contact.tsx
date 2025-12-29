import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Send,
  MapPin,
  Briefcase,
  CheckCircle2,
  Loader2,
  MessageSquare,
  User,
  AtSign,
  Copy,
  ArrowRight,
  Sparkles,
  X,
  type LucideIcon
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  Variants
} from "framer-motion";

/* ======================================================
   TIPOS
====================================================== */

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
  error?: boolean;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: boolean;
}

/* ======================================================
   VARIANTS & ANIMATIONS
====================================================== */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

const BackgroundOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 100, 0],
        y: [0, -50, 0],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] mix-blend-screen"
    />
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        x: [0, -100, 0],
        y: [0, 100, 0],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"
    />
    <motion.div
      animate={{
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[100px] mix-blend-overlay"
    />
  </div>
);

/* ======================================================
   COMPONENTES UI
====================================================== */

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ icon: Icon, label, error, className, ...props }, ref) => (
    <motion.div className="space-y-2 group" whileTap={{ scale: 0.995 }}>
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-indigo-400 transition-colors">
        <Icon size={12} />
        {label}
      </label>
      <div className="relative">
        <input
          ref={ref}
          className={`w-full rounded-xl bg-slate-900/50 border-2 px-4 py-3 outline-none transition-all duration-300 placeholder:text-slate-600
            ${error 
              ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.2)]" 
              : "border-slate-800 focus:border-indigo-500 focus:bg-slate-900/80 focus:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
            } text-slate-100 ${className}`}
          {...props}
        />
        {error && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400"
          >
            <X size={16} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
);
InputField.displayName = "InputField";

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => (
    <motion.div className="space-y-2 group" whileTap={{ scale: 0.995 }}>
      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 group-focus-within:text-indigo-400 transition-colors">
        <MessageSquare size={12} />
        {label}
      </label>
      <textarea
        ref={ref}
        className={`w-full rounded-xl bg-slate-900/50 border-2 px-4 py-3 outline-none resize-none transition-all duration-300 placeholder:text-slate-600 min-h-[120px]
          ${error 
            ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.2)]" 
            : "border-slate-800 focus:border-indigo-500 focus:bg-slate-900/80 focus:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          } text-slate-100 ${className}`}
        {...props}
      />
    </motion.div>
  )
);
TextArea.displayName = "TextArea";

/* ======================================================
   APP PRINCIPAL
====================================================== */

const App = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [toast, setToast] = useState<{ visible: boolean; msg: string }>({ visible: false, msg: "" });

  // Mouse Glow Effect Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 50 });

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const showToast = (msg: string) => {
    setToast({ visible: true, msg });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("dev@tuportfolio.com");
    showToast("Email copiado al portapapeles");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error al escribir
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, boolean>> = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = true;
    if (!formData.subject) newErrors.subject = true;
    if (!formData.message || formData.message.length < 10) newErrors.message = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      showToast("Por favor corrige los errores");
      return;
    }

    setStatus("loading");
    
    // Simular envío API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden font-sans">
      <BackgroundOrbs />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-8 left-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full bg-indigo-600/90 backdrop-blur-md shadow-2xl border border-indigo-400/30"
          >
            <Sparkles size={18} className="text-yellow-300" />
            <span className="font-medium text-sm">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col justify-center"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Disponible para proyectos
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
            Hablemos <br className="md:hidden" /> de Código.
          </h1>
          <p className="text-slate-400 max-w-lg mx-auto text-lg">
            ¿Tienes una idea innovadora? Estoy listo para ayudarte a construir la próxima gran experiencia digital.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* LEFT COLUMN: CONTACT INFO */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
            
            {/* Main Contact Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={copyEmail}
              className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md cursor-pointer group hover:border-indigo-500/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:text-white group-hover:bg-indigo-500 transition-all duration-300">
                  <Mail size={24} />
                </div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Envíame un correo</h3>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-slate-100">dev@tuportfolio.com</span>
                  <Copy size={18} className="text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
            </motion.div>

            {/* Stats / Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md"
              >
                <Briefcase className="text-indigo-400 mb-4" size={24} />
                <div className="text-2xl font-bold">Senior</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Fullstack Dev</div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md"
              >
                <MapPin className="text-purple-400 mb-4" size={24} />
                <div className="text-2xl font-bold">Remoto</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Worldwide</div>
              </motion.div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 pt-4">
              <SocialBtn icon={Github} label="GitHub" href="#" />
              <SocialBtn icon={Linkedin} label="LinkedIn" href="#" />
            </div>

          </motion.div>

          {/* RIGHT COLUMN: FORM */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 relative"
            onMouseMove={handleMouseMove}
          >
            {/* Interactive Glow Background for Form */}
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] blur-2xl"
              animate={{ opacity: status === "loading" ? 0.6 : 0.3 }}
              transition={{ duration: 0.5 }}
            />

            <motion.div
              className="relative rounded-[2rem] p-1 bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 overflow-hidden"
              style={{
                background: useTransform(
                  [springX, springY],
                  ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`
                )
              }}
            >
              <div className="bg-slate-950/80 rounded-[1.8rem] p-8 md:p-10 relative overflow-hidden h-full">
                
                {/* Success Overlay */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                      animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
                      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/60"
                    >
                      <motion.div
                        initial={{ scale: 0.5, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.8 }}
                        className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 size={48} className="text-green-400" />
                      </motion.div>
                      <h3 className="text-3xl font-bold mb-2">¡Mensaje Enviado!</h3>
                      <p className="text-slate-400">Me pondré en contacto contigo pronto.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Content */}
                <div className={`space-y-6 transition-opacity duration-500 ${status === "success" ? "opacity-20 pointer-events-none" : "opacity-100"}`}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputField 
                      icon={User} 
                      label="Tu Nombre" 
                      name="name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                    <InputField 
                      icon={AtSign} 
                      label="Tu Email" 
                      name="email" 
                      type="email"
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                  </div>

                  <InputField 
                    icon={MessageSquare} 
                    label="Asunto" 
                    name="subject"
                    placeholder="Propuesta de proyecto..." 
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                  />

                  <TextArea 
                    label="Cuéntame sobre tu proyecto" 
                    name="message"
                    placeholder="Estoy buscando desarrollar..." 
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                  />

                  <div className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={status === "loading"}
                      className="group relative w-full h-16 rounded-xl overflow-hidden bg-indigo-600 disabled:bg-slate-700 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient" />
                      
                      <div className="relative flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm">
                        {status === "loading" ? (
                          <>
                            <Loader2 className="animate-spin" /> Enviando...
                          </>
                        ) : (
                          <>
                            Enviar Mensaje 
                            <motion.span 
                              className="group-hover:translate-x-1 transition-transform"
                            >
                              <ArrowRight size={16} />
                            </motion.span>
                          </>
                        )}
                      </div>
                    </motion.button>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

/* ======================================================
   SUBCOMPONENTES MENORES
====================================================== */

const SocialBtn = ({ icon: Icon, label, href }: { icon: LucideIcon; label: string; href: string }) => (
  <motion.a
    href={href}
    whileHover={{ y: -3, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300"
  >
    <Icon size={18} />
    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
  </motion.a>
);

export default App;