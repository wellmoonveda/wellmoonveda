import { useEffect, useRef, useState } from "react";

import type {
  HealingPoint,
  HealingSection,
} from "@/modules/healing-paths/types/healing.types";

interface MinimalSectionProps {
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

export default function MinimalSection({ section }: MinimalSectionProps) {
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
    <section ref={sectionRef} className="relative py-24">
      <style>{`

      @keyframes cardReveal {

        from{
          opacity:0;
          transform:
          translateY(20px);
        }

        to{
          opacity:1;
          transform:
          translateY(0);
        }

      }

      @keyframes textReveal {

        from{
          opacity:0;
        }

        to{
          opacity:1;
        }

      }

      `}</style>

      <div className="mx-auto max-w-3xl text-center flex flex-col gap-5">
        <h2 className="text-4xl font-light tracking-wide">{section.title}</h2>

        {section.content && (
          <p className="mt-8 text-lg leading-8">{section.content}</p>
        )}

        {section.points && (
          <div className="mt-10 space-y-5 text-left">
            {section.points.map((point, index) => {
              const item = getPointData(point);

              return (
                <div
                  key={index}
                  className="
                    flex
                    gap-4
                    rounded-2xl
                    border
                    border-white/20
                    bg-white/70
                    px-5
                    py-4
                    backdrop-blur-sm
                    items-center
                    "
                  style={
                    isVisible
                      ? {
                          animation: "cardReveal .7s ease-out forwards",

                          animationDelay: `${index * 0.25}s`,

                          animationFillMode: "both",
                        }
                      : {
                          opacity: 0,
                        }
                  }
                >
                  <div
                    className="
                      mt-1
                      h-2
                      w-2
                      rounded-full
                      bg-[#D6B98C]
                      shrink-0
                      "
                  />

                  <p
                    className="text-base leading-7"
                    style={
                      isVisible
                        ? {
                            animation: "textReveal .5s ease-out forwards",

                            animationDelay: `${0.2 + index * 0.25}s`,

                            animationFillMode: "both",
                          }
                        : {
                            opacity: 0,
                          }
                    }
                  >
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
