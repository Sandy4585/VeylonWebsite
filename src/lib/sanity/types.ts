import type { PortableTextBlock } from "@portabletext/types";

/** Shared Sanity document fields */
export type SanityDocumentBase = {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
};

export type SanitySlug = {
  _type: "slug";
  current: string;
};

export type SanityGeo = {
  _type: "geopoint";
  lat: number;
  lng: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  url?: string;
  metadata?: {
    dimensions?: { width: number; height: number; aspectRatio: number };
    lqip?: string;
  };
};

export type SanityImageValue = {
  _type: "image";
  asset: { _ref: string; _type: "reference" } | SanityImageAsset;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
};

export type RichImage = {
  _type: "richImage";
  image: SanityImageValue;
  alt: string;
  caption?: string;
  credit?: string;
};

export type Cta = {
  _type?: "cta";
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
  external?: boolean;
};

export type Seo = {
  _type?: "seo";
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: RichImage;
  canonicalUrl?: string;
  noIndex?: boolean;
};

export type SimpleBlockContent = PortableTextBlock[] | null;

export type NavChild = {
  _type?: "navChild";
  label: string;
  href: string;
};

export type NavItem = {
  _type?: "navItem";
  label: string;
  href: string;
  children?: NavChild[];
};

export type FooterNavItem = {
  _type?: "footerNavItem";
  label: string;
  href: string;
};

export type SocialPlatform = "linkedin" | "instagram" | "youtube" | "x";

export type SocialLink = {
  _type?: "socialLink";
  platform: SocialPlatform;
  url: string;
};

export type LegalEntity = {
  _type?: "legalEntity";
  proprietorName: string;
  entityType: "proprietorship" | "partnership" | "llp" | "pvt-ltd";
  gstin: string;
  registeredAddress: SimpleBlockContent;
  cin?: string;
  contactPhone: string;
  contactEmail: string;
};

export type AnnouncementBar = {
  enabled?: boolean;
  message?: string;
  cta?: Cta;
  dismissible?: boolean;
};

export type SiteConfig = SanityDocumentBase & {
  _type: "siteConfig";
  brandName: string;
  tagline?: string;
  defaultSeo?: Seo;
  contactEmail: string;
  whatsappNumber?: string;
  socialLinks?: SocialLink[];
  primaryNav?: NavItem[];
  footerNav?: FooterNavItem[];
  announcementBar?: AnnouncementBar;
  legalEntity: LegalEntity;
};

export type MarketingHero = {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  backgroundImage?: RichImage;
};

export type SegmentCard = {
  _type?: "segmentCard";
  segment: "residential" | "commercial" | "utility";
  eyebrow?: string;
  headline: string;
  summary: string;
  image: RichImage;
  cta: Cta;
};

export type CalculatorTeaser = {
  headline: string;
  description?: string;
  cta: Cta;
};

export type ClosingCtaBlock = {
  headline: string;
  subheadline?: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export type TrustSignalDoc = SanityDocumentBase & {
  _type: "trustSignal";
  label: string;
  type: "certification" | "partnership" | "milestone" | "award";
  description?: string;
  logo?: RichImage;
  validFrom?: string;
  validUntil?: string;
  verificationUrl?: string;
  displayOrder: number;
  surfaces: string[];
};

export type ProjectLocation = {
  city: string;
  state: string;
};

export type ProjectDoc = SanityDocumentBase & {
  _type: "project";
  title: string;
  slug: SanitySlug;
  segment: "residential" | "commercial" | "utility";
  location?: ProjectLocation;
  heroImage?: RichImage;
  seo?: Seo;
};

export type TestimonialAuthor = {
  name: string;
  role: string;
  company?: string;
  location?: string;
};

export type TestimonialDoc = SanityDocumentBase & {
  _type: "testimonial";
  quote: string;
  author: TestimonialAuthor;
  photo?: RichImage;
  rating: number;
  publishedAt: string;
};

export type ResourceDoc = SanityDocumentBase & {
  _type: "resource";
  title: string;
  slug: SanitySlug;
  type: "guide" | "report" | "article" | "policy-update";
  excerpt?: string;
  heroImage?: RichImage;
  seo?: Seo;
};

export type HomePage = SanityDocumentBase & {
  _type: "homePage";
  seo?: Seo;
  hero: MarketingHero;
  segmentCards: SegmentCard[];
  trustSignals?: TrustSignalDoc[];
  featuredProjects?: ProjectDoc[];
  calculatorTeaser?: CalculatorTeaser;
  testimonials?: TestimonialDoc[];
  featuredResources?: ResourceDoc[];
  closingCta?: ClosingCtaBlock;
};

export type PteCalloutBlock = {
  _type: "pteCallout";
  tone: "info" | "warning" | "success";
  body: SimpleBlockContent;
};

export type PteYoutubeBlock = {
  _type: "pteYoutube";
  url: string;
};

export type PteTableRow = {
  _type?: "pteTableRow";
  cells: string[];
};

export type PteTableBlock = {
  _type: "pteTable";
  rows: PteTableRow[];
};

export type StatBlock = {
  _type: "statBlock";
  value: string;
  label: string;
  context?: string;
};

/** Portable text value for page blocks (see pageBlockContent schema). */
export type PageBlockContent = Array<
  PortableTextBlock | RichImage | StatBlock | PteCalloutBlock | PteYoutubeBlock
>;

/** Portable text value for resource body (includes tables). */
export type ResourceBlockContent = Array<
  | PortableTextBlock
  | RichImage
  | StatBlock
  | PteCalloutBlock
  | PteYoutubeBlock
  | PteTableBlock
>;
