import type { Metadata } from "next";
import { JoinBand } from "@/components/join-band";
import { upstreamAreas, workingProjects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "The open projects, experiments, and upstream systems Hackers in the Loop is building with and contributing to.",
};

export default function StackPage() {
  return (
    <>
      <header className="page-hero page-hero--compact">
        <div className="site-shell page-hero__grid">
          <p className="eyebrow">The working stack</p>
          <div>
            <h1 className="page-title">Built here. Built with others.</h1>
            <p className="page-lede">
              Our stack is a workbench, not a product suite. Some projects are
              ready to use. Some are research. All of them are places to learn,
              contribute, and push agentic systems forward.
            </p>
          </div>
        </div>
      </header>

      <section className="site-shell page-section" aria-labelledby="built-here">
        <div className="section-heading">
          <p className="eyebrow" id="built-here">
            Built here
          </p>
          <p className="section-note">Current work · names and links evolving</p>
        </div>
        <div className="stack-page-grid">
          {workingProjects.map((project, index) => (
            <article className="stack-card" key={project.name}>
              <div className="stack-card__meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="stack-card__status">{project.status}</span>
              </div>
              <p className="metadata">{project.kind}</p>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <span className="stack-card__action">Project page coming soon</span>
            </article>
          ))}
        </div>
      </section>

      <section
        className="upstream-section"
        aria-labelledby="used-and-contributed"
      >
        <div className="site-shell">
          <div className="section-heading section-heading--light">
            <p className="eyebrow" id="used-and-contributed">
              Used & contributed to
            </p>
            <p className="section-note">The map is being documented</p>
          </div>
          <div className="upstream-grid">
            {upstreamAreas.map((area) => (
              <article className="upstream-card" key={area.name}>
                <span className="status-dot" aria-hidden="true" />
                <h2>{area.name}</h2>
                <p>{area.description}</p>
                <span className="metadata">Project list coming soon</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <JoinBand title="See a layer worth improving?" />
    </>
  );
}
