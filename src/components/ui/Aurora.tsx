import { useRef, useEffect, useMemo } from "react";
import "./Aurora.css";

/* =========================
   Types
========================= */
interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
  className?: string;
}

/* =========================
   Component
========================= */
export default function Aurora({
  colorStops = ["#3A29FF", "#FF94B4", "#FF3232"],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.5,
  className = "",
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // stable dependency for useEffect
  const colorKey = useMemo(() => colorStops.join("|"), [colorStops]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let width = canvas.clientWidth || window.innerWidth;
    let height = canvas.clientHeight || window.innerHeight;
    const DPR = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      width = canvas.clientWidth || window.innerWidth;
      height = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const t0 = performance.now();

    const draw = (now: number) => {
      const t = ((now - t0) / 1000) * speed;
      ctx.clearRect(0, 0, width, height);

      // base overlay
      ctx.fillStyle = "rgba(6,8,20,0.25)";
      ctx.fillRect(0, 0, width, height);

      const bands = Math.max(2, Math.floor(3 + amplitude * 3));

      for (let b = 0; b < bands; b++) {
        const progress = b / (bands - 1 || 1);
        const bandAlpha = 0.12 * (1 + Math.sin(t * (0.3 + progress) + b));
        const gradient = ctx.createLinearGradient(
          0,
          height * (0.2 + progress * 0.6),
          width,
          height * (0.4 + progress * 0.6)
        );

        for (let i = 0; i < colorStops.length; i++) {
          const stop = i / (colorStops.length - 1 || 1);
          const offset = stop * 0.4 * Math.sin(t * (0.6 + i * 0.2) + b);
          gradient.addColorStop(
            Math.min(1, Math.max(0, stop + offset)),
            hexToRgba(colorStops[i], bandAlpha * blend + 0.02)
          );
        }

        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = gradient;

        ctx.beginPath();
        const waveHeight =
          80 * amplitude * (1 + Math.sin(t * (0.2 + b * 0.1)) * 0.6);
        const yBase = height * (0.1 + progress * 0.7);

        ctx.moveTo(0, height);
        ctx.lineTo(0, yBase + Math.sin(t * 0.9 + b) * waveHeight);

        const segments = 6;
        for (let s = 1; s <= segments; s++) {
          const x = (s / segments) * width;
          const y =
            yBase +
            Math.sin(t * (1.0 + s * 0.12) + b + s) *
              waveHeight *
              Math.cos((s / segments) * Math.PI);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [colorKey, blend, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`aurora-canvas ${className}`}
    />
  );
}

/* =========================
   Utils
========================= */
function hexToRgba(hex: string, alpha = 1): string {
  const h = hex.replace("#", "").trim();
  const fullHex =
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h;

  const bigint = parseInt(fullHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
