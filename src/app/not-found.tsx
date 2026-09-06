import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="site-shell page-hero__grid">
        <p className="eyebrow">404 / Page not found</p>
        <div>
          <h1 className="page-title">A loose thread.</h1>
          <p className="page-lede">
            This page is missing. There is more to explore back at the
            workbench.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" href="/">
              Back to home →
            </Link>
            <Link className="button" href="/stack">
              Explore the work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
