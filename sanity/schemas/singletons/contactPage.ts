import { EnvelopeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { marketingHeroField } from "../lib/heroFields";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
    marketingHeroField(),
    defineField({
      name: "channels",
      title: "Channels",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "contactChannel",
          fields: [
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "WhatsApp", value: "whatsapp" },
                  { title: "Email", value: "email" },
                  { title: "Phone", value: "phone" },
                  { title: "Office", value: "office" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "value", title: "Value", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "hours", title: "Hours", type: "string" }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(12).min(1),
    }),
    defineField({
      name: "officeAddress",
      title: "Office address",
      type: "simpleBlockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Map embed URL",
      type: "url",
    }),
    defineField({
      name: "formConfig",
      title: "Form configuration",
      type: "object",
      fields: [
        defineField({
          name: "departmentOptions",
          title: "Department options",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (Rule) => Rule.required().min(1).max(20),
        }),
        defineField({
          name: "requireCompanyField",
          title: "Require company field",
          type: "boolean",
          initialValue: false,
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
