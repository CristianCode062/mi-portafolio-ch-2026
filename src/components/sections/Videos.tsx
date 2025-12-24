import { useState } from "react";
import { Play, X } from "lucide-react";
import { videos } from "../../data/videos";

export default function Videos() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="videos" className="py-20 px-4">
      <h2 className="text-4xl text-white font-bold text-center mb-12">
        Videos & Demos
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
        {videos.map((v) => (
          <button
            key={v.id}
            onClick={() => setActive(v.url)}
            className="bg-slate-900/60 p-6 rounded-xl text-left text-white hover:bg-slate-800"
          >
            <Play className="text-cyan-400 mb-4" />
            <h3 className="font-bold">{v.title}</h3>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl aspect-video">
            <button
              onClick={() => setActive(null)}
              className="absolute -top-10 right-0 text-white"
            >
              <X size={32} />
            </button>
            <iframe
              src={active}
              className="w-full h-full rounded-xl"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
