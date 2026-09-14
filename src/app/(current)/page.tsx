import { ConnectLink, CommunityInvitation } from "@/components/v2/shared";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("A place to belong in tech.", "People to learn with, work to share, and room to grow. Get to know the Hackers in the Loop community and its Lab.", "/");

export default function V2Home() {
  return <>
    <section className="v2-hero-surface"><div className="v2-wrap v2-home-hero">
      <div><p className="v2-kicker">A community for people in tech</p><h1>A place to<br /><em>belong</em> in tech.</h1><p className="v2-lede">People who take an interest in what you’re building, help you work through a question, and share what they know.</p><p className="v2-muted">Builders, learners, and people finding their footing are welcome. We’re especially curious about AI and agentic systems, with room for work across technology.</p><div className="v2-actions"><ConnectLink /><a className="v2-link" href="/why">Why we’re here →</a></div></div>
      <div className="v2-home-mark" aria-hidden="true"><img src="/brand/hack-hero.svg" alt="" width="660" height="420" /></div>
    </div>
    </section>
    <section className="v2-wrap v2-section" aria-labelledby="start-title"><div className="v2-section-heading"><p className="v2-kicker">There’s more than one way in</p><h2 id="start-title">Start with something small.</h2></div><div className="v2-start-grid">
      <article><span className="v2-number">01</span><h3>Ask a question.</h3><p>Bring something you’re trying to understand, whether it’s a new tool, a design choice, or your next step in tech.</p></article>
      <article><span className="v2-number">02</span><h3>Share the unfinished work.</h3><p>Show what you’re trying, what happened, and where you’re stuck. You don’t need a polished demo.</p></article>
      <article><span className="v2-number">03</span><h3>Take an interest.</h3><p>Try someone’s project, offer feedback when it’s wanted, or help answer a question. Listening counts, too.</p></article>
    </div><a className="v2-link" href="/community">Find your way into the community →</a></section>
    <section className="v2-dark"><div className="v2-wrap v2-section v2-lab-preview"><div><p className="v2-kicker">Shared resources / The Lab</p><h2>Hardware to learn with.</h2><p>A mini cluster and test benches for open research and experiments. We’re working toward sharing spare capacity with the community.</p><p className="v2-note">Compute requests are open. Access is arranged after review and depends on available capacity.</p><div className="v2-actions"><a className="v2-button v2-button--light" href="/lab">Explore the Lab →</a><a className="v2-link" href="/lab#support">Have hardware or hosting to offer?</a></div></div><div className="v2-lab-summary"><p className="v2-kicker">From the September 12 build notes</p><dl><div><dt>AI compute</dt><dd>3 DGX Sparks</dd></div><div><dt>Bench experiments</dt><dd>GPU, FPGA & edge AI</dd></div><div><dt>Built to make room for</dt><dd>Learning, research & open projects</dd></div></dl><a className="v2-link" href="/projects">See the projects & their hardware →</a></div></div></section>
    <CommunityInvitation />
  </>;
}
