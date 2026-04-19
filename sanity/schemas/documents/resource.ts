import { DocumentPdfIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { slugFromTitleField } from "../lib/fields";

export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  icon: DocumentPdfIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    slugFromTitleField("title"),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Guide", value: "guide" },
          { title: "Report", value: "report" },
          { title: "Article", value: "article" },
          { title: "Policy update", value: "policy-update" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "richImage",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "resourceBlockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "teamMember" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          if (!value) return "Required";
          const id = context.document?._id as string | undefined;
          if (id?.startsWith("drafts.")) return true;
          const d = new Date(value as string);
          if (Number.isNaN(d.getTime())) return "Invalid date";
          return d.getTime() <= Date.now() ? true : "Cannot be in the future";
        }),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated at",
      type: "datetime",
    }),
    defineField({
      name: "relatedResources",
      title: "Related resources",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "resource" }] })],
      validation: (Rule) => Rule.unique().max(3),
    }),
    defineField({
      name: "downloadableAsset",
      title: "Downloadable asset",
      type: "object",
      fields: [
        defineField({
          name: "file",
          title: "File",
          type: "file",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "pageCount",
          title: "Page count",
          type: "number",
          validation: (Rule) => Rule.min(1).max(9999),
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      media: "heroImage.image",
    },
    prepare({ title, type, media }) {
      return { title: title ?? "Untitled", subtitle: type, media };
    },
  },
});
