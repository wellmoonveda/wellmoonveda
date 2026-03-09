import { useEditorPosts } from "../hooks/useEditorPosts";

const DashboardPage = () => {
  const authorId = "TEMP_USER_ID";

  const { posts, loading } = useEditorPosts(authorId);

  const totalPosts = posts.length;
  const awaitingReview = posts.filter(
    (p) => p.status === "review_requested",
  ).length;

  const rejectedPosts = posts.filter((p) => p.status === "rejected").length;

  const publishedPosts = posts.filter((p) => p.status === "published").length;

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="dashboard-theme space-y-6">
      <h1 className="text-xl font-semibold text-main">Editor Dashboard</h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-4">
          <p className="text-sub text-sm">Total Posts</p>
          {loading ? (
            <div className="h-6 w-16 bg-soft animate-pulse rounded mt-2"></div>
          ) : (
            <p className="text-2xl font-semibold">{totalPosts}</p>
          )}
        </div>

        <div className="card p-4">
          <p className="text-sub text-sm">Awaiting Review</p>
          {loading ? (
            <div className="h-6 w-16 bg-soft animate-pulse rounded mt-2"></div>
          ) : (
            <p className="text-2xl font-semibold">{awaitingReview}</p>
          )}
        </div>

        <div className="card p-4">
          <p className="text-sub text-sm">Rejected</p>
          {loading ? (
            <div className="h-6 w-16 bg-soft animate-pulse rounded mt-2"></div>
          ) : (
            <p className="text-2xl font-semibold">{rejectedPosts}</p>
          )}
        </div>

        <div className="card p-4">
          <p className="text-sub text-sm">Published</p>
          {loading ? (
            <div className="h-6 w-16 bg-soft animate-pulse rounded mt-2"></div>
          ) : (
            <p className="text-2xl font-semibold">{publishedPosts}</p>
          )}
        </div>
      </div>

      {/* Recent Posts */}

      <div className="card">
        <div className="p-4 border-b border-main">
          <h2 className="font-semibold text-main">Recent Posts</h2>
        </div>

        <div className="p-4">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 bg-soft animate-pulse rounded" />
              ))}
            </div>
          ) : recentPosts.length === 0 ? (
            <p className="text-muted">No posts yet</p>
          ) : (
            <ul className="space-y-3">
              {recentPosts.map((post) => (
                <li
                  key={post.id}
                  className="flex justify-between items-center border-main p-3 rounded hover-soft"
                >
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-xs text-muted">{post.status}</p>
                  </div>

                  <span className="text-xs text-muted">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
