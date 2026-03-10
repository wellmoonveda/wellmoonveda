import { useEffect, useState } from "react";
import { getMedia } from "@/services/supabase/media.service";

export const useMedia = () => {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);

  const limit = 12;

  const fetchMedia = async () => {
    setLoading(true);

    try {
      const res = await getMedia({
        search,
        category,
        page,
        limit,
      });

      setMedia(res.media);
    } catch (error) {
      console.error("Media load failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [search, category, page]);

  return {
    media,
    loading,
    search,
    setSearch,
    category,
    setCategory,
    page,
    setPage,
  };
};
