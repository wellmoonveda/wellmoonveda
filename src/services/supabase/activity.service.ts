import { supabase } from "./supabaseClient";
import type {
  BlogActivity,
  HealingPathActivity,
} from "@/shared/types/users.types";

export const recordActivity = async (
  userId: string,
  contentType: "healing_path" | "blog_post",
  contentId: string,
) => {
  const { error } = await supabase
    .from("user_activity")
    .upsert(
      {
        user_id: userId,
        content_type: contentType,
        content_id: contentId,
        last_accessed: new Date().toISOString(),
      },
      {
        onConflict: "user_id,content_type,content_id",
      },
    );

  if (error) {
    console.error("Activity error:", error);
  }
};

export const getUserHealingActivity = async (
  userId: string,
): Promise<HealingPathActivity[]> => {
  const { data: activity, error } = await supabase
    .from("user_activity")
    .select("*")
    .eq("user_id", userId)
    .eq("content_type", "healing_path")
    .order("last_accessed", { ascending: false });

  if (error) throw error;

  if (!activity?.length) return [];

  const pathIds = activity.map((a) => a.content_id);

  const { data: paths } = await supabase
    .from("healing_paths")
    .select("id, title, slug")
    .in("id", pathIds);

  const pathMap = Object.fromEntries(paths?.map((p) => [p.id, p]) ?? []);

  return activity.map((a) => ({
    user_id: a.user_id,
    content_id: a.content_id,
    content_type: "healing_path",
    last_accessed: a.last_accessed,
    path: pathMap[a.content_id] ?? null,
  }));
};

export const getRecentBlogActivity = async (
  userId: string,
): Promise<BlogActivity[]> => {
  const { data: activity, error } = await supabase
    .from("user_activity")
    .select("*")
    .eq("user_id", userId)
    .eq("content_type", "blog_post")
    .order("last_accessed", { ascending: false })
    .limit(5);

  if (error) throw error;

  if (!activity?.length) return [];

  const postIds = activity.map((a) => a.content_id);

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug")
    .in("id", postIds);

  const postMap = Object.fromEntries(posts?.map((p) => [p.id, p]) ?? []);

  return activity.map((a) => ({
    user_id: a.user_id,
    content_id: a.content_id,
    content_type: "blog_post",
    last_accessed: a.last_accessed,
    post: postMap[a.content_id] ?? null,
  }));
};
