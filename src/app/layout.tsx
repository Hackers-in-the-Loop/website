import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { siteOrigin } from "@/lib/urls";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteOrigin(process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url),
  title: {
    default: "Hackers in the Loop",
    template: "%s · Hackers in the Loop",
  },
  description:
    "A community for people building with technology, learning about it, or finding their footing in tech.",
  openGraph: {
    title: "Hackers in the Loop",
    description: siteConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hackers in the Loop",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
