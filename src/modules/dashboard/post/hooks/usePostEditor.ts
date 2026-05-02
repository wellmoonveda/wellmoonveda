import { useState } from "react";
import {
  createPost,
  publishPost,
  updatePost,
} from "@/services/supabase/post.service";
import type { PostType } from "@/shared/types/post.types";
import { submitPostForReview } from "@/services/supabase/post.service";
import type { PostStatus } from "../types/post.types";

export const usePostEditor = () => {
  const [loading, setLoading] = useState(false);

  const submitForReview = async (postId: string) => {
    setLoading(true);

    try {
      await submitPostForReview(postId);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async (
    title: string,
    content: string,
    authorId: string,
    slug: string,
    metadata?: {
      featured_image?: string;
      tags?: string[];
      meta_title?: string;
      meta_description?: string;
      category_id?: string;
      post_type?: PostType;
    },
  ) => {
    setLoading(true);

    try {
      const post = await createPost(title, content, authorId, slug, metadata);
      return post;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const updateDraft = async (
    postId: string,
    updates: Partial<{
      title: string;
      slug: string;
      content: string;
      featured_image: string | null;
      tags: string[];
      meta_title: string;
      meta_description: string;
      category_id: string;
      post_type: PostType;
      status: PostStatus;
    }>,
  ) => {
    setLoading(true);

    try {
      await updatePost(postId, updates);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const publish = async (postId: string) => {
    setLoading(true);

    try {
      await publishPost(postId);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveDraft,
    updateDraft,
    publish,
    loading,
    submitForReview,
  };
};
