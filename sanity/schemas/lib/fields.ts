import { defineField } from "sanity";

const SLUG_MAX = 96;

export const slugFromTitleField = (sourceField = "title") =>
  defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    options: {
      source: sourceField,
      maxLength: SLUG_MAX,
      slugify: (input: string) =>
        input
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
          .replace(/-+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, SLUG_MAX),
    },
    validation: (Rule) =>
      Rule.required().custom((value) => {
        const current = value && typeof value === "object" && "current" in value ? (value as { current?: string }).current : "";
        if (!current) return "Required";
        if (current.length > SLUG_MAX) return `Max ${SLUG_MAX} characters`;
        return true;
      }),
  });
