import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import type { TestimonialDoc } from "@/lib/sanity/types";

export type TestimonialsStripProps = {
  testimonials: TestimonialDoc[] | undefined;
};

export function TestimonialsStrip({ testimonials }: TestimonialsStripProps) {
  const list = (testimonials ?? []).filter((t) => Boolean(t.quote?.trim()));
  if (!list.length) return null;

  const multiple = list.length > 1;

  return (
    <Section tone="navy" spacing="lg">
      <Container>
        <h2 className="sr-only">Testimonials</h2>
        {multiple ? (
          <ul className="flex snap-x snap-mandatory gap-8 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
            {list.map((item) => (
              <li
                key={item._id}
                className="min-w-[min(100%,22rem)] shrink-0 snap-center md:min-w-0 md:snap-none"
              >
                <figure className="flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-8">
                  <blockquote className="font-serif text-2xl leading-relaxed font-normal italic text-slate-50 md:text-3xl">
                    <span className="block text-4xl leading-none text-amber-400/90" aria-hidden>
                      &ldquo;
                    </span>
                    <span className="sr-only">Quote: </span>
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-8 text-sm text-slate-400">
                    <span className="font-medium text-slate-200">{item.author.name}</span>
                    {item.author.role ? (
                      <span className="block text-slate-400">{item.author.role}</span>
                    ) : null}
                    {item.author.location ? (
                      <span className="mt-1 block text-slate-500">{item.author.location}</span>
                    ) : null}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="font-serif text-2xl leading-relaxed font-normal italic text-slate-50 md:text-3xl">
              <span className="mb-2 block text-5xl leading-none text-amber-400/90" aria-hidden>
                &ldquo;
              </span>
              <span className="sr-only">Quote: </span>
              {list[0]?.quote}
            </blockquote>
            <figcaption className="mt-10 text-sm text-slate-400">
              <span className="font-medium text-slate-200">{list[0]?.author.name}</span>
              {list[0]?.author.role ? (
                <span className="block text-slate-400">{list[0].author.role}</span>
              ) : null}
              {list[0]?.author.location ? (
                <span className="mt-1 block text-slate-500">{list[0].author.location}</span>
              ) : null}
            </figcaption>
          </figure>
        )}
      </Container>
    </Section>
  );
}
