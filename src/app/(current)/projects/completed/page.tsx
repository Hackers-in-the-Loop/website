import { completedProjects, projectsUpdated } from "@/content/lab-projects";
import { ProjectList } from "@/components/v2/project-list";
import { CommunityInvitation, PageIntro } from "@/components/v2/shared";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Completed Projects", "Completed Hackers in the Loop builds and prototypes, with their leads, hardware resources, and source links.", "/projects/completed");

export default function CompletedProjectsPage() {
  return <>
    <PageIntro label="Projects / Completed" title="Built and shared."><p>These projects have reached a completed milestone. Related research may continue on the active projects page.</p><p className="v2-note">Updated {projectsUpdated}.</p><div className="v2-actions"><a className="v2-link" href="/projects">All projects →</a><a className="v2-link" href="/projects/active">Active projects →</a></div></PageIntro>
    <section className="v2-wrap v2-project-group" aria-label="Completed projects"><ProjectList projects={completedProjects} /></section>
    <CommunityInvitation />
  </>;
}
