import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import { VeylonImage } from "@/components/veylon/veylon-image";
import type { TrustSignalDoc } from "@/lib/sanity/types";

export type TrustSignalsBarProps = {
  signals: TrustSignalDoc[] | undefined;
};

export function TrustSignalsBar({ signals }: TrustSignalsBarProps) {
  const withLogos = (signals ?? []).filter((s) => Boolean(s.logo));
  if (withLogos.length < 3) return null;

  return (
    <Section tone="slate" spacing="md" className="py-12">
      <Container>
        <h2 className="mb-10 text-center font-sans text-xs font-medium tracking-widest text-slate-500 uppercase">
          Trusted by
        </h2>
        <ul className="grid grid-cols-3 items-center gap-8 md:grid-cols-6">
          {withLogos.map((signal) => (
            <li key={signal._id} className="flex justify-center">
              {signal.logo ? (
                <VeylonImage
                  image={signal.logo}
                  className="max-w-[10rem] [&_figure]:m-0 [&_figure>div]:flex [&_figure>div]:h-12 [&_figure>div]:items-center [&_figcaption]:hidden [&_img]:max-h-12 [&_img]:w-auto [&_img]:object-contain [&_img]:opacity-60 [&_img]:transition-opacity [&_img]:duration-200 [&_img]:grayscale hover:[&_img]:opacity-100 hover:[&_img]:grayscale-0"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
