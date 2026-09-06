import Link from "next/link";
import { CommunityLink } from "@/components/community-link";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Community",
  "Bring a question, share unfinished work, and find a first contribution to Hackers in the Loop.",
  "/community",
);

const contributions = [
  {
    title: "Start with a question.",
    copy: "Pick something you want to understand. A trace you cannot explain, a boundary you want to test, or a tool that could work better.",
  },
  {
    title: "Leave something useful.",
    copy: "Share a small example, a diagram, a reproducible bug, or a note about what you tried. Give the next person a way to pick it up.",
  },
  {
    title: "Help someone take a step.",
    copy: "Test their example. Ask a clarifying question. Explain the part you know. You do not need to know the whole stack to contribute.",
  },
] as const;

export default function CommunityPage() {
  const hasDiscordInvite = Boolean(siteConfig.discordUrl);
  return (
    <>
      <header className="page-hero">
        <div className="site-shell page-hero__grid">
          <p className="eyebrow">The community / An open invitation</p>
          <div>
            <h1 className="page-title">
              You do not need
              <br />a finished project.
            </h1>
            <p className="page-lede">
              Bring the thing you are trying to understand. Find people to build
              with, show your rough edges, and help someone else through theirs.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#start-building">
                Find a first contribution <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <section
        className="site-shell community-section"
        id="join"
        aria-labelledby="join-title"
      >
        <div className="section-heading">
          <h2 className="eyebrow" id="join-title">
            Where to start
          </h2>
          <p className="section-note">Small contributions count.</p>
        </div>
        <div className="community-places">
          <article className="community-place community-place--dark">
            <p className="metadata">
              <span className="status-dot" aria-hidden="true" /> Available now /
              GitHub
            </p>
            <h3>Make a first mark.</h3>
            <p>
              The website and brand source are public. Read the code, suggest a
              clearer explanation, or report something that does not work. It is
              a small, concrete place to begin.
            </p>
            <div className="community-place__actions">
              <a
                className="button button--paper"
                href={siteConfig.repositoryUrl}
                target="_blank"
                rel="noreferrer"
              >
                Explore the source ↗
              </a>
              <a
                className="text-link"
                href={siteConfig.issuesUrl}
                target="_blank"
                rel="noreferrer"
              >
                View issues ↗
              </a>
            </div>
          </article>
          <article className="community-place">
            <p className="metadata">
              {hasDiscordInvite ? "Join us / Discord" : "Planned / Discord"}
            </p>
            <h3>A place to think together.</h3>
            <p>
              {hasDiscordInvite
                ? "Share a build log, ask for a second pair of eyes, or introduce the problem you are exploring. Start with a little context and an honest question."
                : "Discord will be a place for build logs, questions, and working sessions. A public invite is not available yet. You can contribute on GitHub today and follow updates on X."}
            </p>
            <div className="community-place__actions">
              {hasDiscordInvite && (
                <CommunityLink className="button button--primary" />
              )}
              <a
                className={hasDiscordInvite ? "text-link" : "button"}
                href={siteConfig.xUrl}
                target="_blank"
                rel="noreferrer"
              >
                Follow updates on X ↗
              </a>
            </div>
          </article>
        </div>
      </section>

      <section
        className="site-shell community-section"
        id="start-building"
        aria-labelledby="contribute-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">Your first contribution</p>
            <h2 className="section-title" id="contribute-title">
              Start small.
              <br />
              Make it useful.
            </h2>
          </div>
          <Link className="text-link" href="/stack">
            Find a question to explore <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="principles-grid">
          {contributions.map((item, index) => (
            <article className="principle" key={item.title}>
              <span className="principle__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <div className="contribution-example">
          <div>
            <p className="eyebrow">A useful first post</p>
            <h3>Give someone a way in.</h3>
            <p>
              Use this shape in a relevant project issue or, when available, a
              community conversation. Keep website issues about the website.
            </p>
          </div>
          <blockquote>
            <p>Here is what I am trying to do.</p>
            <p>Here is the smallest example I can share.</p>
            <p>Here is what I expected, and what happened.</p>
            <p>Here is the part I would like help with.</p>
          </blockquote>
        </div>
      </section>

      <section className="community-ethos" aria-labelledby="ethos-title">
        <div className="site-shell community-ethos__inner">
          <p className="eyebrow">How we share a workbench</p>
          <div>
            <h2 id="ethos-title">
              Be curious.
              <br />
              Be clear. Be generous.
            </h2>
            <p>
              Critique the work with care. Make room for different experience
              levels. Credit the people and projects you build on. Share
              examples that others can safely reproduce.
            </p>
            <Link className="text-link" href="/manifesto">
              Read the principles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
