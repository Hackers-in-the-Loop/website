import type { Metadata } from "next";
import { Navigation } from "@/components/v2/navigation";
import { siteConfig } from "@/lib/site";
import { ConnectLink } from "@/components/v2/shared";
import "./v2.css";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <div className="v2-site">
    <div className="v2-version"><div className="v2-wrap"><span>HITL · Version 2</span><a href="/compare" target="_top">Compare with the original →</a></div></div>
    <header className="v2-header"><div className="v2-wrap v2-header-inner">
      <a className="v2-brand" href="/v2" aria-label="Hackers in the Loop home"><img src="/brand/hitl-compact-badge.svg" alt="" width="52" height="52" /><span>Hackers<br />in the Loop</span></a>
      <Navigation /><div className="v2-header-connect"><ConnectLink /></div>
    </div></header>
    <main id="main-content" tabIndex={-1}>{children}</main>
    <footer className="v2-footer"><div className="v2-wrap v2-footer-inner"><div><a className="v2-brand" href="/v2"><img src="/brand/hitl-compact-badge.svg" alt="" width="52" height="52" /><span>Hackers<br />in the Loop</span></a><p>A place to belong, share what you know,<br />and grow in tech.</p></div><nav aria-label="Footer navigation"><a href="/v2/why">Why HITL?</a><a href="/v2/community#connect">Connect</a><a href="/v2/community#rules">Community rules</a><a href="/v2/lab">The Lab</a><a href="/v2/projects">Projects</a><a href="/v2/lab#support">Support the Lab</a><a href={siteConfig.githubUrl} target="_blank" rel="noreferrer">HITL on GitHub ↗</a></nav></div></footer>
  </div>;
}
