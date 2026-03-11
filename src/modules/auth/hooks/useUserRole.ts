import { useEffect, useState } from "react";
import { getUserRole } from "@/services/supabase/role.service";

export function useUserRole(userId?: string) {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchRole() {
      try {
        const role = await getUserRole(userId!);
        console.log("Fetched role:", role);

        setRole(role ?? null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRole();
  }, [userId]);

  return { role, loading };
}
