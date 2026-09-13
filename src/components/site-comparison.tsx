"use client";

import { useState } from "react";

const pages = [
  { path: "", label: "Home", change: "A real build photo, less repeated welcome copy, and practical ways to take part." },
  { path: "/why", label: "Why HITL?", change: "Two clear goals up front, a structured founder story, and consistent wording about compute requests." },
  { path: "/lab", label: "Lab", change: "Clear access status, earlier application expectations, direct support contacts, and the full inventory, story, and power calculator." },
  { path: "/projects", label: "Projects", change: "A project index, consistent hardware and documentation fields, and separate paths for sharing work and requesting compute." },
  { path: "/community", label: "Community", change: "An honest route to ask about joining, founder contact beside the Discord note, and your seven rules preserved." },
] as const;

export function SiteComparison() {
  const [pageIndex, setPageIndex] = useState(0);
  const [view, setView] = useState<"both" | "original" | "v2">("both");
  const page = pages[pageIndex];
  const original = page.path || "/";
  const revised = `/v2${page.path}`;
  return <>
    <div className="compare-controls">
      <label>Page<select value={pageIndex} onChange={e => setPageIndex(Number(e.target.value))}>{pages.map((p,i)=><option value={i} key={p.label}>{p.label}</option>)}</select></label>
      <fieldset><legend>View</legend>{([['both','Side by side'],['original','Original'],['v2','V2']] as const).map(([value,label])=><button type="button" key={value} aria-pressed={view === value} onClick={()=>setView(value)}>{label}</button>)}</fieldset>
    </div>
    <p className="compare-change" aria-live="polite"><strong>{page.label}:</strong> {page.change}</p>
    <p className="compare-hint">Each preview fits its column. Open either version for a full-width view. On a small screen, use Original and V2 to switch between them.</p>
    <div className={`compare-previews ${view === 'both' ? 'compare-previews--both' : ''}`}>
      {view !== 'v2' && <section className="compare-preview" aria-label="Original version"><div><h2>Original</h2><a href={original} target="_blank" rel="noreferrer">Open original ↗</a></div><iframe key={`original-${page.path}`} src={original} title={`Original ${page.label} page`} /></section>}
      {view !== 'original' && <section className="compare-preview" aria-label="Version 2"><div><h2>V2</h2><a href={revised} target="_blank" rel="noreferrer">Open V2 ↗</a></div><iframe key={`v2-${page.path}`} src={revised} title={`V2 ${page.label} page`} /></section>}
    </div>
  </>;
}
