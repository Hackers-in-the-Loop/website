import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { siteOrigin } from "@/lib/urls";

export const metadataOrigin = siteOrigin(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url);
export const socialImage = {
  url: new URL("/og.png", metadataOrigin).href,
  width: 1731,
  height: 909,
  alt: "HACK: Hackers in the Loop, with the completed community Lab cluster.",
};

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const canonical = new URL(path === "/" ? "/" : `${path.replace(/\/$/, "")}/`, metadataOrigin).href;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title, description, url: canonical, type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image", title, description,
      creator: "@iammrduncan",
      images: [{ url: socialImage.url, alt: socialImage.alt }],
    },
  };
}
