import { labProjects, projectGroups, projectsUpdated } from "@/content/lab-projects";
import { FeaturedProjects, ProjectList } from "@/components/v2/project-list";
import { CommunityInvitation, PageIntro } from "@/components/v2/shared";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Active Projects", "Current Hackers in the Loop experiments, research, and cluster work with project leads and hardware resources.", "/projects/active");

export default function ActiveProjectsPage() {
  return <>
    <PageIntro label="Projects / Active" title="What’s on the workbench."><p>Open source software, research tools, GPU and model research, hardware experiments, and the Learning Hub. Hardware listed here is shared across projects; it does not indicate reserved capacity or available allocations.</p><p className="v2-note">Updated {projectsUpdated}.</p><div className="v2-actions"><a className="v2-button" href={siteConfig.githubUrl} target="_blank" rel="noreferrer">Explore our GitHub ↗</a><a className="v2-link" href="/projects">All projects →</a></div></PageIntro>
    <FeaturedProjects projects={labProjects} />
    <div className="v2-wrap">
      <nav className="v2-project-index" aria-label="Project groups">{projectGroups.map(group => <a key={group.id} href={`#${group.id}`}>{group.label} ↓</a>)}<a href="/lab#hardware">Explore all Lab hardware →</a></nav>
      {projectGroups.map(group => <section className="v2-project-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
        <div className="v2-project-group-heading"><h2 id={`${group.id}-title`}>{group.name}</h2><p className="v2-kicker">{labProjects.filter(project => project.group === group.id).length} {labProjects.filter(project => project.group === group.id).length === 1 ? "project" : "projects"}</p></div>
        <ProjectList projects={labProjects.filter(project => project.group === group.id)} />
      </section>)}
    </div>
    <section className="v2-wrap v2-section v2-goals" aria-label="Bring your own work"><article><h2>Building something of your own?</h2><p>Share it with the community, ask for feedback, or tell us what you’re learning. You don’t need a project or Lab access to take part.</p><a className="v2-link" href="/community#connect">Connect with the community →</a></article><article><h2>Curious what the Lab is for?</h2><p>The Lab runs open research on AI that works on affordable hardware. See the kinds of research, the hardware and how the work is checked.</p><a className="v2-link" href="/lab">Explore the Lab →</a></article></section>
    <CommunityInvitation />
  </>;
}
