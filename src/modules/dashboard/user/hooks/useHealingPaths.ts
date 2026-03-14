import { useEffect, useState } from "react";
import { getHealingPaths } from "@/services/supabase/healingPath.service";

export const useHealingPaths = () => {
  const [paths, setPaths] = useState<any[]>([]);
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
