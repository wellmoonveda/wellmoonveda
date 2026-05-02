import { Link } from "react-router-dom";

type RecentBlogPost = {
  title: string;
  slug: string;
};

interface Props {
  post: RecentBlogPost;
  lastAccessed: string;
}

export default function RecentBlogActivity({ post, lastAccessed }: Props) {
  return (
    <div className="card flex flex-col justify-between">
      <div>
        <h3 className="font-semibold text-main">{post.title}</h3>

        <p className="text-muted text-sm mt-2">
          Last read: {new Date(lastAccessed).toLocaleDateString()}
        </p>
      </div>

      <Link to={`/blog/${post.slug}`} className="btn-secondary mt-4 w-fit">
        Continue Reading
      </Link>
    </div>
  );
}
