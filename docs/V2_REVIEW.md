# HITL V2 review and comparison

Prepared September 13, 2026. Baseline: `01cde5ff4cd55dbb066d1e1caafc288a45d6b77f`.

## Deliverables

- `/`: original site, with its original page URLs, copy, links, images, and styling.
- `/v2`: revised Home, Why, Lab, Projects, and Community pages.
- `/compare`: page selector, side-by-side previews, single-version views, full-page links, and review summary.

The existing public Site is reused. V2 and the comparison request no search indexing. They are comparison candidates; the original remains the default homepage. No access settings are changed.

## Reviews and decisions

Three independent AI reviewers examined the current repository and project context from website UX/accessibility, community-building, and nonprofit/community-resource stewardship perspectives. The website reviewer also examined the original rendered site at desktop and mobile sizes. All three performed a second source review of V2. They were reviewers, not hired human consultants or legal advisers.

| Finding | Implemented in V2 |
| --- | --- |
| The main join action led to an unpublished Discord invite with no clear next step. | Conditional “Connect with HITL” action; direct Shannon X/LinkedIn contacts beside the invite note. A real configured invite still enables Join Discord. |
| Belonging language repeated across large homepage blocks. | Keep the core purpose; show the real father/daughter photo and three concrete ways to participate. |
| Community and compute requirements could seem entangled. | Explicitly separate participation from requests for hardware; Projects has both a community path and a compute path. |
| Why described compute as in preparation while Lab said requests were open. | Equipment built, proposals open, shared access being set up; review and capacity requirements explained consistently. |
| Lab applicants reached the form before reading expectations. | Project, resource, open-work, public-results and tagging requirements precede the external form link. |
| Support inquiries ended at a generic join section. | Dedicated Lab support section with existing direct founder contacts, concrete hardware/hosting/power conversations, and links to cost assumptions. |
| Project cards mixed experimental configurations and booked resources. | Clear configuration labels, founder lead, documentation date, separate allocation notes, and planned work outside active cards. |
| Rules and the founder story were difficult to scan. | Rules retain their exact seven-item text; biography paragraphs retain their text with modest subheads; existing founder contacts added alongside it. |
| Mobile header wrapped a navigation item onto an extra row. | Compact disclosure navigation, visible expanded state and a connection action in the menu. |
| Compare link could recursively load another comparison within an embedded preview. | V2 comparison banner explicitly navigates the top-level page. |

## Preserved facts and boundaries

- The Lab inventory remains the dated September 12 record. Three separate Sparks, one GPU dock, GPU spares, experimental Agent Blade, and NAS capacity retain their distinctions.
- Replacement cost remains $29,749 ($28,244 + $1,505), dated September 11–12; it is not described as spending, a fundraising target, or donation valuation.
- Power calculator, source data, default $49.38 estimate, exact table values, exclusions, and projected populated Agent Blade assumption are retained.
- All six selected photographs, the full build story, resource-request form, and inventory/cost/power downloads remain available.
- No nonprofit status, tax deductibility, guaranteed compute, grants awarded, membership statistics, live usage, sponsorship, events, or contributor openings are invented.
- Raw synced notes stay read-only and private. Public copy uses approved founder/rules text and relevant operational facts; no raw handoff document is published.
- No em dashes are added. No old tagline, footer slogan, or site-source footer link is restored in V2.

## Implementation

Original pages moved unchanged into the `(current)` route group so each version can have independent site navigation and presentation. URL paths remain unchanged. Original header/footer and global styles are retained. V2 styles are scoped beneath `.v2-site`; the existing power calculator and compressed images are reused. Navigation uses native links to preserve the earlier hosted navigation fix.

The comparison is an actual two-version browser view, not screenshots. Each pane is responsive to its column; single-version controls and direct full-page links allow wider inspection. Public-facing review notes distinguish implemented improvements from missing operational input.

## Validation

- The seven original page files match the baseline byte-for-byte after relocation.
- All five principal original routes rendered with exactly the same text, links, and image attributes as captured before edits.
- All original and V2 routes, plus the comparison route, rendered successfully locally.
- V2 internal section links resolve; original legacy `/stack` retains its pre-existing `#start-building` link to Community because the baseline is preserved for comparison. V2 does not link to that legacy route.
- Independent second community review confirmed exact rules and biography paragraph fidelity.
- Independent second stewardship review found no material factual blockers.
- Browser checks cover all five V2 pages at 320, 768, and 1440 CSS pixels; no horizontal overflow and one main landmark per page.
- Mobile menu opening and navigation, comparison controls/embedded navigation, and calculator behavior are checked in the browser.
- Existing nine tests cover Discord URL validation and power calculations. Type checking and production build are required before publishing.

## Still needs founder input

A published Discord invite; new dated project updates and confirmed allocations; detailed physical, power, cooling, network, and maintenance requirements for a hosting arrangement. These cannot be created by copy or design changes.
