import { Container } from "@/components/veylon/container";
import { CtaButton } from "@/components/veylon/cta-button";
import { Section } from "@/components/veylon/section";
import type { CalculatorTeaser } from "@/lib/sanity/types";

export type CalculatorTeaserSectionProps = {
  data: CalculatorTeaser | undefined;
};

export function CalculatorTeaserSection({ data }: CalculatorTeaserSectionProps) {
  if (!data?.headline?.trim()) return null;

  const hasCta = Boolean(data.cta?.label?.trim() && data.cta?.href);

  return (
    <Section tone="amber-tint" spacing="lg">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-amber-700 uppercase">
              Solar economics, honestly
            </p>
            <h2 className="mt-4 font-serif text-3xl text-navy-900 md:text-4xl">{data.headline}</h2>
            {data.description ? (
              <p className="mt-6 text-lg leading-relaxed text-slate-700">{data.description}</p>
            ) : null}
          </div>
          <div className="rounded-2xl bg-navy-900 p-8 text-white shadow-sm">
            <p className="font-sans text-xs font-medium tracking-widest text-slate-400 uppercase">
              Example output
            </p>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-sm text-slate-400">System size</dt>
                <dd className="mt-1 font-serif text-2xl font-medium">6.6 kW DC</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-400">Annual generation</dt>
                <dd className="mt-1 font-serif text-2xl font-medium">9,800 kWh</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-400">Estimated first-year savings</dt>
                <dd className="mt-1 font-serif text-2xl font-medium">₹58,400</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-400">Simple payback</dt>
                <dd className="mt-1 font-serif text-2xl font-medium">4.2 years</dd>
              </div>
            </dl>
          </div>
        </div>
        {hasCta && data.cta ? (
          <div className="mt-12 flex justify-start">
            <CtaButton cta={data.cta} size="lg" />
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
