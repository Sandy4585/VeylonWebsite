import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import { VeylonImage } from "@/components/veylon/veylon-image";
import type { ContactHero } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export type ContactHeroProps = {
  data: ContactHero;
};

export function ContactHero({ data }: ContactHeroProps) {
  const hasBackground = Boolean(data.backgroundImage);

  return (
    <Section
      tone="navy"
      spacing={hasBackground ? "none" : "md"}
      className={cn(
        "relative flex min-h-[40vh] flex-col justify-center",
        hasBackground && "overflow-hidden",
      )}
    >
      {hasBackground && data.backgroundImage ? (
        <>
          <div className="pointer-events-none absolute inset-0 z-0 min-h-[40vh]" aria-hidden>
            <VeylonImage
              image={data.backgroundImage}
              sizes="100vw"
              className="absolute inset-0 m-0 h-full min-h-full w-full [&>div]:h-full [&>div]:min-h-full [&_img]:h-full [&_img]:min-h-full [&_img]:object-cover [&_figcaption]:hidden"
            />
          </div>
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-b from-navy-900/80 to-transparent"
            aria-hidden
          />
        </>
      ) : null}

      <Container className={cn(hasBackground && "relative z-10 py-12 md:py-20")}>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {data.eyebrow ? (
            <p
              data-component="eyebrow"
              className="max-w-3xl font-sans text-sm font-semibold tracking-[0.2em] text-amber-400 uppercase md:text-base"
            >
              {data.eyebrow}
            </p>
          ) : null}
          <h1
            data-component="headline"
            className={cn(
              "text-balance font-serif text-4xl font-medium leading-[1.1] text-white md:text-5xl lg:text-6xl",
              data.eyebrow && "mt-4 md:mt-5",
            )}
          >
            {data.headline}
          </h1>
          {data.subheadline ? (
            <p
              data-component="subheadline"
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300 md:text-xl"
            >
              {data.subheadline}
            </p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
