import { defineField } from "sanity";

/** Hero with optional eyebrow, secondary CTA, background — primary CTA required */
export const marketingHeroField = (name = "hero", title = "Hero") =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
      defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 3 }),
      defineField({
        name: "primaryCta",
        title: "Primary CTA",
        type: "cta",
        validation: (Rule) => Rule.required(),
      }),
      defineField({ name: "secondaryCta", title: "Secondary CTA", type: "optionalCta" }),
      defineField({ name: "backgroundImage", title: "Background image", type: "richImage" }),
    ],
  });

/** Orienting hero: eyebrow, headline, optional subhead & background — no CTAs */
export const simpleHeroField = (name = "hero", title = "Hero") =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
      defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 3 }),
      defineField({ name: "backgroundImage", title: "Background image", type: "richImage" }),
    ],
  });

export const closingCtaBlockField = (name = "closingCta", title = "Closing CTA") =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 2 }),
      defineField({
        name: "primaryCta",
        title: "Primary CTA",
        type: "cta",
        validation: (Rule) => Rule.required(),
      }),
      defineField({ name: "secondaryCta", title: "Secondary CTA", type: "optionalCta" }),
    ],
  });
