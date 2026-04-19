import { DocumentIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { slugFromTitleField } from "../lib/fields";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    slugFromTitleField("title"),
    defineField({
      name: "segment",
      title: "Segment",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Utility", value: "utility" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        defineField({ name: "city", title: "City", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "state", title: "State", type: "string", validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "systemDetails",
      title: "System details",
      type: "object",
      fields: [
        defineField({
          name: "capacityKw",
          title: "Capacity (kW)",
          type: "number",
          validation: (Rule) =>
            Rule.custom((value: number | undefined) => {
              if (value === undefined || value === null) return true;
              return value > 0 ? true : "Capacity must be a positive number";
            }),
        }),
        defineField({ name: "configuration", title: "Configuration", type: "string" }),
        defineField({
          name: "components",
          title: "Components",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "projectComponent",
              fields: [
                defineField({
                  name: "role",
                  title: "Role",
                  type: "string",
                  options: {
                    list: [
                      { title: "Module", value: "module" },
                      { title: "Inverter", value: "inverter" },
                      { title: "Battery", value: "battery" },
                      { title: "Monitoring", value: "monitoring" },
                      { title: "Mounting", value: "mounting" },
                    ],
                    layout: "dropdown",
                  },
                  validation: (Rule) => Rule.required(),
                }),
                defineField({ name: "brand", title: "Brand", type: "string", validation: (Rule) => Rule.required() }),
                defineField({ name: "model", title: "Model", type: "string", validation: (Rule) => Rule.required() }),
              ],
            }),
          ],
          validation: (Rule) => Rule.max(20),
        }),
        defineField({ name: "commissionedDate", title: "Commissioned", type: "date" }),
      ],
    }),
    defineField({
      name: "results",
      title: "Results",
      type: "object",
      fields: [
        defineField({ name: "annualGenerationKwh", title: "Annual generation (kWh)", type: "number" }),
        defineField({ name: "co2OffsetTonnes", title: "CO₂ offset (tonnes)", type: "number" }),
        defineField({ name: "paybackYears", title: "Payback (years)", type: "number" }),
        defineField({ name: "customerSavingsInr", title: "Customer savings (INR)", type: "number" }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "richImage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [defineArrayMember({ type: "richImage" })],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "narrative",
      title: "Narrative",
      type: "pageBlockContent",
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "reference",
      to: [{ type: "testimonial" }],
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
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      segment: "segment",
      media: "heroImage.image",
    },
    prepare({ title, segment, media }) {
      return { title: title ?? "Untitled", subtitle: segment, media };
    },
  },
});
