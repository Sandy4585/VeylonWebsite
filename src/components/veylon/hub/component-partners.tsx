import { Container } from "@/components/veylon/container";
import { Section } from "@/components/veylon/section";
import { VeylonImage } from "@/components/veylon/veylon-image";
import type { TrustSignalDoc } from "@/lib/sanity/types";

export type ComponentPartnersProps = {
  partners: TrustSignalDoc[] | undefined;
};

export function ComponentPartners({ partners }: ComponentPartnersProps) {
  const withLogos = (partners ?? []).filter(
    (p) => p.logo?.image && p.type === "partnership",
  );
  if (withLogos.length < 3) return null;

  return (
    <Section tone="default" spacing="md" className="bg-slate-50">
      <Container>
        <h2 className="font-sans text-xs font-medium tracking-widest text-amber-600 uppercase">
          Components we trust
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-slate-600">
          We specify only Tier-1 components with authorized-partner backing
        </p>
        <ul className="mt-10 grid grid-cols-3 items-center gap-8 md:grid-cols-6">
          {withLogos.map((partner) =>
            partner.logo ? (
              <li key={partner._id} className="flex justify-center">
                <VeylonImage
                  image={partner.logo}
                  className="max-h-12 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0 [&_figure]:m-0 [&_figure>div]:flex [&_figure>div]:h-12 [&_figure>div]:items-center [&_figure>div]:justify-center [&_figcaption]:hidden [&_img]:max-h-12 [&_img]:w-auto [&_img]:object-contain"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </li>
            ) : null,
          )}
        </ul>
      </Container>
    </Section>
  );
}
