import { useEffect, useState } from "react";
import { getHealingPathBySlug } from "@/services/supabase/healingPath.service";
import type { HealingPath, HealingSection } from "../types/healing.types";
import { healingPaths } from "../config/healing.config";

type EnrichedHealingPath = HealingPath & {
  intro: string;
  sections: HealingSection[];
};

export function useHealingPath(slug: string) {
  const [path, setPath] = useState<EnrichedHealingPath | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPath() {
      try {
        const data = await getHealingPathBySlug(slug);
        if (!data) {
          setPath(null);
          return;
        }

        const staticContent = healingPaths.find(
          (item) => item.slug === data.slug,
        );

        if (!staticContent) {
          console.warn(`No static content found for slug: ${data.slug}`);
        }

        const enrichedPath: EnrichedHealingPath = {
          ...data,
          intro: staticContent?.intro ?? "",
          sections: staticContent?.sections ?? [],
        };

        setPath(enrichedPath);
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
