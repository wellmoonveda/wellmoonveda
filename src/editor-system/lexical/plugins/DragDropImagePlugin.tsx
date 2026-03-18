import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $insertNodes } from "lexical";
import { $createImageNode } from "../nodes/ImageNode";
import { useAuth } from "@/modules/auth";
import { uploadMedia } from "@/services/supabase/media.service";

const DragDropImagePlugin = () => {
  const [editor] = useLexicalComposerContext();

  const auth = useAuth();
  const user = auth?.user;

  useEffect(() => {
    const root = editor.getRootElement();

    if (!root) return;

    const handleDrop = async (event: DragEvent) => {
      const files = event.dataTransfer?.files;

      if (!files || files.length === 0) return;

      const file = files[0];

      if (!file.type.startsWith("image/")) return;

      event.preventDefault();

      // 🔒 Role restriction
      if (user?.role !== "admin") {
        alert("Image uploads are restricted. Please use Media Library.");
        return;
      }

      try {
        const url = await uploadMedia(file, file.name, "editor");

        editor.update(() => {
          const imageNode = $createImageNode({
            src: url,
            alt: file.name,
            width: 600,
            caption: "",
            alignment: "center",
          });

          $insertNodes([imageNode]);
        });
      } catch (err) {
        console.error("Upload failed", err);
      }
    };

    root.addEventListener("drop", handleDrop);
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    root.addEventListener("dragover", handleDragOver);

    return () => {
      root.removeEventListener("drop", handleDrop);
      root.removeEventListener("dragover", handleDragOver);
    };
  }, [editor]);

  return null;
};

export default DragDropImagePlugin;
