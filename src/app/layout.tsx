import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteOrigin } from "@/lib/urls";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Hackers in the Loop",
    template: "%s · Hackers in the Loop",
  },
  description:
    "An open-source community building the systems beneath agentic software.",
  openGraph: {
    title: "Hackers in the Loop",
    description: "Open source for agentic systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hackers in the Loop",
    description: "Open source for agentic systems.",
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
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
