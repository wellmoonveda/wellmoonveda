import { useEffect, useState } from "react";
import { getMedia } from "@/services/supabase/media.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

const MediaLibraryModal = ({ open, onClose, onSelect }: Props) => {
  const [media, setMedia] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const loadMedia = async () => {
    const res = await getMedia();
    let filtered = res;

    if (search) {
      filtered = filtered.filter((item: any) => {
        item.title?.toLowerCase().includes(search.toLocaleLowerCase());
      });
    }

    if (category) {
      filtered = filtered.filter((item: any) => item.category === category);
    }

    setMedia(res);
  };

  useEffect(() => {
    if (open) loadMedia();
  }, [open, search, category, page]);

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
          {media.map((item) => (
            <img
              key={item.id}
              src={item.url}
              className="cursor-pointer rounded hover-soft"
              onClick={() => {
                onSelect(item.url);
                onClose();
              }}
            />
          ))}
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
