import { useEffect, useState } from "react";
import {
  getUserHealingActivity,
  getRecentBlogActivity,
} from "@/services/supabase/activity.service";

export function useMyContent(userId?: string) {
  const [healingPaths, setHealingPaths] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function load() {
      const paths = await getUserHealingActivity(userId!);
      const posts = await getRecentBlogActivity(userId!);

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
