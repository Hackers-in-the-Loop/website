import type { Metadata } from "next";
import { PageIntro } from "@/components/v2/shared";

export const metadata: Metadata = {
  title: "Projects",
  robots: { index: false },
  alternates: { canonical: "/projects/" },
};

export default function PreviousPage() {
  return <>
    <meta httpEquiv="refresh" content="0; url=/projects/" />
    <PageIntro label="This page moved" title="Continue to Projects."><p>The current project list now has its own page.</p><div className="v2-actions"><a className="v2-button v2-button--primary" href="/projects/">Continue →</a></div></PageIntro>
  </>;
}
