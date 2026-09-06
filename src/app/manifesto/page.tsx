import { JoinBand } from "@/components/join-band";
import { manifesto } from "@/content/manifesto";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Manifesto",
  "Keep intelligence hackable. Eight principles for building open agent systems with people in the architecture.",
  "/manifesto",
);

export default function ManifestoPage() {
  return (
    <>
      <header className="page-hero">
        <div className="site-shell page-hero__grid">
          <div>
            <p className="eyebrow">The manifesto</p>
            <p className="page-aside">A working statement · Eight principles</p>
          </div>
          <div>
            <h1 className="page-title page-title--manifesto">
              {manifesto.title}
            </h1>
            <div className="page-signal" aria-hidden="true" />
          </div>
        </div>
      </header>
      <article className="site-shell manifesto-page">
        <div className="manifesto-intro">
          <p className="metadata">Our position</p>
          <div>
            {manifesto.introduction.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="manifesto-layout">
          <nav className="manifesto-index" aria-label="Manifesto principles">
            <p className="eyebrow">The principles</p>
            {manifesto.principles.map((principle, index) => (
              <a key={principle.id} href={`#${principle.id}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {principle.title}
              </a>
            ))}
          </nav>
          <ol className="manifesto-list">
            {manifesto.principles.map((principle, index) => (
              <li
                className="manifesto-item"
                id={principle.id}
                key={principle.id}
              >
                <span className="manifesto-item__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2>{principle.title}</h2>
                {principle.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="manifesto-practice">
                  <h3 className="metadata">In practice</h3>
                  <p>{principle.practice}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="manifesto-closing">
          <p className="eyebrow">The invitation</p>
          {manifesto.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
      <JoinBand title="Do the work in good company." />
    </>
  );
}
