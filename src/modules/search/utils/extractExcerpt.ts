export function extractExcerpt(content: unknown, maxLength = 120): string {
  if (typeof content === "string") {
    return content.slice(0, maxLength);
  }

  // Handle Lexical JSON (your case)
  if (
    typeof content === "object" &&
    content !== null &&
    "root" in content
  ) {
    const root = (content as { root?: { children?: unknown[] } }).root;

    if (root?.children && Array.isArray(root.children)) {
      const text = root.children
        .map((node) => {
          if (
            typeof node === "object" &&
            node !== null &&
            "text" in node
          ) {
            return (node as { text?: string }).text ?? "";
          }
          return "";
        })
        .join(" ");

      return text.slice(0, maxLength);
    }
  }

  return "";
}
