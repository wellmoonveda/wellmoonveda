import { useEffect, useRef } from "react";
import { recordActivity } from "@/services/supabase/activity.service";

export function useUserActivity(
  userId?: string,
  contentType?: "healing_path" | "blog_post",
  contentId?: string,
) {
  // Prevent duplicate calls
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    // Guard clause
    if (!userId || !contentType || !contentId) return;

    // Prevent duplicate tracking
    if (hasTrackedRef.current) return;

    hasTrackedRef.current = true;

    const trackActivity = async () => {
      try {
        await recordActivity(userId, contentType, contentId);
      } catch (error) {
        console.error("Error recording activity:", error);
      }
    };

    trackActivity();
  }, [userId, contentType, contentId]);
}
