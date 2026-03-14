import HealingPathCard from "../components/HealingPathCard";
import RecentBlogCard from "../components/RecentBlogCard";
import { useHealingPaths } from "../hooks/useHealingPaths";
import { useRecentPosts } from "../../post/hooks/useRecentPosts";

export default function UserHealingPathsPage() {
  const { paths, loading } = useHealingPaths();
  const { posts, loading: postsLoading } = useRecentPosts();

  return (
    <div className="flex flex-col gap-10">
      {/* Healing Paths */}
      <section>
        <h2 className="text-xl font-semibold text-main mb-6">Healing Paths</h2>

        {loading ? (
          <div className="text-muted">Loading paths...</div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {paths.map((path) => (
              <HealingPathCard key={path.id} path={path} />
            ))}
          </div>
        )}
      </section>

      {/* Blog Posts */}
      <section>
        <h2 className="text-xl font-semibold text-main mb-6">
          Recent Articles
        </h2>

        {postsLoading ? (
          <div className="text-muted">Loading articles...</div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {posts.map((post) => (
              <RecentBlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
