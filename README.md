# Hackers in the Loop

Website and brand source for **Hackers in the Loop**, an open-source community building the systems beneath agentic software.

> Open source for agentic systems.

This repository contains the community website, manifesto, and approved identity system. The site is built with Next.js and the App Router.

## Pages

- Home — the mission, working stack, and invitation to join
- Manifesto — the principles behind the community
- Stack — projects built here and the open systems we build with
- Community — Discord information and places to follow the work

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The Discord link falls back to the Community page until `NEXT_PUBLIC_DISCORD_URL` is configured with a permanent invite. Set `NEXT_PUBLIC_SITE_URL` to the production origin before deployment so shared links use the canonical URL.

Before submitting changes:

```bash
npm run lint
npm run build
```

## Brand

- [Brand asset guide](brand/README.md)
- [Usage guidelines](brand/guidelines.md)
- [Brand strategy](brand/strategy.md)
- [Design tokens](brand/tokens.css)

The production SVG wordmarks are converted to vector outlines. They do not depend on an installed font and will render identically in browsers, design tools, CI, and image exports.

## Content

- [Manifesto source](MANIFESTO.md)
- Site copy lives in `src/content` and `src/lib`
