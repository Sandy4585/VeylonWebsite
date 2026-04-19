import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { closingCtaBlockField, marketingHeroField } from "../lib/heroFields";

export const residentialHub = defineType({
  name: "residentialHub",
  title: "Residential hub",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    marketingHeroField(),
    defineField({
      name: "valueProps",
      title: "Value props",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "valueProp",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "howItWorks",
      title: "How it works",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "howStep",
          fields: [
            defineField({
              name: "step",
              title: "Step",
              type: "number",
              validation: (Rule) => Rule.required().integer().min(1).max(5),
            }),
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: "calculatorEmbed",
      title: "Calculator embed",
      type: "object",
      fields: [
        defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: true }),
        defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "componentPartners",
      title: "Component partners",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "trustSignal" }],
          options: {
            filter: '_type == "trustSignal" && type == "partnership"',
          },
        }),
      ],
      validation: (Rule) => Rule.unique().max(12),
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured projects",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
          options: {
            filter: '_type == "project" && segment == "residential"',
          },
        }),
      ],
      validation: (Rule) => Rule.unique().max(12),
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "faq" }],
          options: {
            filter: '_type == "faq" && category == "residential"',
          },
        }),
      ],
      validation: (Rule) => Rule.unique().max(24),
    }),
    closingCtaBlockField(),
  ],
});
