import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://veylon.energy";

export function createMetadata(opts: {
  title: string;
  description?: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const canonical = new URL(opts.path, siteUrl).toString();
  const og = opts.ogImage
    ? new URL(opts.ogImage, siteUrl).toString()
    : undefined;

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      type: "website",
      ...(og ? { images: [{ url: og }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      ...(og ? { images: [og] } : {}),
    },
  };
}
