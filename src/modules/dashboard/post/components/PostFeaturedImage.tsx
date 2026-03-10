import { useState } from "react";
import MediaLibraryModal from "@/modules/dashboard/media/components/MediaLibraryModal";

interface Props {
  value?: string | null;
  onChange: (url: string | null) => void;
}

const PostFeaturedImage = ({ value, onChange }: Props) => {
  const [libraryOpen, setLibraryOpen] = useState(false);

  return (
    <div className="card p-4 space-y-3">
      <h3 className="font-medium text-main">Featured Image</h3>

      {value ? (
        <div className="space-y-3">
          <img
            src={value}
            alt="Featured"
            className="w-full h-44 object-cover rounded"
          />

          <div className="flex gap-2">
            <button
              onClick={() => setLibraryOpen(true)}
              className="btn-secondary px-3 py-1 text-sm rounded text-white"
            >
              Change Image
            </button>

            <button
              onClick={() => onChange(null)}
              className="btn-secondary px-3 py-1 text-sm rounded text-white"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setLibraryOpen(true)}
          className="btn-prime px-3 py-2 rounded text-white w-full"
        >
          Select Featured Image
        </button>
      )}

      <MediaLibraryModal
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onSelect={(url) => onChange(url)}
      />
    </div>
  );
};

export default PostFeaturedImage;
