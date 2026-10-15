import { ConnectLink, CommunityInvitation } from "@/components/v2/shared";
import { HeroFigure } from "@/components/hero-figure/hero-figure";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("A place to belong in tech.", "People to learn with, work to share, and room to grow. Get to know the Hackers in the Loop community and its Lab.", "/");

export default function V2Home() {
  return <>
    <section className="v2-hero-surface"><div className="v2-wrap v2-home-hero">
      <div><p className="v2-kicker">A community for people in tech</p><h1>A place to<br /><em>belong</em> in tech.</h1><p className="v2-lede">People who take an interest in what you’re building, help you work through a question, and share what they know.</p><p className="v2-muted">Builders, learners, and people finding their footing are welcome. We’re especially curious about AI and agentic systems, with room for work across technology.</p><div className="v2-actions"><ConnectLink /><a className="v2-link" href="/why">Why we’re here →</a></div></div>
      <HeroFigure />
    </div>
    </section>
    <section className="v2-wrap v2-section" aria-labelledby="start-title"><div className="v2-section-heading"><p className="v2-kicker">There’s more than one way in</p><h2 id="start-title">Start with something small.</h2></div><div className="v2-start-grid">
      <article><span className="v2-number">01</span><h3>Ask a question.</h3><p>Bring something you’re trying to understand, whether it’s a new tool, a design choice, or your next step in tech.</p></article>
      <article><span className="v2-number">02</span><h3>Share the unfinished work.</h3><p>Show what you’re trying, what happened, and where you’re stuck. You don’t need a polished demo.</p></article>
      <article><span className="v2-number">03</span><h3>Take an interest.</h3><p>Try someone’s project, offer feedback when it’s wanted, or help answer a question. Listening counts, too.</p></article>
    </div><a className="v2-link" href="/community">Find your way into the community →</a></section>
    <section className="v2-wrap v2-section v2-home-learn" aria-labelledby="learn-title"><div><p className="v2-kicker">The Learning Hub / Free</p><h2 id="learn-title">Learn how modern AI really works.</h2><p>Free books and short animated lessons for working engineers, built from the Lab’s real experiments. Read a chapter, download it as a PDF, or watch it as a few short videos.</p><div className="v2-actions"><a className="v2-button v2-button--primary" href="/learn/">Start learning →</a><a className="v2-link" href="/learn/books/how-modern-ai-models-work/">Book I: How Modern AI Models Work →</a></div></div><a className="v2-home-learn-card" href="/learn/books/how-modern-ai-models-work/"><img src="/learn/books/how-modern-ai-models-work/og.png" alt="How Modern AI Models Work, Book I of From Models to Custom Silicon, with Dabble the duck and Flit the moth" width="1200" height="630" loading="lazy" decoding="async" /></a></section>
    <section className="v2-dark"><div className="v2-wrap v2-section v2-lab-preview"><div><p className="v2-kicker">The Lab / Open research</p><h2>A small lab for open research.</h2><p>GPUs old and new, three DGX Sparks and benches of small devices. We use them to find out how far affordable hardware can take modern AI: big models on old GPUs, quantization that keeps models smart, and research that agents run and a harness checks.</p><div className="v2-actions"><a className="v2-button v2-button--light" href="/lab">Explore the Lab →</a><a className="v2-link" href="/lab#support">Have hardware or hosting to offer?</a></div></div><div className="v2-lab-summary"><p className="v2-kicker">In the Lab now</p><dl><div><dt>Model servers</dt><dd>3 DGX Sparks</dd></div><div><dt>GPU server</dt><dd>8 data-centre GPUs</dd></div><div><dt>Researching</dt><dd>Inference, quantization & agents</dd></div></dl><a className="v2-link" href="/projects/active">See the active projects →</a></div></div></section>
    <CommunityInvitation />
  </>;
}
