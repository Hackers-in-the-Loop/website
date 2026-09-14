import { CommunityRules } from "@/components/v2/community-rules";
import { FounderLinks, PageIntro } from "@/components/v2/shared";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Community / Connect", "Join Hackers in the Loop on Discord and read the community rules.", "/community");

export default function CommunityPage() {
  return <>
    <PageIntro label="Community / Connect" title="You can start where you are."><p>Ask about something you’re learning, share what you’re working on, or get to know people. You don’t need a project, a grant, or Lab access to take part.</p><div className="v2-actions"><a className="v2-button v2-button--primary" href="#connect">Find a way to connect ↓</a><a className="v2-link" href="#rules">Read the community rules</a></div></PageIntro>
    <span id="join" /><section className="v2-connection" id="connect" aria-labelledby="connect-title"><div className="v2-wrap v2-section v2-split">
      <div><p className="v2-kicker">Our community home</p><h2 id="connect-title">Join the conversation on Discord.</h2><p>Share a build log, a question, a recent discovery, or an update from your life. Take an interest in what someone else is doing, too.</p>
        {siteConfig.discordUrl ? <div className="v2-actions"><a className="v2-button v2-button--primary" href={siteConfig.discordUrl} target="_blank" rel="noreferrer">Join Discord ↗</a></div> : <p className="v2-note">Contact us through X or LinkedIn.</p>}
      </div>
      <div className="v2-contact" id="founder-contact"><p className="v2-kicker">Founder / Connect</p><h3>Connect with the founder.</h3><p>Get in touch about the community or share an idea.</p><FounderLinks /><a className="v2-link" href="/why#founder">Who am I? →</a></div>
    </div></section>
    <section className="v2-wrap v2-section" aria-labelledby="together-title"><div className="v2-section-heading"><p className="v2-kicker">What we do together</p><h2 id="together-title">A question can start a connection.</h2></div><div className="v2-start-grid">
      <article><h3>Tell us what you’re trying.</h3><p>Give people some context, what you’ve tried, and the part you’re curious about. Questions at every experience level belong here.</p></article>
      <article><h3>Give someone’s work a try.</h3><p>Read a post, test a project, ask a thoughtful question, or offer feedback when someone wants it.</p></article>
      <article><h3>Leave room for the person.</h3><p>It’s okay to listen before posting, share a laugh, or build something just because it looks cool.</p></article>
    </div></section>
    <section className="v2-wrap v2-section v2-split v2-rules" id="rules" aria-labelledby="rules-title"><div><p className="v2-kicker">How we treat one another</p><h2 id="rules-title">Community rules.</h2><p className="v2-note" style={{marginTop:"1rem"}}>Questions or concerns? <a className="v2-link" href="#founder-contact">Contact the founder privately</a> through X or LinkedIn.</p></div><CommunityRules /></section>
  </>;
}
