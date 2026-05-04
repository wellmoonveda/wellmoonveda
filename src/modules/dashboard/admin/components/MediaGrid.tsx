import { useState } from "react";
import toast from "react-hot-toast";
import type { MediaItem } from "../../media/types/media.types";

type Props = {
  media: MediaItem[];
  loading: boolean;
  onDelete: (id: string, url: string) => void;
};

const MediaGrid = ({ media, loading, onDelete }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);

  if (loading) {
    return <div className="card p-6 animate-pulse">Loading media...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((item) => (
          <div key={item.id} className="card p-2 group relative cursor-pointer">
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-32 object-cover rounded"
              onClick={() => setPreview(item.url)}
            />

            <div className="text-xs text-sub truncate">{item.title}</div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition">
              <button
                onClick={() => {
                  toast((t) => (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm">
                        Are you sure you want to delete this image?
                      </span>

                      <div className="flex gap-2">
                        <button
                          className="btn-prime px-3 py-1 rounded text-xs hover:bg-red-200"
                          onClick={() => {
                            onDelete(item.id, item.url);
                            toast.dismiss(t.id);
                          }}
                        >
                          Delete
                        </button>

                        <button
                          className="bg-gray-200 px-3 py-1 rounded text-xs hover:bg-gray-300"
                          onClick={() => toast.dismiss(t.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ));
                }}
                className="bg-red-500 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}

      {preview && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setPreview(null)}
        >
          <img src={preview} className="max-h-[80vh] rounded shadow-lg" />
        </div>
      )}
    </>
  );
};

export default MediaGrid;
