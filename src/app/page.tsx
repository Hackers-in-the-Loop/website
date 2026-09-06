import Link from "next/link";
import { CommunityLink } from "@/components/community-link";
import { JoinBand } from "@/components/join-band";
import { LoopDiagram } from "@/components/loop-diagram";
import { featuredProjects } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Keep intelligence hackable.",
  "An open-source hackerspace for people building, understanding, and improving the systems beneath agentic software.",
  "/",
);

const principles = [
  {
    title: "Show the mechanism.",
    copy: "Make the code, decisions, and tradeoffs visible. Leave enough of a trail for someone else to understand how it works.",
  },
  {
    title: "Keep people in control.",
    copy: "Give people ways to inspect actions, set boundaries, and change direction. Human agency is a design requirement.",
  },
  {
    title: "Build the commons.",
    copy: "Share useful pieces and what you learn. A bug report, a careful question, or a good explanation moves the work forward.",
  },
] as const;

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="site-shell hero__grid">
          <div className="hero__main">
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" /> Open source for
              agentic systems
            </p>
            <h1 className="hero__title">
              Keep intelligence <span>hackable.</span>
            </h1>
            <p className="hero__lede">
              A hackerspace for the systems beneath AI agents. We build
              runtimes, tools, and shared knowledge that people can inspect,
              change, and make their own.
            </p>
            <div className="hero__actions">
              <CommunityLink className="button button--primary" />
              <Link className="button" href="/manifesto">
                Read the manifesto <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className="hero__note">
              For builders, tinkerers, and people who ask how it works.
            </p>
          </div>
          <LoopDiagram />
        </div>
      </section>

      <section className="work-section" aria-labelledby="work-title">
        <div className="site-shell">
          <div className="section-heading section-heading--light">
            <div>
              <p className="eyebrow">01 / On the workbench</p>
              <h2 id="work-title" className="section-title">
                Find your layer.
              </h2>
            </div>
            <Link className="text-link" href="/stack">
              Explore the work <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="work-grid">
            {featuredProjects.map((project, index) => (
              <Link
                className="work-card"
                href={`/stack#${project.id}`}
                key={project.id}
              >
                <div className="work-card__meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true">↗</span>
                </div>
                <p className="metadata">{project.kind}</p>
                <h3>{project.name}</h3>
                <p className="work-card__copy">{project.description}</p>
                <span className="work-card__action">
                  Read the brief <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="work-section__note">
            A map of the work and the questions behind it. Experiments welcome.
          </p>
        </div>
      </section>

      <section
        className="site-shell home-section"
        aria-labelledby="principles-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / How we work</p>
            <h2 id="principles-title" className="section-title">
              Open by practice.
            </h2>
          </div>
          <p className="section-note">Build → inspect → improve → share</p>
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
        <div className="manifesto-preview">
          <p>“Help is infrastructure.”</p>
          <div>
            <p>The work gets better when we help each other understand it.</p>
            <Link
              className="text-link"
              href="/manifesto#help-is-infrastructure"
            >
              What we believe <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <JoinBand />
    </>
  );
}
