import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState } from "react";
import { $insertNodes } from "lexical";

import MediaLibraryModal from "@/modules/dashboard/media/components/MediaLibraryModal";
import { $createImageNode } from "../nodes/ImageNode";

const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [open, setOpen] = useState(false);

  const insertImage = (url: string) => {
    editor.update(() => {
      const imageNode = $createImageNode({
        src: url,
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
      <button
        onClick={() => setOpen(true)}
        className="h-9 px-3 border border-main rounded text-sm hover-soft"
      >
        Image
      </button>

      <MediaLibraryModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={(url) => {
          insertImage(url);
          setOpen(false);
        }}
      />
    </>
  );
};

export default ImagePlugin;
