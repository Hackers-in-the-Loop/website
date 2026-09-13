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
        <article className="community-place"><p className="metadata">Founder / Connect</p><h3>Connect with the founder.</h3><p>Connect on X or LinkedIn about the community, a project idea, or supporting the Lab with hardware or hosting.</p><div className="community-place__actions"><a className="button" href={siteConfig.xUrl} target="_blank" rel="noreferrer">Find the founder on X ↗</a><a className="button" href={siteConfig.linkedinUrl} target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a></div></article>
      </div>
    </section>
    <section className="community-ethos" aria-labelledby="ethos-title"><div className="site-shell community-ethos__inner"><p className="eyebrow">How we treat one another</p><div><h2 id="ethos-title">Take the person<br />as seriously as the work.</h2><p>Listen. Make room for questions at every experience level. Offer feedback with care, give credit, and help when you can.</p><Link className="text-link" href="/why">Why HITL? →</Link></div></div></section>
    <section className="site-shell community-section" id="rules" aria-labelledby="rules-title">
      <div className="manifesto-intro">
        <h2 className="eyebrow" id="rules-title">Community rules</h2>
        <ol className="community-rules">
          <li>
            <h3>Treat people with respect.</h3>
            <p>Make room for questions at every experience level. Challenge ideas without attacking people. Harassment, hate, and putting people down for what they don’t know have no place here.</p>
          </li>
          <li>
            <h3>Share your work, not a sales pitch.</h3>
            <p>Projects, demos, lessons learned, and requests for feedback are welcome, including your own work. Give people something to discuss, not just a link to click. Generic service offers, “anyone looking for developers?” posts, referral spam, and repeated promotional posts are not welcome. Ask a moderator before posting job listings, fundraising requests, or advertisements.</p>
          </li>
          <li>
            <h3>No unsolicited promotional DMs.</h3>
            <p>Don’t privately pitch members your services, products, job opportunities, or other communities unless they have invited that kind of contact. Joining HITL is not consent to receive sales messages.</p>
          </li>
          <li>
            <h3>Keep conversations useful.</h3>
            <p>Use the relevant channels, avoid posting the same thing in multiple places, and don’t spam or mass-mention members. Leave room for other people’s questions and work.</p>
          </li>
          <li>
            <h3>Respect privacy and give credit.</h3>
            <p>Don’t share someone else’s personal information, private conversations, or confidential work without permission. Credit other people’s contributions, and disclose your connection to anything you recommend.</p>
          </li>
          <li>
            <h3>Follow <a href="https://discord.com/terms" target="_blank" rel="noreferrer">Discord’s Terms of Service</a> and <a href="https://discord.com/guidelines" target="_blank" rel="noreferrer">Community Guidelines</a>.</h3>
            <p>Moderators may remove content or restrict access when these rules are broken. Questions about a moderation decision are welcome through a private conversation with the moderators.</p>
          </li>
          <li>
            <h3>Have fun.</h3>
            <p>Build weird things, follow your curiosity, share a laugh, and enjoy the people here. Not everything needs to be productive or turn into a product. Sometimes “because it looked cool” is reason enough.</p>
          </li>
        </ol>
      </div>
    </section>
  </>;
}
