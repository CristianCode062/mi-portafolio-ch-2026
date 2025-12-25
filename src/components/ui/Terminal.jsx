import { useEffect, useRef, useState } from "react";

const COMMANDS = {
  help: () => [
    "Available commands:",
    "help        show this message",
    "ls          list files",
    "whoami      show user",
    "npm install install dependencies",
    "npm run dev start dev server",
    "clear       clear terminal",
  ],

  ls: () => [
    "src/",
    "components/",
    "pages/",
    "package.json",
    "vite.config.js",
  ],

  whoami: () => ["ch@portfolio"],

  "npm install": () => [
    "installing packages...",
    "✔ react",
    "✔ vite",
    "✔ tailwindcss",
    "✔ framer-motion",
    "done.",
  ],

  "npm run dev": () => [
    "vite v5.0.12 ready in 412 ms",
    "Local: http://localhost:5173/",
  ],
};

export default function Terminal({ onRunDev }) {
  const [history, setHistory] = useState([
    "Welcome to ch-portfolio CLI",
    "Type `help` to get started",
    "",
  ]);
  const [input, setInput] = useState("");
  const containerRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [history]);

  const runCommand = (command) => {
    if (command === "clear") {
      setHistory([]);
      return;
    }

    const output =
      COMMANDS[command]?.() || ["command not found"];

    setHistory((prev) => [
      ...prev,
      `$ ${command}`,
      ...output,
      "",
    ]);

    if (command === "npm run dev" && onRunDev) {
      setTimeout(onRunDev, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    runCommand(input.trim());
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-green-400 font-mono text-sm">
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto p-6"
      >
        {history.map((line, i) => (
          <div key={i}>{line}</div>
        ))}

        <form onSubmit={handleSubmit} className="flex gap-2">
          <span>$</span>
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none caret-green-400"
          />
        </form>
      </div>
    </div>
  );
}
