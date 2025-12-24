import DemoVideoCard from "./DemoVideoCard";
import TikTokCard from "./TikTokCard";

import { videos } from "../../data/videos";
import { tiktoks } from "../../data/tiktoks";

import type { VideoItem } from "../../data/videos";
import type { TikTokItem } from "../../data/tiktoks";

export default function Videos() {
  return (
    <section className="relative py-24 px-6">
      <h2 className="text-4xl font-bold mb-12 text-center">
        Videos & <span className="text-blue-400">Demos</span>
      </h2>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* DEMOS TÉCNICOS */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6">
              Demos Técnicos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video: VideoItem) => (
                <DemoVideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>

          {/* FEED TIKTOK */}
          <div>
            <h3 className="text-xl font-semibold mb-6">
              Shorts & Contenido
            </h3>

            <div
              className="
                relative
                h-[900px]
                rounded-3xl
                overflow-y-auto
                bg-black/40
                border border-white/10
                snap-y snap-mandatory
                scrollbar-none
                flex justify-center
              "
            >
              {tiktoks.map((tiktok: TikTokItem) => (
                <div
                  key={tiktok.id}
                  className="snap-start py-6 flex justify-center"
                >
                  <TikTokCard tiktokId={String(tiktok.id)} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
