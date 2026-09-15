import Link from "next/link";
import { SiteShell } from "@/components/v2/site-shell";
import { PageIntro } from "@/components/v2/shared";

export default function NotFound() {
  return <SiteShell><PageIntro label="404 / Page not found" title="A loose thread."><p>This page is missing. There is more to explore back at the workbench.</p><div className="v2-actions"><Link className="v2-button v2-button--primary" href="/">Back to home →</Link><a className="v2-link" href="/projects">Explore the work →</a></div></PageIntro></SiteShell>;
}
