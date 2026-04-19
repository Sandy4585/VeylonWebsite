import {
  BoltIcon,
  BookIcon,
  CaseIcon,
  CheckmarkCircleIcon,
  CogIcon,
  CommentIcon,
  EarthGlobeIcon,
  EnvelopeIcon,
  HelpCircleIcon,
  HomeIcon,
  PinIcon,
  ProjectsIcon,
  UserIcon,
  UsersIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

import { singletonListItem } from "../lib/singleton";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Website")
    .items([
      singletonListItem(S, { type: "siteConfig", title: "Site Settings", icon: CogIcon }),
      S.divider(),
      S.listItem()
        .title("Pages")
        .id("group-pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              singletonListItem(S, { type: "homePage", title: "Home", icon: HomeIcon }),
              singletonListItem(S, { type: "aboutPage", title: "About", icon: UsersIcon }),
              singletonListItem(S, { type: "residentialHub", title: "Residential Hub", icon: HomeIcon }),
              singletonListItem(S, { type: "commercialHub", title: "Commercial Hub", icon: CaseIcon }),
              singletonListItem(S, { type: "utilityScalePage", title: "Utility-Scale", icon: BoltIcon }),
              singletonListItem(S, { type: "contactPage", title: "Contact", icon: EnvelopeIcon }),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Content")
        .id("group-content")
        .child(
          S.list()
            .title("Content")
            .items([
              S.listItem()
                .title("Projects")
                .id("list-projects")
                .icon(ProjectsIcon)
                .child(
                  S.documentTypeList("project")
                    .title("Projects")
                    .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
                ),
              S.listItem()
                .title("Resources")
                .id("group-resources")
                .icon(BookIcon)
                .child(
                  S.list()
                    .title("Resources")
                    .items([
                      S.listItem()
                        .title("Guides")
                        .id("resources-guides")
                        .child(
                          S.documentList()
                            .title("Guides")
                            .filter('_type == "resource" && type == "guide"')
                            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
                        ),
                      S.listItem()
                        .title("Reports")
                        .id("resources-reports")
                        .child(
                          S.documentList()
                            .title("Reports")
                            .filter('_type == "resource" && type == "report"')
                            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
                        ),
                      S.listItem()
                        .title("Articles")
                        .id("resources-articles")
                        .child(
                          S.documentList()
                            .title("Articles")
                            .filter('_type == "resource" && type == "article"')
                            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
                        ),
                      S.listItem()
                        .title("Policy updates")
                        .id("resources-policy")
                        .child(
                          S.documentList()
                            .title("Policy updates")
                            .filter('_type == "resource" && type == "policy-update"')
                            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
                        ),
                    ]),
                ),
              S.listItem()
                .title("Team")
                .id("list-team")
                .icon(UserIcon)
                .child(
                  S.documentTypeList("teamMember")
                    .title("Team")
                    .defaultOrdering([{ field: "displayOrder", direction: "asc" }]),
                ),
              S.listItem()
                .title("Testimonials")
                .id("list-testimonials")
                .icon(CommentIcon)
                .child(
                  S.documentTypeList("testimonial")
                    .title("Testimonials")
                    .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
                ),
              S.listItem()
                .title("FAQs")
                .id("group-faqs")
                .icon(HelpCircleIcon)
                .child(
                  S.list()
                    .title("FAQs")
                    .items([
                      S.listItem()
                        .title("Residential")
                        .id("faq-residential")
                        .child(
                          S.documentList()
                            .title("Residential")
                            .filter('_type == "faq" && category == "residential"')
                            .defaultOrdering([{ field: "displayOrder", direction: "asc" }]),
                        ),
                      S.listItem()
                        .title("Commercial")
                        .id("faq-commercial")
                        .child(
                          S.documentList()
                            .title("Commercial")
                            .filter('_type == "faq" && category == "commercial"')
                            .defaultOrdering([{ field: "displayOrder", direction: "asc" }]),
                        ),
                      S.listItem()
                        .title("Utility")
                        .id("faq-utility")
                        .child(
                          S.documentList()
                            .title("Utility")
                            .filter('_type == "faq" && category == "utility"')
                            .defaultOrdering([{ field: "displayOrder", direction: "asc" }]),
                        ),
                      S.listItem()
                        .title("General")
                        .id("faq-general")
                        .child(
                          S.documentList()
                            .title("General")
                            .filter('_type == "faq" && category == "general"')
                            .defaultOrdering([{ field: "displayOrder", direction: "asc" }]),
                        ),
                    ]),
                ),
              S.listItem()
                .title("Trust signals")
                .id("group-trust-signals")
                .icon(CheckmarkCircleIcon)
                .child(
                  S.list()
                    .title("Trust signals")
                    .items([
                      S.listItem()
                        .title("Certifications")
                        .id("trust-cert")
                        .child(
                          S.documentList()
                            .title("Certifications")
                            .filter('_type == "trustSignal" && type == "certification"')
                            .defaultOrdering([{ field: "displayOrder", direction: "asc" }]),
                        ),
                      S.listItem()
                        .title("Partnerships")
                        .id("trust-partnership")
                        .child(
                          S.documentList()
                            .title("Partnerships")
                            .filter('_type == "trustSignal" && type == "partnership"')
                            .defaultOrdering([{ field: "displayOrder", direction: "asc" }]),
                        ),
                      S.listItem()
                        .title("Milestones")
                        .id("trust-milestone")
                        .child(
                          S.documentList()
                            .title("Milestones")
                            .filter('_type == "trustSignal" && type == "milestone"')
                            .defaultOrdering([{ field: "displayOrder", direction: "asc" }]),
                        ),
                      S.listItem()
                        .title("Awards")
                        .id("trust-award")
                        .child(
                          S.documentList()
                            .title("Awards")
                            .filter('_type == "trustSignal" && type == "award"')
                            .defaultOrdering([{ field: "displayOrder", direction: "asc" }]),
                        ),
                    ]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Locations")
        .id("group-locations")
        .child(
          S.list()
            .title("Locations")
            .items([
              S.listItem()
                .title("City pages")
                .id("list-city-pages")
                .icon(PinIcon)
                .child(
                  S.documentTypeList("cityPage")
                    .title("City pages")
                    .defaultOrdering([
                      { field: "state", direction: "asc" },
                      { field: "cityName", direction: "asc" },
                    ]),
                ),
              S.listItem()
                .title("DISCOMs")
                .id("list-discoms")
                .icon(EarthGlobeIcon)
                .child(
                  S.documentTypeList("discom")
                    .title("DISCOMs")
                    .defaultOrdering([
                      { field: "state", direction: "asc" },
                      { field: "name", direction: "asc" },
                    ]),
                ),
            ]),
        ),
    ]);
