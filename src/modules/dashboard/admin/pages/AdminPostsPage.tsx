import { useAdminPosts } from "../hooks/useAdminPosts";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@/shared/components/ui/Table";
import { getStatusConfig } from "../utils/postStatus.util";
import { StatusBadge } from "@/shared/components/ui/StatusBadge";
import { ActionButton } from "@/shared/components/ui/ActionButton";
import { getPostActions } from "../utils/postActions.util";
import { FeedbackModal } from "../components/FeedbackModal";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdminPostsPage() {
  const {
    posts,
    loading,
    filter,
    setFilter,
    handleDelete,
    handleApprove,
    handlePublish,
    handleReject,
    handleRequestEdit,
  } = useAdminPosts();

  const [modalType, setModalType] = useState<"reject" | "edit" | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleFeedbackSubmit = async (feedback: string) => {
    if (!selectedPostId) return;

    if (modalType === "reject") {
      await handleReject(selectedPostId, feedback);
    }

    if (modalType === "edit") {
      await handleRequestEdit(selectedPostId, feedback);
    }

    setModalType(null);
    setSelectedPostId(null);
  };

  return (
    <div className="p-6 space-y-6 dashboard-theme">
      <h1 className="text-2xl font-semibold text-main">Posts Management</h1>

      <div className="flex gap-3">
        {["all", "admin", "editor"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as "all" | "admin" | "editor")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          filter === type
            ? "bg-[#708090] text-white"
            : "bg-soft text-main hover-soft"
        }`}
          >
            {type === "all"
              ? "All Posts"
              : type === "admin"
                ? "My Posts"
                : "Editor Posts"}
          </button>
        ))}
      </div>

      <div className="card p-6">
        {loading ? (
          <p className="text-sub">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-sub">No posts found.</p>
        ) : (
          <Table>
            <TableHead>
              <tr>
                <TableHeaderCell>Title</TableHeaderCell>
                <TableHeaderCell>Author</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Created</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHead>

            <TableBody>
              {posts.map((post) => {
                const config = getStatusConfig(post.status);
                return (
                  <TableRow key={post.id}>
                    <TableCell>{post.title}</TableCell>

                    <TableCell>
                      <div className="flex flex-col">
                        {post.role === "admin"
                          ? "Admin"
                          : post.role === "editor"
                            ? "Editor"
                            : "Unknown"}
                      </div>
                    </TableCell>

                    <TableCell>
                      <StatusBadge
                        label={config.label}
                        className={config.className}
                      />
                    </TableCell>

                    <TableCell>
                      {new Date(post.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 flex-wrap">
                        {getPostActions(post).map((action) => (
                          <ActionButton
                            key={action}
                            label={formatActionLabel(action)}
                            variant={action === "delete" ? "danger" : "default"}
                            onClick={() => {
                              switch (action) {
                                case "delete":
                                  toast(
                                    (t) => (
                                      <div className="flex flex-col gap-2">
                                        <p className="text-sm">
                                          Are you sure you want to move this
                                          post to Trash?
                                        </p>

                                        <div className="flex gap-2">
                                          <button
                                            className="bg-accent px-3 py-1 text-white rounded"
                                            onClick={() => {
                                              handleDelete(post.id);
                                              toast.dismiss(t.id);
                                              toast.success(
                                                "Post moved to trash",
                                              );
                                            }}
                                          >
                                            Confirm
                                          </button>

                                          <button
                                            className="bg-accent px-3 py-1 text-white rounded"
                                            onClick={() => {
                                              toast.dismiss(t.id);
                                            }}
                                          >
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    ),
                                    { duration: Infinity },
                                  );
                                  break;

                                case "approve":
                                  handleApprove(post.id);
                                  break;

                                case "publish":
                                  handlePublish(post.id);
                                  break;

                                case "reject":
                                  setSelectedPostId(post.id);
                                  setModalType("reject");
                                  break;

                                case "request_edit":
                                  setSelectedPostId(post.id);
                                  setModalType("edit");
                                  break;

                                default:
                                  break;
                              }
                            }}
                          />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
      <FeedbackModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        onSubmit={handleFeedbackSubmit}
        title={modalType === "reject" ? "Reject Post" : "Request Edit"}
      />
    </div>
  );
}

const formatActionLabel = (action: string) => {
  switch (action) {
    case "view":
      return "View";
    case "edit":
      return "Edit";
    case "approve":
      return "Approve";
    case "reject":
      return "Reject";
    case "publish":
      return "Publish";
    case "request_edit":
      return "Request Edit";
    case "delete":
      return "Delete";
    case "request_delete":
      return "Request Delete ";
    default:
      return action;
  }
};
