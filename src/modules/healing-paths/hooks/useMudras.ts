import { useEffect, useState } from "react";
import { getMudras } from "@/services/supabase/healingContent.service";

export function useMudras(pathId?: string) {
  const [mudras, setMudras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pathId) {
      setLoading(false);
      return;
    }

    async function fetchMudras() {
      try {
        const data = await getMudras(pathId!);
        setMudras(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMudras();
  }, [pathId]);

  return { mudras, loading };
}
