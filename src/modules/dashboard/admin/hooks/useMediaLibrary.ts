import { useEffect, useState } from "react";
import {
  deleteMedia,
  getMedia,
  uploadMedia,
} from "@/services/supabase/media.service";

type MediaItem = {
  id: string;
  title: string;
  url: string;
  category: string;
  created_at: string;
};

export const useMediaLibrary = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);

  const totalPages = Math.ceil(total / limit);

  const fetchMedia = async () => {
    try {
      setLoading(true);

      const data = await getMedia();

      setMedia((data.media ?? []) as unknown as MediaItem[]);
      setTotal(data.total ?? 0);
    } catch (error) {
      console.error("Media load error", error);
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  const upload = async (
    file: File,
    title: string,
    category: string,
    userId: string,
  ): Promise<string> => {
    setUploading(true);
    setUploadFileName(file.name);

    try {
      // DUPLICATE CHECK
      const isDuplicate = media.some(
        (item) => item.title === file.name,
      );

      if (isDuplicate) {
        throw new Error("File already exists");
      }
      const url = await uploadMedia(file, title, category, userId);
      await fetchMedia();

      return url;
    } catch (error: unknown) {
      throw error;
    } finally {
      setUploading(false);
      setUploadFileName(null);
    }
  };

  const remove = async (id: string, url: string) => {
    await deleteMedia(id, url);
    await fetchMedia();
  };

  useEffect(() => {
    fetchMedia();
  }, [page]);

  //Pagination Controls
  const nextPage = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };
  const goToPage = (p: number) => {
    setPage(p);
  };

  return {
    media,
    loading,
    upload,
    remove,
    uploading,
    uploadFileName,
    page,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  };
};
