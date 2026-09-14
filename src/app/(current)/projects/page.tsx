import { labProjects } from "@/content/lab-projects";
import { CommunityInvitation, PageIntro } from "@/components/v2/shared";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Active Projects", "The experiments documented in the Hackers in the Loop Lab, their hardware, and how to bring your own work to the community.", "/projects");

export default function ProjectsPage() {
  return <>
    <PageIntro label="Projects / Work in progress" title="What’s on the workbench."><p>Experiments documented in the September 12, 2026 build notes. These are project records, not a live capacity dashboard; resource allocations are arranged separately.</p></PageIntro>
    <section className="v2-wrap" aria-label="Active projects"><nav className="v2-project-index" aria-label="Project index">{labProjects.map(p=><a key={p.id} href={`#${p.id}`}>{p.name} ↓</a>)}<a href="/lab#hardware">Explore all Lab hardware →</a></nav>
      {labProjects.map(project=><article className="v2-project" id={project.id} key={project.id}>
        <div><p className="v2-kicker">{project.stage}</p><h2>{project.name}</h2><p className="v2-project-question">{project.question}</p><p>{project.description}</p></div>
        <dl><div><dt>{project.id === "agent-blade" ? "Experimental board configuration" : "Documented bench hardware"}</dt><dd><ul>{project.resources.map(resource=><li key={resource}>{resource}</li>)}</ul></dd></div><div><dt>Allocation</dt><dd>{project.allocation}</dd></div><div><dt>Last documented</dt><dd>September 12, 2026</dd></div></dl>
      </article>)}
      <p className="v2-note v2-planned"><strong>Planned:</strong> the shared model gateway and community Discord bot. They are not listed as active projects.</p>
    </section>
    <section className="v2-wrap v2-section v2-goals" aria-label="Bring your own work"><article><h2>Building something of your own?</h2><p>Share it with the community, ask for feedback, or tell us what you’re learning. A compute application is not required.</p><a className="v2-link" href="/community#connect">Connect with the community →</a></article><article><h2>Need hardware for an idea?</h2><p>For open research and projects, you can request free compute time. Tell us what you want to try and which resources would help.</p><a className="v2-link" href="/lab#access">See how compute requests work →</a></article></section>
    <CommunityInvitation />
  </>;
}
