import { $generateHtmlFromNodes } from "@lexical/html";
import type { EditorState } from "lexical";

export const generateHtmlFromEditorState = (
  editorState: EditorState,
  editor: any,
) => {
  let html = "";

  editor.update(() => {
    html = $generateHtmlFromNodes(editor, null);
  });

  return html;
};
