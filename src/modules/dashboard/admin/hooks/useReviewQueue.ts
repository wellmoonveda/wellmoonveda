import { useEffect, useState } from "react";
import {
  getPostsForReview,
  approvePost,
  rejectPost,
} from "@/services/supabase/post.service";
import type { ReviewPost } from "@/shared/types/post.types";

export const useReviewQueue = () => {
  const [posts, setPosts] = useState<ReviewPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      setLoading(true);

      const data = await getPostsForReview();

      setPosts(data);
    } catch (error) {
      console.error("Review queue error", error);
    } finally {
      setLoading(false);
    }
  };

  const approve = async (postId: string) => {
    await approvePost(postId);
    await fetchQueue();
  };

  const reject = async (postId: string, feedback: string) => {
    await rejectPost(postId, feedback);
    await fetchQueue();
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return {
    posts,
    loading,
    approve,
    reject,
  };
};
