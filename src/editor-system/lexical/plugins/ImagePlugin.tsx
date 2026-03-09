import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodes } from "lexical";
import { ImageNode } from "../nodes/ImageNode";

const ImagePlugin = () => {
  const [editor] = useLexicalComposerContext();

  const insertImage = (src: string) => {
    editor.update(() => {
      const imageNode = new ImageNode(src);
      $insertNodes([imageNode]);
    });
  };

  return (
    <button
      onClick={() => insertImage("https://placehold.co/600x400")}
      className="px-2 py-1 text-sm border-main border rounded"
    >
      Insert Image
    </button>
  );
};

export default ImagePlugin;
