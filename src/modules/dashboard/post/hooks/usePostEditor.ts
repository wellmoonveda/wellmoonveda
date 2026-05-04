import { useState } from "react";
import {
  createPost,
  publishPost,
  updatePost,
} from "@/services/supabase/post.service";
import type { PostType } from "@/shared/types/post.types";
import { submitPostForReview } from "@/services/supabase/post.service";
import type { PostStatus } from "../types/post.types";

/**
 *  Global mutation lock (shared across ALL hook instances)
 * Prevents concurrent Supabase write operations
 */
let isPostMutationInProgress = false;

export const usePostEditor = () => {
  const [loading, setLoading] = useState(false);

  const submitForReview = async (postId: string) => {
    if (isPostMutationInProgress) {
      console.warn("submitForReview skipped: mutation in progress");
      return null;
    }

    isPostMutationInProgress = true;
    setLoading(true);

    try {
      await submitPostForReview(postId);
      return true;
    } catch (error) {
      throw error;
    } finally {
      isPostMutationInProgress = false;
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
    if (isPostMutationInProgress) {
      console.warn("saveDraft skipped: mutation in progress");
      return null;
    }

    isPostMutationInProgress = true;
    setLoading(true);

    try {
      const post = await createPost(
        title,
        content,
        authorId,
        slug,
        metadata,
      );
      return post;
    } catch (error) {
      throw error;
    } finally {
      isPostMutationInProgress = false;
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
    if (isPostMutationInProgress) {
      console.warn("updateDraft skipped: mutation in progress");
      return null;
    }

    isPostMutationInProgress = true;
    setLoading(true);

    try {
      await updatePost(postId, updates);
      return true;
    } catch (error) {
      throw error;
    } finally {
      isPostMutationInProgress = false;
      setLoading(false);
    }
  };

  const publish = async (postId: string) => {
    if (isPostMutationInProgress) {
      console.warn("publish skipped: mutation in progress");
      return null;
    }

    isPostMutationInProgress = true;
    setLoading(true);

    try {
      await publishPost(postId);
      return true;
    } catch (error) {
      throw error;
    } finally {
      isPostMutationInProgress = false;
      setLoading(false);
    }
  };

  return {
    saveDraft,
    updateDraft,
    publish,
    submitForReview,
    loading,
  };
};
