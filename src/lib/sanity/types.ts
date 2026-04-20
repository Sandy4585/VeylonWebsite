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

/** Secondary CTA in marketing hero / closing blocks — all fields optional in CMS; render only when label + href are set */
export type OptionalCta = {
  _type?: "optionalCta";
  label?: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  external?: boolean;
};

/** After label + href checks — must be a subtype of `Cta | OptionalCta` for type-guard soundness */
export type CtaRenderable = Cta | (OptionalCta & { label: string; href: string });

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
  secondaryCta?: OptionalCta;
  backgroundImage?: RichImage;
};

/** Orienting hero (about, contact): eyebrow, headline, optional subhead & background — no CTAs */
export type AboutHero = {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  backgroundImage?: RichImage;
};

export type ContactHero = AboutHero;

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
  secondaryCta?: OptionalCta;
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

export type ProjectSystemDetails = {
  capacityKw?: number;
  configuration?: string;
  components?: ProjectComponent[];
  commissionedDate?: string;
};

export type ProjectComponentRole =
  | "module"
  | "inverter"
  | "battery"
  | "monitoring"
  | "mounting";

export type ProjectComponent = {
  _key?: string;
  role: ProjectComponentRole;
  brand: string;
  model: string;
};

export type ProjectResults = {
  annualGenerationKwh?: number;
  co2OffsetTonnes?: number;
  paybackYears?: number;
  customerSavingsInr?: number;
};

export type ProjectSegment = "residential" | "commercial" | "utility";

export type ProjectDoc = SanityDocumentBase & {
  _type: "project";
  title: string;
  slug: SanitySlug;
  segment: ProjectSegment;
  location?: ProjectLocation;
  systemDetails?: ProjectSystemDetails;
  results?: ProjectResults;
  heroImage?: RichImage;
  gallery?: RichImage[];
  narrative?: PageBlockContent;
  testimonial?: TestimonialDoc;
  publishedAt?: string;
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
  type: ResourceType;
  excerpt?: string;
  heroImage?: RichImage;
  body?: ResourceBlockContent;
  author?: ResourceAuthor;
  publishedAt?: string;
  updatedAt?: string;
  relatedResources?: ResourceDoc[];
  downloadableAsset?: ResourceDownloadableAsset;
  seo?: Seo;
};

export type ResourceType = "guide" | "report" | "article" | "policy-update";

export type ResourceDownloadableAsset = {
  file?: {
    _type?: "file";
    asset?: {
      _ref?: string;
      _type?: "reference";
      url?: string;
    };
  };
  pageCount?: number;
};

export type ResourceAuthor = {
  _id: string;
  _type: "teamMember";
  name: string;
  role: string;
  photo?: RichImage;
  bio?: PageBlockContent;
  bioPlainText?: string;
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

export type MissionPrinciple = {
  _type?: "missionPrinciple";
  title: string;
  description: string;
};

export type MilestoneItem = {
  _type?: "milestone";
  year: number;
  headline: string;
  description: string;
};

export type TeamMemberDoc = SanityDocumentBase & {
  _type: "teamMember";
  name: string;
  slug: SanitySlug;
  role: string;
  bio?: PageBlockContent;
  photo: RichImage;
  credentials?: string[];
  linkedInUrl?: string;
  displayOrder?: number;
};

export type AboutPage = SanityDocumentBase & {
  _type: "aboutPage";
  seo?: Seo;
  hero: AboutHero;
  founderStory: PageBlockContent;
  companyStatement: PageBlockContent;
  missionPrinciples?: MissionPrinciple[];
  team?: TeamMemberDoc[];
  milestones?: MilestoneItem[];
  closingCta?: ClosingCtaBlock;
};

export type ContactChannelType = "whatsapp" | "email" | "phone" | "office";

export type ContactChannel = {
  _type?: "contactChannel";
  type: ContactChannelType;
  label: string;
  value: string;
  hours?: string;
};

export type ContactFormConfig = {
  departmentOptions: string[];
  requireCompanyField: boolean;
};

export type ContactPage = SanityDocumentBase & {
  _type: "contactPage";
  seo?: Seo;
  hero: ContactHero;
  channels?: ContactChannel[];
  officeAddress?: SimpleBlockContent;
  mapEmbedUrl?: string;
  formConfig: ContactFormConfig;
};

export type HubSegment = "residential" | "commercial";

export type ValuePropItem = {
  _type?: string;
  title: string;
  description: string;
};

export type HowItWorksStep = {
  _type?: string;
  step: number;
  title: string;
  description: string;
};

export type HubCalculatorEmbed = {
  enabled?: boolean;
  headline: string;
  description?: string;
};

export type FaqCategory = "residential" | "commercial" | "utility" | "general";

export type FaqDoc = SanityDocumentBase & {
  _type: "faq";
  question: string;
  answer: PageBlockContent;
  category: FaqCategory;
  displayOrder: number;
  featured?: boolean;
};

export type ResidentialHub = SanityDocumentBase & {
  _type: "residentialHub";
  seo?: Seo;
  hero: MarketingHero;
  valueProps?: ValuePropItem[];
  howItWorks?: HowItWorksStep[];
  calculatorEmbed?: HubCalculatorEmbed;
  componentPartners?: TrustSignalDoc[];
  featuredProjects?: ProjectDoc[];
  faqs?: FaqDoc[];
  closingCta?: ClosingCtaBlock;
};

export type CommercialHub = SanityDocumentBase & {
  _type: "commercialHub";
  seo?: Seo;
  hero: MarketingHero;
  valueProps?: ValuePropItem[];
  howItWorks?: HowItWorksStep[];
  calculatorEmbed?: HubCalculatorEmbed;
  componentPartners?: TrustSignalDoc[];
  featuredProjects?: ProjectDoc[];
  faqs?: FaqDoc[];
  closingCta?: ClosingCtaBlock;
};

export type UtilityCapability = {
  _type?: string;
  title: string;
  description: string;
};

export type UtilityContactFormBlock = {
  headline: string;
  description?: string;
  recipientRole: string;
};

export type UtilityScalePage = SanityDocumentBase & {
  _type: "utilityScalePage";
  seo?: Seo;
  hero: MarketingHero;
  capabilities?: UtilityCapability[];
  credentials?: TrustSignalDoc[];
  contactForm?: UtilityContactFormBlock;
  closingCta?: ClosingCtaBlock;
};
