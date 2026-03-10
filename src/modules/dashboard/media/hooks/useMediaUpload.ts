import { useState } from "react";
import { uploadMedia } from "@/services/supabase/media.service";

export const useMediaUpload = () => {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File, category: string = "general") => {
    setUploading(true);

    try {
      const url = await uploadMedia(file, file.name, category);
      return url;
    } finally {
      setUploading(false);
    }
  };

  return {
    upload,
    uploading,
  };
};
