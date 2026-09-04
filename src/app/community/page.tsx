import type { Metadata } from "next";
import { CommunityLink } from "@/components/community-link";
import { JoinBand } from "@/components/join-band";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Meet the people building open agent systems, share unfinished work, and help move the stack forward.",
};

const channels = [
  ["# introductions", "Who you are, what you are exploring, and what brought you here."],
  ["# build-logs", "Share work in progress, dead ends, breakthroughs, and useful measurements."],
  ["# agent-runtimes", "Orchestration, evaluation, memory, tools, and observable execution."],
  ["# languages-and-dsls", "Programming models for expressing and composing agent behavior."],
  ["# systems-and-kernels", "GPU work, performance, isolation, and the machinery underneath."],
  ["# help-and-reviews", "Ask a serious question or give someone’s work a careful second look."],
] as const;

export default function CommunityPage() {
  const hasDiscordInvite = siteConfig.discordUrl.startsWith("http");

  return (
    <>
      <header className="page-hero page-hero--compact">
        <div className="site-shell page-hero__grid">
          <p className="eyebrow">The community</p>
          <div>
            <h1 className="page-title">A hackerspace for agent systems.</h1>
            <p className="page-lede">
              Come to learn in public, find collaborators, show unfinished
              work, and help someone else get through the hard part.
            </p>
          </div>
        </div>
      </header>

      <section className="site-shell community-section">
        <div className="community-grid">
          <div>
            <p className="eyebrow">Where we talk</p>
            <h2 className="community-title">Discord is the workshop floor.</h2>
            <p className="community-copy">
              It is where build logs, technical questions, design arguments,
              project coordination, and impromptu experiments live. Bring
              context. Be generous with what you know. Leave the mechanism
              clearer than you found it.
            </p>

            <div className="join-panel" id="join">
              <div>
                <p className="metadata">
                  {hasDiscordInvite ? "Discord is open" : "Opening soon"}
                </p>
                <h3>
                  {hasDiscordInvite
                    ? "Step into the loop."
                    : "The Discord invite will land here."}
                </h3>
                <p>
                  {hasDiscordInvite
                    ? "Introduce yourself, tell us what you are building, and find a thread to pull."
                    : "The space is being prepared now. Follow the project on X for the opening signal."}
                </p>
              </div>
              <div className="join-panel__actions">
                {hasDiscordInvite && (
                  <CommunityLink className="button button--primary" />
                )}
                <a
                  className={`button ${hasDiscordInvite ? "" : "button--primary"}`}
                  href={siteConfig.xUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Follow on X ↗
                </a>
              </div>
            </div>
          </div>

          <aside className="channel-list" aria-label="Planned Discord channels">
            <div className="channel-list__head">
              <span className="metadata">Inside the space</span>
              <span className="status-dot" aria-hidden="true" />
            </div>
            {channels.map(([name, description]) => (
              <div className="channel-item" key={name}>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <JoinBand title="Build what should exist." />
    </>
  );
}
