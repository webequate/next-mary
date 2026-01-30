// Metadata configuration for App Router
import type { Metadata } from "next";

export const siteConfig = {
  name: "Mary J Johnson",
  description:
    "Author, Blogger, and Educational Consultant. Library of Congress American Memory Fellow and Primary Source Teaching Expert.",
  url: "https://maryjjohnson.com",
  image: "https://maryjjohnson.com/images/mary.jpg",
  twitter: {
    handle: "@JohnsonMaryJ",
    site: "@JohnsonMaryJ",
  },
};

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "profile" | "article";
}

// For App Router - returns Next.js Metadata object
export function getPageMetadata(page: PageMetadata): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `${siteConfig.url}${page.path}`,
    },
    openGraph: {
      type: page.ogType || "website",
      url: `${siteConfig.url}${page.path}`,
      title: page.title,
      description: page.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.image,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitter.site,
      creator: siteConfig.twitter.handle,
      title: page.title,
      description: page.description,
      images: [siteConfig.image],
    },
  };
}
