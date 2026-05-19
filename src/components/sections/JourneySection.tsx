import type { HealingSection } from "@/modules/healing-paths/types/healing.types";
import videoBg from "../../../public/videos/healing-path/jounrneybg.mp4";

interface JourneySectionProps {
  section: HealingSection;
}

export default function JourneySection({ section }: JourneySectionProps) {
  return (
    <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden py-30">
      {/* BACKGROUND VIDEO */}

      <video
        src={videoBg}
        className="absolute inset-0 h-full w-full object-cover "
        autoPlay
        muted
        loop
        playsInline
      />

      {/* ATMOSPHERIC OVERLAY */}
      <div className="absolute inset-0 bg-[#F7F3EE]/50 backdrop-blur-[2px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,185,140,0.22),transparent_70%)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-8 h-px w-28 bg-[#D6B98C]/40" />

        <h2 className="text-5xl font-light tracking-wide ">{section.title}</h2>

        {section.content && (
          <p className="mx-auto mt-10 max-w-3xl text-xl leading-9 ">
            {section.content}
          </p>
        )}
      </div>
    </section>
  );
}
