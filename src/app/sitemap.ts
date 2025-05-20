import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://texttuve.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: "https://texttuve.vercel.app/video/example-video",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
   
  ];
}
