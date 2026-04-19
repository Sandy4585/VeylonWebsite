import Link from "next/link";

import { cn } from "@/lib/utils";

export type LogoProps = {
  variant?: "horizontal" | "stacked" | "icon";
  theme?: "color" | "mono" | "white";
  priority?: boolean;
  className?: string;
  href?: string | null;
};

/** Intrinsic SVG dimensions are ignored for layout; sizing is CSS-only. */
const variantImgClass: Record<
  NonNullable<LogoProps["variant"]>,
  string
> = {
  /** Wordmark height and max-width caps (~⅔ of previous “double” scale). */
  horizontal:
    "h-16 w-auto max-w-[min(100%,480px)] object-contain object-left md:h-[75px] md:max-w-[532px] lg:h-20 lg:max-w-[588px]",
  stacked: "h-[107px] w-auto object-contain object-left",
  icon: "h-16 w-16 object-contain md:h-[75px] md:w-[75px]",
};

export function Logo({
  variant = "horizontal",
  theme = "color",
  priority = false,
  className,
  href = "/",
}: LogoProps) {
  const src = `/brand/logo/svg/veylon-${variant}-${theme}.svg`;

  const img = (
    // eslint-disable-next-line @next/next/no-img-element -- local SVG wordmark; CSS controls size
    <img
      src={src}
      alt="Veylon Energy"
      className={cn(variantImgClass[variant], className)}
      loading={priority ? "eager" : "lazy"}
    />
  );

  if (href === null) {
    return img;
  }

  return (
    <Link href={href} className="inline-flex shrink-0 items-center">
      {img}
    </Link>
  );
}
