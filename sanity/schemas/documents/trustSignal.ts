import { CheckmarkCircleIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const trustSignal = defineType({
  name: "trustSignal",
  title: "Trust signal",
  type: "document",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Certification", value: "certification" },
          { title: "Partnership", value: "partnership" },
          { title: "Milestone", value: "milestone" },
          { title: "Award", value: "award" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "richImage",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { type?: string } | undefined;
          const t = parent?.type;
          if ((t === "partnership" || t === "certification") && !value) {
            return "Logo is required for partnership and certification trust signals";
          }
          return true;
        }),
    }),
    defineField({
      name: "validFrom",
      title: "Valid from",
      type: "date",
    }),
    defineField({
      name: "validUntil",
      title: "Valid until",
      type: "date",
    }),
    defineField({
      name: "verificationUrl",
      title: "Verification URL",
      type: "url",
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "surfaces",
      title: "Surfaces",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          options: {
            list: [
              { title: "Home", value: "home" },
              { title: "About", value: "about" },
              { title: "Residential", value: "residential" },
              { title: "Commercial", value: "commercial" },
              { title: "Utility", value: "utility" },
            ],
          },
        }),
      ],
      options: {
        layout: "grid",
      },
      validation: (Rule) => Rule.required().min(1).max(5).unique(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      type: "type",
      media: "logo.image",
    },
  },
});
