type RecentBlogCardPost = {
  title: string;
  featured_image: string | null;
  created_at: string;
};

interface Props {
  post: RecentBlogCardPost;
}

export default function RecentBlogCard({ post }: Props) {
  return (
    <div className="card flex flex-col gap-3">
      {post.featured_image && (
        <img
          src={post.featured_image}
          className="rounded-lg w-full h-32 object-cover"
        />
      )}

      <h3 className="font-semibold text-main">{post.title}</h3>

      <p className="text-muted text-sm">
        {new Date(post.created_at).toLocaleDateString()}
      </p>

      <button className="btn-secondary w-fit">Read Article</button>
    </div>
  );
}
