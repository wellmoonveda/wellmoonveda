import type {
  HealingPoint,
  HealingSection,
} from "@/modules/healing-paths/types/healing.types";
import { useEffect, useState, useRef } from "react";

interface FloatingPointsSectionProps {
  section: HealingSection;
}

function getPointData(point: HealingPoint) {
  if (typeof point === "string") {
    return {
      text: point,
      icon: undefined,
    };
  }

  return point;
}

export default function FloatingPointsSection({
  section,
}: FloatingPointsSectionProps) {
  const points = section.points?.map(getPointData) ?? [];

  const middle = Math.ceil(points.length / 2);

  const leftItems = points.slice(0, middle);
  const rightItems = points.slice(middle);

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
        threshold: 0.3,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <style>{`
      
      @keyframes rodFade {
          from{
            opacity:0;
            transform:scaleY(.5);
          }

          to{
            opacity:1;
            transform:scaleY(1);
          }
      }

      @keyframes leftFade {

          from{
            opacity:0;
            transform:translateX(5px);
          }

          to{
            opacity:1;
            transform:translateX(0);
          }
      }

      @keyframes rightFade {

          from{
            opacity:0;
            transform:translateX(-5px);
          }

          to{
            opacity:1;
            transform:translateX(0);
          }
      }

      `}</style>

      <div className="mx-auto max-w-7xl">
        {/* heading */}
        <div className="mb-24 text-center">
          <h2 className="text-4xl font-light tracking-wide">{section.title}</h2>

          {section.content && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8">
              {section.content}
            </p>
          )}
        </div>

        {/* mobile */}
        <div className="flex flex-col gap-8 lg:hidden">
          {points.map((point, index) => (
            <div
              key={index}
              className="
              flex
              items-center
              gap-5
              rounded-[40px]
              border
              border-white/20
              bg-white/70
              p-5
              backdrop-blur-sm
              "
            >
              <div
                className="
                flex
                h-20
                w-20
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#D6B98C]
                "
              >
                {point.icon && (
                  <img src={point.icon} alt="" className="h-10 w-10" />
                )}
              </div>

              <p>{point.text}</p>
            </div>
          ))}
        </div>

        {/* desktop */}
        <div className="relative hidden min-h-[700px] lg:block">
          {/* center rod */}

          <div
            className="
            absolute
            left-1/2
            top-1/4
            h-[420px]
            w-4.5
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#D6B98C]
            bg-white/40
            shadow-[0_0_30px_rgba(214,185,140,.25)]
            "
            style={
              isVisible
                ? {
                    animation: "rodFade .8s ease forwards",
                    visibility: "visible",
                  }
                : {
                    opacity: 0,
                    visibility: "hidden",
                  }
            }
          />

          {/* LEFT */}

          <div className="absolute left-8 top-0 flex flex-col gap-14">
            {leftItems.map((point, index) => (
              <div
                key={index}
                className="flex items-center"
                style={{
                  opacity: isVisible ? undefined : 0,
                  visibility: isVisible ? "visible" : "hidden",

                  ...(isVisible && {
                    animation: "leftFade .8s ease forwards",
                    animationDelay: `${0.8 + index * 0.25}s`,
                    animationFillMode: "both",
                  }),
                }}
              >
                <div
                  className="
                  flex
                  items-center
                  rounded-[40px]
                  border
                  border-white/20
                  bg-white/70
                  px-8
                  py-4
                  backdrop-blur-sm
                  "
                >
                  <div
                    className="
                    absolute
                    -left-6
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#D6B98C]
                    bg-white
                    "
                  >
                    {point.icon && (
                      <img src={point.icon} alt="" className="h-14 w-14" />
                    )}
                  </div>

                  <p className="ml-24 w-[180px]">{point.text}</p>
                </div>

                <div
                  className="
                  w-16
                  border-t-2
                  border-dotted
                  border-[#8F6A4C]
                  "
                />
              </div>
            ))}
          </div>

          {/* RIGHT */}

          <div className="absolute right-8 top-0 flex flex-col gap-14">
            {rightItems.map((point, index) => (
              <div
                key={index}
                className="flex items-center"
                style={{
                  opacity: isVisible ? undefined : 0,
                  visibility: isVisible ? "visible" : "hidden",

                  ...(isVisible && {
                    animation: "rightFade .8s ease forwards",
                    animationDelay: `${1.5 + index * 0.25}s`,
                    animationFillMode: "both",
                  }),
                }}
              >
                <div
                  className="
                  w-16
                  border-t-2
                  border-dotted
                  border-[#8F6A4C]
                  "
                />

                <div
                  className="
                  relative
                  flex
                  items-center
                  rounded-[40px]
                  border
                  border-white/20
                  bg-white/70
                  px-8
                  py-4
                  backdrop-blur-sm
                  "
                >
                  <p className="mr-24 w-[180px]">{point.text}</p>

                  <div
                    className="
                    absolute
                    -right-6
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#D6B98C]
                    bg-white
                    "
                  >
                    {point.icon && (
                      <img src={point.icon} alt="" className="h-14 w-14" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
