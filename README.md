# Hackers in the Loop

Website and brand source for **Hackers in the Loop**, an open-source hackerspace for the systems beneath agentic software.

> Keep intelligence hackable.

The site uses the Next.js App Router through Vinext, Vite, and the existing Sites/Cloudflare integration. The approved logo artwork stays in `brand/` and `public/brand/`.

## Run locally on port 9854

Use Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open [http://localhost:9854](http://localhost:9854). The server binds to `0.0.0.0`, so it is also reachable on your machine’s network address.

For a production build:

```bash
npm run build
npm start
```

Both development and production default to port **9854**. Stop the running server with Ctrl+C before switching modes.

## Community links and metadata

Environment configuration is optional for local development:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_DISCORD_URL`: leave blank until there is a real permanent invite. Standard HTTPS Discord invites are accepted. Missing, malformed, and example values keep the site’s “Get involved” action pointed at the Community page, which offers GitHub as the available contribution path. Valid syntax does not establish whether Discord has expired or revoked an invite; check it in a browser before publishing.
- `NEXT_PUBLIC_SITE_URL`: the origin for canonical and social links. Defaults to `http://localhost:9854`. Set it to the actual production origin before a production build.

Restart development after changing environment values; rebuild and restart production. Keep secrets out of `NEXT_PUBLIC_*` values.

The existing `.openai/hosting.json` identifies the Sites project. A local build or server start does not publish a new version to that hosted site.

## Pages

- **Home** — the purpose, human control in agent systems, and a path into the work
- **Manifesto** — eight principles, practical commitments, and a linked reading index
- **The work** (`/stack`) — six project briefs, questions, and expandable experiments
- **Community** — an available contribution path, planned Discord space, and guidance for a first contribution

Project briefs describe the work without promising releases or support. Add public repository links and confirmed stewardship information in `src/lib/site.ts` when available.

## Direction and content

- [Community direction workbook](docs/COMMUNITY_DIRECTION.md) — recommended focus, manifesto prompts, governance decisions, and a proposed 90-day experiment
- [Website review](docs/WEBSITE_REVIEW.md) — findings, changes, verification, and remaining decisions
- [Manifesto](MANIFESTO.md) — readable source in the repository
- `src/content/manifesto.ts` — the same manifesto rendered by the site, including stable section IDs and “In practice” statements; keep both versions in sync when changing the text
- `src/lib/site.ts` — shared navigation, public links, and project briefs

## Check changes

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The focused tests cover invite validation and metadata origins. Also inspect the built site on desktop and mobile when changing layouts, navigation, or copy.

## Brand

- [Brand asset guide](brand/README.md)
- [Usage guidelines](brand/guidelines.md)
- [Brand strategy](brand/strategy.md)
- [Design tokens](brand/tokens.css)
- [Self-hosted fonts and licenses](public/fonts/README.md)

The production SVG wordmarks use vector outlines. Website typography uses locally served Inter Tight, Inter, and IBM Plex Mono; it does not depend on a third-party font request.
