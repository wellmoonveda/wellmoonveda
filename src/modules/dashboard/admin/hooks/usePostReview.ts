import { useEffect, useState } from "react";
import { fetchPostById } from "../services/adminPosts.service";
import type { AdminPost } from "../../post/types/post.types";

export const usePostReview = (postId?: string) => {
  const [post, setPost] = useState<AdminPost | null>(null);
  const [loading, setLoading] = useState(false);

  const loadPost = async () => {
    if (!postId) return;

    setLoading(true);
    try {
      const data = await fetchPostById(postId);
      setPost(data);
    } catch (error) {
      console.error("Failed to load post", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPost();
  }, [postId]);

  return {
    post,
    loading,
  };
};
