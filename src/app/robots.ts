import type { MetadataRoute } from "next";
import { metadataOrigin } from "@/lib/metadata";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", metadataOrigin).href,
  };
}
