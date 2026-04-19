import type { PortableTextBlock } from "@portabletext/types";

function spanText(span: unknown): string {
  if (!span || typeof span !== "object") return "";
  if ("text" in span && typeof (span as { text: string }).text === "string") {
    return (span as { text: string }).text;
  }
  return "";
}

/** Flattens simple Sanity block content to plain text (e.g. for map search queries). */
export function portableTextToPlainText(
  blocks: PortableTextBlock[] | null | undefined,
): string {
  if (!blocks?.length) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !("children" in block)) return "";
      const children = block.children as unknown[];
      return children.map(spanText).join("");
    })
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
