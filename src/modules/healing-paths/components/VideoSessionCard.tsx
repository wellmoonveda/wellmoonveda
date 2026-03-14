import VideoPlayer from "./VideoPlayer";

export default function VideoSessionCard({ session }: any) {
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
