import type { LabProject } from "@/content/lab-projects";
import { siteConfig } from "@/lib/site";

export function ProjectList({ projects }: { projects: LabProject[] }) {
  return <>{projects.map(project => <article className="v2-project" id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
    <div><p className="v2-kicker">{project.stage}</p><h3 id={`${project.id}-title`}>{project.name}</h3><p>{project.description}</p>{[...(project.link ? [project.link] : []), ...(project.links ?? [])].map(link => <a className="v2-link v2-project-external" href={link.url} target="_blank" rel="noreferrer" key={link.url}>{link.label} ↗</a>)}</div>
    <dl><div><dt>Project lead</dt><dd>{project.lead ? project.lead : <a className="v2-project-lead" href={siteConfig.xUrl} target="_blank" rel="noreferrer">Shannon Duncan ↗</a>}</dd></div><div><dt>Hardware & resources</dt><dd><ul>{project.resources.map(resource => <li key={resource}>{resource}</li>)}</ul></dd></div>{project.target && <div><dt>Working toward</dt><dd>{project.target}</dd></div>}</dl>
  </article>)}</>;
}
