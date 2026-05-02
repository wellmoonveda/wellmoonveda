import { useEffect, useState } from "react";
import { getUserDashboardData } from "@/services/supabase/userDashboard.service";
import type { DashboardStats } from "@/shared/types/users.types";

export function useUserDashboard(userId?: string) {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchStats() {
      setLoading(true);
      try {
        const data = await getUserDashboardData(userId!);
        setStats(data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [userId]);

  return { stats, loading };
}
