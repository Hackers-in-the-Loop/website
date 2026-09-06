# Website review

September 5, 2026 · Local update for port 9854

## Direction

The strongest position in the existing material is an open-source workshop for the systems beneath AI agents. The identity already supports it. The main gap was a practical path between reading the mission and participating in the work.

The revised site puts three questions in reach: **what is this place, what can I explore, and what can I do next?** The [community direction workbook](COMMUNITY_DIRECTION.md) develops the choices behind that approach. It contains proposals for discussion, not a newly ratified governance policy.

## Findings and changes

| Finding                                                                                        | Change                                                                                                                   |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| The mission was prominent, but the role of people in agent systems remained abstract           | Added a readable diagram connecting intent, visible execution, intervention, and shared learning                         |
| The homepage repeated project names and declarations without a clear route into the work       | Linked project previews to substantive briefs and experiments                                                            |
| Cards promised project pages and upstream lists that were not present                          | Replaced placeholders and unverified readiness labels with useful project notes; retained the six existing project names |
| “Join” could lead to an unavailable Discord invitation, including the example `replace-me` URL | Validated invite configuration, removed the fake example URL, and made GitHub the available contribution path            |
| The community page described a planned chat structure as if it were operating                  | Clearly distinguished available GitHub participation from the planned Discord space                                      |
| The invitation could imply contributors needed impressive finished work                        | Welcomed questions, reproductions, diagrams, explanations, and small improvements                                        |
| Long manifesto reading required continuous scrolling                                           | Added stable section links, a desktop reading index, a mobile index, and a practical commitment for each principle       |
| Mobile navigation crowded the join button into the navigation row                              | Separated the brand/action row from the three navigation links on small screens                                          |
| Navigation did not indicate the current page                                                   | Added an active state and `aria-current`, including after client navigation                                              |
| Typography depended on whichever local fonts were available                                    | Added the recommended brand fonts as small local WOFF2 assets with licenses                                              |
| Default metadata could fail on malformed origins or use example addresses                      | Validated the site origin and added route-specific canonical and social metadata                                         |
| Unknown routes used a generic error page                                                       | Added a branded 404 with useful return paths                                                                             |
| Dependency installation reported 10 known vulnerabilities                                      | Updated the Vinext/Vite/Cloudflare toolchain and matching types; audit reports zero after the update                     |

The existing workshop stamp, warm paper, carbon, and coral identity remain. Dark working surfaces now carry more of the visual hierarchy, and page spacing and text sizes are more consistent.

## Verification

Verification results and browser screenshots are saved locally in `outputs/review/` (ignored by Git).

- Production build, ESLint, TypeScript, and all five URL configuration regression tests passed. The package manifest and lockfile agree, and `git diff --check` passed.
- All four pages returned HTTP 200 in the production server. The custom missing-page route returned HTTP 404, and its return link worked.
- Chrome checks at 1440px and 390px passed for page titles, canonical/social metadata, image loading, and internal links and fragments. No browser runtime errors or failed page resources were recorded.
- Axe scans of all four pages at both desktop and mobile sizes reported zero WCAG 2 A/AA and 2.1 AA violations. A small-label contrast issue found during review was corrected.
- Layouts were checked at 320, 375, 390, 760, 768, 820, 1024, and 1920px with no horizontal page overflow. Desktop and mobile screenshots were inspected.
- Keyboard checks passed for the skip link and project experiment disclosures. Client navigation updated the active link and page title. Project and manifesto anchors landed below the sticky header.
- The unconfigured Discord path led to the Community section with working GitHub links. Reduced-motion behavior and native project disclosures with JavaScript disabled were checked.
- The repository manifesto agrees with every paragraph and practical statement rendered by the site. The direction workbook includes explicit prompts, tradeoffs, a draft manifesto, and proposed operating experiments.
- `npm audit` reported zero known vulnerabilities after the dependency update.
- The final production server was left running on `0.0.0.0:9854`; both the local server and its network address responded successfully. Runtime logs are in `outputs/review/server.log`.

Browser coverage for this review is Chrome. Safari and Firefox were not exercised. The build tool reports route classification as “Unknown”; all four routes were separately verified against the running production server.

## Decisions still belonging to the community

- Supply and verify a permanent Discord invite when the space is ready. The current fallback supports participation without one.
- Confirm public URLs, owners, maintenance states, and first tasks for the named projects before presenting them as available releases.
- Choose one initial shared problem and the people who will maintain the work and answer contributors.
- Define project endorsement, participation expectations, and a contact route for community concerns.
- Set the actual canonical origin in the deployment environment before the next hosted build.

Public source locations checked during the review: [organization](https://github.com/Hackers-in-the-Loop) and [website repository](https://github.com/Hackers-in-the-Loop/website). These checks do not establish the status of projects whose repositories were not linked.

The requested launch is local on port 9854. Publishing these changes to the existing hosted site is a separate operation.
