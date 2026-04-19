import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemas";
import { deskStructure } from "./structure/deskStructure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const singletonTypes = new Set([
  "siteConfig",
  "homePage",
  "aboutPage",
  "residentialHub",
  "commercialHub",
  "utilityScalePage",
  "contactPage",
]);

export default defineConfig({
  name: "veylon-energy",
  title: "Veylon Energy",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev) =>
      prev.filter((item) => !item.templateId || !singletonTypes.has(String(item.templateId))),
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType) ? prev.filter(({ action }) => action !== "delete") : prev,
  },
});
