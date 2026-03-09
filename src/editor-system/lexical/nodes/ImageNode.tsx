import { DecoratorNode } from "lexical";
import type { NodeKey } from "lexical";
import type { ReactNode } from "react";

type SerializedImageNode = {
  type: "image";
  src: string;
  version: 1;
};

export class ImageNode extends DecoratorNode<ReactNode> {
  __src: string;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__key);
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return new ImageNode(serializedNode.src);
  }

  constructor(src: string = "", key?: NodeKey) {
    super(key);
    this.__src = src;
  }

  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      src: this.__src,
      version: 1,
    };
  }

  createDOM(): HTMLElement {
    return document.createElement("span");
  }

  updateDOM(): boolean {
    return false;
  }

  decorate(): ReactNode {
    return <img src={this.__src} alt="" className="max-w-full rounded-md" />;
  }
}
