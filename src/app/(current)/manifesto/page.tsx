import type { Metadata } from "next";
import { PageIntro } from "@/components/v2/shared";

export const metadata: Metadata = {
  title: "Why HACK?",
  robots: { index: false },
  alternates: { canonical: "/why/" },
};

export default function PreviousPage() {
  return <>
    <meta httpEquiv="refresh" content="0; url=/why/" />
    <PageIntro label="This page moved" title="Continue to Why HACK?"><p>The purpose and founder story now live on the Why HACK page.</p><div className="v2-actions"><a className="v2-button v2-button--primary" href="/why/">Continue →</a></div></PageIntro>
  </>;
}
