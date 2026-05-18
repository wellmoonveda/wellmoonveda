import { useParams } from "react-router-dom";
import { useHealingPath } from "../hooks/useHealingPath";
import { useHealingSessions } from "../hooks/useHealingSessions";
import { useMudras } from "../hooks/useMudras";
import { useSubscription } from "@/modules/dashboard/user/hooks/useSubscription";
import MudraGrid from "../components/MudraGrid";
import VideoSessionList from "../components/VideoSessionList";
import LockedContentGate from "../components/LockedContentGate";
import HealingSkeleton from "../components/HealingSkeleton";
import { useAuth } from "@/modules/auth";
import { useUserActivity } from "@/modules/dashboard/user/hooks/useUserActivity";
import SectionRenderer from "@/components/sections/SectionRenderer";

export default function HealingPathPage() {
  const { slug } = useParams();
  const { path, loading } = useHealingPath(slug!);

  const isMudraPath = slug === "mudra-healing";

  const { sessions, loading: sessionsLoading } = useHealingSessions(
    !isMudraPath ? path?.id : undefined,
  );

  const { mudras, loading: mudrasLoading } = useMudras(
    isMudraPath ? path?.id : undefined,
  );

  const { subscription } = useSubscription();

  const auth = useAuth();
  const user = auth?.user;

  useUserActivity(user?.id, "healing_path", path?.id);

  if (loading) {
    return <div className="p-10">Loading healing path...</div>;
  }

  if (!path) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold">Healing path not found</h2>
      </div>
    );
  }

  const isSubscribed = subscription?.status === "active";

  const contentLoading = sessionsLoading || mudrasLoading;

  const hasMudras = isMudraPath && mudras.length > 0;
  const hasSessions = !isMudraPath && sessions.length > 0;
  const hasLockedContent = hasMudras || hasSessions;

  return (
    <div className="overflow-hidden">
      {/* BACKGROUND */}
      {path.theme?.background?.type === "video" ? (
        <video
          ref={(video) => {
            if (video) {
              video.playbackRate = 0.35;
            }
          }}
          className="
        fixed
        inset-0
        h-screen
        w-screen
        object-cover
        pointer-events-none
        z-0
        "
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={path.theme.background.src} />
        </video>
      ) : (
        <div
          className="
        fixed
        inset-0
        bg-cover
        bg-center
        pointer-events-none
        z-0
        "
          style={{
            backgroundImage: `url('${path.theme?.background?.src}')`,
          }}
        />
      )}

      {/* ATMOSPHERE OVERLAY */}
      <div
        className="
      fixed
      inset-0
      bg-[#ffffff]/70
      backdrop-blur-[1px]
      pointer-events-none
      z-10
      "
      />

      {/* PAGE */}
      <div className="relative z-10">
        {/* HERO */}
        <section className="text-center tracking-wide leading-tight min-h-[40vh] flex flex-col items-center justify-center">
          <h1 className="text-7xl font-light">{path.title}</h1>

          <p className="text-lg mt-2">{path.description}</p>
        </section>

        <div className="max-w-4xl mx-auto space-y-10 py-36">
          {/* INTRO */}
          {path.intro && (
            <section className="card text-center tracking-wide leading-tight">
              <h2 className="font-light mb-2 text-4xl">Introduction</h2>

              <p className="text-lg">{path.intro}</p>
            </section>
          )}

          {/* SECTIONS */}
          {path.sections?.map((section, index) => (
            <SectionRenderer key={index} section={section} />
          ))}

          {/* PREMIUM CONTENT */}
          <section>
            {contentLoading ? (
              <HealingSkeleton />
            ) : hasLockedContent ? (
              <LockedContentGate isUnlocked={isSubscribed}>
                {isMudraPath ? (
                  <MudraGrid mudras={mudras} />
                ) : (
                  <VideoSessionList sessions={sessions} />
                )}
              </LockedContentGate>
            ) : (
              <p className="mt-4 text-base italic text-muted text-center rounded-lg border border-2 border-accent bg-white p-4">
                Session content for {path.title} coming soon...
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
