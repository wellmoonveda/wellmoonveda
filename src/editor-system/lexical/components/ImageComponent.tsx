import { useState, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey } from "lexical";
import { $isImageNode } from "../nodes/ImageNode";

interface Props {
  src: string;
  alt: string;
  width: number;
  caption: string;
  alignment: "left" | "center" | "right";
  nodeKey: string;
}

type ImageUpdateMap = {
  width: number;
  caption: string;
};

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

  // Sync state if props change (e.g., undo/redo)
  useEffect(() => {
    setWidth(width);
    setCaption(caption);
  }, [width, caption]);

  const updateNodeProperty = <K extends keyof ImageUpdateMap>(
    type: K,
    value: ImageUpdateMap[K],
  ) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        if (type === "width") node.setWidth(value as number);
        if (type === "caption") node.setCaption(value as string);
      }
    });
  };

  const onResize = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = currentWidth;

    let latestWidth = currentWidth;

    const onMove = (moveEvent: MouseEvent) => {
      latestWidth = Math.max(150, startWidth + (moveEvent.clientX - startX));
      setWidth(latestWidth);
    };

    const onStop = () => {
      updateNodeProperty("width", latestWidth);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onStop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onStop);
  };

  const alignmentClass: Record<"left" | "center" | "right", string> = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };

  return (
    <div className={`my-4 flex flex-col ${alignmentClass[alignment]}`}>
      <div
        className="relative group self-center"
        style={{ width: currentWidth }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: currentWidth, height: "auto" }}
          className="rounded-md border border-transparent hover:border-primary transition-all shadow-sm"
          draggable="false"
        />

        {/* Resize Handle */}
        <div
          onMouseDown={onResize}
          className="absolute bottom-1 right-1 w-4 h-4 bg-primary rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity border-2 border-white"
        />
      </div>

      <input
        value={currentCaption}
        placeholder="Add a caption..."
        onChange={(e) => {
          setCaption(e.target.value);
          updateNodeProperty("caption", e.target.value);
        }}
        className="text-center text-sm text-gray-500 mt-2 w-full bg-transparent border-none outline-none focus:ring-0 italic"
      />
    </div>
  );
};

export default ImageComponent;
