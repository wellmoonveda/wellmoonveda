import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ImageNode } from "./nodes/ImageNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import SlashPlugin from "./plugins/SlashPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin";
import { editorTheme } from "./theme/editorTheme";
import DragDropImagePlugin from "./plugins/DragDropImagePlugin";
import Toolbar from "./Toolbar";
import HistoryPlugin from "./plugins/HistoryPlugin";
import { serializeEditorState } from "./utils/serializeEditorState";
import { TableNode, TableRowNode, TableCellNode } from "@lexical/table";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import TableActionMenuPlugin from "./plugins/TableActionMenuPlugin";
import type { EditorState, SerializedEditorState } from "lexical";

interface Props {
  onChange: (editorState: EditorState, html: string) => void;
  initialContent?: SerializedEditorState | null;
}

const Editor = ({ onChange, initialContent }: Props) => {
  const getInitialState = () => {
    if (!initialContent) return null;

    return JSON.stringify(initialContent);
  };

  const initialConfig = {
    namespace: "cms-editor",
    theme: editorTheme,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      ImageNode,
      TableNode,
      TableCellNode,
      TableRowNode,
    ],
    editorState: getInitialState(),
    readOnly: false,
    onError(error: Error) {
      console.error(error);
    },
  };

  //preventing the composer to not render until the initial content is not present
  if (initialContent === null) {
    return (
      <div className="h-[650px] border rounded-md bg-soft animate-pulse" />
    );
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border-main border rounded-md flex flex-col h-[650px] overflow-hidden">
        <div className="sticky top-0 z-20 bg-soft border-b border-main">
          <Toolbar />
        </div>

        <div className="flex-1 overflow-y-auto">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="p-4 min-h-[500px] outline-none"
                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
              />
            }
            placeholder={<div className="p-4 text-muted">Start writing...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>

        <TablePlugin />
        <TableActionMenuPlugin />

        <FloatingToolbarPlugin />
        <DragDropImagePlugin />

        <ListPlugin />
        <LinkPlugin />
        <HistoryPlugin />
        <SlashPlugin />

        <OnChangePlugin
          onChange={(editorState, editor) => {
            const html = serializeEditorState(editorState, editor);
            onChange(editorState, html);
          }}
        />
      </div>
    </LexicalComposer>
  );
};

export default Editor;
