import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Post } from "../../post/types/post.types";
import DeletionRequestModal from "./DeletionRequestModal";
import TableSkeleton from "../../shared/components/TableSkeleton";
import PostStatusBadge from "./PostStatusBadge";

interface PostsTableProps {
  posts: Post[];
  loading: boolean;
  onSubmitForReview: (postId: string) => void;
  onRequestDeletion: (postId: string, reason: string) => Promise<void>;
}

const PostsTable: React.FC<PostsTableProps> = ({
  posts,
  loading,
  onSubmitForReview,
  onRequestDeletion,
}) => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const openDeletionModal = (postId: string) => {
    setSelectedPost(postId);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="card p-6 text-muted">
        <TableSkeleton />
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="card p-10 text-center">
        <p className="text-muted mb-4">You haven't created posts yet.</p>

        <button
          onClick={() => navigate("/editor/posts/create")}
          className="btn-prime px-4 py-2 rounded cursor-pointer hover:btn-prime-hover"
        >
          Create your first post
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-card-header text-white">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-main hover-soft">
                <td className="p-3 text-main">{post.title}</td>

                <td className="p-3">
                  <PostStatusBadge status={post.status} />
                </td>

                <td className="p-3 text-muted">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => navigate(`/editor/posts/edit/${post.id}`)}
                    className="btn-secondary px-3 py-1 rounded text-white text-sm"
                  >
                    Edit
                  </button>

                  {post.status === "draft" && (
                    <button
                      onClick={() => onSubmitForReview(post.id)}
                      className="btn-prime px-3 py-1 rounded text-sm"
                    >
                      Submit
                    </button>
                  )}

                  <button
                    onClick={() => openDeletionModal(post.id)}
                    className="px-3 py-1 rounded text-sm border-main"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPost && (
        <DeletionRequestModal
          postId={selectedPost}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={onRequestDeletion}
        />
      )}
    </>
  );
};

export default PostsTable;
