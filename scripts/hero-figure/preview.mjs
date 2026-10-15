// Writes a standalone preview of the hero card for checking the figure outside Next:
//   node scripts/hero-figure/preview.mjs <out-dir>
// then serve <out-dir> over HTTP (the page fetches the SVG, as the site does). It runs the same
// engine, model and data modules as the site, with their TypeScript types stripped.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const SRC = join(ROOT, "src", "components", "hero-figure");
const out = process.argv[2];
if (!out) {
  console.error("usage: node scripts/hero-figure/preview.mjs <out-dir>");
  process.exit(1);
}
mkdirSync(join(out, "hero-figure"), { recursive: true });

for (const name of ["model", "engine", "hero-data"]) {
  const code = stripTypeScriptTypes(readFileSync(join(SRC, `${name}.ts`), "utf8"), { mode: "strip" }).replace(/from "\.\/([a-z-]+)"/g, 'from "./$1.js"');
  writeFileSync(join(out, `${name}.js`), code);
}
copyFileSync(join(ROOT, "public", "hero-figure", "hero-figure.svg"), join(out, "hero-figure", "hero-figure.svg"));
copyFileSync(join(SRC, "hero-figure.css"), join(out, "hero-figure.css"));

const data = readFileSync(join(SRC, "hero-data.ts"), "utf8");
const src = data.match(/HERO_SRC = "([^"]+)"/)[1];

writeFileSync(
  join(out, "index.html"),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Hero figure preview</title>
<link rel="stylesheet" href="hero-figure.css">
<style>
:root{--carbon:#111315;--paper:#f4f2ea;--font-mono:"IBM Plex Mono",Menlo,Monaco,monospace}
*{box-sizing:border-box}body{margin:0;background:var(--paper);font-family:system-ui,sans-serif}
.wrap{display:grid;grid-template-columns:1.1fr .9fr;gap:5rem;align-items:center;max-width:1240px;margin:0 auto;padding:4rem 3.5rem}
.copy h1{font-size:4rem;line-height:1;margin:0}
.v2-home-mark{width:100%;max-width:480px;aspect-ratio:1;display:flex;align-items:center;padding:clamp(1rem,3vw,2rem);background:radial-gradient(ellipse at 52% 46%,#271918 0%,var(--carbon) 66%);border:1px solid #303236;border-radius:1.25rem;box-shadow:0 22px 45px -30px #11131580,inset 0 1px 0 #ffffff0d;justify-self:center}
@media (max-width:760px){.wrap{grid-template-columns:1fr;gap:2rem;padding:2.5rem 1.25rem}.v2-home-mark{max-width:300px}}
</style></head><body><div class="wrap"><div class="copy"><h1>A place to belong in tech.</h1></div>
<div class="v2-home-mark hf-card">
<span class="hf-corner" data-corner="fig" aria-hidden="true">Fig 1</span>
<span class="hf-corner" data-corner="title" aria-hidden="true">In the loop</span>
<div class="hf-stage" role="button" tabindex="0" aria-label="Marble run"><img class="hf-still" src="${src.slice(1)}" alt="" width="480" height="480"><div class="hf-host"></div></div>
<span class="hf-corner" data-corner="hint" aria-hidden="true">Press to drop one in</span>
<span class="hf-corner" data-corner="readout" aria-hidden="true" data-readout></span>
<span class="hf-sr" aria-live="polite"></span>
</div></div>
<script type="module">
import { startHero } from "./engine.js";
import { HERO_DATA } from "./hero-data.js";
import { initialState, readoutOf } from "./model.js";
const card = document.querySelector(".hf-card");
const stage = card.querySelector(".hf-stage");
const host = card.querySelector(".hf-host");
const readout = card.querySelector("[data-readout]");
const live = card.querySelector(".hf-sr");
readout.textContent = readoutOf(HERO_DATA, initialState(HERO_DATA));
if (!location.search.includes("still")) {
  const text = await (await fetch(${JSON.stringify(src.slice(1))})).text();
  host.innerHTML = text;
  const svg = host.querySelector("svg");
  svg.setAttribute("aria-hidden", "true");
  stage.dataset.live = "";
  const hero = startHero(svg, HERO_DATA, { readout: (t) => (readout.textContent = t), announce: (t) => (live.textContent = t) });
  stage.addEventListener("click", () => hero.drop());
  stage.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hero.drop(); } });
  window.__hero = hero;
}
</script></body></html>
`,
);
console.log("wrote preview to", out);
