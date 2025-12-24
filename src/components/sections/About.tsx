"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

/* ======================================================
   TIPOS
====================================================== */
type Metrics = {
  latency: number;
  jitter: number;
  throughput: number;
  packets: number;
  events: number;
  fps: number;
  satellites: number;
  sla: number;
  region: "NA" | "EU" | "APAC";
  incident: boolean;
};

/* ======================================================
   MÉTRICAS + INCIDENTES
====================================================== */
function useMetrics(): Metrics {
  const [metrics, setMetrics] = useState<Metrics>({
    latency: 18,
    jitter: 2,
    throughput: 6.2,
    packets: 22000,
    events: 54000,
    fps: 60,
    satellites: 48,
    sla: 99.996,
    region: "NA",
    incident: false,
  });

  useEffect(() => {
    let frames = 0;
    let last = performance.now();

    function fpsLoop(now: number) {
      frames++;
      if (now - last >= 1000) {
        setMetrics((m) => ({ ...m, fps: frames }));
        frames = 0;
        last = now;
      }
      requestAnimationFrame(fpsLoop);
    }
    requestAnimationFrame(fpsLoop);

    const interval = setInterval(() => {
      const latency = 10 + Math.random() * 60;
      const incident = latency > 45;

      setMetrics((m) => ({
        ...m,
        latency,
        jitter: 1 + Math.random() * 6,
        throughput: 4.5 + Math.random() * 3,
        packets: Math.floor(18000 + Math.random() * 12000),
        events: Math.floor(40000 + Math.random() * 30000),
        region: ["NA", "EU", "APAC"][Math.floor(Math.random() * 3)] as any,
        incident,
      }));
    }, 1400);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}

/* ======================================================
   COMPONENTE THREE.JS CANVAS
====================================================== */
interface ThreeSceneRef {
  scene?: THREE.Scene;
  renderer?: THREE.WebGLRenderer;
  camera?: THREE.PerspectiveCamera;
  earth?: THREE.Mesh;
  starlinkGroup?: THREE.Group;
  gpsGroup?: THREE.Group;
  asteroidGroup?: THREE.Group;
  nebula?: THREE.Points;
  stars?: THREE.Points;
}

/* ======================================================
   COMPONENTE
====================================================== */
export default function About() {
  const mountRef = useRef<HTMLDivElement>(null);
  const metrics = useMetrics();
  const sceneRef = useRef<ThreeSceneRef>({});

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    /* ========== ESCENA ========== */
    const scene = new THREE.Scene();
    sceneRef.current.scene = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);
    camera.position.y = 2;
    sceneRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    sceneRef.current.renderer = renderer;

    /* ========== TIERRA CON TEXTURA Y GEOGRAFÍA ========== */
    const earthGeometry = new THREE.SphereGeometry(2.5, 128, 128);
    
    // Crear textura procedural de tierra con continentes
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Oceano base
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, 512);
    oceanGradient.addColorStop(0, '#001a3d');
    oceanGradient.addColorStop(0.5, '#0a2b52');
    oceanGradient.addColorStop(1, '#001a3d');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, 1024, 512);
    
    // Dibujar continentes estilizados
    ctx.fillStyle = '#1a4d3d';
    ctx.globalAlpha = 0.7;
    
    // America
    ctx.beginPath();
    ctx.ellipse(200, 200, 80, 120, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(220, 320, 60, 100, 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // Europa/África
    ctx.beginPath();
    ctx.ellipse(520, 180, 70, 90, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(540, 300, 80, 110, 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    // Asia
    ctx.beginPath();
    ctx.ellipse(700, 200, 120, 100, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Australia
    ctx.beginPath();
    ctx.ellipse(800, 380, 50, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Agregar brillo a los continentes
    ctx.fillStyle = '#2d7a5f';
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(200, 190, 60, 100, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      emissive: 0x002244,
      emissiveIntensity: 0.2,
      shininess: 50,
      specular: 0x00ffff,
      specularMap: texture,
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    sceneRef.current.earth = earth;

    // Atmosphera glow mejorada
    const atmosphereGeometry = new THREE.SphereGeometry(2.72, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    
    // Glow exterior adicional
    const glowGeometry = new THREE.SphereGeometry(2.85, 64, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x0099ff,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Wireframe más detallado
    const wireframeGeometry = new THREE.SphereGeometry(2.53, 48, 48);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);
    
    // Grid ecuatorial
    const gridGeometry = new THREE.TorusGeometry(2.52, 0.005, 16, 100);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6,
    });
    const equator = new THREE.Mesh(gridGeometry, gridMaterial);
    equator.rotation.x = Math.PI / 2;
    scene.add(equator);

    /* ========== STARLINK SATELLITES ========== */
    const starlinkGroup = new THREE.Group();
    const numStarlinks = 60;
    const starlinkRadius = 3.5;

    for (let i = 0; i < numStarlinks; i++) {
      const angle = (i / numStarlinks) * Math.PI * 2;
      const orbitTilt = ((i % 6) * 30) * (Math.PI / 180);

      const satGeometry = new THREE.BoxGeometry(0.08, 0.05, 0.03);
      const satMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.5,
        shininess: 100,
      });
      const satellite = new THREE.Mesh(satGeometry, satMaterial);

      const panelGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.01);
      const panelMaterial = new THREE.MeshPhongMaterial({
        color: 0x1a4d7a,
        emissive: 0x0099ff,
        emissiveIntensity: 0.3,
      });
      const panel1 = new THREE.Mesh(panelGeometry, panelMaterial);
      panel1.position.x = -0.1;
      const panel2 = new THREE.Mesh(panelGeometry, panelMaterial);
      panel2.position.x = 0.1;

      satellite.add(panel1);
      satellite.add(panel2);

      const x = starlinkRadius * Math.cos(angle) * Math.cos(orbitTilt);
      const y = starlinkRadius * Math.sin(orbitTilt);
      const z = starlinkRadius * Math.sin(angle) * Math.cos(orbitTilt);

      satellite.position.set(x, y, z);
      satellite.lookAt(0, 0, 0);
      (satellite.userData as any) = {
        angle,
        orbitTilt,
        radius: starlinkRadius,
        speed: 0.001 + Math.random() * 0.001,
      };

      starlinkGroup.add(satellite);
    }
    scene.add(starlinkGroup);
    sceneRef.current.starlinkGroup = starlinkGroup;

    /* ========== GPS SATELLITES ========== */
    const gpsGroup = new THREE.Group();
    const numGPS = 24;
    const gpsRadius = 4.5;

    for (let i = 0; i < numGPS; i++) {
      const angle = (i / numGPS) * Math.PI * 2;
      const orbitTilt = (((i % 4) * 90) * Math.PI) / 180;

      const satGeometry = new THREE.OctahedronGeometry(0.1);
      const satMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0080,
        emissive: 0xff0080,
        emissiveIntensity: 0.7,
        shininess: 100,
      });
      const gpsSat = new THREE.Mesh(satGeometry, satMaterial);

      const x = gpsRadius * Math.cos(angle) * Math.cos(orbitTilt);
      const y = gpsRadius * Math.sin(orbitTilt);
      const z = gpsRadius * Math.sin(angle) * Math.cos(orbitTilt);

      gpsSat.position.set(x, y, z);
      (gpsSat.userData as any) = {
        angle,
        orbitTilt,
        radius: gpsRadius,
        speed: 0.0008,
      };

      gpsGroup.add(gpsSat);
    }
    scene.add(gpsGroup);
    sceneRef.current.gpsGroup = gpsGroup;

    /* ========== LÍNEAS DE COMUNICACIÓN ========== */
    const linesGroup = new THREE.Group();
    scene.add(linesGroup);

    function createCommLines() {
      while (linesGroup.children.length) {
        linesGroup.remove(linesGroup.children[0]);
      }

      const numLines = 30;
      for (let i = 0; i < numLines; i++) {
        const sat =
          starlinkGroup.children[
            Math.floor(Math.random() * starlinkGroup.children.length)
          ];

        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const x = 2.5 * Math.sin(theta) * Math.cos(phi);
        const y = 2.5 * Math.sin(theta) * Math.sin(phi);
        const z = 2.5 * Math.cos(theta);

        const points = [];
        points.push((sat as THREE.Mesh).position.clone());
        points.push(new THREE.Vector3(x, y, z));

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.3,
        });

        const line = new THREE.Line(geometry, material);
        linesGroup.add(line);
      }
    }
    createCommLines();

    /* ========== CAMPO DE ASTEROIDES ========== */
    const asteroidGroup = new THREE.Group();
    const numAsteroids = 100;

    for (let i = 0; i < numAsteroids; i++) {
      const size = 0.02 + Math.random() * 0.08;
      const geometry = new THREE.DodecahedronGeometry(size, 0);
      const material = new THREE.MeshPhongMaterial({
        color: 0x666666,
        emissive: 0x111111,
      });
      const asteroid = new THREE.Mesh(geometry, material);

      const distance = 6 + Math.random() * 4;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 5;

      asteroid.position.x = distance * Math.cos(angle);
      asteroid.position.z = distance * Math.sin(angle);
      asteroid.position.y = height;

      (asteroid.userData as any) = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
      };

      asteroidGroup.add(asteroid);
    }
    scene.add(asteroidGroup);
    sceneRef.current.asteroidGroup = asteroidGroup;

    /* ========== PARTÍCULAS DE NEBULOSA ========== */
    const nebulaGeometry = new THREE.BufferGeometry();
    const nebulaCount = 3000;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    for (let i = 0; i < nebulaCount * 3; i += 3) {
      nebulaPositions[i] = (Math.random() - 0.5) * 30;
      nebulaPositions[i + 1] = (Math.random() - 0.5) * 30;
      nebulaPositions[i + 2] = (Math.random() - 0.5) * 30;

      const color = Math.random();
      if (color < 0.5) {
        nebulaColors[i] = 0;
        nebulaColors[i + 1] = 1;
        nebulaColors[i + 2] = 1;
      } else {
        nebulaColors[i] = 1;
        nebulaColors[i + 1] = 0;
        nebulaColors[i + 2] = 0.5;
      }
    }

    nebulaGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nebulaPositions, 3)
    );
    nebulaGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(nebulaColors, 3)
    );

    const nebulaMaterial = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);
    sceneRef.current.nebula = nebula;

    /* ========== ESTRELLAS ========== */
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 5000;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      starsPositions[i] = (Math.random() - 0.5) * 50;
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starsPositions, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.8,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    sceneRef.current.stars = stars;

    /* ========== LUCES MEJORADAS ========== */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    const fillLight = new THREE.PointLight(0x00ffff, 1.2, 100);
    fillLight.position.set(-5, 2, 5);
    scene.add(fillLight);

    const backLight = new THREE.PointLight(0xff0080, 1, 100);
    backLight.position.set(-10, -5, -10);
    scene.add(backLight);
    
    // Luz rimlight para el borde de la tierra
    const rimLight = new THREE.PointLight(0x00d9ff, 0.8, 50);
    rimLight.position.set(0, 0, -8);
    scene.add(rimLight);

    /* ========== INTERACCIÓN DEL MOUSE ========== */
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetRotationX = (e.clientY / window.innerHeight - 0.5) * 0.5;
      targetRotationY = (e.clientX / window.innerWidth - 0.5) * 0.5;
    };

    document.addEventListener("mousemove", handleMouseMove);

    /* ========== ANIMACIÓN PRINCIPAL ========== */
    let time = 0;
    let lineUpdateCounter = 0;
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      earth.rotation.y += 0.002;
      wireframe.rotation.y += 0.002;

      atmosphere.scale.set(
        1 + Math.sin(time * 0.5) * 0.03,
        1 + Math.sin(time * 0.5) * 0.03,
        1 + Math.sin(time * 0.5) * 0.03
      );

      starlinkGroup.children.forEach((sat) => {
        const data = (sat as any).userData;
        data.angle += data.speed;
        const x = data.radius * Math.cos(data.angle) * Math.cos(data.orbitTilt);
        const y = data.radius * Math.sin(data.orbitTilt);
        const z = data.radius * Math.sin(data.angle) * Math.cos(data.orbitTilt);
        sat.position.set(x, y, z);
        (sat as THREE.Mesh).lookAt(0, 0, 0);
        sat.rotation.z += 0.05;
      });

      gpsGroup.children.forEach((sat) => {
        const data = (sat as any).userData;
        data.angle += data.speed;
        const x = data.radius * Math.cos(data.angle) * Math.cos(data.orbitTilt);
        const y = data.radius * Math.sin(data.orbitTilt);
        const z = data.radius * Math.sin(data.angle) * Math.cos(data.orbitTilt);
        sat.position.set(x, y, z);
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      });

      lineUpdateCounter++;
      if (lineUpdateCounter > 60) {
        createCommLines();
        lineUpdateCounter = 0;
      }

      asteroidGroup.children.forEach((asteroid) => {
        const data = (asteroid as any).userData;
        asteroid.rotation.x += data.rotationSpeed.x;
        asteroid.rotation.y += data.rotationSpeed.y;
        asteroid.rotation.z += data.rotationSpeed.z;
      });

      nebula.rotation.y += 0.0002;
      nebula.rotation.x += 0.0001;

      starsMaterial.opacity = 0.6 + Math.sin(time * 0.5) * 0.2;

      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      camera.position.x = Math.sin(currentRotationY * 2) * 8;
      camera.position.y = currentRotationX * 4 + 2;
      camera.position.z = Math.cos(currentRotationY * 2) * 8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    /* ========== RESPONSIVO ========== */
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-black overflow-hidden">
      {/* Barra roja superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent z-10"></div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Canvas 3D - Izquierda */}
        <div 
          ref={mountRef} 
          className="relative w-full h-screen"
        >
          {/* Indicador de Métricas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`absolute bottom-8 left-8 backdrop-blur-xl border rounded-xl p-5 text-xs z-20 transition-all shadow-2xl ${
              metrics.incident
                ? "bg-red-950/80 border-red-500/50"
                : "bg-slate-900/80 border-cyan-500/30"
            }`}
          >
            <div className="font-semibold tracking-wider uppercase text-xs text-slate-400 mb-2">
              Latency
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3">
              {metrics.latency.toFixed(1)} <span className="text-lg">ms</span>
            </div>
            <div className="text-xs space-y-1 text-slate-400">
              <div>Region: {metrics.region}</div>
              <div>FPS: {metrics.fps}</div>
            </div>
            {metrics.incident && (
              <div className="pt-3 mt-3 border-t border-red-500/30 font-bold tracking-widest text-red-400 animate-pulse text-xs">
                ⚠ INCIDENT DETECTED
              </div>
            )}
          </motion.div>

          {/* Iconos de satélites decorativos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute top-32 left-12 text-cyan-400/40 text-7xl z-10"
          >
            📡
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-32 right-12 text-cyan-400/40 text-6xl z-10"
          >
            🛰️
          </motion.div>
        </div>

        {/* Contenido de texto - Derecha */}
        <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-24">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Badge de IA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full"
            >
              <span className="text-red-400 text-sm font-semibold">🤖 IA</span>
            </motion.div>

            {/* Título principal */}
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

            {/* Descripción principal */}
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
                Diseño y opero arquitecturas que integran <span className="text-cyan-400 font-semibold">software, IoT, analítica avanzada y conectividad satelital</span>, priorizando resiliencia, observabilidad y escala. He liderado equipos multidisciplinarios en proyectos que demandaban <span className="font-semibold text-white">decisiones tecnológicas bajo presión extrema</span>, donde cada milisegundo cuenta.
              </p>
              <p className="text-slate-300 text-base leading-relaxed">
                Mi enfoque es holístico: no solo construyo sistemas que funcionan, sino que <span className="font-semibold text-white">evolucionan</span>. Desde el diseño de protocolos de comunicación en edge computing hasta la orquestación de microservicios críticos, cada componente se alinea con objetivos de negocio y sostenibilidad técnica.
              </p>
            </motion.div>

            {/* Features list */}
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

            {/* CTA Final */}
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-slate-400 text-base leading-relaxed italic"
            >
              Busco continuamente desafíos que me permitan expandir los límites de lo posible, trabajando con equipos que comparten esa pasión por la innovación responsable.
            </motion.p>

            {/* Botón Ver más */}
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

      {/* Barra roja inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
    </section>
  );
}