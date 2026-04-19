import { BillIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const legalEntity = defineType({
  name: "legalEntity",
  title: "Legal entity",
  type: "object",
  icon: BillIcon,
  fields: [
    defineField({
      name: "proprietorName",
      title: "Proprietor name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "entityType",
      title: "Entity type",
      type: "string",
      options: {
        list: [
          { title: "Proprietorship", value: "proprietorship" },
          { title: "Partnership", value: "partnership" },
          { title: "LLP", value: "llp" },
          { title: "Private limited", value: "pvt-ltd" },
        ],
        layout: "radio",
      },
      initialValue: "proprietorship",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gstin",
      title: "GSTIN",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((value: string | undefined) => {
          if (!value) return "Required";
          return /^[0-9A-Z]{15}$/.test(value) ? true : "Must be a 15-character alphanumeric GSTIN";
        }),
    }),
    defineField({
      name: "registeredAddress",
      title: "Registered address",
      type: "simpleBlockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cin",
      title: "CIN (optional)",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact phone",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactEmail",
      title: "Contact email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
  ],
});
