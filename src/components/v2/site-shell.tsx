import { Navigation } from "@/components/v2/navigation";
import { ConnectLink } from "@/components/v2/shared";
import { siteConfig } from "@/lib/site";
import "./site.css";

function Brand() {
  return <a className="v2-brand" href="/" aria-label="Hackers in the Loop home"><img src="/brand/hack-badge-static.svg" alt="HACK" width="52" height="52" /><span>Hackers<br />in the Loop</span></a>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return <div className="v2-site">
    <header className="v2-header"><div className="v2-wrap v2-header-inner"><Brand /><Navigation /><div className="v2-header-connect"><ConnectLink /></div></div></header>
    <main id="main-content" tabIndex={-1}>{children}</main>
    <footer className="v2-footer"><div className="v2-wrap v2-footer-inner"><div><Brand /><p>A place to belong, share what you know,<br />and grow in tech.</p></div><nav aria-label="Footer navigation"><a href="/why">Why we exist</a><a href="/community#connect">Connect</a><a href="/community#rules">Community rules</a><a href="/lab">The Lab</a><a href="/projects">Projects</a><a href="/lab#support">Support the Lab</a><a href={siteConfig.discordUrl!} target="_blank" rel="noreferrer">Discord ↗</a><a href={siteConfig.xUrl} target="_blank" rel="noreferrer">X ↗</a></nav></div></footer>
  </div>;
}
