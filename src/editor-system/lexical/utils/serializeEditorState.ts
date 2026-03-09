import { $generateHtmlFromNodes } from "@lexical/html";
import type { EditorState } from "lexical";

export const serializeEditorState = (
  editorState: EditorState,
  editor: any,
): string => {
  let html = "";

  editorState.read(() => {
    html = $generateHtmlFromNodes(editor, null);
  });

  return html;
};
