import Link from "@/components/site-link";
import { CommunityLink } from "@/components/community-link";
import { JoinBand } from "@/components/join-band";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "A place to belong in tech.",
  "A community for people building with technology, learning about it, or finding their footing in tech. Bring your questions, your work, and yourself.",
  "/",
);

const paths = [
  { href: "/why", label: "Why HITL?", title: "People worth investing in.", copy: "Why belonging, listening, and helping one another grow are at the heart of HITL.", action: "Why we exist" },
  { href: "/lab", label: "The Lab / In preparation", title: "Resources to learn with.", copy: "A personal compute cluster is the starting point. Shared access, a community bot, and an inference gateway are planned.", action: "See the Lab plans" },
  { href: "/community", label: "Community / Connect", title: "Bring what’s on your mind.", copy: "Ask a question, share what you’re trying, or take an interest in someone else’s work. You can start where you are.", action: "Find your way in" },
] as const;

export default function Home() {
  return <>
    <section className="hero">
      <div className="site-shell hero__grid">
        <div className="hero__main">
          <p className="eyebrow">Hackers in the Loop / Community</p>
          <h1 className="hero__title">A place to <span>belong</span> in tech.</h1>
          <p className="hero__lede">Hackers in the Loop is a community for people building with technology, learning about it, or finding their footing in tech.</p>
          <p className="hero__note">We lean toward agentic systems, AI, LLMs, and model training, and welcome people working across all of tech.</p>
          <div className="hero__actions">
            <CommunityLink className="button button--primary" />
            <Link className="button" href="/why">Why HITL?</Link>
          </div>
        </div>
        <aside className="community-invitation" aria-labelledby="invitation-title">
          <p className="eyebrow">We all started somewhere</p>
          <h2 id="invitation-title">Bring your questions.<br />Your work.<br />Yourself.</h2>
          <div className="page-signal" aria-hidden="true" />
          <p>We want people to find a place to belong and people who care about what they’re building and doing.</p>
          <p>Sometimes that means listening. Sometimes it means sharing what we know or building alongside someone.</p>
          <p className="community-invitation__close">You’re welcome here, with no strings attached.</p>
        </aside>
      </div>
    </section>
    <section className="work-section" aria-labelledby="explore-title">
      <div className="site-shell">
        <div className="section-heading section-heading--light">
          <div><p className="eyebrow">Get to know HITL</p><h2 className="section-title" id="explore-title">People. Shared curiosity.<br />Room to grow.</h2></div>
        </div>
        <div className="work-grid home-paths">
          {paths.map((path) => <Link className="work-card" href={path.href} key={path.href}>
            <p className="metadata">{path.label}</p>
            <h3>{path.title}</h3><p className="work-card__copy">{path.copy}</p>
            <span className="work-card__action">{path.action}<span aria-hidden="true">→</span></span>
          </Link>)}
        </div>
      </div>
    </section>
    <JoinBand title="Start where you are." />
  </>;
}
