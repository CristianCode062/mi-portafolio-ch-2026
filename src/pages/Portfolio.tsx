import MatrixRain from "../components/background/MatrixRain";
import AdvancedPillNav from "../components/ui/AdvancedPillNav";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Education from "../components/sections/Education";
import Skills from "../components/sections/Skills";
import TechStack from "../components/sections/TechStack";
import Projects from "../components/sections/Projects";
import Videos from "../components/videos/Videos";
import Contact from "../components/sections/Contact";
import Footer from "../components/sections/Footer";

export default function Portfolio() {
  const navItems = [
    { label: "Inicio", href: "inicio" },
    { label: "Acerca", href: "acerca" },
    { label: "Experiencia", href: "experiencia" },
    { label: "Educación", href: "educacion" },
    { label: "Skills", href: "skills" },
    { label: "Stack", href: "stack" },
    { label: "Proyectos", href: "proyectos" },
    { label: "Videos", href: "videos" },
    { label: "Contacto", href: "contacto" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-black via-slate-950 to-black text-white">
      {/* Background */}
      <MatrixRain />

      {/* Navigation */}
      <AdvancedPillNav items={navItems} />

      {/* Content */}
      <main className="relative z-10">
        <section id="inicio">
          <Hero />
        </section>

        <section id="acerca">
          <About />
        </section>

        <section id="experiencia">
          <Experience />
        </section>

        <section id="educacion">
          <Education />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="stack">
          <TechStack />
        </section>

        <section id="proyectos">
          <Projects />
        </section>

        {/* VIDEOS: demos + feed tipo TikTok */}
        <section id="videos">
          <Videos />
        </section>

        <section id="contacto">
          <Contact />
        </section>

        <Footer />
      </main>
    </div>
  );
}
