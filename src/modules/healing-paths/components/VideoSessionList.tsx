import VideoSessionCard from "./VideoSessionCard";
import type { VideoSession } from "../types/healing.types";

export default function VideoSessionList({
  sessions,
}: {
  sessions: VideoSession[];
}) {
  return (
    <div className="space-y-6">
      {sessions.map((session) => (
        <VideoSessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
