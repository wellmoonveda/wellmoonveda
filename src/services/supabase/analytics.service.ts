import { supabase } from "./supabaseClient";

export const getSubscriberCount = async () => {
  const { count, error } = await supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true });

  if (error) throw error;

  return count ?? 0;
};

export const getHealingPathUsage = async (startDate?: string) => {
  let query = supabase.from("healing_path_progress").select(`
      path_id,
      created_at,
      healing_paths ( title )
    `);

  if (startDate) {
    query = query.gte("created_at", startDate);
  }

  const { data, error } = await query;

  if (error) throw error;
  if (!data) return [];

  const usageMap: Record<string, number> = {};

  data.forEach((item: any) => {
    const title = item.healing_paths?.title ?? "Unknown Path";

    if (!usageMap[title]) usageMap[title] = 0;

    usageMap[title] += 1;
  });

  return Object.entries(usageMap).map(([title, views]) => ({
    path_slug: title,
    views,
  }));
};

export const getEditorActivity = async (startDate?: string) => {
  let query = supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  if (startDate) {
    query = query.gte("created_at", startDate);
  }

  const { data, error } = await query;

  if (error) throw error;

  if (!data) return [];
};

export const getActiveSubscriptionsCount = async (startDate?: string) => {
  let query = supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  if (startDate) {
    query = query.gte("created_at", startDate);
  }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
};

export const getEditorPublishingActivity = async (startDate?: string) => {
  let query = supabase
    .from("posts")
    .select(
      `
      author_id,
      created_at,
      users ( name )
    `,
    )
    .eq("status", "published");

  if (startDate) {
    query = query.gte("created_at", startDate);
  }

  const { data, error } = await query;

  if (error) throw error;
  if (!data) return [];

  const activityMap: Record<string, { name: string; posts: number }> = {};

  data.forEach((item: any) => {
    const authorId = item.author_id;
    const name = item.users?.name ?? "Unknown Editor";

    if (!activityMap[authorId]) {
      activityMap[authorId] = {
        name,
        posts: 0,
      };
    }

    activityMap[authorId].posts += 1;
  });

  return Object.values(activityMap);
};

export const getRecentPublishedPosts = async (limit = 5) => {
  const { data, error } = await supabase
    .from("posts")
    .select("id,title,author_id,created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data ?? [];
};

export const getTotalUsers = async () => {
  const { data: roles } = await supabase
    .from("user_roles")
    .select("user_id")
    .in("role", ["editor", "admin"]);

  const excludedIds = roles?.map((r) => r.user_id) ?? [];

  const { count, error } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .not("id", "in", `(${excludedIds.join(",")})`);

  if (error) throw error;

  return count ?? 0;
};

export const getSubscriptionGrowth = async (startDate?: string) => {
  let query = supabase
    .from("subscriptions")
    .select("created_at")
    .order("created_at", { ascending: true });

  if (startDate) {
    query = query.gte("created_at", startDate);
  }

  const { data, error } = await query;

  if (error) throw error;

  if (!data) return [];

  const growthMap: Record<string, number> = {};

  data.forEach((item: any) => {
    const date = new Date(item.created_at).toISOString().split("T")[0];

    if (!growthMap[date]) {
      growthMap[date] = 0;
    }

    growthMap[date] += 1;
  });

  let runningTotal = 0;

  return Object.entries(growthMap).map(([date, count]) => {
    runningTotal += count;

    return {
      date,
      subscriptions: runningTotal,
    };
  });
};
