import type { MetadataRoute } from "next";
import { metadataOrigin } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/why/", "/lab/", "/projects/", "/community/"].map(path => ({
    url: new URL(path, metadataOrigin).href,
  }));
}
