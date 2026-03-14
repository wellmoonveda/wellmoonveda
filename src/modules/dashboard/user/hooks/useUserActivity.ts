import { useEffect } from "react";
import { recordActivity } from "@/services/supabase/activity.service";

export function useUserActivity(
  userId?: string,
  contentType?: "healing_path" | "blog_post",
  contentId?: string,
) {
  useEffect(() => {
    if (!userId || !contentType || !contentId) return;

    recordActivity(userId, contentType, contentId);
  }, [userId, contentType, contentId]);
}
