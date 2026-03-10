import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";

interface Props {
  src: string;
  alt: string;
  width: number;
  caption: string;
  alignment: "left" | "center" | "right";
  nodeKey: string;
}

const ImageComponent = ({
  src,
  alt,
  width,
  caption,
  alignment,
  nodeKey,
}: Props) => {
  const [editor] = useLexicalComposerContext();

  const [currentWidth, setWidth] = useState(width);
  const [currentCaption, setCaption] = useState(caption);

  const updateNode = (updates: any) => {
    editor.update(() => {
      const node: any = $getNodeByKey(nodeKey);

      if (!node) return;

      Object.assign(node, updates);
    });
  };

  const resizeImage = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = currentWidth;

    const onMove = (event: MouseEvent) => {
      const newWidth = Math.max(150, startWidth + (event.clientX - startX));

      setWidth(newWidth);
      updateNode({ __width: newWidth });
    };

    const onStop = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onStop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onStop);
  };

  const alignmentClass = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };

  return (
    <div className={`my-4 ${alignmentClass[alignment]}`}>
      <div className="relative group" style={{ width: currentWidth }}>
        <img
          src={src}
          alt={alt}
          style={{ width: currentWidth }}
          className="rounded-md"
        />

        {/* resize handle */}
        <div
          onMouseDown={resizeImage}
          className="absolute bottom-0 right-0 w-3 h-3 bg-primary cursor-se-resize opacity-0 group-hover:opacity-100"
        />
      </div>

      <input
        value={currentCaption}
        placeholder="Write caption..."
        onChange={(e) => {
          setCaption(e.target.value);
          updateNode({ __caption: e.target.value });
        }}
        className="text-sm text-muted mt-2 w-full bg-transparent outline-none"
      />
    </div>
  );
};

export default ImageComponent;
