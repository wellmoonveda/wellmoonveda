import { useState } from "react";
import {
  createPost,
  updatePost,
  publishPost,
} from "@/services/supabase/post.service";
import type { PostType } from "@/shared/types/post.types";
import { submitPostForReview } from "@/services/supabase/post.service";

export const usePostEditor = () => {
  const [loading, setLoading] = useState(false);

  const submitForReview = async (postId: string) => {
    setLoading(true);

    try {
      await submitPostForReview(postId);
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async (
    title: string,
    content: any,
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
    } finally {
      setLoading(false);
    }
  };
  const updateDraft = async (postId: string, updates: any) => {
    setLoading(true);

    try {
      await updatePost(postId, updates);
    } finally {
      setLoading(false);
    }
  };

  const publish = async (postId: string) => {
    setLoading(true);

    try {
      await publishPost(postId);
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
