import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import type { UtilityCapability } from "@/lib/sanity/types";

export type CapabilitiesProps = {
  capabilities: UtilityCapability[] | undefined;
};

export function Capabilities({ capabilities }: CapabilitiesProps) {
  const list = (capabilities ?? []).filter((c) => c.title?.trim() && c.description?.trim());
  if (!list.length) return null;

  return (
    <Section tone="default" spacing="lg">
      <Container>
        <p className="font-sans text-xs font-medium tracking-widest text-amber-600 uppercase">
          What we do
        </p>
        <h2 className="mt-3 font-serif text-3xl text-navy-900 md:text-4xl">
          End-to-end utility-scale capabilities
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
          {list.map((item, index) => (
            <div key={`${item.title}-${index}`}>
              <h3 className="font-serif text-2xl text-navy-900">{item.title}</h3>
              <p className="mt-4 max-w-xl font-sans leading-relaxed text-slate-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
