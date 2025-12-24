"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

export interface PillNavItem {
  label: string;
  href: string;
}

interface AdvancedPillNavProps {
  items: PillNavItem[];
  activeHref?: string;
}

export default function AdvancedPillNav({ items, activeHref }: AdvancedPillNavProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Three.js Scene para partículas
  useEffect(() => {
    if (!mountRef.current) return;

    const width = window.innerWidth;
    const height = 80;

    // Escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 40;

    // Partículas
    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * width * 0.1;
      positions[i + 1] = (Math.random() - 0.5) * height * 0.5;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      velocities[i] = (Math.random() - 0.5) * 0.5;
      velocities[i + 1] = (Math.random() - 0.5) * 0.3;
      velocities[i + 2] = 0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 2,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animación
    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);

      const positions = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];

        // Bounce
        if (Math.abs(positions[i]) > width * 0.05) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > height * 0.25) velocities[i + 1] *= -1;
      }

      geometry.attributes.position.needsUpdate = true;
      particles.rotation.z += 0.0001;

      renderer.render(scene, camera);
    }

    animate();

    // Resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, 80);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Canvas Three.js */}
      <div
        ref={mountRef}
        className="absolute inset-0 h-20 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 100%)",
        }}
      />

      {/* Barra lateral que crece con scroll */}
      <motion.div
        className="absolute left-0 top-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-500"
        style={{
          height: `${Math.min(scrollY / 5, 80)}px`,
        }}
      />

      {/* Navegación centrada */}
      <nav className="relative z-20 h-20 flex items-center justify-center">
        <motion.div className="flex gap-3 backdrop-blur-xl bg-black/30 px-8 py-3 rounded-full border border-cyan-500/20">
          {items.map((item, idx) => (
            <motion.a
              key={item.href}
              href={`#${item.href}`}
              onClick={() => {
                handleClick(item.href);
                setActiveIndex(idx);
              }}
              className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                activeIndex === idx
                  ? "bg-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-500/50"
                  : "text-slate-300 hover:text-cyan-300"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      </nav>

      {/* Decoración superior */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30" />
    </header>
  );
}
