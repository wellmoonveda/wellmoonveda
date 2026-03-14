import { supabase } from "./supabaseClient";
import type { ReviewPost } from "@/shared/types/post.types";

// REVIEW QUEUE FUNCTIONS

export const getPostsForReview = async (): Promise<ReviewPost[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      status,
      created_at,
      author_id,
      users(name,email)
    `,
    )
    .eq("status", "review_requested")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as ReviewPost[];
};

export const approvePost = async (postId: string) => {
  const { error } = await supabase
    .from("posts")
    .update({
      status: "approved",
      updated_at: new Date(),
    })
    .eq("id", postId);

  if (error) throw error;
};

export const rejectPost = async (postId: string, feedback: string) => {
  const { error } = await supabase
    .from("posts")
    .update({
      status: "draft",
      feedback,
      updated_at: new Date(),
    })
    .eq("id", postId);

  if (error) throw error;
};

// POST CREATION FUNCTIONS

export const createPost = async (
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
  },
) => {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      slug,
      content,
      author_id: authorId,
      status: "draft",

      featured_image: metadata?.featured_image,
      tags: metadata?.tags,
      meta_title: metadata?.meta_title,
      meta_description: metadata?.meta_description,
      category_id: metadata?.category_id, // ✅ THIS LINE WAS MISSING
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updatePost = async (postId: string, updates: any) => {
  const { error } = await supabase
    .from("posts")
    .update({
      ...updates,
      updated_at: new Date(),
    })
    .eq("id", postId);

  if (error) throw error;
};

export const publishPost = async (postId: string) => {
  const { error } = await supabase
    .from("posts")
    .update({
      status: "published",
      updated_at: new Date(),
    })
    .eq("id", postId);

  if (error) throw error;
};

// EDITOR WORKFLOW FUNCTIONS

export const submitPostForReview = async (postId: string) => {
  const { error } = await supabase
    .from("posts")
    .update({
      status: "review_requested",
      updated_at: new Date(),
    })
    .eq("id", postId);

  if (error) throw error;
};

export const getEditorPosts = async (authorId: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", authorId)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
};

export const getPostById = async (postId: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error) throw error;

  return data;
};

// SOFT DELETE FOUNDATION

export const requestPostDeletion = async (
  postId: string,
  reason: string,
  authorId: string,
) => {
  const { error } = await supabase.from("deletion_requests").insert({
    post_id: postId,
    author_id: authorId,
    reason,
    status: "pending",
  });

  if (error) throw error;
};

export const getDeletionRequests = async (authorId: string) => {
  const { data, error } = await supabase
    .from("deletion_requests")
    .select(
      `
      id,
      reason,
      status,
      created_at,
      posts (
        id,
        title
      )
    `,
    )
    .eq("author_id", authorId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data ?? [];
};
export const getRecentPosts = async (limit: number = 3) => {
  const { data, error } = await supabase
    .from("posts")
    .select("id,title,slug,featured_image,created_at")
    .eq("status", "published")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data ?? [];
};
