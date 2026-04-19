import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import { Eyebrow, Headline } from "@/components/veylon/typography";
import type { MissionPrinciple } from "@/lib/sanity/types";

export type PrinciplesProps = {
  principles: MissionPrinciple[];
};

export function Principles({ principles }: PrinciplesProps) {
  if (!principles.length) return null;

  const items = principles.slice(0, 4);

  return (
    <Section tone="default" spacing="lg">
      <Container>
        <div className="mx-auto max-w-5xl">
          <Eyebrow>How we work</Eyebrow>
          <Headline level={2} className="mt-3 max-w-3xl text-navy-900">
            Principles, not promises
          </Headline>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {items.map((p, i) => (
              <div key={`${p.title}-${i}`}>
                <p className="font-serif text-6xl font-medium text-amber-500">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-serif text-xl font-medium text-navy-900">{p.title}</h3>
                <p className="mt-3 font-sans text-base leading-relaxed text-slate-700">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
