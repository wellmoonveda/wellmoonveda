import VideoSessionCard from "./VideoSessionCard";

export default function VideoSessionList({ sessions }: any) {
  return (
    <div className="space-y-6">
      {sessions.map((session: any) => (
        <VideoSessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
