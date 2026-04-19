import { EarthGlobeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const discom = defineType({
  name: "discom",
  title: "DISCOM",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortCode",
      title: "Short code",
      type: "string",
      description: 'E.g. "TNEB"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tariffSlabs",
      title: "Tariff slabs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "tariffSlab",
          fields: [
            defineField({
              name: "fromUnits",
              title: "From units",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "toUnits",
              title: "To units",
              type: "number",
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: "ratePerUnit",
              title: "Rate per unit",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: {
                list: [
                  { title: "Domestic", value: "domestic" },
                  { title: "Commercial", value: "commercial" },
                  { title: "Industrial", value: "industrial" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(50),
    }),
    defineField({
      name: "netMeteringPolicy",
      title: "Net metering policy",
      type: "pageBlockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subsidyRules",
      title: "Subsidy rules",
      type: "object",
      fields: [
        defineField({
          name: "centralSubsidyApplicable",
          title: "Central subsidy applicable",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "stateSubsidyApplicable",
          title: "State subsidy applicable",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "notes",
          title: "Notes",
          type: "simpleBlockContent",
        }),
      ],
    }),
    defineField({
      name: "netMeteringCapKw",
      title: "Net metering cap (kW)",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last updated",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sourceUrl",
      title: "Source URL",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "name",
      state: "state",
      code: "shortCode",
    },
    prepare({ title, state, code }) {
      return { title: title ?? "DISCOM", subtitle: [code, state].filter(Boolean).join(" · ") };
    },
  },
});
