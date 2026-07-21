/** Map Sanity document types to Next.js cache tags / paths used by the site. */

export type RevalidatePayload = {
  _type?: string;
  slug?: string | { current?: string };
};

function slugFrom(payload: RevalidatePayload): string | undefined {
  if (!payload.slug) return undefined;
  return typeof payload.slug === "string" ? payload.slug : payload.slug.current;
}

export function tagsForSanityDocument(payload: RevalidatePayload): string[] {
  const type = payload._type;
  if (!type) return [];

  const slug = slugFrom(payload);
  const tags = new Set<string>();

  switch (type) {
    case "project":
      tags.add("projects");
      if (slug) tags.add(`project:${slug}`);
      // Featured refs on hubs/home may include this project
      tags.add("homePage");
      tags.add("residential-hub");
      tags.add("commercial-hub");
      break;
    case "testimonial":
      tags.add("homePage");
      tags.add("projects");
      break;
    case "resource":
      tags.add("resources");
      if (slug) tags.add(`resource:${slug}`);
      tags.add("homePage");
      break;
    case "homePage":
      tags.add("homePage");
      break;
    case "aboutPage":
      tags.add("aboutPage");
      break;
    case "contactPage":
      tags.add("contactPage");
      break;
    case "residentialHub":
      tags.add("residential-hub");
      break;
    case "commercialHub":
      tags.add("commercial-hub");
      break;
    case "utilityScalePage":
      tags.add("utility-scale-page");
      break;
    case "siteConfig":
      tags.add("siteConfig");
      break;
    case "teamMember":
      tags.add("aboutPage");
      break;
    case "faq":
      tags.add("residential-hub");
      tags.add("commercial-hub");
      break;
    case "cityPage":
      if (slug) tags.add(`city:${slug}`);
      break;
    default:
      // Broad refresh for unknown/shared content types
      tags.add("homePage");
      tags.add("projects");
      tags.add("resources");
      tags.add("siteConfig");
      break;
  }

  return [...tags];
}

export function pathsForSanityDocument(payload: RevalidatePayload): string[] {
  const type = payload._type;
  if (!type) return [];

  const slug = slugFrom(payload);
  const paths = new Set<string>(["/"]);

  switch (type) {
    case "project":
      paths.add("/projects");
      if (slug) paths.add(`/projects/${slug}`);
      paths.add("/residential");
      paths.add("/commercial");
      break;
    case "resource":
      paths.add("/resources");
      if (slug) paths.add(`/resources/${slug}`);
      break;
    case "aboutPage":
    case "teamMember":
      paths.add("/about");
      break;
    case "contactPage":
      paths.add("/contact");
      break;
    case "residentialHub":
      paths.add("/residential");
      break;
    case "commercialHub":
      paths.add("/commercial");
      break;
    case "utilityScalePage":
      paths.add("/utility-scale");
      break;
    default:
      paths.add("/projects");
      break;
  }

  return [...paths];
}
