import type {
  HealingSection,
  HealingPoint,
} from "@/modules/healing-paths/types/healing.types";

interface TimelineSectionProps {
  section: HealingSection;
}

function getPointData(point: HealingPoint) {
  if (typeof point === "string") {
    return {
      text: point,
    };
  }
  return point;
}

export default function TimelineSection({ section }: TimelineSectionProps) {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-3xl flex flex-col gap-5">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-light tracking-wide ">
            {section.title}
          </h2>

          {section.content && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 ">
              {section.content}
            </p>
          )}
        </div>

        {section.points && (
          <div className="relative space-y-12">
            <div className="absolute left-5 top-0 h-full w-px bg-[#D6B98C]/30" />

            {section.points.map((point, index) => {
              const item = getPointData(point);
              return (
                <div key={index} className="relative flex items-center gap-6">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D6B98C]/40 bg-[#F7F3EE]">
                    <div className="h-2 w-2 rounded-full bg-[#D6B98C]" />
                  </div>

                  <div className="rounded-3xl border border-white/20 bg-white/70 px-6 py-5 backdrop-blur-sm">
                    <p className="text-lg leading-8 ">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
