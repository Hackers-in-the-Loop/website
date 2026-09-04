import type { Metadata } from "next";
import { JoinBand } from "@/components/join-band";
import { manifesto } from "@/content/manifesto";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Why Hackers in the Loop builds agentic systems in the open, from first principles, with people in the architecture.",
};

export default function ManifestoPage() {
  return (
    <>
      <header className="page-hero">
        <div className="site-shell page-hero__grid">
          <p className="eyebrow">The manifesto · 2026</p>
          <div>
            <h1 className="page-title">{manifesto.title}</h1>
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

        <ol className="manifesto-list">
          {manifesto.principles.map((principle, index) => (
            <li className="manifesto-item" key={principle.title}>
              <span className="manifesto-item__number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="manifesto-item__body">
                <h2>{principle.title}</h2>
                {principle.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>

        <div className="manifesto-closing">
          <p className="eyebrow">The invitation</p>
          {manifesto.closing.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <JoinBand title="Do the hard work in good company." />
    </>
  );
}
