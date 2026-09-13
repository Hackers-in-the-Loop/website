import Link from "@/components/site-link";
import { JoinBand } from "@/components/join-band";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Why HITL?", "Belonging, shared knowledge, and taking time to help one another grow in tech.", "/why");

export default function WhyPage() {
  return <>
    <header className="page-hero"><div className="site-shell page-hero__grid">
      <p className="eyebrow">Why HITL?</p>
      <div><h1 className="page-title">Because someone took the time.</h1>
        <p className="page-lede">HITL began with a simple desire: to pass on the care and investment that helped its founder grow. A place where technically curious people can find belonging, encouragement, and people willing to listen.</p>
        <div className="page-signal" aria-hidden="true" />
      </div>
    </div></header>
    <section className="site-shell page-section"><div className="manifesto-intro">
      <h2 className="eyebrow">What we’re here for</h2>
      <div><p>We want people to find a place to belong and people who care about what they’re building and doing. We take time to listen, share what we know, encourage each other, and help one another grow.</p>
        <p>Sometimes that means a conversation or feedback; sometimes it means building alongside someone or sharing community tools and compute for research and projects.</p>
        <p>You can bring your questions, your work, and what’s happening in your life. We all started somewhere. You’re welcome here, with no strings attached.</p>
        <Link className="text-link" href="/lab">Shared compute is in preparation →</Link>
      </div>
    </div></section>
    <section className="site-shell page-section" id="founder" aria-labelledby="founder-title">
      <div className="founder-placeholder"><p className="eyebrow">The person behind HITL</p><h2 id="founder-title">Who am I?</h2><p>Founder introduction coming soon.</p><p className="lab-fineprint">A personal story, background, and past work, in the founder’s own words.</p></div>
    </section>
    <JoinBand />
  </>;
}
