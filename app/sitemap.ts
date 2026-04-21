import type { MetadataRoute } from "next";
import { locales } from "@/i18n";

const BASE_URL = "https://arcova.com";

const STATIC_ROUTES = [
  "",
  "/catalog",
  "/about",
  "/manufacturing",
  "/projects",
];

const PRODUCT_SLUGS = [
  "aw-72", "aw-85", "pw-76", "pw-88", "pw-70s", "pw-92s",
  "ed-120", "ed-pvc", "sw-190", "sw-pvc", "rs-45", "cw-60",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }

    for (const slug of PRODUCT_SLUGS) {
      entries.push({
        url: `${BASE_URL}/${locale}/products/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
