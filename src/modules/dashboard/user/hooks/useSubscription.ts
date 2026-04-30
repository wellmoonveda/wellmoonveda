import { useEffect, useState } from "react";
import { getUserSubscription } from "@/services/supabase/subscription.service";

interface Subscription {
  id: string;
  user_id: string;
  status: string;
  plan: string;
}

export function useSubscription(userId?: string) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    async function fetchSubscription() {
      try {
        const data = await getUserSubscription(userId!);
        setSubscription(data);
      } catch (err) {
        console.error(err);
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [userId]);

  const isSubscribed = subscription?.status === "active";

  return { subscription, loading, isSubscribed };
}
