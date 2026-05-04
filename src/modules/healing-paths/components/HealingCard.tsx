import { Link } from "react-router-dom";
import type { HealingPathVideo } from "../types/healing.types";

interface HealingCardProps {
  healing: HealingPathVideo;
}

export default function HealingCard({ healing }: HealingCardProps) {
  return (
    <Link to={`/healing-path/${healing.slug}`} className="block group">
      <article className="rounded-3xl bg-card-sand/70 hover:bg-card-sand/80 p-10 text-center space-y-6 card-hover h-full">
        {/* Video Circle */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-md">
            <video
              src={healing.videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold">{healing.title}</h3>

        {/* Description */}
        <p className="text-foreground leading-relaxed max-w-xs mx-auto">
          {healing.shortDescription}
        </p>
      </article>
    </Link>
  );
}
