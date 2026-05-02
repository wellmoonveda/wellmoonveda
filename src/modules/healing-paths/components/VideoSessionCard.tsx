import VideoPlayer from "./VideoPlayer";
import type { VideoSession } from "../types/healing.types";

export default function VideoSessionCard({
  session,
}: {
  session: VideoSession;
}) {
  return (
    <div className="card space-y-4">
      <h3 className="font-semibold">{session.title}</h3>

      {session.description && (
        <p className="text-sub text-sm">{session.description}</p>
      )}

      <VideoPlayer url={session.video_url} />
    </div>
  );
}
