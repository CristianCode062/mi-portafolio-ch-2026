import { useEffect, useRef, useState } from "react";

const INSTALL_LOGS = [
  "> npm install",
  "",
  "added 142 packages, and audited 143 packages in 2s",
  "",
  "✔ react@18.3.0",
  "✔ react-dom@18.3.0",
  "✔ vite@5.0.12",
  "✔ tailwindcss@3.4.1",
  "✔ framer-motion@11.0.0",
  "✔ shadcn-ui@latest",
  "✔ lucide-react@0.453.0",
  "",
  "found 0 vulnerabilities",
  "",
];

export default function TerminalLoader({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const containerRef = useRef(null);

  // 👉 estado derivado (NO setState)
  const ready = index >= INSTALL_LOGS.length;

  // Auto scroll
  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [lines]);

  // Simulación de instalación
  useEffect(() => {
    if (index >= INSTALL_LOGS.length) return;

    const delay = INSTALL_LOGS[index].startsWith("✔") ? 180 : 320;

    const timeout = setTimeout(() => {
      setLines((prev) => [...prev, INSTALL_LOGS[index]]);
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [index]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (input.trim() === "npm run dev") {
      setLines((prev) => [
        ...prev,
        `$ ${input}`,
        "> vite v5.0.12 ready in 412 ms",
        "> Local: http://localhost:5173/",
        "",
      ]);

      setTimeout(() => onComplete(), 1200);
    } else {
      setLines((prev) => [
        ...prev,
        `$ ${input}`,
        "command not found",
        "",
      ]);
    }

    setInput("");
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-green-400 font-mono text-sm">
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto p-6"
      >
        {lines.map((line, i) => (
          <div key={i} className="leading-relaxed">
            {line}
          </div>
        ))}

        {ready && (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <span>$</span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none caret-green-400 text-green-300"
            />
          </form>
        )}
      </div>
    </div>
  );
}
