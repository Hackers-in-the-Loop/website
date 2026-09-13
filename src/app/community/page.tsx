import Link from "@/components/site-link";
import { CommunityLink } from "@/components/community-link";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Community / Connect", "Bring your questions, your work, and yourself. Find ways to connect with Hackers in the Loop.", "/community");

export default function CommunityPage() {
  return <>
    <header className="page-hero"><div className="site-shell page-hero__grid">
      <p className="eyebrow">Community / Connect</p>
      <div><h1 className="page-title">You can start where you are.</h1><p className="page-lede">Share what you’re working on, ask about something you’re learning, or just get to know people. You don’t need a finished project or a contribution to earn your place.</p><div className="hero__actions"><a className="button button--primary" href="#join">Find a way to connect ↓</a></div></div>
    </div></header>
    <section className="site-shell community-section" id="join" aria-labelledby="connect-title">
      <div className="section-heading"><h2 id="connect-title" className="eyebrow">Where to connect</h2></div>
      <div className="community-places">
        <article className="community-place community-place--dark"><p className="metadata">Community home / Discord</p><h3>A place to think together.</h3><p>Bring a build log, a question, a recent discovery, or an update from your life. Take an interest in what someone else is doing, too.</p><div className="community-place__actions">{siteConfig.discordUrl ? <CommunityLink className="button button--paper" /> : <p>The Discord community exists; a public invite is not published on this site yet. Follow the founder on X for updates.</p>}</div></article>
        <article className="community-place"><p className="metadata">Founder / Connect</p><h3>Connect with the founder.</h3><p>Follow along on X, or get in touch there about the community, a project idea, or supporting the Lab with hardware or hosting.</p><div className="community-place__actions"><a className="button" href={siteConfig.xUrl} target="_blank" rel="noreferrer">Find the founder on X ↗</a></div></article>
      </div>
    </section>
    <section className="community-ethos" aria-labelledby="ethos-title"><div className="site-shell community-ethos__inner"><p className="eyebrow">How we treat one another</p><div><h2 id="ethos-title">Take the person<br />as seriously as the work.</h2><p>Listen. Make room for questions at every experience level. Offer feedback with care, give credit, and help when you can.</p><Link className="text-link" href="/why">Why HITL? →</Link></div></div></section>
    <section className="site-shell community-section" id="rules" aria-labelledby="rules-title">
      <div className="manifesto-intro">
        <h2 className="eyebrow" id="rules-title">Community rules</h2>
        <ol className="community-rules">
          <li>Follow <a href="https://discord.com/terms" target="_blank" rel="noreferrer">Discord’s Terms of Service</a>.</li>
          <li>Be nice.</li>
          <li>Don’t be toxic.</li>
          <li>Have fun.</li>
        </ol>
      </div>
    </section>
  </>;
}
