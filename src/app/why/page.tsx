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
      <div className="founder-story">
        <div><p className="eyebrow">The person behind HITL</p><h2 id="founder-title">Who am I?</h2></div>
        <div className="founder-story__copy">
          <p>My name is Shannon Duncan. I live in Arkansas and work as Principal Architect of Agentic AI at LiveRamp.</p>
          <p>By day, I help build agentic systems: tools that help engineers do their jobs, platforms for building and deploying agents, and the frameworks and harnesses that make them work. I also work with our teams on bringing AI and agents into our products and building the platforms and APIs that let others integrate their own AI systems with ours.</p>
          <p>My career has taken me from mainframes and mainframe databases to petabyte-scale data engineering, including Hadoop clusters with 80,000 cores, and building new products. Over the past few years, my focus has been on real AI systems and platforms that teams and customers use every day.</p>
          <p>I’ve also spent a lot of time thinking about how to pay it forward. I feel blessed to be where I am today, largely because other people invested their time, energy, and knowledge in me. I can name people who changed the trajectory of my life. I want to offer that kind of support to others. HITL is how I hope to do it.</p>
          <p>The cluster I built supports my own open source projects, but it has much more capacity than I need day to day. There will be times when compute sits idle, and I want to make that capacity available to people in HITL.</p>
          <h3>For me, HITL has two goals.</h3>
          <ol>
            <li><strong>Invest in others as others have invested in me.</strong> Build a community where we take time to listen, teach, and appreciate one another and the things we’re building.</li>
            <li><strong>Provide resources through grants.</strong> Help people learn, research, and build with open source technology.</li>
          </ol>
          <p>I hope HITL becomes something meaningful for someone. Even if it changes just one person’s life, it will have been worth it to me.</p>
          <Link className="text-link" href="/community#join">Connect with me →</Link>
        </div>
      </div>
    </section>
    <JoinBand />
  </>;
}
