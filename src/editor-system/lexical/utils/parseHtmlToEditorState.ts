import { createEditor } from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot } from "lexical";

export const parseHtmlToEditorState = (html: string) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(html, "text/html");

  const editor = createEditor();

  editor.update(() => {
    const nodes = $generateNodesFromDOM(editor, dom);

    const root = $getRoot();
    root.clear();

    nodes.forEach((node) => {
      root.append(node);
    });
  });

  return editor.getEditorState();
};
