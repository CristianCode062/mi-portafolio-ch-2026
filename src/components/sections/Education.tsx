import React, { useState, useEffect } from 'react';
import { GraduationCap, Target, Code, Database, Workflow, CheckCircle2 } from 'lucide-react';

const education = [
  {
    title: "Ingeniería Informática",
    institution: "Universidad Santo Tomás",
    period: "2016 — 2021",
  },
  {
    title: "Educación Media Técnico Profesional",
    institution: "Liceo Politécnico Holanda",
    period: "2010 — 2013",
  },
  {
    title: "Automatización e Inteligencia Artificial",
    institution: "n8n",
    period: "2025",
  },
];

const softSkills = [
  "Pensamiento analítico y resolución de problemas",
  "Autonomía y aprendizaje autodidacta",
  "Comunicación efectiva con equipos técnicos y de negocio",
  "Responsabilidad y compromiso profesional",
  "Capacidad de adaptación a nuevos desafíos",
  "Enfoque en calidad, buenas prácticas y mejora continua",
];

const hardSkills = [
  "Diseño e implementación de arquitecturas de software escalables",
  "Desarrollo y consumo de APIs REST",
  "Diseño y modelado de bases de datos relacionales y NoSQL",
  "Implementación de microservicios y separación de responsabilidades",
  "Automatización de procesos y flujos de trabajo",
];

export default function ProfessionalProfile() {
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);

  useEffect(() => {
    softSkills.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSkills(prev => [...prev, index]);
      }, index * 100);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 p-4 md:p-8">
      <style>
        {`
          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideRight {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .grid-bg {
            background-image: 
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: gridMove 20s linear infinite;
          }
          .animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
          .animate-fade-in-up-2 { animation: fadeInUp 0.8s ease-out; }
          .animate-fade-in-up-3 { animation: fadeInUp 1s ease-out; }
          .animate-fade-in-right { animation: fadeInRight 0.6s ease-out; }
          .animate-fade-in-right-2 { animation: fadeInRight 0.8s ease-out; }
        `}
      </style>

      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Título Principal */}
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">Background Profesional</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Educacion & Habilidades
          </h1>
          <p className="text-xl text-slate-400">Desarrollador Fullstack</p>
          <div className="mt-4 h-1 w-32 mx-auto bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-500 animate-fade-in-up shadow-[0_0_40px_rgba(6,182,212,0.1)]">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-cyan-400" />
                Educación
              </h2>
              
              <div className="space-y-4">
                {education.map((item, index) => (
                  <div
                    key={index}
                    className="group relative bg-slate-800/40 rounded-xl p-4 border border-slate-700/30 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
                    style={{
                      animation: `slideInLeft 0.6s ease-out ${index * 0.2}s backwards`
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[slideRight_2s_ease-in-out_infinite]" />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-cyan-400 text-sm mt-1">{item.institution}</p>
                        </div>
                        <span className="text-slate-400 text-sm whitespace-nowrap">{item.period}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-teal-500/50 transition-all duration-500 animate-fade-in-up-2 shadow-[0_0_40px_rgba(20,184,166,0.1)]">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Code className="w-8 h-8 text-teal-400" />
                Perfil Profesional
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Desarrollador Fullstack con formación en ingeniería informática, orientado a la creación de soluciones escalables, 
                automatización de procesos y buenas prácticas de desarrollo. Enfocado en la mejora continua y en entregar valor real 
                mediante software.
              </p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-500 animate-fade-in-up-3 shadow-[0_0_40px_rgba(168,85,247,0.1)]">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                <Target className="w-8 h-8 text-purple-400" />
                Metas Profesionales
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Consolidarme como desarrollador senior, participar en proyectos de alto impacto tecnológico y especializarme en 
                arquitectura de software, automatización e inteligencia artificial aplicada a procesos reales.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-500 animate-fade-in-right shadow-[0_0_40px_rgba(16,185,129,0.1)]">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Workflow className="w-7 h-7 text-emerald-400" />
                Habilidades Claves
              </h2>
              
              <div className="space-y-3">
                {softSkills.map((skill, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      visibleSkills.includes(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <CheckCircle2 
                      className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 animate-pulse" 
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                    <span className="text-slate-300 text-sm leading-relaxed">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-500 animate-fade-in-right-2 shadow-[0_0_40px_rgba(59,130,246,0.1)]">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-7 h-7 text-blue-400" />
                Habilidades Duras
              </h2>
              
              <div className="space-y-3">
                {hardSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 group"
                    style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s backwards` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}