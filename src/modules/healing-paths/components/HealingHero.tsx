import type { HealingPathVideo } from "../types/healing.types";

interface HealingHeroProps {
  healing: HealingPathVideo;
}

export default function HealingHero({ healing }: HealingHeroProps) {
  return (
    <section className="pt-40 pb-5 text-center space-y-8">
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-md">
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

      <h1 className="text-4xl md:text-5xl font-semibold">{healing.title}</h1>

      <p className="max-w-2xl mx-auto text-lg text-[#5C4A3A] leading-relaxed">
        {healing.shortDescription}
      </p>
    </section>
  );
}
