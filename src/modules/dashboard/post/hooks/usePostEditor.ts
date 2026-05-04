import { useState } from "react";
import {
  createPost,
  publishPost,
  submitPostForReview,
  updatePost,
} from "@/services/supabase/post.service";
import type { PostType } from "@/shared/types/post.types";
import type { PostStatus } from "../types/post.types";

/**
 * Global mutation queue
 * Ensures all write operations run ONE AFTER ANOTHER (no overlap)
 */
let mutationQueue: Promise<unknown> = Promise.resolve();

/**
 * Runs a mutation in sequence (never parallel)
 */
const runMutation = async <T>(fn: () => Promise<T>): Promise<T> => {
  console.log("[QUEUE] Adding mutation");

  mutationQueue = mutationQueue.then(async () => {
    console.log("[QUEUE] Running mutation START");
    const result = await fn();
    console.log("[QUEUE] Running mutation END");
    return result;
  });
  return mutationQueue as Promise<T>;
};

export const usePostEditor = () => {
  const [loading, setLoading] = useState(false);

  const submitForReview = async (postId: string) => {
    setLoading(true);

    try {
      return await runMutation(() => submitPostForReview(postId));
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
      return await runMutation(() =>
        createPost(title, content, authorId, slug, metadata)
      );
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
    console.log("[DRAFT] updateDraft called");
    setLoading(true);

    try {
      return await runMutation(async () => {
        console.log("[DRAFT] Executing updateDraft");
        return updatePost(postId, updates);
      });
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const publish = async (postId: string) => {
    console.log("[PUBLISH] Triggered", postId);

    setLoading(true);

    try {
      return await runMutation(async () => {
        console.log("[PUBLISH] Executing");
        return publishPost(postId);
      });
    } catch (error) {
      throw error;
    } finally {
      console.log("[PUBLISH] Completed");
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
