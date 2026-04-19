import Link from "next/link";

import type { Cta } from "@/lib/sanity/types";

import { Button, type VeylonButtonProps } from "./button";

export type CtaButtonProps = {
  cta: Cta;
  className?: string;
  size?: VeylonButtonProps["size"];
};

export function CtaButton({ cta, className, size }: CtaButtonProps) {
  const external = Boolean(cta.external);
  const variant = cta.variant ?? "primary";

  if (external) {
    return (
      <Button variant={variant} size={size} className={className} asChild>
        <a href={cta.href} target="_blank" rel="noopener noreferrer">
          {cta.label}
        </a>
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <Link href={cta.href}>{cta.label}</Link>
    </Button>
  );
}
