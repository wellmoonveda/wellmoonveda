import { useEffect, useState } from "react";
import { getRecentPosts } from "@/services/supabase/post.service";

export const useRecentPosts = (limit: number = 3) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getRecentPosts(limit);
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [limit]);

  return { posts, loading };
};
