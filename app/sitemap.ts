import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      alternates: {
        languages: {
          he: `${baseUrl}/`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/arrivals`,
      lastModified: new Date(),
      alternates: {
        languages: {
          he: `${baseUrl}/arrivals`,
          en: `${baseUrl}/en/arrivals`,
        },
      },
    },
  ];
}
