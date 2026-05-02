import { useEffect, useState } from "react";
import {
  getRecentBlogActivity,
  getUserHealingActivity,
} from "@/services/supabase/activity.service";
import type {
  BlogActivity,
  HealingPathActivity,
} from "@/shared/types/users.types";

export function useMyContent(userId?: string) {
  const [healingPaths, setHealingPaths] = useState<HealingPathActivity[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const uid = userId;

    async function load() {
      const paths = await getUserHealingActivity(uid);
      const posts = await getRecentBlogActivity(uid);

      setHealingPaths(paths);
      setBlogPosts(posts);

      setLoading(false);
    }

    load();
  }, [userId]);

  return {
    healingPaths,
    blogPosts,
    loading,
  };
}
