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

interface Props {
  onChange: (editorState: any, html: string) => void;
  initialContent?: any;
}

const Editor = ({ onChange, initialContent }: Props) => {
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
    ],
    editorState: initialContent || null,
    onError(error: Error) {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border-main border rounded-md">
        <Toolbar />

        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="p-4 min-h-[300px] outline-none"
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
            />
          }
          placeholder={<div className="p-4 text-muted">Start writing...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />

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
