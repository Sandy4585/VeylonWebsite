import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { closingCtaBlockField, marketingHeroField } from "../lib/heroFields";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
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
      name: "segmentCards",
      title: "Segment cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "segmentCard",
          fields: [
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
            defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
            defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "summary", title: "Summary", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: "image", title: "Image", type: "richImage", validation: (Rule) => Rule.required() }),
            defineField({ name: "cta", title: "CTA", type: "cta", validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(3).max(3),
    }),
    defineField({
      name: "trustSignals",
      title: "Trust signals",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "trustSignal" }] })],
      validation: (Rule) => Rule.unique().max(6),
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured projects",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
      validation: (Rule) => Rule.unique().max(3),
    }),
    defineField({
      name: "calculatorTeaser",
      title: "Calculator teaser",
      type: "object",
      fields: [
        defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({ name: "cta", title: "CTA", type: "cta", validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "testimonial" }] })],
      validation: (Rule) => Rule.unique().max(3),
    }),
    defineField({
      name: "featuredResources",
      title: "Featured resources",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "resource" }] })],
      validation: (Rule) => Rule.unique().max(3),
    }),
    closingCtaBlockField(),
  ],
});
