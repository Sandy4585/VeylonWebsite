import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import { VeylonImage } from "@/components/veylon/veylon-image";
import type { Cta, SegmentCard } from "@/lib/sanity/types";

function isRenderableCta(cta: Cta | undefined): cta is Cta {
  return Boolean(cta?.label?.trim() && cta?.href);
}

export type SegmentCardsProps = {
  cards: SegmentCard[];
  /** First card image may be LCP when the hero has no background image. */
  firstImagePriority?: boolean;
};

export function SegmentCards({ cards, firstImagePriority = false }: SegmentCardsProps) {
  if (!cards.length) return null;

  return (
    <Section tone="default" spacing="lg" className="bg-slate-50">
      <Container>
        <h2 className="sr-only">Segments</h2>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {cards.map((card, index) => (
            <li key={`${card.segment}-${card.headline}`}>
              <article className="group rounded-xl border border-slate-200 bg-white p-8 transition-colors hover:border-navy-200">
                {card.image ? (
                  <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded-lg">
                    <VeylonImage
                      image={card.image}
                      priority={firstImagePriority && index === 0}
                      className="[&_figure]:m-0 [&_figure>div]:h-full [&_figure>div]:overflow-hidden [&_figcaption]:hidden [&_img]:h-full [&_img]:object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                {card.eyebrow ? (
                  <p className="font-sans text-xs font-medium tracking-widest text-amber-600 uppercase">
                    {card.eyebrow}
                  </p>
                ) : null}
                <h3 className="mt-3 font-serif text-2xl text-navy-900">{card.headline}</h3>
                <p className="mt-4 text-base leading-relaxed text-slate-700">{card.summary}</p>
                {isRenderableCta(card.cta) ? (
                  <div className="mt-6">
                    <Link
                      href={card.cta.href}
                      className="group/link inline-flex items-center gap-2 font-medium text-amber-600 transition-transform hover:text-amber-700 focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-2 focus-visible:outline-none"
                      {...(card.cta.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span>{card.cta.label}</span>
                      <ArrowRight
                        className="size-4 transition-transform group-hover/link:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  </div>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
