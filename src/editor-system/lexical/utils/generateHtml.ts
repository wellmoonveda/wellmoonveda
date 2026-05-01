import { $generateHtmlFromNodes } from "@lexical/html";
import type { EditorState, LexicalEditor } from "lexical";

export const generateHtmlFromEditorState = (
  editorState: EditorState,
  editor: LexicalEditor,
): string => {
  let html = "";

  editorState.read(() => {
    html = $generateHtmlFromNodes(editor, null);
  });

  return html;
};
