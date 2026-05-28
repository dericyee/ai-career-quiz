import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable lastModified — don't churn it every build (Google distrusts that).
  const lastModified = new Date("2026-05-22");
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/quiz`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
