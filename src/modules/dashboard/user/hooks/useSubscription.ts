import { useEffect, useState } from "react";
import { getUserSubscription } from "@/services/supabase/subscription.service";

export function useSubscription(userId?: string) {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchSubscription() {
      try {
        const data = await getUserSubscription(userId!);
        setSubscription(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [userId]);

  return { subscription, loading };
}
