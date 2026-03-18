import { useEffect, useState } from "react";
import { getUserRole } from "@/services/supabase/role.service";
import { useAuth } from "@/modules/auth";

export const useUserRole = () => {
  const auth = useAuth();
  const user = auth?.user;

  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!user?.id) return;
      try {
        const roleData = await getUserRole(user.id);
        setRole(roleData);
      } catch (err) {
        console.error("Failed to fetch role", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [user?.id]);

  return { role, loading };
};
