import { useEffect, useRef, useState } from "react";

import { CircleArrowRight } from "lucide-react";

import type {
  HealingPoint,
  HealingSection,
} from "@/modules/healing-paths/types/healing.types";

interface EnergyGridSectionProps {
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

export default function EnergyGridSection({ section }: EnergyGridSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28">
      <style>{`

      @keyframes cardSlide {

        from{
          opacity:0;
          transform:
            translateY(40px);
        }

        to{
          opacity:1;
          transform:
            translateY(0);
        }

      }

      `}</style>

      <div className="mx-auto max-w-5xl flex flex-col gap-5">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-light tracking-wide">{section.title}</h2>

          {section.content && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8">
              {section.content}
            </p>
          )}
        </div>

        {section.points && (
          <div className="grid gap-5 md:grid-cols-2">
            {section.points.map((point, index) => {
              const item = getPointData(point);

              return (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-[24px]
                    border
                    border-white/30
                    bg-gradient-to-br
                    from-white/70
                    via-[#F8F2EA]/70
                    to-[#EEDCC3]/70
                    px-6
                    py-5
                    shadow-[0_10px_40px_rgba(214,185,140,0.12)]
                    backdrop-blur-sm
                    "
                  style={
                    isVisible
                      ? {
                          animation: "cardSlide .9s ease forwards",

                          animationDelay: `${index * 0.25}s`,

                          animationFillMode: "both",
                        }
                      : {
                          opacity: 0,
                        }
                  }
                >
                  <CircleArrowRight
                    className="
                      shrink-0
                      h-8
                      w-8
                      text-[#8F6A4C]
                      "
                  />

                  <p className="text-base leading-7">{item.text}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
