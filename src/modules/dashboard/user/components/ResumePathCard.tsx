import { Link } from "react-router-dom";

type ResumePath = {
  title: string;
  slug: string;
};

interface Props {
  path: ResumePath;
  lastAccessed: string;
}

export default function ResumePathCard({ path, lastAccessed }: Props) {
  return (
    <div className="card flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-main">{path.title}</h3>

        <p className="text-muted text-sm mt-2">
          Last accessed: {new Date(lastAccessed).toLocaleDateString()}
        </p>
      </div>

      <Link
        to={`/healing-path/${path.slug}`}
        className="btn-primary mt-4 w-fit"
      >
        Resume
      </Link>
    </div>
  );
}
