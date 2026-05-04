import { DecoratorNode, $applyNodeReplacement } from "lexical";
import type {
  NodeKey,
  SerializedLexicalNode,
  Spread,
  DOMExportOutput,
  LexicalNode,
  DOMConversionMap,
  DOMConversionOutput,
} from "lexical";
import type { ReactNode } from "react";
import ImageComponent from "../components/ImageComponent";

export type SerializedImageNode = Spread<
  {
    src: string;
    alt: string;
    width: number;
    caption: string;
    alignment: "left" | "center" | "right";
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<ReactNode> {
  __src: string;
  __alt: string;
  __width: number;
  __caption: string;
  __alignment: "left" | "center" | "right";

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__alt,
      node.__width,
      node.__caption,
      node.__alignment,
      node.__key,
    );
  }

  // --- SERIALIZATION ---
  // This is vital for loading saved data
  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, alt, width, caption, alignment } = serializedNode;
    const node = $createImageNode({ src, alt, width, caption, alignment });
    return node;
  }

  exportJSON(): SerializedImageNode {
    return {
      type: "image", // Must match getType()
      version: 1,
      src: this.__src,
      alt: this.__alt,
      width: this.__width,
      caption: this.__caption,
      alignment: this.__alignment,
    };
  }

  constructor(
    src: string,
    alt = "",
    width = 600,
    caption = "",
    alignment: "left" | "center" | "right" = "center",
    key?: NodeKey,
  ) {
    super(key);
    this.__src = src;
    this.__alt = alt;
    this.__width = width;
    this.__caption = caption;
    this.__alignment = alignment;
  }

  // --- SETTERS ---
  // Always use getWritable() before modifying properties
  setWidth(width: number): void {
    const writable = this.getWritable();
    writable.__width = width;
  }

  setCaption(caption: string): void {
    const writable = this.getWritable();
    writable.__caption = caption;
  }

  // --- DOM RENDERING ---
  exportDOM(): DOMExportOutput {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__alt);
    element.setAttribute("width", this.__width.toString());
    // Use CSS classes instead of inline styles if you have them in Tailwind
    element.className = `editor-image-${this.__alignment}`;
    return { element };
  }

  // 1. Tell Lexical which HTML tags to look for
  static importDOM(): DOMConversionMap | null {
    return {
      img: (_node: Node) => ({
        conversion: $convertImageElement,
        priority: 0,
      }),
    };
  }

  createDOM(): HTMLElement {
    const div = document.createElement("div");
    // "contents" is great, but "inline-block" often helps with selection UI
    div.style.display = "block";
    return div;
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): ReactNode {
    return (
      <ImageComponent
        src={this.__src}
        alt={this.__alt}
        width={this.__width}
        caption={this.__caption}
        alignment={this.__alignment}
        nodeKey={this.__key}
      />
    );
  }
}

// --- HELPER FUNCTIONS ---
export function $createImageNode({
  src,
  alt = "",
  width = 600,
  caption = "",
  alignment = "center",
}: {
  src: string;
  alt?: string;
  width?: number;
  caption?: string;
  alignment?: "left" | "center" | "right";
}): ImageNode {
  return $applyNodeReplacement(
    new ImageNode(src, alt, width, caption, alignment),
  );
}

export function $isImageNode(
  node: LexicalNode | null | undefined,
): node is ImageNode {
  return node instanceof ImageNode;
}

function $convertImageElement(domNode: Node): DOMConversionOutput | null {
  if (domNode instanceof HTMLImageElement) {
    const { src, alt } = domNode;
    const node = $createImageNode({
      src,
      alt,
      width: parseInt(domNode.getAttribute("width") || "600", 10),
    });
    return { node };
  }
  return null;
}
