import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Caracteres expandidos con más katakana, kanji y símbolos
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン田中山本木村佐藤高橋CRISTIAN</>CODE{};[]";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    const speeds: number[] = [];
    const colors: string[] = [];

    // Paleta de colores verde/azul hacker style
    const colorPalette = [
      "#00ff41", // Verde Matrix clásico
      "#00ff00", // Verde brillante
      "#00ff88", // Verde agua
      "#00ffaa", // Verde cyan
      "#00cc88", // Verde medio
      "#00ff66", // Verde lima
      "#00dd55", // Verde hacker
    ];

    // Inicializar drops con posiciones aleatorias y propiedades
    for (let i = 0; i < Math.floor(columns); i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
      speeds[i] = Math.random() * 0.5 + 0.5; // Velocidades variadas
      colors[i] = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    }

    const draw = () => {
      // Trail effect más sutil para mejor visibilidad
      ctx.fillStyle = "rgba(0, 10, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((y, i) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const yPos = y * fontSize;

        // Efecto de gradiente: caracteres más brillantes al frente
        const opacity = 1 - (y / (canvas.height / fontSize)) * 0.5;
        
        // Primer caracter (cabeza) más brillante
        ctx.fillStyle = colors[i];
        ctx.globalAlpha = Math.min(opacity + 0.5, 1);
        ctx.font = `bold ${fontSize}px "Courier New", monospace`;
        ctx.fillText(text, x, yPos);

        // Efecto glow en la cabeza
        ctx.shadowBlur = 8;
        ctx.shadowColor = colors[i];
        ctx.fillText(text, x, yPos);
        ctx.shadowBlur = 0;

        // Trail characters (cola más tenue)
        if (y > 1) {
          ctx.globalAlpha = opacity * 0.5;
          ctx.fillStyle = colors[i];
          ctx.font = `${fontSize}px "Courier New", monospace`;
          const prevText = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(prevText, x, (y - 1) * fontSize);
        }

        // Resetear alpha
        ctx.globalAlpha = 1;

        // Actualizar posición con velocidad variable
        if (yPos > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          // Cambiar color ocasionalmente al reiniciar
          if (Math.random() > 0.7) {
            colors[i] = colorPalette[Math.floor(Math.random() * colorPalette.length)];
          }
        } else {
          drops[i] += speeds[i];
        }
      });
    };

    const interval = setInterval(draw, 40);

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-35 z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}