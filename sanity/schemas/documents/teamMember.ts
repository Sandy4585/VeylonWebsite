import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { slugFromTitleField } from "../lib/fields";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    slugFromTitleField("name"),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "pageBlockContent",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "richImage",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: "previousExperience",
      title: "Previous experience",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "priorRole",
          fields: [
            defineField({ name: "company", title: "Company", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "role", title: "Role", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "years", title: "Years", type: "string" }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(10),
    }),
    defineField({
      name: "linkedInUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo.image",
    },
  },
});
