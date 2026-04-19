import { defineField } from "sanity";

function heroHasCta(hero: Record<string, unknown> | undefined) {
  if (!hero) return false;
  const primary = hero.primaryCta as { label?: string; href?: string } | undefined;
  const secondary = hero.secondaryCta as { label?: string; href?: string } | undefined;
  const hasPrimary = Boolean(primary?.label && primary?.href);
  const hasSecondary = Boolean(secondary?.label && secondary?.href);
  return hasPrimary || hasSecondary;
}

/** Hero with optional eyebrow, CTAs, background — at least one CTA required when CTAs are present */
export const marketingHeroField = (name = "hero", title = "Hero") =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
      defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
      defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 3 }),
      defineField({ name: "primaryCta", title: "Primary CTA", type: "cta" }),
      defineField({ name: "secondaryCta", title: "Secondary CTA", type: "cta" }),
      defineField({ name: "backgroundImage", title: "Background image", type: "richImage" }),
    ],
    validation: (Rule) =>
      Rule.custom((hero: Record<string, unknown> | undefined) =>
        heroHasCta(hero) ? true : "Add at least one primary or secondary CTA",
      ),
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
      defineField({ name: "primaryCta", title: "Primary CTA", type: "cta" }),
      defineField({ name: "secondaryCta", title: "Secondary CTA", type: "cta" }),
    ],
    validation: (Rule) =>
      Rule.custom((block: Record<string, unknown> | undefined) =>
        heroHasCta(block) ? true : "Add at least one primary or secondary CTA in the closing block",
      ),
  });
