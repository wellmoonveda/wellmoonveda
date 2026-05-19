import type {
  HealingSection,
  HealingPoint,
} from "@/modules/healing-paths/types/healing.types";

interface ImmersiveSectionProps {
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

export default function ImmersiveSection({ section }: ImmersiveSectionProps) {
  return (
    <section className="relative overflow-hidden py-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(214,185,140,0.18),_transparent_70%)]" />

      <div className="relative flex flex-col gap-10 mx-auto max-w-4xl text-center">
        <h2 className="text-5xl font-light tracking-wide ">{section.title}</h2>

        {section.content && (
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 ">
            {section.content}
          </p>
        )}

        <div className=" overflow-hidden rounded-[36px] border border-white/20 bg-white/20 shadow-[0_20px_80px_rgba(214,185,140,0.15)] backdrop-blur-sm">
          {section.media?.type === "video" && (
            <div className=" overflow-hidden rounded-[36px] border border-white/20 bg-white/20 shadow-[0_20px_80px_rgba(214,185,140,0.15)] backdrop-blur-sm">
              <video
                className="aspect-video w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={section.media.src} />
              </video>
            </div>
          )}
        </div>

        {section.points && (
          <div className="mx-auto mt-16 max-w-3xl space-y-6 grid gap-6 md:grid-cols-2 ">
            {section.points.map((point, index) => {
              const item = getPointData(point);
              return (
                <div
                  key={index}
                  className=" flex gap-6 items-center rounded-[28px] border border-white/20 bg-white/70 px-8 py-4 backdrop-blur-sm h-full "
                >
                  {/* NUMBER */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#D6B98C] bg-[#F7F3EE]/20 text-lg font-light shadow-[0_0_30px_rgba(214,185,140,0.15)] ">
                    {index + 1}
                  </div>

                  {/* STEP TEXT */}
                  <p className="pt-1 text-left text-lg leading-8 ">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
