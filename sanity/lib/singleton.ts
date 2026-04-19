import type { ComponentType } from "react";
import type { StructureBuilder } from "sanity/structure";

export function singletonListItem(
  S: StructureBuilder,
  options: {
    type: string;
    title: string;
    documentId?: string;
    icon?: ComponentType;
  },
) {
  const documentId = options.documentId ?? options.type;
  return S.listItem()
    .title(options.title)
    .icon(options.icon)
    .id(documentId)
    .child(
      S.document()
        .schemaType(options.type)
        .documentId(documentId)
        .title(options.title),
    );
}
