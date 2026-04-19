import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import type { HowItWorksStep } from "@/lib/sanity/types";

export type HowItWorksProps = {
  steps: HowItWorksStep[] | undefined;
};

export function HowItWorks({ steps }: HowItWorksProps) {
  const raw = steps ?? [];
  const list = [...raw]
    .filter((s) => s.title?.trim() && s.description?.trim())
    .sort((a, b) => a.step - b.step);
  if (!list.length) return null;

  return (
    <Section tone="slate" spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-xs font-medium tracking-widest text-amber-600 uppercase">
            Process
          </p>
          <h2 className="mt-3 font-serif text-3xl text-navy-900 md:text-4xl">
            How we work with you
          </h2>
          <ol className="relative mt-12 space-y-12">
            {list.map((item, index) => {
              const isLast = index === list.length - 1;
              return (
                <li key={`${item.step}-${item.title}`} className="relative pl-14 md:pl-16">
                  {!isLast ? (
                    <div
                      className="absolute top-[2.5rem] bottom-[-3rem] left-[0.55rem] w-px bg-slate-200 md:left-[0.65rem]"
                      aria-hidden
                    />
                  ) : null}
                  <div className="absolute top-0 left-0 w-10 text-center font-serif text-3xl font-medium text-amber-500 md:w-12 md:text-4xl">
                    {item.step}
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-navy-900">{item.title}</h3>
                  <p className="mt-3 max-w-2xl font-sans leading-relaxed text-slate-700">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
