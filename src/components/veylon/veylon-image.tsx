import Image from "next/image";

import { urlFor } from "@/lib/sanity/image";
import type { RichImage } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

export type VeylonImageProps = {
  image: RichImage;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function VeylonImage({
  image,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px",
}: VeylonImageProps) {
  const builder = urlFor(image.image)
    .width(1600)
    .height(900)
    .fit("crop")
    .auto("format");

  const src = builder.url();
  const meta = image.image.asset;
  const dims =
    meta && "_type" in meta && meta._type === "sanity.imageAsset"
      ? meta.metadata?.dimensions
      : undefined;

  const width = dims?.width ?? 1200;
  const height = dims?.height ?? 675;

  return (
    <figure className={cn("w-full", className)}>
      <div className="relative w-full overflow-hidden rounded-md">
        <Image
          src={src}
          alt={image.alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full object-cover"
        />
      </div>
      {(image.caption ?? image.credit) ? (
        <figcaption className="mt-2 space-y-1 text-sm text-slate-500">
          {image.caption ? (
            <span className="block text-slate-700">{image.caption}</span>
          ) : null}
          {image.credit ? (
            <span className="block text-slate-500">{image.credit}</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
