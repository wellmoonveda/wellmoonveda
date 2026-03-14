interface Props {
  path: any;
}

export default function HealingPathCard({ path }: Props) {
  return (
    <div className="card flex flex-col gap-3 border-main h-full">
      <img
        src={path.thumbnail}
        alt={path.title}
        className="rounded-lg w-full h-40 object-cover"
      />

      <h3 className="font-semibold text-main mb-2">{path.title}</h3>

      <p className="text-muted text-sm mb-4">{path.description}</p>

      <button className="btn-primary w-fit mt-auto">Start Path</button>
    </div>
  );
}
