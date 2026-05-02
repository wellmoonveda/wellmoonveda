import { useEffect, useState } from "react";
import { getRecentPosts } from "@/services/supabase/post.service";
import type { Post } from "../types/post.types";

type RecentPost = Pick<
  Post,
  "id" | "title" | "slug" | "featured_image" | "created_at"
>;

export const useRecentPosts = (limit: number = 3) => {
  const [posts, setPosts] = useState<RecentPost[]>([]);
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
