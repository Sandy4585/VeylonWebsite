import { BlockContentIcon, BlockElementIcon, PlayIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const linkAnnotation = defineArrayMember({
  type: "object",
  name: "link",
  title: "Link",
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "external",
      title: "Treat as external",
      type: "boolean",
      initialValue: false,
    }),
  ],
});

const baseBlock = defineArrayMember({
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "H2", value: "h2" },
    { title: "H3", value: "h3" },
    { title: "Quote", value: "blockquote" },
  ],
  lists: [
    { title: "Bullet", value: "bullet" },
    { title: "Numbered", value: "number" },
  ],
  marks: {
    decorators: [
      { title: "Strong", value: "strong" },
      { title: "Emphasis", value: "em" },
    ],
    annotations: [linkAnnotation],
  },
});

export const simpleBlockContent = defineType({
  name: "simpleBlockContent",
  title: "Rich text (simple)",
  type: "array",
  icon: BlockContentIcon,
  of: [baseBlock],
});

export const pteYoutube = defineType({
  name: "pteYoutube",
  title: "YouTube embed",
  type: "object",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "url",
      title: "YouTube URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
});

export const pteCallout = defineType({
  name: "pteCallout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Success", value: "success" },
        ],
        layout: "radio",
      },
      initialValue: "info",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "simpleBlockContent",
      validation: (Rule) => Rule.required(),
    }),
  ],
});

export const pteTable = defineType({
  name: "pteTable",
  title: "Table",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "pteTableRow",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (Rule) => Rule.required().min(1).max(12),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
  ],
});

const pageLevelBlocks = [
  baseBlock,
  defineArrayMember({ type: "richImage" }),
  defineArrayMember({ type: "statBlock" }),
  defineArrayMember({ type: "pteCallout" }),
  defineArrayMember({ type: "pteYoutube" }),
];

export const pageBlockContent = defineType({
  name: "pageBlockContent",
  title: "Rich text (page)",
  type: "array",
  icon: BlockContentIcon,
  of: pageLevelBlocks,
});

export const resourceBlockContent = defineType({
  name: "resourceBlockContent",
  title: "Rich text (resource)",
  type: "array",
  icon: BlockContentIcon,
  of: [...pageLevelBlocks, defineArrayMember({ type: "pteTable" })],
});
