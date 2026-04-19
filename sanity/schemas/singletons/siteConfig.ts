import { CogIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteConfig = defineType({
  name: "siteConfig",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      initialValue: "Veylon Energy",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp number",
      type: "string",
      description: "E.164 format, e.g. +919876543210",
      validation: (Rule) =>
        Rule.custom((value: string | undefined) => {
          if (!value) return true;
          return /^\+[1-9]\d{1,14}$/.test(value) ? true : "Use E.164 format (e.g. +919876543210)";
        }),
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "X", value: "x" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "primaryNav",
      title: "Primary navigation",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", title: "Href", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "children",
              title: "Child links",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "navChild",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
                    defineField({ name: "href", title: "Href", type: "string", validation: (Rule) => Rule.required() }),
                  ],
                }),
              ],
              validation: (Rule) => Rule.max(15),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(12),
    }),
    defineField({
      name: "footerNav",
      title: "Footer navigation",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "footerNavItem",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "href", title: "Href", type: "string", validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(24),
    }),
    defineField({
      name: "announcementBar",
      title: "Announcement bar",
      type: "object",
      fields: [
        defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: false }),
        defineField({ name: "message", title: "Message", type: "string" }),
        defineField({ name: "cta", title: "CTA", type: "cta" }),
        defineField({ name: "dismissible", title: "Dismissible", type: "boolean", initialValue: true }),
      ],
    }),
    defineField({
      name: "legalEntity",
      title: "Legal entity",
      type: "legalEntity",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
