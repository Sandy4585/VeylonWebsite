import { UsersIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { closingCtaBlockField, simpleHeroField } from "../lib/heroFields";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    simpleHeroField(),
    defineField({
      name: "founderStory",
      title: "Founder story",
      type: "pageBlockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyStatement",
      title: "Company statement",
      type: "pageBlockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "missionPrinciples",
      title: "Mission & principles",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "missionPrinciple",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "team",
      title: "Team",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "teamMember" }] })],
      validation: (Rule) => Rule.unique().max(24),
    }),
    defineField({
      name: "milestones",
      title: "Milestones",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "milestone",
          fields: [
            defineField({ name: "year", title: "Year", type: "number", validation: (Rule) => Rule.required().integer() }),
            defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2, validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),
    closingCtaBlockField(),
  ],
});
