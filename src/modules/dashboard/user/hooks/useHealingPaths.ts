import { useEffect, useState } from "react";
import { getHealingPaths } from "@/services/supabase/healingPath.service";

type HealingPath = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
};

export const useHealingPaths = () => {
  const [paths, setPaths] = useState<HealingPath[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const data = await getHealingPaths();
        setPaths(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPaths();
  }, []);

  return { paths, loading };
};
