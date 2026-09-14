import { labProjects, projectGroups, projectsUpdated } from "@/content/lab-projects";
import { CommunityInvitation, PageIntro } from "@/components/v2/shared";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Active Projects", "The experiments documented in the Hackers in the Loop Lab, their hardware, and how to bring your own work to the community.", "/projects");

export default function ProjectsPage() {
  return <>
    <PageIntro label="Projects / Work in progress" title="What’s on the workbench."><p>Open source software, model research, hardware experiments, and the infrastructure that supports them. Hardware listed here is shared across projects; it does not indicate reserved capacity or available allocations.</p><p className="v2-note">Updated {projectsUpdated}.</p><div className="v2-actions"><a className="v2-button" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">Explore our GitHub ↗</a></div></PageIntro>
    <div className="v2-wrap">
      <nav className="v2-project-index" aria-label="Project groups">{projectGroups.map(group => <a key={group.id} href={`#${group.id}`}>{group.label} ↓</a>)}<a href="/lab#hardware">Explore all Lab hardware →</a></nav>
      {projectGroups.map(group => <section className="v2-project-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
        <div className="v2-project-group-heading"><h2 id={`${group.id}-title`}>{group.name}</h2><p className="v2-kicker">{labProjects.filter(project => project.group === group.id).length} projects</p></div>
        {labProjects.filter(project => project.group === group.id).map(project => <article className="v2-project" id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
          <div><p className="v2-kicker">{project.stage}</p><h3 id={`${project.id}-title`}>{project.name}</h3><p>{project.description}</p>{project.link && <a className="v2-link v2-project-external" href={project.link.url} target="_blank" rel="noreferrer">{project.link.label} ↗</a>}</div>
          <dl><div><dt>Project lead</dt><dd>{project.lead ? project.lead : <a className="v2-project-lead" href={siteConfig.xUrl} target="_blank" rel="noreferrer">Shannon Duncan ↗</a>}</dd></div><div><dt>Hardware & resources</dt><dd><ul>{project.resources.map(resource => <li key={resource}>{resource}</li>)}</ul></dd></div>{project.target && <div><dt>Working toward</dt><dd>{project.target}</dd></div>}</dl>
        </article>)}
      </section>)}
    </div>
    <section className="v2-wrap v2-section v2-goals" aria-label="Bring your own work"><article><h2>Building something of your own?</h2><p>Share it with the community, ask for feedback, or tell us what you’re learning. A compute application is not required.</p><a className="v2-link" href="/community#connect">Connect with the community →</a></article><article><h2>Need hardware for an idea?</h2><p>For open research and projects, you can request free compute time. Tell us what you want to try and which resources would help.</p><a className="v2-link" href="/lab#access">See how compute requests work →</a></article></section>
    <CommunityInvitation />
  </>;
}
