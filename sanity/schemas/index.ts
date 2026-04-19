import { cityPage } from "./documents/cityPage";
import { discom } from "./documents/discom";
import { faq } from "./documents/faq";
import { project } from "./documents/project";
import { resource } from "./documents/resource";
import { teamMember } from "./documents/teamMember";
import { testimonial } from "./documents/testimonial";
import { trustSignal } from "./documents/trustSignal";
import { cta } from "./objects/cta";
import { legalEntity } from "./objects/legalEntity";
import {
  pageBlockContent,
  pteCallout,
  pteTable,
  pteYoutube,
  resourceBlockContent,
  simpleBlockContent,
} from "./objects/portableText";
import { richImage } from "./objects/richImage";
import { seo } from "./objects/seo";
import { statBlock } from "./objects/statBlock";
import { aboutPage } from "./singletons/aboutPage";
import { commercialHub } from "./singletons/commercialHub";
import { contactPage } from "./singletons/contactPage";
import { homePage } from "./singletons/homePage";
import { residentialHub } from "./singletons/residentialHub";
import { siteConfig } from "./singletons/siteConfig";
import { utilityScalePage } from "./singletons/utilityScalePage";

export const schemaTypes = [
  cta,
  richImage,
  statBlock,
  simpleBlockContent,
  pteYoutube,
  pteCallout,
  pteTable,
  pageBlockContent,
  resourceBlockContent,
  seo,
  legalEntity,
  teamMember,
  trustSignal,
  project,
  testimonial,
  resource,
  faq,
  discom,
  cityPage,
  siteConfig,
  homePage,
  aboutPage,
  residentialHub,
  commercialHub,
  utilityScalePage,
  contactPage,
];
