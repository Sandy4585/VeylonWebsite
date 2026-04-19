import { PinIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { slugFromTitleField } from "../lib/fields";

export const cityPage = defineType({
  name: "cityPage",
  title: "City page",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "cityName",
      title: "City name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    slugFromTitleField("cityName"),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "discom",
      title: "DISCOM",
      type: "reference",
      to: [{ type: "discom" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "segment",
      title: "Segment",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero overrides",
      type: "object",
      fields: [
        defineField({ name: "customHeadline", title: "Custom headline", type: "string" }),
        defineField({ name: "customSubheadline", title: "Custom subheadline", type: "string" }),
      ],
    }),
    defineField({
      name: "localContext",
      title: "Local context",
      type: "pageBlockContent",
    }),
    defineField({
      name: "localProjects",
      title: "Local projects",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "project" }] })],
      validation: (Rule) => Rule.max(24),
    }),
    defineField({
      name: "localFaqs",
      title: "Local FAQs",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "faq" }] })],
      validation: (Rule) => Rule.max(24),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Leave empty to auto-generate from city name and segment on the site.",
    }),
  ],
  preview: {
    select: {
      city: "cityName",
      state: "state",
      segment: "segment",
    },
    prepare({ city, state, segment }) {
      return { title: city ?? "City", subtitle: [segment, state].filter(Boolean).join(" · ") };
    },
  },
});
