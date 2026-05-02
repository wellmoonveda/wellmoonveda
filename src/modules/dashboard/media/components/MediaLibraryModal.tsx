import { useEffect, useState } from "react";
import { getMedia } from "@/services/supabase/media.service";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

type MediaItem = {
  id: string;
  title: string;
  url: string;
  category: string;
  created_at: string;
};

const MediaLibraryModal = ({ open, onClose, onSelect }: Props) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [selecting, setSelecting] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  //1. EFFECT: Handle the debounce timer
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); //500 ms delay

    return () => clearTimeout(handler);
  }, [search]);

  //2. UPDATED: Load function uses debouncedSearch
  const loadMedia = async () => {
    try {
      const { media: fetchedMedia } = await getMedia({
        search: debouncedSearch,
        category,
        page,
        limit: 12,
      });

      setMedia(fetchedMedia);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to upload media";
      toast.error(message);
    }
  };

  // 3. EFFECT: Trigger load when debounced search or other filters change
  useEffect(() => {
    if (open) loadMedia();
  }, [open, debouncedSearch, category, page]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-card w-[900px] max-h-[80vh] rounded-lg p-6 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Media Library</h2>
          <button onClick={onClose}>Close</button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            placeholder="Search media"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-main rounded px-2 py-1 flex-1"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-main rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="blog">Blog</option>
            <option value="product">Product</option>
          </select>
        </div>

        <div className="grid grid-cols-4 gap-4 overflow-y-auto">
          {media.length === 0 ? (
            <div className="col-span-4 text-center text-sm text-gray-400 py-10">
              No media found
            </div>
          ) : (
            media.map((item) => (
              <img
                key={item.id}
                src={item.url}
                className="cursor-pointer rounded hover-soft"
                onClick={() => {
                  if (selecting) return;

                  setSelecting(true);

                  onSelect(item.url);
                  onClose();

                  setTimeout(() => setSelecting(false), 300);
                }}
              />
            ))
          )}
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            Prev
          </button>

          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryModal;
