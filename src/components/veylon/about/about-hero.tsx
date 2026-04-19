import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import { VeylonImage } from "@/components/veylon/veylon-image";
import type { AboutHero } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export type AboutHeroProps = {
  data: AboutHero;
};

export function AboutHero({ data }: AboutHeroProps) {
  const hasBackground = Boolean(data.backgroundImage);

  return (
    <Section
      tone="navy"
      spacing={hasBackground ? "none" : "lg"}
      className={cn(
        "relative flex min-h-[60vh] flex-col justify-center md:min-h-[70vh]",
        hasBackground && "overflow-hidden",
      )}
    >
      {hasBackground && data.backgroundImage ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0 min-h-[60vh] md:min-h-[70vh]"
            aria-hidden
          >
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

      <Container className={cn(hasBackground && "relative z-10 py-16 md:py-24")}>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
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
              "text-balance font-serif text-4xl font-medium leading-[1.1] text-white md:text-6xl",
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
