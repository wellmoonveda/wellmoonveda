import { useEffect, useState } from "react";
import { getHealingSessions } from "@/services/supabase/healingContent.service";

export function useHealingSessions(pathId?: string) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pathId) {
      setLoading(false);
      return;
    }

    async function fetchSessions() {
      try {
        const data = await getHealingSessions(pathId!);
        setSessions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSessions();
  }, [pathId]);

  return { sessions, loading };
}
