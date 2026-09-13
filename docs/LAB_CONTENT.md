# Lab expansion — September 13, 2026

The Lab now contains six user-supplied build photographs, documented experiments and their hardware, the September 12 inventory, the pasted September 6–8 build journey, replacement-cost estimates, an electricity calculator, the supplied compute-grant application, and a support path. Why HITL contains the requested founder-bio placeholder.

## Content maintenance

- Edit `src/content/lab-projects.ts` to update project stage, description, resources, and allocation notes. These are editorial records, not live resource readings. Initial entries are Agent Blade and the GPU comparison bench from the supplied build guide. No scheduled GPU-hours or member allocations were supplied.
- `src/content/lab-power.json` is the supplied device-level model; totals and calculator outputs are computed from it. Update the visible power summary and public power notes together if the model changes.
- The September 12 inventory supersedes the earlier September 8 snapshot: TecMOJO rack; K15 + DEG2 GPU bench; 4 × 8 TB RAID5 NAS plus one 4 TB NVMe tier. GPU spares are not concurrent capacity.
- Costs are replacement-price estimates, not spending, invoices, donations, or current market quotes. Power figures are estimated wall draw, not measurements.
- The grant form is available for requests. Provisioning, capacity, and review timing are not claimed. Its open-work and public-progress expectations are stated separately from community membership.
- Founder biography remains a placeholder at the user’s request. The Community contact uses a neutral founder label pending supplied public identity copy.

## Sources and media

Read-only source material remains in the parent project’s `sources/`. The public inventory, build list, and power notes were copied from the supplied mini-cluster package. The private handoff and raw notes were not copied into the site or its downloads.

The build story uses the user-pasted “Journey copy from xcancel” section. The remote reader was blocked; no missing thread details were inferred. Dates in photo captions refer to documented build stages.

Photo mappings: `complete1.HEIC` → cluster-complete; `IMG_5101 2.HEIC` → parts-on-the-bench; `IMG_5108.HEIC` → rack-assembly; `IMG_5117.HEIC` → sparks-in-the-rack; `IMG_5136.HEIC` → building-together; `IMG_5170.HEIC` → gpu-test-bench. Originals were preserved. Published copies are oriented, metadata-stripped WebP at 640 and 1280 pixel widths; non-hero photos load lazily.

## Validation

TypeScript, lint, and nine tests pass, including the source power totals, default $49.38 schedule, heavy-load $152.60 schedule, and invalid-input bounds. Browser interaction checks cover the calculator, page/section navigation, photo loading, and responsive layout. The native-link navigation fix is retained.
