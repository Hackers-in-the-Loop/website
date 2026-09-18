import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Inspect the exported HTML: social crawlers must not need JavaScript or a server.
const routes = ["", "why", "lab", "projects", "projects/active", "projects/completed", "community"];
const titles = new Set();
const descriptions = new Set();
const urls = [];
const image = readFileSync("out/og.png");
assert.equal(image.toString("hex", 0, 8), "89504e470d0a1a0a", "Social image must be a PNG");
const width = image.readUInt32BE(16);
const height = image.readUInt32BE(20);

for (const route of routes) {
  const html = readFileSync(`out/${route ? `${route}/` : ""}index.html`, "utf8");
  const head = html.split("</head>")[0];
  const meta = new Map([...head.matchAll(/<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]*)"/g)].map(match => [match[1], match[2]]));
  const title = head.match(/<title>(.*?)<\/title>/)?.[1];
  const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.ok(title && meta.get("description"), `Missing title/description on /${route}`);
  titles.add(title);
  descriptions.add(meta.get("description"));
  assert.ok(canonical, `Missing canonical on /${route}`);
  assert.equal(new URL(canonical).pathname, route ? `/${route}/` : "/");
  urls.push(canonical);
  assert.equal(meta.get("og:url"), canonical);
  assert.equal(meta.get("og:description"), meta.get("description"));
  assert.equal(meta.get("twitter:description"), meta.get("description"));
  assert.equal(meta.get("twitter:title"), meta.get("og:title"));
  assert.equal(meta.get("twitter:card"), "summary_large_image");
  assert.equal(meta.get("og:image"), new URL("/og.png", canonical).href);
  assert.equal(meta.get("twitter:image"), meta.get("og:image"));
  assert.equal(Number(meta.get("og:image:width")), width);
  assert.equal(Number(meta.get("og:image:height")), height);
  assert.ok(meta.get("og:image:alt") && meta.get("twitter:image:alt"));
  assert.ok(!meta.get("robots")?.includes("noindex"));
  const schema = JSON.parse(head.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1]);
  assert.equal(schema["@type"], "WebSite");
  assert.equal(schema.alternateName, "HACK");
  assert.equal(schema.url, new URL("/", canonical).href);
}
assert.equal(titles.size, routes.length, "Page titles must be distinct");
assert.equal(descriptions.size, routes.length, "Page descriptions must be distinct");
const sitemap = readFileSync("out/sitemap.xml", "utf8");
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]).sort(), urls.sort());
assert.ok(readFileSync("out/robots.txt", "utf8").includes(`Sitemap: ${new URL("/sitemap.xml", urls[0]).href}`));
for (const legacy of ["manifesto", "stack"]) {
  assert.match(readFileSync(`out/${legacy}/index.html`, "utf8"), /name="robots" content="noindex/);
}
const projectIndex = readFileSync("out/projects/index.html", "utf8");
assert.match(projectIndex, /href="\/projects\/active"/);
assert.match(projectIndex, /href="\/projects\/completed"/);
assert.match(projectIndex, /TypeSafe AI Benchmark/);
assert.match(projectIndex, /ESP32 Needle 3/);
assert.match(readFileSync("out/projects/completed/index.html", "utf8"), /href="https:\/\/github.com\/iammrduncan\/esp32-fx"/);
assert.match(readFileSync("out/projects/active/index.html", "utf8"), /Ternary Bonsai 2 27B/);
console.log("SEO export checks passed: seven pages, social images, structured data, sitemap, robots, legacy exclusions, and project navigation.");
