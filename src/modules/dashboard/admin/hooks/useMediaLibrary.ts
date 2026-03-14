import { useEffect, useState } from "react";
import {
  getMedia,
  uploadMedia,
  deleteMedia,
} from "@/services/supabase/media.service";
import toast from "react-hot-toast";

export const useMediaLibrary = () => {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState<string | null>(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);

      const data = await getMedia();

      setMedia(data);
    } catch (error) {
      console.error("Media load error", error);
    } finally {
      setLoading(false);
    }
  };

  const upload = async (
    file: File,
    title: string,
    category: string,
    userId: string,
  ) => {
    setUploading(true);
    setUploadFileName(file.name);

    const loading = toast.loading("Uploading image...");

    try {
      await uploadMedia(file, title, category, userId);

      toast.success("Image uploaded successfully");
      await fetchMedia();
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
    } finally {
      toast.dismiss(loading);
      setUploading(false);
      setUploadFileName(null);
    }
  };

  const remove = async (id: string, url: string) => {
    const loading = toast.loading("Deleting image...");

    try {
      await deleteMedia(id, url);

      toast.success("Image deleted");
      await fetchMedia();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      toast.dismiss(loading);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return {
    media,
    loading,
    upload,
    remove,
    uploading,
    uploadFileName,
  };
};
