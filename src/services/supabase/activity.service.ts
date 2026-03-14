import { supabase } from "./supabaseClient";

export const recordActivity = async (
  userId: string,
  contentType: "healing_path" | "blog_post",
  contentId: string,
) => {
  const { data: existing } = await supabase
    .from("user_activity")
    .select("id")
    .eq("user_id", userId)
    .eq("content_type", contentType)
    .eq("content_id", contentId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("user_activity")
      .update({ last_accessed: new Date().toISOString() })
      .eq("id", existing.id);

    return;
  }

  await supabase.from("user_activity").insert({
    user_id: userId,
    content_type: contentType,
    content_id: contentId,
  });
};

export const getUserHealingActivity = async (userId: string) => {
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
    ...a,
    path: pathMap[a.content_id],
  }));
};

export const getRecentBlogActivity = async (userId: string) => {
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
    ...a,
    post: postMap[a.content_id],
  }));
};
