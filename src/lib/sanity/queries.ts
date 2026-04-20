/** GROQ query strings — consumed by `src/lib/sanity/fetch-helpers.ts`. */

export const siteConfigQuery = `*[_type == "siteConfig" && _id == "siteConfig"][0]{
  ...,
  defaultSeo,
  legalEntity,
}`;

export const homePageQuery = `*[_type == "homePage" && _id == "homePage"][0]{
  ...,
  trustSignals[]->,
  featuredProjects[]->,
  testimonials[]->,
  featuredResources[]->
}`;

export const aboutPageQuery = `*[_type == "aboutPage" && _id == "aboutPage"][0]{
  ...,
  team[]->{...},
}`;

export const residentialHubQuery = `*[_type == "residentialHub" && _id == "residentialHub"][0]{
  ...,
  componentPartners[]->,
  featuredProjects[]->,
  faqs[]->
}`;

export const commercialHubQuery = `*[_type == "commercialHub" && _id == "commercialHub"][0]{
  ...,
  componentPartners[]->,
  featuredProjects[]->,
  faqs[]->
}`;

export const utilityScalePageQuery = `*[_type == "utilityScalePage" && _id == "utilityScalePage"][0]{
  ...,
  credentials[]->
}`;

export const contactPageQuery = `*[_type == "contactPage" && _id == "contactPage"][0]{ ... }`;

const projectCardFields = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  segment,
  location,
  systemDetails,
  heroImage,
  publishedAt,
  seo
`;

const resourceCardFields = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  type,
  excerpt,
  heroImage,
  publishedAt,
  seo
`;

export const projectBySlugQuery = `*[
  _type == "project" &&
  slug.current == $slug &&
  defined(publishedAt) &&
  publishedAt <= now()
][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  segment,
  location,
  systemDetails,
  results,
  heroImage,
  gallery,
  narrative,
  testimonial->{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    quote,
    author,
    photo,
    rating,
    publishedAt
  },
  publishedAt,
  seo
}`;

export const projectListQuery = `*[
  _type == "project" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now() &&
  ($segment == null || segment == $segment)
] | order(publishedAt desc) {
  ${projectCardFields}
}`;

export const projectRelatedQuery = `*[
  _type == "project" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now() &&
  segment == $segment &&
  _id != $projectId
] | order(publishedAt desc)[0...3] {
  ${projectCardFields}
}`;

export const projectSlugsQuery = `*[
  _type == "project" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now()
][].slug.current`;

export const resourceBySlugQuery = `*[
  _type == "resource" &&
  slug.current == $slug &&
  defined(publishedAt) &&
  publishedAt <= now()
][0]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  type,
  excerpt,
  heroImage,
  body,
  author->{
    _id,
    _type,
    name,
    role,
    photo,
    bio,
    "bioPlainText": pt::text(bio)
  },
  publishedAt,
  updatedAt,
  relatedResources[]->{
    ${resourceCardFields}
  },
  downloadableAsset{
    pageCount,
    file{
      asset->{
        url
      }
    }
  },
  seo
}`;

export const resourceListQuery = `*[
  _type == "resource" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now() &&
  ($type == null || type == $type)
] | order(publishedAt desc) {
  ${resourceCardFields}
}`;

export const resourceRelatedQuery = `*[
  _type == "resource" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now() &&
  _id != $resourceId
] | order(publishedAt desc)[0...3] {
  ${resourceCardFields}
}`;

export const resourceSlugsQuery = `*[
  _type == "resource" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  publishedAt <= now()
][].slug.current`;

export const cityPageBySlugQuery = `*[_type == "cityPage" && slug.current == $slug][0]{
  ...,
  discom->{...},
  localProjects[]->{...},
  localFaqs[]->{...},
  seo
}`;
