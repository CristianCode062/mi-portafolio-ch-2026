import React, { useState, useEffect, useRef } from 'react';
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
  Check,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, Variants } from "framer-motion";

// Definición de tipos para el estado y componentes
type SubmitStatus = "success" | "error" | null;

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label: string;
}

interface ContactInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  active?: boolean;
}

interface SocialButtonProps {
  icon: React.ReactElement;
  label: string;
  color?: string;
}

const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 2;
      videoRef.current.play().catch(() => {
        console.log("Autoplay blocked by browser");
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    // Validación
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage("Por favor completa todos los campos");
      setSubmitStatus("error");
      setTimeout(() => {
        setErrorMessage("");
        setSubmitStatus(null);
      }, 4000);
      return;
    }

    if (formData.message.length < 20) {
      setErrorMessage("El mensaje debe tener al menos 20 caracteres");
      setSubmitStatus("error");
      setTimeout(() => {
        setErrorMessage("");
        setSubmitStatus(null);
      }, 4000);
      return;
    }
    
    // Rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < 60000) {
      setErrorMessage("Por favor espera un minuto antes de enviar otro mensaje");
      setSubmitStatus("error");
      setTimeout(() => {
        setErrorMessage("");
        setSubmitStatus(null);
      }, 4000);
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Necesito que envíes un email usando la API de Resend. Aquí está la configuración:

🔑 CONFIGURACIÓN (REEMPLAZA ESTOS VALORES):
- API Key: re_TU_API_KEY_AQUI
- Email destino: tu-email@tudominio.com
- Email remitente: onboarding@resend.dev

📧 DATOS DEL FORMULARIO:
- Nombre: ${formData.name}
- Email: ${formData.email}
- Asunto: ${formData.subject}
- Mensaje: ${formData.message}

INSTRUCCIONES:
1. Haz una llamada POST a: https://api.resend.com/emails
2. Headers: {"Authorization": "Bearer [TU_API_KEY]", "Content-Type": "application/json"}
3. Body JSON:
{
  "from": "onboarding@resend.dev",
  "to": "tu-email@tudominio.com",
  "reply_to": "${formData.email}",
  "subject": "Nuevo contacto: ${formData.subject}",
  "html": "<html><body style='font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;'><div style='background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:30px;border-radius:10px 10px 0 0;'><h1>Nuevo Mensaje de Contacto</h1></div><div style='background:#f9fafb;padding:30px;border-radius:0 0 10px 10px;'><p style='font-weight:600;color:#374151;margin-top:20px;'>Nombre:</p><p style='color:#6b7280;'>${formData.name}</p><p style='font-weight:600;color:#374151;margin-top:20px;'>Email:</p><p style='color:#6b7280;'>${formData.email}</p><p style='font-weight:600;color:#374151;margin-top:20px;'>Asunto:</p><p style='color:#6b7280;'>${formData.subject}</p><p style='font-weight:600;color:#374151;margin-top:20px;'>Mensaje:</p><p style='color:#6b7280;'>${formData.message}</p></div></body></html>"
}

Responde SOLO con "EMAIL_SENT_SUCCESS" si funcionó correctamente, o describe el error si falló.`
            }
          ]
        })
      });

      const data = await response.json();
      const result = data.content?.[0]?.text || "";
      
      if (result.includes("EMAIL_SENT_SUCCESS") || result.includes("successfully")) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setLastSubmitTime(now);
        setTimeout(() => setSubmitStatus(null), 6000);
      } else {
        throw new Error(result);
      }
      
    } catch (error) {
      console.error("Error al enviar:", error);
      setSubmitStatus("error");
      setErrorMessage("No se pudo enviar el mensaje. Verifica tu configuración de Resend API.");
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1]
      } 
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 selection:bg-indigo-500/40 font-sans">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30 saturate-[1.2] scale-[1.02]"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-blue-and-purple-ink-41221-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_80%,rgba(2,6,23,1)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950" />
      </div>

      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 container mx-auto px-4 py-12 lg:py-16"
      >
        <div className="max-w-6xl mx-auto">
          
          <motion.div variants={itemVariants} className="text-center mb-12 lg:mb-16">
            <div className="flex flex-col items-center">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[2px] bg-indigo-500 mb-4"
              />
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 italic uppercase">
                Hablemos.
              </h1>
              <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-light">
                Disponible para consultoría estratégica, desarrollo de productos de alto rendimiento y liderazgo de ingeniería.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
            
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-[0.4em] mb-6">Información Directa</h2>
                
                <div 
                  onClick={() => copyToClipboard("dev@tuportfolio.com")}
                  className="group cursor-pointer relative"
                >
                  <ContactInfoItem 
                    icon={<Mail className="w-5 h-5" />}
                    label="Email"
                    value="dev@tuportfolio.com"
                    active={copied}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-500" />}
                  </div>
                </div>

                <ContactInfoItem 
                  icon={<Briefcase className="w-5 h-5" />}
                  label="Rol Actual"
                  value="Senior Fullstack / Solutions Architect"
                  active={false}
                />
                
                <ContactInfoItem 
                  icon={<MapPin className="w-5 h-5" />}
                  label="Zona Horaria"
                  value="Europe/Madrid (UTC+1)"
                  active={false}
                />
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ecosistema Digital</p>
                <div className="flex flex-wrap gap-3">
                  <SocialButton icon={<Linkedin />} label="LinkedIn" color="hover:bg-blue-600/20" />
                  <SocialButton icon={<Github />} label="GitHub" color="hover:bg-slate-600/20" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              className="lg:col-span-7"
              onMouseMove={handleMouseMove}
            >
              <div className="relative group overflow-hidden rounded-3xl bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                
                <motion.div
                  className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: useTransform(
                      [mouseX, mouseY],
                      ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.15), transparent 80%)`
                    ),
                  }}
                />

                <AnimatePresence>
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                      animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-30 bg-slate-950/90 flex flex-col items-center justify-center text-center p-10 rounded-[2.5rem]"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(99,102,241,0.6)]"
                      >
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </motion.div>
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-black mb-4 tracking-tight uppercase italic text-white"
                      >
                        Enviado.
                      </motion.h3>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-slate-400 max-w-xs mx-auto leading-relaxed"
                      >
                        He recibido tu mensaje. Analizaré los detalles y te responderé en breve.
                      </motion.p>
                    </motion.div>
                  )}
                  
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -50, scale: 0.9 }}
                      className="absolute top-4 left-4 right-4 z-40 bg-gradient-to-br from-red-500/95 to-red-600/95 backdrop-blur-xl border border-red-400/50 rounded-2xl p-6 shadow-[0_10px_40px_rgba(239,68,68,0.4)]"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg mb-1">Error al Enviar</h4>
                          <p className="text-red-50 text-sm leading-relaxed">{errorMessage}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative z-10 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField 
                      icon={<User />}
                      label="Tu Nombre"
                      placeholder="Ej. Alexander Pierce"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <InputField 
                      icon={<AtSign />}
                      label="Email"
                      placeholder="alex@tuempresa.com"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <InputField 
                    icon={<MessageSquare />}
                    label="Asunto"
                    placeholder="¿En qué puedo ayudarte?"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Mensaje Detallado</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Explica tu visión o desafío técnico en detalle..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-600 resize-none"
                    />
                    <div className="flex items-center justify-between ml-1">
                      <p className="text-xs text-slate-600">{formData.message.length} / 20 caracteres mínimo</p>
                      {formData.message.length >= 20 && (
                        <p className="text-xs text-green-400 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Listo para enviar
                        </p>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="group relative w-full h-14 overflow-hidden rounded-2xl bg-white text-black font-black uppercase tracking-widest text-sm transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-300">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin w-6 h-6" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Procesar Envío
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
      
      <div className="fixed top-[-10%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyan-600/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
};

const InputField: React.FC<InputFieldProps> = ({ icon, label, ...props }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
      <span className="text-indigo-500/60">{icon && React.isValidElement(icon) && React.cloneElement(icon as React.ReactElement, { size: 12 })}</span>
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all text-white placeholder:text-slate-600"
    />
  </div>
);

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, label, value, active }) => (
  <div className={`flex items-center gap-6 p-6 rounded-3xl bg-white/[0.03] border transition-all duration-300 ${active ? 'border-green-500/50 bg-green-500/5' : 'border-white/5 hover:border-white/20 hover:bg-white/[0.06]'}`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${active ? 'bg-green-500/20 text-green-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className="text-white font-semibold text-sm md:text-base">{value}</p>
    </div>
  </div>
);

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, color }) => (
  <motion.button
    whileHover={{ y: -4, scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all ${color}`}
  >
    {React.cloneElement(icon, { size: 18 })}
    <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
  </motion.button>
);

export default App;