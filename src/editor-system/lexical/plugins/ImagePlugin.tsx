import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState } from "react";
import { $insertNodes } from "lexical";

import MediaLibraryModal from "@/modules/dashboard/media/components/MediaLibraryModal";
import { $createImageNode } from "../nodes/ImageNode";

const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [urlModalOpen, setUrlModalOpen] = useState(false);

  const [url, setUrl] = useState("");

  const insertImage = (src: string) => {
    if (!src) return;

    editor.update(() => {
      const imageNode = $createImageNode({
        src,
        alt: "",
        width: 600,
        caption: "",
        alignment: "center",
      });

      $insertNodes([imageNode]);
    });

    editor.focus();
  };

  return (
    <>
      {/* Image Button */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="h-9 px-3 flex items-center justify-center border rounded text-sm hover:btn-secondary btn-secondary text-white cursor-pointer"
        >
          Image
        </button>

        {dropdownOpen && (
          <div className="absolute z-20 bg-card border border-main rounded shadow-md mt-1 w-[180px]">
            <button
              className="dropdown-item"
              onClick={() => {
                setLibraryOpen(true);
                setDropdownOpen(false);
              }}
            >
              From Media Library
            </button>

            <button
              className="dropdown-item"
              onClick={() => {
                setUrlModalOpen(true);
                setDropdownOpen(false);
              }}
            >
              From URL
            </button>
          </div>
        )}
      </div>

      {/* Media Library */}
      <MediaLibraryModal
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        onSelect={(src) => {
          insertImage(src);
          setLibraryOpen(false);
        }}
      />

      {/* URL Modal */}
      {urlModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg w-[400px] space-y-4">
            <h3 className="text-lg font-semibold">Insert Image URL</h3>

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full border-main rounded px-3 py-2"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setUrlModalOpen(false)}
                className="btn-secondary px-4 py-2 rounded text-white"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  insertImage(url);
                  setUrl("");
                  setUrlModalOpen(false);
                }}
                className="btn-prime px-4 py-2 rounded text-white"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePlugin;
