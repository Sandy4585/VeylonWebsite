import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import type { HubSegment, ValuePropItem } from "@/lib/sanity/types";

const segmentTitle: Record<HubSegment, string> = {
  residential: "Residential",
  commercial: "Commercial",
};

export type ValuePropsProps = {
  items: ValuePropItem[] | undefined;
  segment: HubSegment;
};

export function ValueProps({ items, segment }: ValuePropsProps) {
  const list = (items ?? []).filter((i) => i.title?.trim() && i.description?.trim());
  if (!list.length) return null;

  return (
    <Section tone="default" spacing="lg">
      <Container>
        <h2 className="font-sans text-xs font-medium tracking-widest text-amber-600 uppercase">
          Why Veylon for {segmentTitle[segment]}
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10 lg:gap-16">
          {list.map((item, index) => (
            <div key={`${item.title}-${index}`}>
              <h3 className="border-l-2 border-amber-500 pl-6 font-serif text-xl text-navy-900">
                {item.title}
              </h3>
              <p className="mt-4 pl-6 font-sans text-base leading-relaxed text-slate-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
