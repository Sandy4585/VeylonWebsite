import Link from "next/link";

import { Button } from "@/components/veylon/button";
import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import type { HubCalculatorEmbed, HubSegment } from "@/lib/sanity/types";

export type CalculatorEmbedProps = {
  data: HubCalculatorEmbed | undefined;
  segment: HubSegment;
};

const exampleOutput: Record<
  HubSegment,
  { system: string; annual: string; savings: string; payback: string }
> = {
  residential: {
    system: "6.6 kW DC",
    annual: "9,800 kWh/yr",
    savings: "₹58,400 first-year",
    payback: "4.2 yr payback",
  },
  commercial: {
    system: "150 kW DC",
    annual: "220,000 kWh/yr",
    savings: "₹13.2 Lakh first-year",
    payback: "3.8 yr payback",
  },
};

export function CalculatorEmbed({ data, segment }: CalculatorEmbedProps) {
  if (!data?.enabled || !data.headline?.trim()) return null;

  const ex = exampleOutput[segment];

  return (
    <Section tone="amber-tint" spacing="lg">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-amber-700 uppercase">
              Calculator
            </p>
            <h2 className="mt-4 font-serif text-3xl text-navy-900 md:text-4xl">{data.headline}</h2>
            {data.description ? (
              <p className="mt-6 text-lg leading-relaxed text-slate-700">{data.description}</p>
            ) : null}
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href={`/calculator/${segment}`}>Start calculation</Link>
              </Button>
            </div>
          </div>
          <div>
            <p className="font-sans text-xs font-medium tracking-widest text-slate-500 uppercase">
              Example output
            </p>
            <div className="mt-4 rounded-2xl bg-navy-900 p-8 text-white shadow-sm">
              <dl className="space-y-5">
                <div>
                  <dt className="text-sm text-slate-400">System size</dt>
                  <dd className="mt-1 font-serif text-2xl font-medium">{ex.system}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-400">Annual generation</dt>
                  <dd className="mt-1 font-serif text-2xl font-medium">{ex.annual}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-400">Estimated first-year savings</dt>
                  <dd className="mt-1 font-serif text-2xl font-medium">{ex.savings}</dd>
                </div>
                <div>
                  <dt className="text-sm text-slate-400">Simple payback</dt>
                  <dd className="mt-1 font-serif text-2xl font-medium">{ex.payback}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
