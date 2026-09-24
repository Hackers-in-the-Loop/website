import { labProjects, projectGroups, projectsUpdated } from "@/content/lab-projects";
import { ProjectList } from "@/components/v2/project-list";
import { CommunityInvitation, PageIntro } from "@/components/v2/shared";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Active Projects", "Current Hackers in the Loop experiments, research, and cluster work with project leads and hardware resources.", "/projects/active");

export default function ActiveProjectsPage() {
  return <>
    <PageIntro label="Projects / Active" title="What’s on the workbench."><p>Open source software, model research, hardware experiments, cluster infrastructure, and a book series. Hardware listed here is shared across projects; it does not indicate reserved capacity or available allocations.</p><p className="v2-note">Updated {projectsUpdated}.</p><div className="v2-actions"><a className="v2-button" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">Explore our GitHub ↗</a><a className="v2-link" href="/projects">All projects →</a></div></PageIntro>
    <div className="v2-wrap">
      <nav className="v2-project-index" aria-label="Project groups">{projectGroups.map(group => <a key={group.id} href={`#${group.id}`}>{group.label} ↓</a>)}<a href="/lab#hardware">Explore all Lab hardware →</a></nav>
      {projectGroups.map(group => <section className="v2-project-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
        <div className="v2-project-group-heading"><h2 id={`${group.id}-title`}>{group.name}</h2><p className="v2-kicker">{labProjects.filter(project => project.group === group.id).length} {labProjects.filter(project => project.group === group.id).length === 1 ? "project" : "projects"}</p></div>
        <ProjectList projects={labProjects.filter(project => project.group === group.id)} />
      </section>)}
    </div>
    <section className="v2-wrap v2-section v2-goals" aria-label="Bring your own work"><article><h2>Building something of your own?</h2><p>Share it with the community, ask for feedback, or tell us what you’re learning. A compute application is not required.</p><a className="v2-link" href="/community#connect">Connect with the community →</a></article><article><h2>Need hardware for an idea?</h2><p>For open research and projects, you can request free compute time. Tell us what you want to try and which resources would help.</p><a className="v2-link" href="/lab#access">See how compute requests work →</a></article></section>
    <CommunityInvitation />
  </>;
}
