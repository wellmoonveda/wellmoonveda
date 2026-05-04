import { useAuth } from "@/modules/auth";
import { useMyContent } from "../hooks/useMyContent";
import ResumePathCard from "../components/ResumePathCard";
import RecentBlogActivity from "../components/RecentBlogActivity";

export default function MyContentPage() {
  const auth = useAuth();
  const user = auth?.user;

  const { healingPaths, blogPosts, loading } = useMyContent(user?.id);

  if (!user) {
    return <div className="card">Loading user...</div>;
  }

  if (loading) {
    return <div className="card">Loading your activity...</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Healing Paths */}
      <section>
        <h2 className="text-xl font-semibold text-main mb-6">
          Healing Paths Started
        </h2>

        {healingPaths.length === 0 ? (
          <div className="text-muted">No healing paths started yet.</div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {healingPaths.map((item) =>
              item.path ? (
                <ResumePathCard
                  key={item.content_id}
                  path={item.path}
                  lastAccessed={item.last_accessed}
                />
              ) : null,
            )}
          </div>
        )}
      </section>

      {/* Blog Activity */}
      <section>
        <h2 className="text-xl font-semibold text-main mb-6">
          Recently Visited Blog Posts
        </h2>

        {blogPosts.length === 0 ? (
          <div className="text-muted">No blog activity yet.</div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {blogPosts.map((item) =>
              item.post ? (
                <RecentBlogActivity
                  key={item.content_id}
                  post={item.post}
                  lastAccessed={item.last_accessed}
                />
              ) : null,
            )}
          </div>
        )}
      </section>
    </div>
  );
}
