import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "role", title: "Role", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "company", title: "Company", type: "string" }),
        defineField({ name: "location", title: "Location", type: "string" }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "project",
      title: "Project",
      type: "reference",
      to: [{ type: "project" }],
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "richImage",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
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
  ],
  preview: {
    select: {
      quote: "quote",
      name: "author.name",
    },
    prepare({ quote, name }) {
      return {
        title: name ?? "Author",
        subtitle: quote ? String(quote).slice(0, 80) : "",
      };
    },
  },
});
