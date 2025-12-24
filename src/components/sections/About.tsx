"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

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

    /* ========== TIERRA CON EFECTO MEJORADO ========== */
    const earthGeometry = new THREE.SphereGeometry(2.5, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x0a1628,
      emissive: 0x001a3d,
      shininess: 30,
      specular: 0x00ffff,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    sceneRef.current.earth = earth;

    // Atmosphera glow
    const atmosphereGeometry = new THREE.SphereGeometry(2.7, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Wireframe
    const wireframeGeometry = new THREE.SphereGeometry(2.52, 40, 40);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    /* ========== STARLINK SATELLITES ========== */
    const starlinkGroup = new THREE.Group();
    const numStarlinks = 60;
    const starlinkRadius = 3.5;

    for (let i = 0; i < numStarlinks; i++) {
      const angle = (i / numStarlinks) * Math.PI * 2;
      const orbitTilt = ((i % 6) * 30) * (Math.PI / 180);

      // Satellite body
      const satGeometry = new THREE.BoxGeometry(0.08, 0.05, 0.03);
      const satMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.5,
        shininess: 100,
      });
      const satellite = new THREE.Mesh(satGeometry, satMaterial);

      // Solar panels
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

    /* ========== LUCES ========== */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0x00ffff, 2, 100);
    sunLight.position.set(10, 5, 10);
    scene.add(sunLight);

    const backLight = new THREE.PointLight(0xff0080, 1.5, 100);
    backLight.position.set(-10, -5, -10);
    scene.add(backLight);

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

      // Rotación de la tierra
      earth.rotation.y += 0.002;
      wireframe.rotation.y += 0.002;

      // Pulso de la atmósfera
      atmosphere.scale.set(
        1 + Math.sin(time * 0.5) * 0.03,
        1 + Math.sin(time * 0.5) * 0.03,
        1 + Math.sin(time * 0.5) * 0.03
      );

      // Órbita de satélites Starlink
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

      // Órbita de satélites GPS
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

      // Actualizar líneas de comunicación
      lineUpdateCounter++;
      if (lineUpdateCounter > 60) {
        createCommLines();
        lineUpdateCounter = 0;
      }

      // Rotación de asteroides
      asteroidGroup.children.forEach((asteroid) => {
        const data = (asteroid as any).userData;
        asteroid.rotation.x += data.rotationSpeed.x;
        asteroid.rotation.y += data.rotationSpeed.y;
        asteroid.rotation.z += data.rotationSpeed.z;
      });

      // Rotación de nebulosa
      nebula.rotation.y += 0.0002;
      nebula.rotation.x += 0.0001;

      // Parpadeo de estrellas
      starsMaterial.opacity = 0.6 + Math.sin(time * 0.5) * 0.2;

      // Movimiento de cámara con mouse
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
    <section className="relative min-h-screen w-full bg-black overflow-hidden grid grid-cols-1 lg:grid-cols-2">
      {/* Texto a la izquierda */}
      <div className="z-10 flex flex-col justify-center px-6 md:px-12 py-24 min-h-screen relative">
        <div className="max-w-xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Acerca de mí
          </h2>
          <p className="text-cyan-200/80 mb-6 text-lg leading-relaxed font-light">
            Ingeniero y líder tecnológico especializado en sistemas críticos, tiempo real y plataformas distribuidas de misión crítica. Con más de una década de experiencia navegando la intersección entre infraestructura resiliente y soluciones escalables.
          </p>
          <p className="text-blue-200/80 mb-6 text-lg leading-relaxed font-light">
            Diseño y opero arquitecturas que integran software, IoT, analítica avanzada y conectividad satelital, priorizando resiliencia, observabilidad y escala. He liderado equipos multidisciplinarios en proyectos que demandaban decisiones tecnológicas bajo presión extrema, donde cada milisegundo cuenta.
          </p>
          <p className="text-purple-200/80 mb-6 text-lg leading-relaxed font-light">
            Mi enfoque es holístico: no solo construyo sistemas que funcionan, sino que evolucionan. Desde el diseño de protocolos de comunicación en edge computing hasta la orquestación de microservicios críticos, cada componente se alinea con objetivos de negocio y sostenibilidad técnica.
          </p>
          <p className="text-slate-300 mb-6 text-lg leading-relaxed font-light">
            Mi trabajo vive donde convergen ingeniería profunda, impacto real y toma de decisiones en entornos de alta presión. Creo que la verdadera excelencia técnica no es visible—es transparente, confiable y adaptable a los cambios del mercado.
          </p>
          <p className="text-cyan-300/70 text-lg leading-relaxed font-light italic">
            Busco continuamente desafíos que me permitan expandir los límites de lo posible, trabajando con equipos que comparten esa pasión por la innovación responsable.
          </p>
        </div>
        <div 
          className="absolute right-0 top-0 w-64 h-full pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)",
            zIndex: 5
          }}
        />
      </div>

      {/* Canvas 3D a la derecha */}
      <div 
        ref={mountRef} 
        className="relative w-full min-h-screen"
        style={{
          background: "radial-gradient(ellipse at center, #0a0e1a 0%, #000000 100%)"
        }}
      >
        {/* Indicador de Métricas dentro del canvas */}
        <div
          className={`absolute bottom-8 left-6 backdrop-blur-2xl border rounded-2xl p-6 text-xs space-y-2 z-20 transition-all shadow-2xl ${
            metrics.incident
              ? "bg-red-950/60 border-red-400/50 text-red-200"
              : "bg-cyan-950/60 border-cyan-400/40 text-cyan-200"
          }`}
        >
          <div className="font-semibold tracking-widest uppercase text-sm">Latency</div>
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{metrics.latency.toFixed(1)} ms</div>
          <div className="text-xs mt-3 space-y-1 opacity-75">
            <div>Region: {metrics.region}</div>
            <div>FPS: {metrics.fps}</div>
          </div>
          {metrics.incident && (
            <div className="pt-2 font-bold tracking-widest text-red-400 animate-pulse">
              ⚠ INCIDENT DETECTED
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
