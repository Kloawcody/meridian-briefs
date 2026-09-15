import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://meridian-briefs.vercel.app";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/owner", "/api/"],
    },
    sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`,
  };
}
