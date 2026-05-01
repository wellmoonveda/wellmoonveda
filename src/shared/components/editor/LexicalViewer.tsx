import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ImageNode } from "@/editor-system/lexical/nodes/ImageNode";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

type Props = {
  content: any;
};

function ReadOnlyPlugin({ content }: Props) {
  return null;
}

export const LexicalViewer = ({ content }: Props) => {
  const initialConfig = {
    namespace: "Viewer",
    editable: false,
    onError(error: unknown) {
      console.error(error);
    },

    nodes: [ImageNode, TableNode, TableCellNode, TableRowNode],

    editorState: JSON.stringify(content),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border border-main rounded-lg p-4 bg-card">
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none" />}
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <TablePlugin />
        <HistoryPlugin />
      </div>
    </LexicalComposer>
  );
};
