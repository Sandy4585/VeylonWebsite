import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import { Eyebrow, Headline } from "@/components/veylon/typography";
import type { MilestoneItem } from "@/lib/sanity/types";

export type MilestonesProps = {
  milestones: MilestoneItem[];
};

export function Milestones({ milestones }: MilestonesProps) {
  if (!milestones.length) return null;

  const items = milestones.slice(0, 6);

  return (
    <Section tone="default" spacing="lg">
      <Container>
        <Eyebrow>Trajectory</Eyebrow>
        <Headline level={2} className="mt-3 max-w-3xl text-navy-900">
          Where we&apos;ve been, where we&apos;re going
        </Headline>

        <div className="mt-14 hidden md:block">
          <div className="relative px-2">
            <div
              className="absolute top-[7px] right-0 left-0 h-px bg-slate-200"
              aria-hidden
            />
            <div className="relative flex justify-between gap-6">
              {items.map((m, i) => (
                <div
                  key={`${m.year}-${m.headline}-${i}`}
                  className="flex min-w-0 flex-1 flex-col items-center text-center"
                >
                  <div
                    className="relative z-10 size-2 shrink-0 rounded-full bg-amber-500"
                    aria-hidden
                  />
                  <p className="mt-6 font-serif text-2xl font-medium text-navy-900">{m.year}</p>
                  <h3 className="mt-2 font-serif text-lg font-medium leading-snug text-navy-900">
                    {m.headline}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-slate-700">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ul className="mt-10 space-y-10 border-l-4 border-amber-500 pl-6 md:hidden">
          {items.map((m, i) => (
            <li key={`${m.year}-${m.headline}-m-${i}`}>
              <p className="font-serif text-2xl font-medium text-navy-900">{m.year}</p>
              <h3 className="mt-2 font-serif text-lg font-medium text-navy-900">{m.headline}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-slate-700">{m.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
