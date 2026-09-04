import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  ),
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
