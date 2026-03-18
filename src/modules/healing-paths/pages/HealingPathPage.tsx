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

  const isSubscribed = subscription?.active === true;

  const contentLoading = sessionsLoading || mudrasLoading;

  const auth = useAuth();
  const user = auth?.user;

  useUserActivity(user?.id, "healing_path", path?.id);

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* HERO */}
      <section>
        <h1 className="text-3xl font-bold">{path.title}</h1>
        <p className="text-sub mt-2">{path.description}</p>
      </section>

      {/* INTRO */}
      {path.intro_content && (
        <section className="card">
          <h2 className="font-semibold mb-2">Introduction</h2>
          <p>{path.intro_content?.text}</p>
        </section>
      )}

      {/* PREMIUM CONTENT */}
      <section>
        {contentLoading ? (
          <HealingSkeleton />
        ) : (
          <LockedContentGate isUnlocked={isSubscribed}>
            {isMudraPath ? (
              <MudraGrid mudras={mudras} />
            ) : (
              <VideoSessionList sessions={sessions} />
            )}
          </LockedContentGate>
        )}
      </section>
    </div>
  );
}
