import { BoltIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { closingCtaBlockField, marketingHeroField } from "../lib/heroFields";

export const utilityScalePage = defineType({
  name: "utilityScalePage",
  title: "Utility-scale page",
  type: "document",
  icon: BoltIcon,
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    marketingHeroField(),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "capability",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "trustSignal" }] })],
      validation: (Rule) => Rule.unique().max(12),
    }),
    defineField({
      name: "contactForm",
      title: "Contact form",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({ name: "recipientRole", title: "Recipient role", type: "string", validation: (Rule) => Rule.required() }),
      ],
    }),
    closingCtaBlockField(),
  ],
});
