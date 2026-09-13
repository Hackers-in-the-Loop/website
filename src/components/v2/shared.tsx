import { siteConfig } from "@/lib/site";

export function ConnectLink({ className = "v2-button v2-button--primary" }: { className?: string }) {
  return siteConfig.discordUrl
    ? <a className={className} href={siteConfig.discordUrl} target="_blank" rel="noreferrer">Join Discord ↗</a>
    : <a className={className} href="/v2/community#connect">Connect with HITL →</a>;
}

export function FounderLinks() {
  return <div className="v2-actions"><a className="v2-button" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">Shannon on LinkedIn ↗</a><a className="v2-link" href={siteConfig.xUrl} target="_blank" rel="noreferrer">Shannon on X ↗</a></div>;
}

export function PageIntro({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return <header className="v2-wrap v2-page-intro"><p className="v2-kicker">{label}</p><h1>{title}</h1><div className="v2-intro-copy">{children}</div></header>;
}

export function LabStatus() {
  return <dl className="v2-status"><div><dt>Equipment</dt><dd>Built & documented</dd></div><div><dt>Compute requests</dt><dd>Open for proposals</dd></div><div><dt>Shared access</dt><dd>Being set up</dd></div></dl>;
}

export function CommunityInvitation() {
  return <section className="v2-invitation"><div className="v2-wrap v2-split"><div><p className="v2-kicker">Good company for your curiosity</p><h2>Bring what you’re working on.<br />Or what you’re wondering about.</h2><p>You don’t need a project or Lab access to take part.</p></div><ConnectLink /></div></section>;
}
