# Hackers in the Loop

A community for people building with technology, learning about it, or finding their footing in tech. The compact brand mark is HACK.

## Development

Use Node.js 22.13 or newer. Run `npm ci` and `npm run dev`. The local site uses port 9854. `npm run build` creates the production build.

The Next.js App Router runs through Vinext and the existing Sites integration. `.openai/hosting.json` identifies the existing Site. Do not create a replacement Site when publishing edits.

## Current site

The selected V2 design is the main site:

- `/`: Community purpose and ways to participate.
- `/why`: Shared purpose and the founder's own story.
- `/lab`: Hardware, compute requests, support, operating estimates, and the build journey.
- `/projects`: Documented experiments and their hardware.
- `/community`: Discord, contact links, and community rules.

Old `/v2` links redirect to the matching primary page. `/compare`, `/manifesto`, and `/stack` redirect to the current experience. Previous designs remain in Git history.

Primary pages live under `src/app/(current)`. Shared design components and styles remain under `src/components/v2`. Native navigation links are intentional for compatibility with the hosted runtime.

## Maintained content

- `src/lib/site.ts`: Public Discord invite, application form, and contact links. The supplied Discord invite appears on the Community page and in the footer. “Join community” calls to action lead to `/community`. Footer social links are Discord and X; GitHub is linked from Projects.
- `src/content/lab-projects.ts`: Project records and experimental resource configurations.
- `src/content/v2/hardware.ts`: On-page hardware summary.
- `src/content/lab-inventory.json`: Itemized inventory, costs, power group mappings, and references. Both the calculator and workbook use this registry.
- `docs/LAB_INVENTORY.md`: How to update and regenerate the combined inventory workbook.

The inventory and estimates describe documented equipment, not live capacity or guaranteed allocations. Compute access is arranged after review. Keep personal narrative in the founder section and Lab build journey.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin for production metadata. Never put secrets in `NEXT_PUBLIC_*` values.

## Brand

Current SVGs are in `public/brand/`. The header and hero stay cream, the body is neutral off-white (#fdfdfd), and the footer is brand black (#111315). The HACK badge and infinity motif preserve the existing colors and outlined wordmark. Only the hero motif animates, with an illuminated orange track and tapered trail on black; reduced-motion users receive the static version. The large Lab application section is black with an orange button; smaller invitation banners stay orange. Header and footer badges are static. `public/brand/hack-discord-icon.png` is the 512 × 512 Discord icon export. The favicon uses the static infinity mark.

Earlier exports under `brand/assets` and `brand/reference` are historical and must not be reused as current branding. The former abbreviation and tagline have been retired. Fonts remain locally served Inter Tight, Inter, and IBM Plex Mono.

## Verification

Run `npm run typecheck`, `npm test`, and the production build. Review mobile navigation, responsive layouts, compute calculator, and the workbook download when editing those surfaces.
