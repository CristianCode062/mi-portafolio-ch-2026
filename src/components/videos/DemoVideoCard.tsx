import { VideoItem } from "../../data/videos";

interface Props {
  video: VideoItem;
}

export default function DemoVideoCard({ video }: Props) {
  const thumbnail = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const url = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative aspect-video rounded-xl overflow-hidden bg-black group"
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={video.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover
                   scale-105 group-hover:scale-110
                   transition-transform duration-500"
      />

      {/* Dark overlay (igual TikTok) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-black/60
                        flex items-center justify-center
                        border border-white/20
                        text-white text-xl">
          ▶
        </div>
      </div>

      {/* Text */}
      <div className="absolute bottom-0 p-4">
        <h4 className="text-white font-semibold leading-snug">
          {video.title}
        </h4>

        {video.description && (
          <p className="text-white/60 text-sm mt-1 line-clamp-2">
            {video.description}
          </p>
        )}
      </div>
    </a>
  );
}
