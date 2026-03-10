import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";

import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";

const FloatingToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const applyFormat = (format: "bold" | "italic" | "underline") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
    editor.focus();
  };

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) {
          setVisible(false);
          return;
        }

        const domSelection = window.getSelection();

        if (!domSelection || domSelection.rangeCount === 0) {
          setVisible(false);
          return;
        }

        const rect = domSelection.getRangeAt(0).getBoundingClientRect();

        if (!rect) {
          setVisible(false);
          return;
        }

        setPosition({
          top: rect.top - 40 + window.scrollY,
          left: rect.left + rect.width / 2,
        });

        setVisible(selection.getTextContent().length > 0);
      });
    });
  }, [editor]);

  if (!visible) return null;

  return (
    <div
      style={{
        top: position.top,
        left: position.left,
        transform: "translateX(-50%)",
      }}
      className="absolute z-50 bg-card border border-main rounded shadow-md flex gap-1 px-2 py-1"
    >
      <button
        onClick={() => applyFormat("bold")}
        className="px-2 py-1 hover-soft rounded"
      >
        B
      </button>

      <button
        onClick={() => applyFormat("italic")}
        className="px-2 py-1 hover-soft rounded"
      >
        I
      </button>

      <button
        onClick={() => applyFormat("underline")}
        className="px-2 py-1 hover-soft rounded"
      >
        U
      </button>
    </div>
  );
};

export default FloatingToolbarPlugin;
