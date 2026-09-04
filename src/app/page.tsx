import Link from "next/link";
import { CommunityLink } from "@/components/community-link";
import { JoinBand } from "@/components/join-band";
import { stackProjects } from "@/lib/site";

const principles = [
  {
    title: "Show the mechanism.",
    copy: "Agentic systems should be understandable from the runtime up—not sealed behind a demo and a pricing page.",
  },
  {
    title: "Keep people in control.",
    copy: "Human agency belongs in the architecture: visible decisions, bounded credentials, and deliberate intervention.",
  },
  {
    title: "Build the commons.",
    copy: "Useful primitives get stronger when people can inspect them, compose them, teach them, and improve them together.",
  },
] as const;

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="site-shell hero__grid">
          <div>
            <p className="eyebrow">Open source for agentic systems</p>
            <h1 className="hero__title">Keep intelligence hackable.</h1>
            <p className="hero__lede">
              Hackers in the Loop is a community building the runtimes, tools,
              protocols, and hard-won knowledge beneath agentic software.
            </p>
            <div className="hero__actions">
              <CommunityLink className="button button--primary" />
              <Link className="button" href="/manifesto">
                Read the manifesto
              </Link>
            </div>
            <div className="signal-line" aria-hidden="true" />
          </div>

          <aside className="stack-preview" aria-label="Working stack preview">
            <div className="stack-preview__head">
              <span className="metadata">The working stack</span>
              <span className="status-dot" aria-hidden="true" />
            </div>
            {stackProjects.map((project, index) => (
              <article className="project-mini" key={project.name}>
                <span className="project-mini__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section className="site-shell home-section">
        <div className="section-heading">
          <p className="eyebrow">What we believe</p>
        </div>
        <div className="principles-grid">
          {principles.map((principle, index) => (
            <article className="principle" key={principle.title}>
              <span className="principle__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell home-section">
        <div className="manifesto-preview">
          <div>
            <p className="eyebrow">The manifesto</p>
            <Link className="text-link" href="/manifesto">
              Read it whole →
            </Link>
          </div>
          <p className="manifesto-preview__copy">
            We do not want intelligence delivered as a sealed appliance. We
            want systems we can <em>open, understand, modify, and share.</em>
          </p>
        </div>
      </section>

      <JoinBand />
    </>
  );
}
