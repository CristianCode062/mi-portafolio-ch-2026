import React from "react";

interface Props {
  tiktokId: string;
}

export default function TikTokCard({ tiktokId }: Props) {
  return (
    <div
      className="
        relative mx-auto
        w-[320px] sm:w-[360px] xl:w-[380px]
        aspect-[9/19]
        rounded-[3rem]
        bg-neutral-900
        border border-white/10
        shadow-[0_60px_140px_rgba(0,0,0,0.9)]
        overflow-hidden
      "
    >
      {/* Phone frame glow */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          rounded-[3rem]
          ring-1 ring-white/5
        "
      />

      {/* Dynamic Island */}
      <div
        className="
          absolute top-3 left-1/2 -translate-x-1/2 z-20
          w-[120px] h-[32px]
          bg-black/90 backdrop-blur
          rounded-full
          shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)]
        "
      />

      {/* Side buttons */}
      <div
        className="
          absolute -left-[5px] top-[120px]
          w-[3px] h-[60px]
          bg-neutral-600 rounded-full
        "
      />
      <div
        className="
          absolute -right-[5px] top-[140px]
          w-[3px] h-[80px]
          bg-neutral-600 rounded-full
        "
      />

      {/* Screen */}
      <div
        className="
          absolute inset-[6px]
          rounded-[2.4rem]
          overflow-hidden
          bg-black
        "
      >
        {/* CROP CONTAINER (CLAVE PARA QUITAR BARRA BLANCA) */}
        <div className="relative w-full h-full overflow-hidden">
          <iframe
            src={`https://www.tiktok.com/embed/v2/${tiktokId}`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="
              absolute
              top-[-48px]
              left-0
              w-full
              h-[calc(100%+96px)]
              border-0
              block
            "
          />
        </div>
      </div>

      {/* Glass reflection */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-tr
          from-white/15 via-white/5 to-transparent
          opacity-60
        "
      />

      {/* Bottom shadow */}
      <div
        className="
          pointer-events-none
          absolute bottom-0 inset-x-0 h-24
          bg-gradient-to-t from-black/60 to-transparent
        "
      />
    </div>
  );
}
