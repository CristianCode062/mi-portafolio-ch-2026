import { useEffect, useRef, useState } from "react";

const INITIAL_LINES = [
  "Windows PowerShell",
  "Copyright (C) Microsoft Corporation. Todos los derechos reservados.",
  "",
  "Instale la versión más reciente de PowerShell para obtener nuevas características y mejoras. https://aka.ms/PSWindows",
  "",
];

export default function PowerShell({ onRunDev }) {
  const [lines, setLines] = useState(INITIAL_LINES);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("C:\\Users\\ch");
  const containerRef = useRef(null);

  const prompt = `PS ${cwd}>`;

  // Auto scroll
  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [lines]);

  const runCommand = (command) => {
    let output = [];

    switch (command) {
      case "clear":
        setLines([]);
        return;

      case "ls":
      case "dir":
        output = ["Desktop", "Documents", "Projects", "portfolio"];
        break;

      case "cd portfolio":
        setCwd("C:\\Users\\ch\\portfolio");
        break;

      case "npm install":
        output = [
          "instalando paquetes...",
          "✔ react",
          "✔ vite",
          "✔ tailwindcss",
          "✔ framer-motion",
          "instalación completa.",
        ];
        break;

      case "npm run dev":
        output = [
          "vite v5.0.12 ready in 420 ms",
          "Local: http://localhost:5173/",
        ];
        setTimeout(() => onRunDev?.(), 1200);
        break;

      default:
        output = [`'${command}' no se reconoce como un cmdlet.`];
    }

    setLines((prev) => [
      ...prev,
      `${prompt} ${command}`,
      ...output,
      "",
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    runCommand(input.trim());
    setInput("");
  };

  return (
    <div className="h-full bg-[#0c0c0c] text-[#cccccc] font-mono text-sm flex flex-col">
      {/* Header */}
      <div className="h-9 bg-[#1f1f1f] flex items-center px-3 text-xs text-white">
        Windows PowerShell
      </div>

      {/* Terminal body */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4"
      >
        {lines.map((line, i) => (
          <div key={i} className="leading-relaxed whitespace-pre-wrap">
            {line}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <span>{prompt}</span>
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[#cccccc]"
          />
        </form>
      </div>
    </div>
  );
}
