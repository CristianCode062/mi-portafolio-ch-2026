import Particles from "react-particles";
import type { ISourceOptions } from "tsparticles-engine";

export default function NeuralBackground() {
  const options: ISourceOptions = {
    fullScreen: false,
    background: {
      color: "transparent",
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 140, // 🔥 MÁS partículas para que se vea
        density: {
          enable: true,
        },
      },
      color: {
        value: "#60a5fa",
      },
      links: {
        enable: true,
        color: "#60a5fa",
        distance: 140,
        opacity: 0.45, // 🔥 visible
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.6,
        outModes: {
          default: "bounce",
        },
      },
      opacity: {
        value: 0.85,
      },
      size: {
        value: { min: 1.2, max: 2.4 },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.8,
          },
        },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Particles
        options={options}
        className="w-full h-full"
      />
    </div>
  );
}
