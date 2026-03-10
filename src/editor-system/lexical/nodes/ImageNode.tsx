import { DecoratorNode, $applyNodeReplacement } from "lexical";
import type { NodeKey } from "lexical";
import type { ReactNode } from "react";

import ImageComponent from "../components/ImageComponent";

type SerializedImageNode = {
  type: "image";
  src: string;
  alt: string;
  width: number;
  caption: string;
  alignment: "left" | "center" | "right";
  version: 1;
};

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

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return new ImageNode(
      serializedNode.src,
      serializedNode.alt,
      serializedNode.width,
      serializedNode.caption,
      serializedNode.alignment,
    );
  }

  constructor(
    src: string,
    alt: string = "",
    width: number = 600,
    caption: string = "",
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

  exportJSON(): SerializedImageNode {
    return {
      type: "image",
      src: this.__src,
      alt: this.__alt,
      width: this.__width,
      caption: this.__caption,
      alignment: this.__alignment,
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
