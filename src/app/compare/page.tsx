import type { Metadata } from "next";
import { SiteComparison } from "@/components/site-comparison";
import "./compare.css";

export const metadata: Metadata = { title: "Compare original and V2", description: "Compare the original HITL site with a revised version informed by website, community, and stewardship reviews.", robots: { index: false, follow: false }, openGraph: { images: [] }, twitter: { images: [] } };

export default function ComparisonPage() {
  return <main id="main-content" className="compare-page" tabIndex={-1}>
    <header className="compare-header"><div><p>Hackers in the Loop / Website review</p><h1>HITL, before and after.</h1></div><a href="/v2">Explore V2 →</a></header>
    <p className="compare-intro">The original site is preserved at its existing addresses. V2 puts the findings from three specialist AI reviews into practice, using the same brand, photographs, and documented facts.</p>
    <SiteComparison />
    <details className="compare-findings"><summary>What the three reviews found</summary><div className="compare-review-grid">
      <section><h2>Website experience</h2><p>The homepage repeated the invitation before showing real people or work. Mobile navigation wrapped awkwardly, and longer pages buried useful actions.</p><p><strong>V2:</strong> real photography up front, a compact mobile menu, clearer page structure, and direct links to the next useful step.</p></section>
      <section><h2>Community building</h2><p>“Join the community” led to a missing public invite. Newcomers needed clearer ways to participate without applying for compute.</p><p><strong>V2:</strong> a truthful “Connect with HITL” path, direct founder contacts, examples of first conversations, and a separate invitation to share projects.</p></section>
      <section><h2>Stewardship & support</h2><p>The equipment was well documented, but applicants and supporters had to piece together availability, expectations, and whom to contact.</p><p><strong>V2:</strong> consistent access status, grant expectations before the form, clearer project records, and concrete hardware and hosting conversations.</p></section>
    </div><p className="compare-open-items"><strong>Still needs real-world input:</strong> a public Discord invite, confirmed project updates and allocations, and detailed hosting requirements. V2 does not invent these or imply nonprofit status, guaranteed compute, or impact statistics.</p></details>
  </main>;
}
