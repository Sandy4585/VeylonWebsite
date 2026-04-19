/** GROQ query strings — fetch helpers come in a later phase. */

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

export const residentialHubQuery = `*[_type == "residentialHub" && _id == "residentialHub"][0]{ ... }`;

export const commercialHubQuery = `*[_type == "commercialHub" && _id == "commercialHub"][0]{ ... }`;

export const utilityScalePageQuery = `*[_type == "utilityScalePage" && _id == "utilityScalePage"][0]{ ... }`;

export const contactPageQuery = `*[_type == "contactPage" && _id == "contactPage"][0]{ ... }`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  ...,
  heroImage,
  gallery[],
  testimonial->{...},
  seo
}`;

export const projectListQuery = `*[_type == "project" && ($segment == null || segment == $segment)] | order(publishedAt desc) {
  ...,
  heroImage,
  seo
}`;

export const resourceBySlugQuery = `*[_type == "resource" && slug.current == $slug][0]{
  ...,
  author->{...},
  relatedResources[]->{...},
  seo
}`;

export const resourceListQuery = `*[_type == "resource" && ($type == null || type == $type)] | order(publishedAt desc) {
  ...,
  heroImage,
  author->{ name, slug },
  seo
}`;

export const cityPageBySlugQuery = `*[_type == "cityPage" && slug.current == $slug][0]{
  ...,
  discom->{...},
  localProjects[]->{...},
  localFaqs[]->{...},
  seo
}`;
