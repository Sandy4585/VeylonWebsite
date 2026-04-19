import type { Cta, OptionalCta } from "@/lib/sanity/types";

/** Maps CMS optional secondary CTA to the strict `Cta` shape expected by `CtaButton`. */
export function optionalCtaToCta(cta: OptionalCta): Cta {
  return {
    label: cta.label ?? "",
    href: cta.href ?? "",
    variant: cta.variant ?? "secondary",
    external: cta.external,
  };
}
