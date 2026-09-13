# First community-first Sites step

This is a bounded continuation of the existing HITL website, not a full redesign.

## Implemented

- Home leads with the accepted technical-community purpose and an invitation to belong.
- Primary navigation is Home, Why HITL?, Lab, and Community.
- Why uses the accepted working purpose rather than declaring a finished manifesto.
- Lab introduces the personal cluster, separates reported equipment from future expansion and shared access, and provides a connection path for support.
- Community leads with conversation and connection rather than a required code contribution.
- Existing brand artwork, fonts, colors, shared surfaces, package dependencies, and Sites identity are preserved. Legacy /manifesto and /stack routes remain reachable at their existing URLs.

## Source grounding

The implementation starts from the existing website repository, including brand/guidelines.md, brand/tokens.css, shared components, and URL validation. The synced project references were read without modification:

- raw-manifesto.md: accepted audience and working purpose.
- raw-thoughts.txt and raw-conversation-notes.md: belonging, listening, shared support, and technical focus.
- raw-hitl-compute.txt: equipment reported on hand and explicitly future expansion/access plans, recorded September 8, 2026.
- Branch · Shape Impactful Community: website-first launch sequence, four-page structure, existing Discord, and Lab support needs.

Raw private notes have not been copied into this checkout or publication.

## Deliberately unresolved

The Lab name remains provisional. No live compute service, open application process, active member project inventory, nonprofit status, donation mechanism, or hosting partnership is claimed. The Discord link continues to use the existing validated NEXT_PUBLIC_DISCORD_URL setting; without a valid invite the site explains that the invite is not published. No Google Form URL has been supplied.

The existing logo descriptor, legacy technical pages, and social artwork retain the earlier brand language. Those are a later editorial decision rather than part of this small implementation step.

## Review next

Review the homepage headline and invitation first. After that, confirm the public Discord invite and current Lab readiness before expanding the Lab page or connecting its application form.

## Validation

Production build, TypeScript check, and all five existing URL tests passed. Homepage reviewed at desktop and 390px mobile width; primary route navigation checked in the browser.
