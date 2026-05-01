import toast from "react-hot-toast";
import ReviewQueueTable from "../components/ReviewQueueTable";
import { useReviewQueue } from "../hooks/useReviewQueue";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FeedbackModal } from "../components/FeedbackModal";

const ReviewQueuePage = () => {
  const { posts, loading, approve, reject } = useReviewQueue();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const navigate = useNavigate();

  //Approve post
  const handleApprove = async (id: string) => {
    try {
      await approve(id);
      toast.success("Post approved");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to approve post";
      toast.error(message);
    }
  };

  //Reject post with feedback
  const handleReject = (id: string) => {
    setSelectedPostId(id);
    setIsModalOpen(true);
  };

  const handleFeedbackSubmit = async (feedback: string) => {
    if (!selectedPostId) return;

    try {
      await reject(selectedPostId, feedback);
      toast.success("Post rejected");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to reject post";
      toast.error(message);
    }

    setIsModalOpen(false);
    setSelectedPostId(null);
  };

  //view post from editor
  const handleView = (id: string) => {
    navigate(`/admin/review/${id}`, {
      state: { from: "review-queue" },
    });
  };

  return (
    <div className="dashboard-theme p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Review Queue</h1>

      <ReviewQueueTable
        posts={posts}
        loading={loading}
        onApprove={handleApprove}
        onReject={handleReject}
        onView={handleView}
      />

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
        title="Reject Post"
      />
    </div>
  );
};

export default ReviewQueuePage;
