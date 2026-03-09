import { useEffect, useState } from "react";
import {
  getEditorPosts,
  submitPostForReview,
} from "@/services/supabase/post.service";

import type { Post } from "../../post/types/post.types";

export const useEditorPosts = (authorId: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    if (!authorId) return;

    setLoading(true);

    try {
      const data = await getEditorPosts(authorId);
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch editor posts", error);
    } finally {
      setLoading(false);
    }
  };

  const submitForReview = async (postId: string) => {
    try {
      await submitPostForReview(postId);
      await fetchPosts();
    } catch (error) {
      console.error("Submit for review failed", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [authorId]);

  return {
    posts,
    loading,
    submitForReview,
    refreshPosts: fetchPosts,
  };
};
