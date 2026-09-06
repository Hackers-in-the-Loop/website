import Link from "next/link";
import { JoinBand } from "@/components/join-band";
import { workingProjects, siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "The work",
  "Explore the runtimes, portable components, authority boundaries, and hardware experiments on the Hackers in the Loop workbench.",
  "/stack",
);

export default function StackPage() {
  return (
    <>
      <header className="page-hero">
        <div className="site-shell page-hero__grid">
          <p className="eyebrow">The work / Open workbench</p>
          <div>
            <h1 className="page-title">
              Many layers.
              <br />
              One open workbench.
            </h1>
            <p className="page-lede">
              From the permissions around a tool call to the hardware beneath
              it. These are the systems we want to understand and the questions
              we are working through.
            </p>
          </div>
        </div>
      </header>

      <section
        className="site-shell page-section"
        aria-labelledby="project-notes"
      >
        <div className="section-heading">
          <h2 className="eyebrow" id="project-notes">
            Project notes
          </h2>
          <p className="section-note">
            Briefs & experiments / Repository links as they become available
          </p>
        </div>
        <nav className="project-index" aria-label="Jump to a project">
          {workingProjects.map((project) => (
            <a key={project.id} href={`#${project.id}`}>
              {project.name} <span aria-hidden="true">↓</span>
            </a>
          ))}
        </nav>
        <div className="project-list">
          {workingProjects.map((project, index) => (
            <article className="project-row" id={project.id} key={project.id}>
              <span className="project-row__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="project-row__title">
                <p className="metadata">{project.kind}</p>
                <h3>{project.name}</h3>
              </div>
              <div className="project-row__body">
                <p>{project.detail}</p>
                <p className="project-row__question">{project.question}</p>
                <details className="experiment">
                  <summary>
                    Try a small experiment <span aria-hidden="true">+</span>
                  </summary>
                  <div>
                    <p>{project.experiment}</p>
                    <Link
                      className="text-link"
                      href="/community#start-building"
                    >
                      How to share your work <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>
        <div className="source-note">
          <div>
            <p className="eyebrow">A contribution you can make today</p>
            <h2>This site is part of the work.</h2>
            <p>
              Make the invitation clearer. Improve accessibility. Turn a
              confusing paragraph into a useful explanation.
            </p>
          </div>
          <a
            className="button button--primary"
            href={siteConfig.repositoryUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open the source ↗
          </a>
        </div>
      </section>
      <JoinBand title="Pull on a thread." />
    </>
  );
}
