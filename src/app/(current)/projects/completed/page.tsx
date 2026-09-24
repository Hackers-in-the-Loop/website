import { completedProjects, projectsUpdated } from "@/content/lab-projects";
import { ProjectList } from "@/components/v2/project-list";
import { CommunityInvitation, PageIntro } from "@/components/v2/shared";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Completed Projects", "Finished and closed Hackers in the Loop projects, including completed research, retired experiments, leads, resources, and source links.", "/projects/completed");

export default function CompletedProjectsPage() {
  return <>
    <PageIntro label="Projects / Completed" title="Finished and closed."><p>Completed builds and research live here alongside projects that were retired or folded into other work. Each entry states how it ended.</p><p className="v2-note">Updated {projectsUpdated}.</p><div className="v2-actions"><a className="v2-link" href="/projects">All projects →</a><a className="v2-link" href="/projects/active">Active projects →</a></div></PageIntro>
    <section className="v2-wrap v2-project-group" aria-label="Completed projects"><ProjectList projects={completedProjects} /></section>
    <CommunityInvitation />
  </>;
}
