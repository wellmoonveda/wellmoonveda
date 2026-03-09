import { useState } from "react";
import PostsTable from "../components/PostTable";
import { useEditorPosts } from "../hooks/useEditorPosts";
import { useDeletionRequests } from "../hooks/useDeletionRequests";
import type { PostStatus } from "../../post/types/post.types";

const MyPostsPage = () => {
  const authorId = "demo-editor-id";

  const { posts, loading, submitForReview } = useEditorPosts(authorId);
  const { submitDeletionRequest } = useDeletionRequests(authorId);

  const [filter, setFilter] = useState<PostStatus | "all">("all");

  const filteredPosts =
    filter === "all" ? posts : posts.filter((post) => post.status === filter);

  const filters: { label: string; value: PostStatus | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Draft", value: "draft" },
    { label: "In Review", value: "review_requested" },
    { label: "Rejected", value: "rejected" },
    { label: "Published", value: "published" },
  ];

  return (
    <div className="dashboard-theme space-y-6">
      <h1 className="text-2xl font-semibold text-main">My Posts</h1>

      {/* FILTERS */}
      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1 rounded-md text-sm border-main ${
              filter === f.value ? "btn-prime text-white" : "bg-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <PostsTable
        posts={filteredPosts}
        loading={loading}
        onSubmitForReview={submitForReview}
        onRequestDeletion={submitDeletionRequest}
      />
    </div>
  );
};

export default MyPostsPage;
