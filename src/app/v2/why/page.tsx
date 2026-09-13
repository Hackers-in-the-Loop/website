import { FounderStory } from "@/components/v2/founder-story";
import { CommunityInvitation, PageIntro, FounderLinks } from "@/components/v2/shared";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Why HITL?", "Shannon Duncan started HITL to invest in others and share resources for learning, research, and open projects.", "/v2/why");

export default function WhyPage() {
  return <>
    <PageIntro label="Why HITL?" title="Because someone took the time."><p>People helped Shannon find his way in tech. HITL is a way to pass that care on through community, shared knowledge, and resources people can learn with.</p></PageIntro>
    <section className="v2-wrap v2-section v2-goals" aria-label="What HITL is here for">
      <article><p className="v2-kicker">01 / Invest in people</p><h2>Make time for one another.</h2><p>Listen, teach, share what you know, and take an interest in what other people are building. You can bring your questions and unfinished work.</p><a className="v2-link" href="/v2/community">Get to know the community →</a></article>
      <article><p className="v2-kicker">02 / Share resources</p><h2>Make room to experiment.</h2><p>Offer compute through grants so people can learn, research, and build with open source technology. Requests are open; access is arranged after review.</p><a className="v2-link" href="/v2/lab#access">Explore compute requests →</a></article>
    </section>
    <section className="v2-wrap v2-section v2-split v2-founder" id="founder" aria-labelledby="founder-title">
      <aside><p className="v2-kicker">In Shannon’s words</p><h2 id="founder-title">Who am I?</h2><p>Shannon Duncan<br /><span className="v2-muted">HITL founder · Arkansas</span></p><FounderLinks /></aside>
      <FounderStory />
    </section>
    <CommunityInvitation />
  </>;
}
