import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import { Footer } from "@/components/veylon/footer";
import { Header } from "@/components/veylon/header";
import { mergeSiteConfig } from "@/lib/sanity/fallbacks";
import { getSiteConfig } from "@/lib/sanity/fetch-helpers";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://veylon.energy";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: "variable",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Veylon Energy — Premium Solar for India",
    template: "%s | Veylon Energy",
  },
  description: "",
  icons: {
    icon: [
      {
        url: "/brand/logo/svg/veylon-icon-color.svg",
        type: "image/svg+xml",
      },
      {
        url: "/brand/logo/svg/veylon-icon-white.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/brand/logo/svg/veylon-icon-color.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteConfigRaw = await getSiteConfig();
  const siteConfig = mergeSiteConfig(siteConfigRaw);

  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable}`}>
        <Analytics />
        <div className="flex min-h-screen flex-col">
          <Header siteConfig={siteConfig} />
          <main className="flex-1 pt-20 md:pt-[5.67rem] lg:pt-24">{children}</main>
          <Footer siteConfig={siteConfig} />
        </div>
      </body>
    </html>
  );
}
