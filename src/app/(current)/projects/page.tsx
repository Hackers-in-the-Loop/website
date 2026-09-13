import Link from "@/components/site-link";
import { labProjects } from "@/content/lab-projects";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Active Projects", "Explore projects being built and researched in the HITL Lab, with their documented hardware resources and allocation notes.", "/projects");

export default function ProjectsPage() {
  return (
    <section className="work-section projects-page" aria-labelledby="projects-title">
      <div className="site-shell">
        <div className="section-heading section-heading--light"><div><p className="eyebrow">Work in progress</p><h1 className="section-title" id="projects-title">Active projects.</h1></div><p className="lab-section-note">Founder-led experiments documented in the September 12 build notes. These are project updates, not live utilization readings.</p></div>
        <Link className="text-link projects-lab-link" href="/lab">Explore the Lab & hardware →</Link>
        <div className="lab-projects">
          {labProjects.map((project) => <article className="lab-project" key={project.id} id={project.id}>
            <p className="metadata">{project.stage}</p><h2>{project.name}</h2><p className="lab-project__question">{project.question}</p><p>{project.description}</p>
            <h3>Resources</h3><ul>{project.resources.map((resource) => <li key={resource}>{resource}</li>)}</ul><p className="lab-fineprint">{project.allocation}</p>
          </article>)}
        </div>
        <p className="lab-section-note lab-projects-note">The shared model gateway and community Discord bot remain planned. A project’s presence here does not indicate spare capacity or an open allocation.</p>
        <a className="text-link" href={siteConfig.labRequestUrl} target="_blank" rel="noreferrer">Propose a project for the Lab ↗</a>
      </div>
    </section>

  );
}
