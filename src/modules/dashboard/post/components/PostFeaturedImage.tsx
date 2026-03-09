import { useState } from "react";
import { uploadMedia } from "@/services/supabase/media.service";

interface Props {
  value?: string;
  onChange: (url: string | null) => void;
}

const PostFeaturedImage = ({ value, onChange }: Props) => {
  const [uploading, setUploading] = useState(false);

  const userId = "TEMP_USER_ID";

  const handleUpload = async (file: File) => {
    setUploading(true);

    try {
      const url = await uploadMedia(file, file.name, "post", userId);
      onChange(url);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="card p-4 space-y-3">
      <h3 className="font-medium text-main">Featured Image</h3>

      {value ? (
        <div className="space-y-2">
          <img
            src={value}
            alt="Featured"
            className="w-full h-40 object-cover rounded"
          />

          <button
            onClick={() => onChange(null)}
            className="btn-secondary px-3 py-1 text-sm rounded text-white"
          >
            Remove
          </button>
        </div>
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
      )}

      {uploading && <p className="text-xs text-muted">Uploading...</p>}
    </div>
  );
};

export default PostFeaturedImage;
