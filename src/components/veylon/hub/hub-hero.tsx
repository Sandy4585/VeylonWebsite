import { Container } from "@/components/veylon/container";
import { CtaButton } from "@/components/veylon/cta-button";
import { Section } from "@/components/veylon/section";
import { VeylonImage } from "@/components/veylon/veylon-image";
import type { Cta, MarketingHero, OptionalCta } from "@/lib/sanity/types";
import { optionalCtaToCta } from "@/lib/veylon/optional-cta";

function isRenderableCta(cta: Cta | OptionalCta | undefined): boolean {
  return Boolean(cta?.label?.trim() && cta?.href);
}

export type HubHeroProps = {
  data: MarketingHero;
  /** Set true when this hero image should be treated as LCP (first prominent image). */
  priority?: boolean;
};

export function HubHero({ data, priority = false }: HubHeroProps) {
  const hasBackground = Boolean(data.backgroundImage);
  const primary = data.primaryCta;
  const secondary = data.secondaryCta;
  const showPrimary = isRenderableCta(primary);
  const showSecondary = isRenderableCta(secondary);

  return (
    <Section
      tone="navy"
      spacing="none"
      className="relative flex min-h-[70vh] flex-col justify-center overflow-hidden md:min-h-[80vh]"
    >
      {hasBackground && data.backgroundImage ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0 min-h-[70vh] md:min-h-[80vh]"
            aria-hidden
          >
            <VeylonImage
              image={data.backgroundImage}
              priority={priority}
              sizes="100vw"
              className="absolute inset-0 m-0 h-full min-h-full w-full [&>div]:h-full [&>div]:min-h-full [&_img]:h-full [&_img]:min-h-full [&_img]:object-cover [&_figcaption]:hidden"
            />
          </div>
          <div className="absolute inset-0 z-[1] bg-navy-900/80" aria-hidden />
        </>
      ) : null}

      <Container className="relative z-10 py-16 md:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {data.eyebrow ? (
            <p
              data-component="eyebrow"
              className="max-w-3xl font-sans text-sm font-semibold tracking-[0.2em] text-amber-500 uppercase md:text-base"
            >
              {data.eyebrow}
            </p>
          ) : null}
          <h1
            data-component="headline"
            className="mt-4 text-balance font-serif text-5xl leading-[1.1] font-medium text-white md:mt-5 md:text-6xl lg:text-7xl"
          >
            {data.headline}
          </h1>
          {data.subheadline ? (
            <p
              data-component="subheadline"
              className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300 md:text-xl"
            >
              {data.subheadline}
            </p>
          ) : null}
          {(showPrimary || showSecondary) && (
            <div
              className="mt-12 flex w-full max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-4 md:mt-14 md:gap-x-8"
              role="group"
              aria-label="Primary actions"
            >
              {showPrimary && primary ? (
                <CtaButton cta={primary} size="lg" className="min-w-[12rem] shrink-0" />
              ) : null}
              {showSecondary && secondary ? (
                <CtaButton
                  cta={optionalCtaToCta(secondary)}
                  size="lg"
                  className="shrink-0"
                />
              ) : null}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
