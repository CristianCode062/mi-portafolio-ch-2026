import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, Phone, MapPin, Linkedin, Github, ChevronDown, Code, Database, Cloud, Brain, Server, Briefcase, GraduationCap, Award, Languages, Target, Star, Calendar, ExternalLink, Play, Pause, Maximize, Eye, GitBranch, FileCode, Users, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Reference motion to satisfy ESLint (some configs flag it as unused even when used via JSX)
const _MotionRef = motion;
import SplitText from "./components/SplitText";
import PillNav from "./components/PillNav";
import Aurora from './components/Aurora';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテCRISTIAN CODE 06トナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    const colors = ['#00e5ff', '#00ff99', '#ffcc00', '#ff66cc', '#8a2be2', '#00ccff', '#0080ff'];

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0080ff';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const color = colors[i % colors.length];
        ctx.fillStyle = color;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0" />;
};

const GlitchText = ({ children, className = "" }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`${className} ${glitch ? 'animate-pulse' : ''}`} style={{
      textShadow: glitch ? '2px 2px #00ff00, -2px -2px #ff00ff' : 'none'
    }}>
      {children}
    </span>
  );
};

const CustomCursor = ({ useLogoCursor = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Cursor principal (puede mostrar logo cuando useLogoCursor=true) */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none"
        style={{
          width: useLogoCursor ? 36 : 16,
          height: useLogoCursor ? 36 : 16,
          borderRadius: useLogoCursor ? 8 : '50%',
          transform: `translate3d(${mousePosition.x - (useLogoCursor ? 18 : 8)}px, ${mousePosition.y - (useLogoCursor ? 18 : 8)}px, 0)`,
          transition: 'transform 0.02s linear, opacity 0.05s ease',
          opacity: 1,
          background: useLogoCursor ? 'transparent' : undefined,
          boxShadow: useLogoCursor ? '0 6px 18px rgba(0,0,0,0.6)' : (isHovering ? '0 0 18px rgba(0,220,255,0.95)' : '0 0 8px rgba(0,150,255,0.7)'),
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        {useLogoCursor ? (
          (() => {
            // render an HTML badge for reliable visibility
            return (
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: '#306998',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffd43b',
                fontWeight: 700,
                fontSize: 14,
                boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                border: '2px solid rgba(255,255,255,0.85)',
                userSelect: 'none',
                pointerEvents: 'none'
              }}>
                <span style={{ lineHeight: 1 }}>{'Py'}</span>
              </div>
            );
          })()
        ) : (
          <div style={{
            width: 16,
            height: 16,
            background: isHovering ? 'radial-gradient(circle, rgba(0,240,255,1) 0%, rgba(0,180,255,0.85) 40%)' : 'radial-gradient(circle, rgba(0,200,255,0.95) 0%, rgba(0,150,255,0.9) 40%)',
            borderRadius: '50%',
            boxShadow: isHovering ? '0 0 18px rgba(0,220,255,0.95)' : '0 0 8px rgba(0,150,255,0.7)',
            border: '1px solid rgba(255,255,255,0.12)'
          }} />
        )}
      </div>
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="fixed rounded-full pointer-events-none"
        style={{
          width: useLogoCursor ? 80 : 40,
          height: useLogoCursor ? 80 : 40,
          background: isHovering ? 'radial-gradient(circle, rgba(0,220,255,0.28) 0%, rgba(0,200,255,0.08) 50%, transparent 80%)' : 'radial-gradient(circle, rgba(0,150,255,0.18) 0%, rgba(0,150,255,0.03) 50%, transparent 85%)',
          transform: `translate3d(${mousePosition.x - (useLogoCursor ? 40 : 20)}px, ${mousePosition.y - (useLogoCursor ? 40 : 20)}px, 0)`,
          transition: 'transform 0.08s linear, background 0.18s ease, opacity 0.2s ease',
          filter: 'blur(10px)',
          opacity: isHovering ? 1 : 0.9,
          zIndex: 99990
        }}
      />
    </>
  );
};

