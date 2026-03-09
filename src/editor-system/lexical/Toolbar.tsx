import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { $getSelection, $isRangeSelection } from "lexical";
import { $createParagraphNode } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ImagePlugin from "./plugins/ImagePlugin";
import { useState, useEffect } from "react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { SELECTION_CHANGE_COMMAND } from "lexical";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [blockTypeOpen, setBlockTypeOpen] = useState(false);
  const [alignOpen, setAlignOpen] = useState(false);

  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        editor.getEditorState().read(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            setBold(selection.hasFormat("bold"));
            setItalic(selection.hasFormat("italic"));
            setUnderline(selection.hasFormat("underline"));
          }
        });

        return false;
      },
      1,
    );
  }, [editor]);

  const formatBlock = (
    type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "quote" | "paragraph",
  ) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        if (type === "paragraph") {
          $setBlocksType(selection, () => $createParagraphNode());
        } else if (type === "quote") {
          $setBlocksType(selection, () => $createQuoteNode());
        } else {
          $setBlocksType(selection, () => $createHeadingNode(type));
        }
      }
    });
    setBlockTypeOpen(false);
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-main">
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={`px-2 py-1 border rounded hover:bg-amber-100 cursor-pointer ${isBold ? "bg-soft" : ""}`}
      >
        B
      </button>

      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={`px-2 py-1 border rounded ${isItalic ? "bg-soft" : ""}`}
      >
        I
      </button>

      {/* Underline */}
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={`px-2 py-1 border rounded ${isUnderline ? "bg-soft" : ""}`}
      >
        U
      </button>

      {/* Heading 1 */}
      <div className="relative">
        <button
          onClick={() => setBlockTypeOpen(!blockTypeOpen)}
          className="px-3 py-1 border rounded text-sm"
        >
          Block
        </button>

        {blockTypeOpen && (
          <div className="absolute bg-card border border-main rounded shadow-md mt-1">
            <button
              className="block w-full text-left px-3 py-1 hover:bg-amber-100 cursor-pointer"
              onClick={() => {
                editor.focus();
                formatBlock("paragraph");
              }}
            >
              Paragraph
            </button>

            <button
              onClick={() => {
                editor.update(() => {
                  const selection = $getSelection();
                  console.log("Selection object:", selection); // CHECK THIS
                  if ($isRangeSelection(selection)) {
                    console.log("Applying H1 to:", selection.getTextContent());
                    $setBlocksType(selection, () => $createHeadingNode("h1"));
                  } else {
                    console.warn("No RangeSelection found!");
                  }
                });
              }}
            >
              H1
            </button>

            <button
              className="block w-full text-left px-3 py-1 hover:bg-amber-100 cursor-pointer"
              onClick={() => {
                editor.focus();
                formatBlock("h2");
              }}
            >
              H2
            </button>

            <button
              className="block w-full text-left px-3 py-1 hover:bg-amber-100 cursor-pointer"
              onClick={() => {
                editor.focus();
                formatBlock("h3");
              }}
            >
              H3
            </button>
            <button
              className="block w-full text-left px-3 py-1 hover:bg-amber-100 cursor-pointer"
              onClick={() => {
                editor.focus();
                formatBlock("h4");
              }}
            >
              H4
            </button>
            <button
              className="block w-full text-left px-3 py-1 hover:bg-amber-100 cursor-pointer"
              onClick={() => {
                editor.focus();
                formatBlock("h5");
              }}
            >
              H5
            </button>
            <button
              className="block w-full text-left px-3 py-1 hover:bg-amber-100 cursor-pointer"
              onClick={() => {
                editor.focus();
                formatBlock("h6");
              }}
            >
              H6
            </button>

            <button
              className="block w-full text-left px-3 py-1 hover:bg-amber-100 cursor-pointer"
              onClick={() => {
                editor.focus();
                formatBlock("quote");
              }}
            >
              Quote
            </button>
          </div>
        )}
      </div>

      {/* Bullet List */}
      <button
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
        className="px-2 py-1 border rounded text-sm"
      >
        • List
      </button>

      {/* Numbered List */}
      <button
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
        className="px-2 py-1 border rounded text-sm"
      >
        1. List
      </button>

      {/*Alignment */}
      <div className="relative">
        <button
          onClick={() => setAlignOpen(!alignOpen)}
          className="px-3 py-1 border rounded text-sm"
        >
          Align
        </button>

        {alignOpen && (
          <div className="absolute bg-card border border-main rounded shadow-md mt-1">
            <button
              onClick={() =>
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
              }
              className="block w-full text-left px-3 py-1"
            >
              <AlignLeft size={16} />
            </button>

            <button
              onClick={() =>
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
              }
              className="block w-full text-left px-3 py-1"
            >
              <AlignCenter size={16} />
            </button>

            <button
              onClick={() =>
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
              }
              className="block w-full text-left px-3 py-1"
            >
              <AlignRight size={16} />
            </button>

            <button
              onClick={() =>
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
              }
              className="block w-full text-left px-3 py-1"
            >
              <AlignJustify size={16} />
            </button>
          </div>
        )}
      </div>

      <ImagePlugin />
    </div>
  );
};

export default Toolbar;
