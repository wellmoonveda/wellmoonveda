import { useEditorPosts } from "../hooks/useEditorPosts";
import type { Post } from "../../post/types/post.types";
import TableSkeleton from "../../shared/components/TableSkeleton";

const RejectedPostsPage = () => {
  // Temporary placeholder until Supabase auth is connected
  const authorId = "demo-editor-id";

  const { posts, loading } = useEditorPosts(authorId);

  const rejectedPosts = posts.filter(
    (post: Post) => post.status === "rejected",
  );

  if (loading) {
    return (
      <div className="dashboard-theme">
        <div className="card p-6 text-muted">
          <TableSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-theme space-y-6">
      <h1 className="text-2xl font-semibold text-main">Rejected Posts</h1>

      {rejectedPosts.length === 0 ? (
        <div className="card p-6 text-muted">No rejected posts.</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-card-header text-white">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Feedback</th>
                <th className="p-3">Updated</th>
              </tr>
            </thead>

            <tbody>
              {rejectedPosts.map((post) => (
                <tr key={post.id} className="border-main hover-soft">
                  <td className="p-3 text-main">{post.title}</td>

                  <td className="p-3 text-sub">
                    {post.feedback || "No feedback provided"}
                  </td>

                  <td className="p-3 text-muted">
                    {post.updated_at
                      ? new Date(post.updated_at).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RejectedPostsPage;
