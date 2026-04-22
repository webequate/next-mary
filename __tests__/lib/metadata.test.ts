import { describe, it, expect } from "vitest";
import { siteConfig, getPageMetadata } from "@/lib/metadata";

describe("siteConfig", () => {
  it("has the correct site name", () => {
    expect(siteConfig.name).toBe("Mary J Johnson");
  });

  it("has the correct site URL", () => {
    expect(siteConfig.url).toBe("https://maryjjohnson.com");
  });

  it("has a non-empty description", () => {
    expect(siteConfig.description.length).toBeGreaterThan(0);
  });

  it("has an absolute image URL", () => {
    expect(siteConfig.image).toMatch(/^https?:\/\//);
  });

  it("has twitter handle and site set", () => {
    expect(siteConfig.twitter.handle).toBeTruthy();
    expect(siteConfig.twitter.site).toBeTruthy();
  });
});

describe("getPageMetadata", () => {
  const base = {
    title: "About",
    description: "About Mary J Johnson.",
    path: "/about",
  };

  it("returns the provided title", () => {
    const meta = getPageMetadata(base);
    expect(meta.title).toBe("About");
  });

  it("returns the provided description", () => {
    const meta = getPageMetadata(base);
    expect(meta.description).toBe("About Mary J Johnson.");
  });

  it("sets the canonical URL by combining siteConfig.url and path", () => {
    const meta = getPageMetadata(base);
    expect(meta.alternates?.canonical).toBe(
      `${siteConfig.url}/about`
    );
  });

  it("sets openGraph url from siteConfig.url + path", () => {
    const meta = getPageMetadata(base);
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.url).toBe(`${siteConfig.url}/about`);
  });

  it("defaults openGraph type to 'website' when ogType is omitted", () => {
    const meta = getPageMetadata(base);
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.type).toBe("website");
  });

  it("uses the provided ogType when supplied", () => {
    const meta = getPageMetadata({ ...base, ogType: "article" });
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.type).toBe("article");
  });

  it("sets openGraph title and description from the page params", () => {
    const meta = getPageMetadata(base);
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.title).toBe("About");
    expect(og.description).toBe("About Mary J Johnson.");
  });

  it("sets openGraph siteName from siteConfig.name", () => {
    const meta = getPageMetadata(base);
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.siteName).toBe(siteConfig.name);
  });

  it("includes the siteConfig image in openGraph images", () => {
    const meta = getPageMetadata(base);
    const og = meta.openGraph as Record<string, unknown>;
    const images = og.images as Array<{ url: string }>;
    expect(images[0].url).toBe(siteConfig.image);
  });

  it("sets twitter card type to summary_large_image", () => {
    const meta = getPageMetadata(base);
    const tw = meta.twitter as Record<string, unknown>;
    expect(tw.card).toBe("summary_large_image");
  });

  it("sets twitter creator and site from siteConfig", () => {
    const meta = getPageMetadata(base);
    const tw = meta.twitter as Record<string, unknown>;
    expect(tw.creator).toBe(siteConfig.twitter.handle);
    expect(tw.site).toBe(siteConfig.twitter.site);
  });

  it("sets twitter title and description from page params", () => {
    const meta = getPageMetadata(base);
    const tw = meta.twitter as Record<string, unknown>;
    expect(tw.title).toBe("About");
    expect(tw.description).toBe("About Mary J Johnson.");
  });

  it("includes the siteConfig image in twitter images", () => {
    const meta = getPageMetadata(base);
    const tw = meta.twitter as Record<string, unknown>;
    expect((tw.images as string[])[0]).toBe(siteConfig.image);
  });

  it("generates distinct canonical URLs for different paths", () => {
    const contact = getPageMetadata({ ...base, path: "/contact" });
    const books = getPageMetadata({ ...base, path: "/books" });
    expect(contact.alternates?.canonical).not.toBe(books.alternates?.canonical);
  });
});
