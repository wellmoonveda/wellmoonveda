import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $getSelection, $isRangeSelection } from "lexical";

const SlashPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) return;

        const text = selection.anchor.getNode().getTextContent();

        if (text.endsWith("/")) {
          console.log("Slash command triggered");
        }
      });
    });
  }, [editor]);

  return null;
};

export default SlashPlugin;
