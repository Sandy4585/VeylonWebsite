import { ChartUpwardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const statBlock = defineType({
  name: "statBlock",
  title: "Stat",
  type: "object",
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "string",
    }),
  ],
});
