import MatrixRain from "../components/background/MatrixRain";
import AuroraBg from "../components/background/AuroraBg";
import PillNav from "../components/ui/PillNav";

import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import TechStack from "../components/sections/TechStack";
import Projects from "../components/sections/Projects";

export default function Portfolio() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <MatrixRain />
      <AuroraBg />

      <PillNav
        items={[
          { label: "inicio", href: "inicio" },
          { label: "acerca", href: "acerca" },
          { label: "stack", href: "stack" },
          { label: "proyectos", href: "proyectos" },
        ]}
        onItemClick={scrollTo}
      />

      <Hero onScroll={scrollTo} />
      <About />
      <TechStack />
      <Projects />
    </div>
  );
}
