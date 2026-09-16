import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mountainrideooty.com";

const routes = [
  "",
  "/sightseeing",
  "/vehicles",
  "/packages",
  "/airport-transfer",
  "/outstation",
  "/custom-tour",
  "/about",
  "/gallery",
  "/reviews",
  "/faq",
  "/booking",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/cancellation-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
