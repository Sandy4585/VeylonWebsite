import { Container } from "@/components/veylon/container";
import { CtaButton } from "@/components/veylon/cta-button";
import { Section } from "@/components/veylon/section";
import type { ClosingCtaBlock } from "@/lib/sanity/types";

function isRenderableCta(
  cta: ClosingCtaBlock["primaryCta"] | ClosingCtaBlock["secondaryCta"],
): cta is NonNullable<typeof cta> {
  return Boolean(cta?.label?.trim() && cta?.href);
}

export type ClosingCtaProps = {
  data: ClosingCtaBlock | undefined;
};

export function ClosingCta({ data }: ClosingCtaProps) {
  if (!data?.headline?.trim()) return null;

  const showPrimary = isRenderableCta(data.primaryCta);
  const showSecondary = isRenderableCta(data.secondaryCta);

  return (
    <Section tone="navy" spacing="none" className="py-24 md:py-32">
      <Container>
        <div className="text-center">
          <h2 className="mx-auto max-w-3xl font-serif text-4xl text-white md:text-6xl">
            {data.headline}
          </h2>
          {data.subheadline ? (
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">{data.subheadline}</p>
          ) : null}
          {(showPrimary || showSecondary) && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              {showPrimary && data.primaryCta ? (
                <CtaButton cta={data.primaryCta} size="lg" />
              ) : null}
              {showSecondary && data.secondaryCta ? (
                <CtaButton cta={data.secondaryCta} size="lg" />
              ) : null}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
