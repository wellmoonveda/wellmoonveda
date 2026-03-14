export default function VideoPlayer({ url }: { url: string }) {
  if (url.includes("youtube")) {
    const id = url.split("v=")[1];

    return (
      <iframe
        className="w-full h-[400px] rounded-lg"
        src={`https://www.youtube.com/embed/${id}`}
        allowFullScreen
      />
    );
  }

  return (
    <video controls className="w-full rounded-lg">
      <source src={url} />
    </video>
  );
}
