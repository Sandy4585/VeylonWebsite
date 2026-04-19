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
  /** ~140px wide at 420×120 aspect; max-w caps width on desktop. */
  horizontal: "h-10 w-auto max-w-[200px] object-contain object-left",
  stacked: "h-20 w-auto object-contain object-left",
  icon: "h-10 w-10 object-contain",
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
