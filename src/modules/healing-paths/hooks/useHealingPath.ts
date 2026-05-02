import { useEffect, useState } from "react";
import { getHealingPathBySlug } from "@/services/supabase/healingPath.service";
import type { HealingPath } from "../types/healing.types";

export function useHealingPath(slug: string) {
  const [path, setPath] = useState<HealingPath | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPath() {
      try {
        const data = await getHealingPathBySlug(slug);
        setPath(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPath();
  }, [slug]);

  return { path, loading };
}
