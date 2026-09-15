import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { metadataOrigin, pageMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  ...pageMetadata(siteConfig.name, siteConfig.description, "/"),
  metadataBase: metadataOrigin,
  title: {
    default: "Hackers in the Loop",
    template: "%s · Hackers in the Loop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          alternateName: siteConfig.shortName,
          url: metadataOrigin.href,
          description: siteConfig.description,
        }).replace(/</g, "\\u003c") }} />
        <script
          src="https://cdn.usefathom.com/script.js"
          data-site="URCZBLKK"
          defer
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
