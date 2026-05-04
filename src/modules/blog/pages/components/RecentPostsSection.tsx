import { useBlogPosts } from "../../hooks/useBlogPosts";
import { BlogCard } from "../../components/BlogCard";

export default function RecentPostsSection() {
  const { posts, loading } = useBlogPosts({ mode: "all" });

  if (loading) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-8">Recent Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
