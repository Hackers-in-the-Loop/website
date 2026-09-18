import { completedProjects, labProjects, projectsUpdated } from "@/content/lab-projects";
import { CommunityInvitation, PageIntro } from "@/components/v2/shared";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Projects", "Explore active experiments and completed work from Hackers in the Loop, including the hardware used for each project.", "/projects");

export default function ProjectsPage() {
  return <>
    <PageIntro label="Projects" title="What we’re building."><p>Explore current work and projects that have reached a completed milestone. Each project page includes its lead, resources, and links where available.</p><p className="v2-note">Updated {projectsUpdated}.</p></PageIntro>
    <div className="v2-wrap v2-project-choices">
      {[
        { href: "/projects/active", title: "Active projects", cta: "View active projects", projects: labProjects, copy: "Experiments, research, and infrastructure work in progress." },
        { href: "/projects/completed", title: "Completed projects", cta: "View completed projects", projects: completedProjects, copy: "Finished builds and prototypes. Follow-on work can still continue." },
      ].map(choice => <section className="v2-project-choice" key={choice.href}>
        <p className="v2-kicker">{choice.projects.length} projects</p>
        <h2><a href={choice.href}>{choice.title} →</a></h2>
        <p>{choice.copy}</p>
        <ul>{choice.projects.map(project => <li key={project.id}>{project.name}</li>)}</ul>
        <a className="v2-link v2-project-choice-cta" href={choice.href}>{choice.cta} →</a>
      </section>)}
    </div>
    <CommunityInvitation />
  </>;
}