const HexagonGrid = () => {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2" fill="none" stroke="cyan" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)"/>
      </svg>
    </div>
  );
};

const FloatingParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, ${100 + Math.random() * 155}, 255, 0.6)`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0" />;
};

// Componente para texto con efecto typing
const TypingText = ({ text, className = "" }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return <span className={className}>{displayedText}</span>;
};

// Componente para números animados (maneja sufijos como "K+", "%", "ms", "M/s", y prefijos como "<50ms")
const AnimatedNumber = ({ value = '', duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const str = String(value);
    const match = str.match(/[\d,.]+/);
    const numericStr = match ? match[0].replace(/,/g, '') : null;
    const target = numericStr !== null ? parseFloat(numericStr) : 0;

    const intervalMs = 20;
    const frames = Math.max(1, Math.round((duration * 1000) / intervalMs));
    const step = target / frames;
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setDisplayValue(target);
        clearInterval(timer);
      } else {
        setDisplayValue(Number.isInteger(target) ? Math.floor(current) : Math.round(current * 10) / 10);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [value, duration]);

  const str = String(value);
  const match = str.match(/[\d,.]+/);
  const suffix = match ? str.slice(str.indexOf(match[0]) + match[0].length) : '';

  return <span>{String(displayValue) + suffix}</span>;
};

// Componente para wave effect en texto
const WaveText = ({ text, className = "" }) => {
  return (
    <motion.div className={className}>
      {text.split('').map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.5, delay: idx * 0.05, repeat: Infinity, repeatDelay: 2 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Componente para reveal effect en scroll
const ScrollReveal = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};


const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  // Toggle to use a custom logo cursor (Python logo) instead of native pointer
  const [useLogoCursor, _setUseLogoCursor] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
      setScrollY(window.scrollY);
      
      // Calcular progreso de scroll
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Control native cursor based on whether we show the custom logo cursor
  useEffect(() => {
    document.body.style.cursor = useLogoCursor ? 'none' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [useLogoCursor]);

  const projects = [
    {
      id: 1,
      title: 'Plataforma de Seguridad con IA',
      description: 'Sistema avanzado integrando radares Spotter, clasificación automática con IA y alertas en tiempo real.',
      tech: ['Python', 'TensorFlow', 'React', 'PostgreSQL', 'Docker'],
      category: 'IA & IoT',
      github: 'https://github.com/iacortex',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      stats: { lines: '50K+', users: '1000+', uptime: '99.9%' }
    },
    {
      id: 2,
      title: 'Sistema de Alimentación Remota',
      description: 'Arquitectura backend procesando millones de eventos/segundo para alimentación automatizada en acuicultura.',
      tech: ['Node.js', 'Redis', 'TimescaleDB', 'MQTT', 'Kubernetes'],
      category: 'Backend & IoT',
      github: 'https://github.com/iacortex',
      icon: Server,
      color: 'from-blue-500 to-cyan-500',
      stats: { events: '10M/s', sensors: '500+', latency: '<50ms' }
    },
    {
      id: 3,
      title: 'Automatización Inteligente con n8n',
      description: 'Workflows automatizados con IA reduciendo intervención humana en 80% y optimizando procesos críticos.',
      tech: ['n8n', 'GPT-4', 'ElevenLabs', 'Webhook', 'Python'],
      category: 'Automatización',
      github: 'https://github.com/iacortex',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      stats: { workflows: '100+', saved: '200hrs', accuracy: '95%' }
    },
    {
      id: 4,
      title: 'Rastreo GPS Satelital Flota',
      description: 'Sistema de seguridad para camiones con GPS satelital, geofencing y análisis predictivo.',
      tech: ['React', 'Leaflet', 'FastAPI', 'MongoDB', 'AWS'],
      category: 'Tracking & Maps',
      github: 'https://github.com/iacortex',
      icon: MapPin,
      color: 'from-green-500 to-emerald-500',
      stats: { vehicles: '200+', alerts: '5K/day', coverage: '99%' }
    },
    {
      id: 5,
      title: 'Plataforma de Monitoreo IoT',
      description: 'Dashboard en tiempo real para sensores IoT en pontones, con análisis predictivo y alertas automáticas.',
      tech: ['Vue.js', 'InfluxDB', 'Grafana', 'MQTT', 'Docker'],
      category: 'IoT & Analytics',
      github: 'https://github.com/iacortex',
      icon: Database,
      color: 'from-indigo-500 to-purple-500',
      stats: { sensors: '1K+', data: '100TB', realtime: 'Yes' }
    },
    {
      id: 6,
      title: 'API Gateway & Microservicios',
      description: 'Arquitectura de microservicios escalable con API Gateway, service mesh y observabilidad completa.',
      tech: ['Go', 'gRPC', 'Istio', 'Prometheus', 'Kubernetes'],
      category: 'Architecture',
      github: 'https://github.com/iacortex',
      icon: GitBranch,
      color: 'from-red-500 to-pink-500',
      stats: { services: '50+', rps: '100K', availability: '99.99%' }
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Demo Sistema de Seguridad IA',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
      duration: '2:30',
      description: 'Demostración del sistema de clasificación automática con radar Spotter',
      views: '1.2K'
    },
    {
      id: 2,
      title: 'Alimentación Remota en Acción',
      thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      duration: '1:45',
      description: 'Sistema de alimentación automatizada procesando eventos en tiempo real',
      views: '890'
    },
    {
      id: 3,
      title: 'Automatización con n8n + IA',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      duration: '3:15',
      description: 'Workflows inteligentes reduciendo tiempos operacionales',
      views: '2.1K'
    },
    {
      id: 4,
      title: 'Dashboard IoT en Tiempo Real',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      duration: '2:00',
      description: 'Monitoreo de sensores y alertas automáticas',
      views: '1.5K'
    }
  ];
    
  // Navegación suave a secciones (corrige error: bloque suelto antes)
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const techStack = {
    frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Angular'],
    backend: ['Node.js', 'Python', 'Java', 'PHP', 'Express', 'FastAPI', 'NestJS'],
    databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'TimescaleDB', 'SQL Server'],
    ai: ['ChatGPT API (GPT-3.5/4)', 'ElevenLabs TTS', 'Machine Learning', 'Automatización IA', 'n8n'],
    infrastructure: ['AWS', 'Docker', 'Kubernetes', 'Linux', 'Nginx', 'IBM AS400', 'Sistemas Distribuidos']
  };

  const experience = [
    {
      company: 'AST Networks',
      position: 'Project Manager / Senior Software Engineer / Technical Lead',
      period: '2023 - 2025',
      location: 'Chile',
      achievements: [
        'Liderazgo de proyectos integrando software, IoT, radares, GPS satelital e IA',
        'Arquitecturas backend procesando millones de eventos por segundo en tiempo real',
        'Plataforma de seguridad avanzada con clasificación automática de personas y embarcaciones',
        'Integración de APIs ChatGPT para análisis y enriquecimiento de datos',
        'Implementación de ElevenLabs para alertas por voz (TTS)',
        'Automatización inteligente con n8n reduciendo intervención humana',
        'Clientes: Aquachile, Salmones Austral, Yadran'
      ]
    },
    {
      company: 'Oxxean S.A.',
      position: 'Software Engineer',
      period: '2022 - 2023',
      location: 'Chile',
      achievements: [
        'Desarrollo de sistema de tickets para soporte informático',
        'Automatización de flujos de atención y gestión de incidencias',
        'Mejora de trazabilidad y tiempos de respuesta del soporte TI'
      ]
    },
    {
      company: 'Clip Tecnología',
      position: 'Soporte Bancario / Sistemas',
      period: '2022',
      location: 'Chile',
      achievements: [
        'Soporte y operación de sistemas IBM AS400',
        'Administración de servidores y plataformas críticas',
        'Trabajo con Banco Internacional, Itaú, Banco Falabella, Banco BCI'
      ]
    }
  ];

  const education = [
    {
      institution: 'Universidad Santo Tomás',
      degree: 'Ingeniero Informático',
      period: '2016 - 2021',
      icon: GraduationCap
    },
    {
      institution: 'Curso N8N IA',
      degree: 'Procesos de Automatización',
      period: '2025',
      icon: Brain
    }
  ];

  const hardSkills = [
    'Seguridad de Datos',
    'Herramientas de Programación y Análisis',
    'Administrador de Servidores',
    'Modelador de Base de Datos',
    'Automatización de Procesos con IA',
    'Publicidad Digital'
  ];

  const softSkills = [
    'Liderazgo técnico y humano',
    'Gestión de proyectos tecnológicos',
    'Comunicación efectiva',
    'Toma de decisiones bajo presión',
    'Pensamiento analítico y estratégico',
    'Mentoría y formación de equipos',
    'Organización y planificación',
    'Orientación a resultados'
  ];

  const languages = [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Intermedio' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 z-50"
        initial={{ width: '0%' }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Matrix Rain Background */}
      <MatrixRain />
      {/* Aurora overlay (soft colorful aurora bands) */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.45}
        className="hidden sm:block"
      />

      {/* Content with higher z-index */}
      <div className="relative z-10">
      {/* Navbar */}
      <PillNav
        logo={null}
        logoAlt="CH"
        items={[
          { label: 'inicio', href: 'inicio' },
          { label: 'acerca', href: 'acerca' },
          { label: 'stack', href: 'stack' },
          { label: 'proyectos', href: 'proyectos' },
          { label: 'videos', href: 'videos' },
          { label: 'experiencia', href: 'experiencia' },
          { label: 'educacion', href: 'educacion' },
          { label: 'habilidades', href: 'habilidades' },
          { label: 'contacto', href: 'contacto' }
        ]}
        activeHref={activeSection}
        className={scrolled ? 'scrolled' : ''}
        onItemClick={(href) => scrollToSection(href)}
        onMobileMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        initialLoadAnimation={true}
        baseColor="#0ea5e9"
        pillColor="rgba(15,23,42,0.6)"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#cbd5e1"
      />

      {/* Mobile Menu (controls via PillNav onMobileMenuClick) */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-blue-500/20 fixed top-16 left-0 right-0 z-40">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {['inicio', 'acerca', 'stack', 'proyectos', 'videos', 'experiencia', 'educacion', 'habilidades', 'contacto'].map((item) => (
              <button
                key={item}
                onClick={() => { scrollToSection(item); setIsMenuOpen(false); }}
                className="block w-full text-left px-3 py-3 capitalize hover:bg-blue-900/50 rounded-md transition-colors text-gray-300"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center pt-16 px-4 relative overflow-hidden">
        {/* Parallax Background Layers */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 150, 255, 0.3) 0%, transparent 50%)',
            transform: `translateY(${scrollY * 0.5}px)`,
            zIndex: 1
          }}
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 80%, rgba(0, 200, 255, 0.2) 0%, transparent 50%)',
            transform: `translateY(${scrollY * 0.3}px)`,
            zIndex: 2
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <motion.div
              className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-blue-500/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              CH
            </motion.div>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SplitText text="Cristian Hernández" delay={100} duration={0.6} className="inline-block" />
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl text-cyan-400 font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Project Manager - Desarrollador Full Stack
          </motion.p>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Ingeniero Informático
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="mailto:emilianohu@icloud.com"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              <span>emilianohu@icloud.com</span>
            </motion.a>
            <motion.div
              className="flex items-center gap-2 px-6 py-3 bg-slate-800/80 backdrop-blur text-gray-300 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <MapPin size={20} />
              <span>Puerto Montt, Chile</span>
            </motion.div>
          </motion.div>
          <motion.button
            onClick={() => scrollToSection('acerca')}
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
          >
            <ChevronDown size={40} />
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section id="acerca" className="py-20 px-4 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(0, 150, 255, 0.2) 0%, transparent 70%)',
            transform: `translateY(${scrollY * 0.2}px)`,
            zIndex: 0
          }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Acerca de Mí
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg shadow-blue-500/20 border border-blue-500/20">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">Perfil Profesional</h3>
              <ul className="space-y-2 text-gray-300">
                {['Senior Software Engineer con mentalidad de arquitecto de sistemas', 'Project Manager tecnológico con experiencia real en ejecución', 'Especialista en backend, APIs, IoT, IA aplicada y automatización', 'Experiencia en seguridad, monitoreo en tiempo real y sistemas industriales', 'Capacidad comprobada de liderazgo técnico y toma de decisiones bajo presión'].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Star className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal className="space-y-4 text-gray-300 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Soy un líder tecnológico con fuerte base técnica, especializado en el diseño, desarrollo y gestión de sistemas críticos de alta complejidad, integrando software, IoT, electrónica, inteligencia artificial y plataformas satelitales.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                A lo largo de mi carrera he liderado y construido soluciones end-to-end, desde la definición de la arquitectura hasta su operación en producción, procesando millones de eventos por segundo en entornos industriales exigentes.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                Como líder, promuevo equipos autónomos, responsables y alineados a objetivos claros. Creo en el liderazgo cercano, técnico y humano, donde la calidad del software y el crecimiento del equipo son igual de importantes.
              </motion.p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="stack" className="py-20 px-4 bg-slate-800/30 backdrop-blur-sm relative overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 0% 100%, rgba(0, 200, 255, 0.2) 0%, transparent 60%)',
            transform: `translateY(${scrollY * 0.15}px)`,
            zIndex: 0
          }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Stack Tecnológico
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Frontend', icon: Code, items: techStack.frontend, color: 'from-blue-500 to-blue-600' },
              { title: 'Backend', icon: Server, items: techStack.backend, color: 'from-indigo-500 to-indigo-600' },
              { title: 'Bases de Datos', icon: Database, items: techStack.databases, color: 'from-cyan-500 to-cyan-600' },
              { title: 'Inteligencia Artificial', icon: Brain, items: techStack.ai, color: 'from-purple-500 to-purple-600' },
              { title: 'Infraestructura & DevOps', icon: Cloud, items: techStack.infrastructure, color: 'from-sky-500 to-sky-600' }
            ].map((category, idx) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={idx}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-500/10 p-6 border border-blue-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0, 150, 255, 0.3)" }}
                >
                  <motion.div
                    className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="text-white" size={28} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, i) => (
                      <motion.span
                        key={i}
                        className="px-3 py-1 bg-blue-900/30 text-cyan-300 rounded-full text-sm font-medium border border-blue-500/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 150, 255, 0.3)" }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-20 px-4 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 100% 50%, rgba(0, 150, 255, 0.15) 0%, transparent 70%)',
            transform: `translateY(${scrollY * 0.25}px)`,
            zIndex: 0
          }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Proyectos Destacados
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                className={`bg-gradient-to-br ${project.color} rounded-2xl shadow-lg p-6 border border-white/10 cursor-pointer relative overflow-hidden`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ scale: 1.05, boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
                  animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0 }}
                />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      animate={hoveredProject === project.id ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {(() => {
                        const Icon = project.icon;
                        return <Icon className="text-white" size={32} />;
                      })()}
                    </motion.div>
                    <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-semibold">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/80 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-white/20 text-white rounded text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-white/20 text-white rounded text-xs font-medium">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/20">
                    {Object.entries(project.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-white/60 text-xs capitalize">{key}</p>
                        <p className="text-white font-bold"><AnimatedNumber value={value} /></p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-20 px-4 bg-slate-800/30 backdrop-blur-sm relative overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(0, 200, 255, 0.15) 0%, transparent 60%)',
            transform: `translateY(${scrollY * 0.2}px)`,
            zIndex: 0
          }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Demostraciones en Video
            </h2>
          </ScrollReveal>
          <AnimatePresence>
            {selectedVideo && (
              <motion.div
                className="mb-12 bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/30 border border-blue-500/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                  <img src={selectedVideo.thumbnail} alt={selectedVideo.title} className="w-full h-full object-cover" />
                  <motion.button
                    className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-colors"
                    onClick={() => setSelectedVideo(null)}
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Play className="text-white" size={64} />
                    </motion.div>
                  </motion.button>
                </div>
                <div className="p-6">
                  <motion.h3
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {selectedVideo.title}
                  </motion.h3>
                  <motion.p
                    className="text-gray-300 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {selectedVideo.description}
                  </motion.p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {selectedVideo.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={16} />
                        {selectedVideo.views} views
                      </span>
                    </div>
                    <motion.button
                      onClick={() => setSelectedVideo(null)}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cerrar
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video, idx) => (
              <motion.div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg border border-blue-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 150, 255, 0.3)" }}
              >
                <div className="relative w-full aspect-video bg-slate-900/50 flex items-center justify-center overflow-hidden">
                  <motion.img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                    initial={{ opacity: 0.5 }}
                    whileHover={{ opacity: 0.3 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Play className="text-white" size={48} />
                    </motion.div>
                  </motion.div>
                </div>
                <div className="bg-gradient-to-br from-slate-900 to-blue-900/50 p-4">
                  <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">{video.title}</h3>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {video.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {video.views}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-20 px-4 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 0% 50%, rgba(0, 150, 255, 0.15) 0%, transparent 60%)',
            transform: `translateY(${scrollY * 0.18}px)`,
            zIndex: 0
          }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Experiencia Laboral
            </h2>
          </ScrollReveal>
          <div className="space-y-8">
            {experience.map((job, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-500/10 p-8 border border-blue-500/20"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ boxShadow: "0 20px 40px rgba(0, 150, 255, 0.3)" }}
              >
                <div className="flex flex-wrap items-start justify-between mb-4">
                  <div>
                    <motion.h3
                      className="text-2xl font-bold text-white"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {job.company}
                    </motion.h3>
                    <motion.p
                      className="text-xl text-cyan-400 font-semibold"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {job.position}
                    </motion.p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={20} />
                    <span className="font-medium">{job.period}</span>
                  </div>
                </div>
                <p className="text-gray-400 mb-4 flex items-center gap-2">
                  <MapPin size={18} />
                  {job.location}
                </p>
                <ul className="space-y-2">
                  {job.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="educacion" className="py-20 px-4 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Educación
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-500/10 p-8 border border-blue-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0, 150, 255, 0.3)" }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {(() => {
                    const Icon = edu.icon;
                    return <Icon className="text-white" size={32} />;
                  })()}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                <p className="text-cyan-400 font-semibold mb-2">{edu.institution}</p>
                <p className="text-gray-400">{edu.period}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="habilidades" className="py-20 px-4 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(0, 200, 255, 0.15) 0%, transparent 60%)',
            transform: `translateY(${scrollY * 0.22}px)`,
            zIndex: 0
          }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-12 text-white">
              Habilidades
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <motion.div
              className="bg-gradient-to-br from-blue-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-500/10 p-8 border border-blue-500/20"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <Award size={28} />
                Habilidades Duras
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {hardSkills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 bg-slate-800/50 backdrop-blur p-3 rounded-lg shadow border border-blue-500/10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5, backgroundColor: "rgba(0, 150, 255, 0.1)" }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                    ></motion.div>
                    <span className="text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-indigo-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl shadow-lg shadow-indigo-500/10 p-8 border border-indigo-500/20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
                <Star size={28} />
                Habilidades Blandas
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {softSkills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-center gap-3 bg-slate-800/50 backdrop-blur p-3 rounded-lg shadow border border-indigo-500/10"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ x: -5, backgroundColor: "rgba(150, 100, 255, 0.1)" }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                    ></motion.div>
                    <span className="text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div
            className="bg-gradient-to-br from-purple-900/30 to-slate-900/30 backdrop-blur-sm rounded-2xl shadow-lg shadow-purple-500/10 p-8 border border-purple-500/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
              <Languages size={28} />
              Idiomas
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {languages.map((lang, idx) => (
                <motion.div
                  key={idx}
                  className="bg-slate-800/50 backdrop-blur p-4 rounded-lg shadow border border-purple-500/10 flex items-center justify-between"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-white font-semibold">{lang.name}</span>
                  <motion.span
                    className="px-4 py-1 bg-purple-900/50 text-pink-300 rounded-full text-sm font-medium border border-pink-500/30"
                    animate={{ boxShadow: ["0 0 0px rgba(236, 72, 153, 0)", "0 0 15px rgba(236, 72, 153, 0.5)", "0 0 0px rgba(236, 72, 153, 0)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {lang.level}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Objectives & Value Section */}
      <section className="py-20 px-4 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-slate-900/50 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-500/10 p-8 border border-blue-500/20"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ boxShadow: "0 20px 40px rgba(0, 150, 255, 0.3)" }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Target className="text-white" size={32} />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-4">Objetivo Profesional</h3>
              <p className="text-gray-300 leading-relaxed">
                Continuar liderando y escalando soluciones tecnológicas críticas a nivel regional e internacional, aportando valor estratégico como Senior Engineer, Tech Lead, Engineering Manager o Project Manager tecnológico, en organizaciones que buscan excelencia técnica, innovación y impacto real.
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg shadow-blue-500/30 p-8 text-white"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ boxShadow: "0 20px 50px rgba(0, 200, 255, 0.4)" }}
            >
              <motion.div
                className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="text-white" size={32} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Valor Diferencial</h3>
              <ul className="space-y-2">
                {['Experiencia real en sistemas críticos e industriales', 'Capacidad de llevar proyectos de idea a producción', 'Integración efectiva de IA, IoT y automatización', 'Visión estratégica con ejecución técnica sólida'].map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.1 }}
                    ></motion.div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-4 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 200, 255, 0.15) 0%, transparent 70%)',
            transform: `translateY(${scrollY * 0.25}px)`,
            zIndex: 0
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl font-bold mb-8 text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            ¡Disponibilidad Inmediata!
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Contactar por email - Teléfono inhabilitado
          </motion.p>
          <motion.div
            className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-2xl shadow-blue-500/30 p-8 text-white border border-blue-400/30"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ boxShadow: "0 30px 60px rgba(0, 200, 255, 0.5)" }}
          >
            <motion.h3
              className="text-2xl font-bold mb-6"
              animate={{ textShadow: ["0 0 0px rgba(255, 255, 255, 0)", "0 0 20px rgba(0, 200, 255, 0.8)", "0 0 0px rgba(255, 255, 255, 0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Agendemos una Reunión
            </motion.h3>
            <motion.a
              href="mailto:emilianohu@icloud.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold shadow-lg text-lg"
              whileHover={{ scale: 1.05, backgroundColor: "#f0f9ff" }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={24} />
              emilianohu@icloud.com
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-br from-slate-950 to-blue-950 text-white py-8 px-4 border-t border-blue-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            className="text-lg mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Cristian Hernández
          </motion.p>
          <p className="text-cyan-300">Project Manager - Desarrollador Full Stack</p>
          <p className="text-sm text-gray-400 mt-4">© 2025 Todos los derechos reservados</p>
        </div>
      </motion.footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full shadow-lg shadow-blue-500/50 flex items-center justify-center hover:shadow-blue-500/70 transition-all"
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(0, 150, 255, 0.7)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={24} className="text-white rotate-180" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
      </div>
      <CustomCursor useLogoCursor={useLogoCursor} />
    </div>
  );
};

export default Portfolio;