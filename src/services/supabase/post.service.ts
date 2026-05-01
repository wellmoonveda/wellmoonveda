import { supabase } from "./supabaseClient";
import type { PostType, ReviewPost } from "@/shared/types/post.types";
import type {
  AdminPostListItem,
  PostStatus,
} from "@/modules/dashboard/post/types/post.types";
import type { RichTextBlock } from "@/modules/blog/types/blog.types";

type RawPost = {
  id: string;
  title: string;
  slug: string;
  content: unknown;
  created_at: string;
  featured_image: string | null;
  post_type: string | null;
  category_id: string | null;
  categories: {
    id: string;
    name: string;
    slug: string;
  }[] | null;
};

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
      status: "rejected",
      feedback,
      updated_at: new Date(),
    })
    .eq("id", postId);

  if (error) throw error;
};

// POST CREATION FUNCTIONS

export const createPost = async (
  title: string,
  content: RichTextBlock[],
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
      category_id: metadata?.category_id,
      post_type: metadata?.post_type ?? "normal",
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updatePost = async (
  postId: string,
  updates: Partial<{
    title: string;
    content: RichTextBlock[];
    featured_image: string | null;
    tags: string[];
    meta_title: string;
    meta_description: string;
    category_id: string;
    post_type: PostType;
    status: PostStatus;
  }>,
) => {
  const { data, error } = await supabase
    .from("posts")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
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

export const requestEditPost = async (
  postId: string,
  feedback: string,
) => {
  const { error } = await supabase
    .from("posts")
    .update({
      status: "needs_revision",
      feedback,
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

//Hard deletion
export const deletePostService = async (postId: string) => {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (error) throw error;
};

export const getPublishedPostsPaginated = async (
  page: number,
  pageSize: number,
) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, count, error } = await supabase.from("posts").select(
    ` id, title, slug, content, created_at, featured_image, category_id, categories (id, name, slug) `,
    { count: "exact" },
  ).eq("status", "published").is("deleted_at", null).order(
    "created_at",
    {
      ascending: false,
    },
  ).range(from, to);
  if (error) throw error;
  return { data: data ?? [], total: count ?? 0 };
};

export const getPublishedPostsRaw = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      slug,
      content,
      created_at,
      featured_image,
      post_type,
      category_id,
      categories (id, name, slug)
    `,
    )
    .eq("status", "published")
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) throw error;

  const typedData = (data ?? []) as RawPost[];

  return typedData;
};

export const getPostBySlug = async (
  slug: string,
) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      slug,
      content,
      created_at,
      featured_image,
      post_type,
      category_id
    `,
    )
    .eq("slug", slug)
    .eq("status", "published")
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw error;

  return data;
};

//post pagination for admin dashboard.
export const getAllPostsPaginatedForAdmin = async (
  page: number,
  pageSize: number,
): Promise<{ data: AdminPostListItem[]; total: number }> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      status,
      created_at,
      author_id,
      deleted_at,
      users (
      name,
      email
      )
    `,
      { count: "exact" },
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  // FETCH ROLES SEPARATELY
  const authorIds = [...new Set((data ?? []).map((p) => p.author_id))];

  const { data: rolesData, error: roleError } = await supabase
    .from("user_roles")
    .select("user_id, role")
    .in("user_id", authorIds);

  if (roleError) throw roleError;

  const roleMap = new Map(
    (rolesData ?? []).map((r) => [r.user_id, r.role]),
  );

  // MERGE ROLE INTO POSTS
  const enrichedPosts: AdminPostListItem[] = (data ?? []).map((post) => ({
    ...post,
    role: roleMap.get(post.author_id) ?? "unknown",
  }));

  return {
    data: enrichedPosts,
    total: count ?? 0,
  };
};

export const softDeletePost = async (postId: string) => {
  const { error } = await supabase
    .from("posts")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", postId);

  if (error) throw error;
};

export interface SearchPostResult {
  title: string;
  content: unknown;
  slug: string;
}

export const searchBlogPosts = async (
  query: string,
): Promise<SearchPostResult[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("title, content, slug")
    .eq("status", "published")
    .is("deleted_at", null)
    .ilike("title", `%${query}%`)
    .limit(6);

  if (error) throw error;

  return data ?? [];
};
