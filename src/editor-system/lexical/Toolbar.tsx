import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $isListNode } from "@lexical/list";
import { $getSelection, $isRangeSelection } from "lexical";
import { $createParagraphNode } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import ImagePlugin from "./plugins/ImagePlugin";

import { useState, useEffect } from "react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { List, ListOrdered } from "lucide-react";

import { SELECTION_CHANGE_COMMAND } from "lexical";

const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const [blockTypeOpen, setBlockTypeOpen] = useState(false);
  const [alignOpen, setAlignOpen] = useState(false);

  const [isBold, setBold] = useState(false);
  const [isItalic, setItalic] = useState(false);
  const [isUnderline, setUnderline] = useState(false);
  const [isBulletList, setBulletList] = useState(false);
  const [isNumberList, setNumberList] = useState(false);

  const updateToolbar = () => {
    editor.getEditorState().read(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        setBold(selection.hasFormat("bold"));
        setItalic(selection.hasFormat("italic"));
        setUnderline(selection.hasFormat("underline"));

        const element = selection.anchor.getNode().getTopLevelElementOrThrow();

        if ($isListNode(element)) {
          const type = element.getListType();
          setBulletList(type === "bullet");
          setNumberList(type === "number");
        } else {
          setBulletList(false);
          setNumberList(false);
        }
      }
    });
  };

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      updateToolbar();
    });
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

  const buttonBase =
    "h-9 px-3 flex items-center justify-center border rounded text-sm hover:btn-secondary btn-secondary text-white cursor-pointer";

  const activeStyle = "!bg-white !text-black !border-black";

  const applyFormat = (command: any, value?: any) => {
    editor.dispatchCommand(command, value);
    editor.focus();
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-main bg-soft">
      {/* Bold */}
      <button
        type="button"
        onClick={() => applyFormat(FORMAT_TEXT_COMMAND, "bold")}
        className={`${buttonBase} ${isBold ? activeStyle : ""}`}
      >
        B
      </button>

      {/* Italic */}
      <button
        type="button"
        onClick={() => applyFormat(FORMAT_TEXT_COMMAND, "italic")}
        className={`${buttonBase} ${isItalic ? activeStyle : ""}`}
      >
        I
      </button>

      {/* Underline */}
      <button
        type="button"
        onClick={() => applyFormat(FORMAT_TEXT_COMMAND, "underline")}
        className={`${buttonBase} ${isUnderline ? activeStyle : ""}`}
      >
        U
      </button>

      {/* Block dropdown */}
      <div className="relative">
        <button
          onClick={() => setBlockTypeOpen(!blockTypeOpen)}
          className={`${buttonBase} min-w-[90px]`}
        >
          Block
        </button>

        {blockTypeOpen && (
          <div className="absolute flex flex-col flex-1 text-left z-20 bg-card border border-main rounded shadow-md mt-1 w-[140px]">
            <button
              className="dropdown-item"
              onClick={() => {
                formatBlock("paragraph");
                editor.focus();
              }}
            >
              Paragraph
            </button>

            <button
              className="dropdown-item"
              onClick={() => {
                formatBlock("h1");
                editor.focus();
              }}
            >
              H1
            </button>

            <button
              className="dropdown-item"
              onClick={() => {
                formatBlock("h2");
                editor.focus();
              }}
            >
              H2
            </button>

            <button
              className="dropdown-item"
              onClick={() => {
                formatBlock("h3");
                editor.focus();
              }}
            >
              H3
            </button>

            <button
              className="dropdown-item"
              onClick={() => {
                formatBlock("h4");
                editor.focus();
              }}
            >
              H4
            </button>

            <button
              className="dropdown-item"
              onClick={() => {
                formatBlock("h5");
                editor.focus();
              }}
            >
              H5
            </button>

            <button
              className="dropdown-item"
              onClick={() => {
                formatBlock("h6");
                editor.focus();
              }}
            >
              H6
            </button>

            <button
              className="dropdown-item"
              onClick={() => {
                formatBlock("quote");
                editor.focus();
              }}
            >
              Quote
            </button>
          </div>
        )}
      </div>

      {/* Bullet List */}
      <button
        onClick={() => applyFormat(INSERT_UNORDERED_LIST_COMMAND)}
        className={`${buttonBase} ${isBulletList ? activeStyle : ""}`}
      >
        <List size={16} />
      </button>

      {/* Numbered List */}
      <button
        onClick={() => applyFormat(INSERT_ORDERED_LIST_COMMAND)}
        className={`${buttonBase} ${isNumberList ? activeStyle : ""}`}
      >
        <ListOrdered size={16} />
      </button>

      {/* Alignment */}
      <div className="relative">
        <button
          onClick={() => setAlignOpen(!alignOpen)}
          className={`${buttonBase} min-w-[90px]`}
        >
          Align
        </button>

        {alignOpen && (
          <div className="absolute z-20 bg-card border border-main rounded shadow-md mt-1 w-[120px]">
            <button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
                setAlignOpen(false);
              }}
              className="dropdown-item flex items-center gap-2"
            >
              <AlignLeft size={16} /> Left
            </button>

            <button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
                setAlignOpen(false);
              }}
              className="dropdown-item flex items-center gap-2"
            >
              <AlignCenter size={16} /> Center
            </button>

            <button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
                setAlignOpen(false);
              }}
              className="dropdown-item flex items-center gap-2"
            >
              <AlignRight size={16} /> Right
            </button>

            <button
              onClick={() => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
                setAlignOpen(false);
              }}
              className="dropdown-item flex items-center gap-2"
            >
              <AlignJustify size={16} /> Justify
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      <ImagePlugin />
    </div>
  );
};

export default Toolbar;
