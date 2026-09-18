# Lab inventory download

The public workbook is `public/lab/hack-lab-inventory.xlsx`.

Use `src/content/lab-inventory.json` as the maintained registry. It contains 60 priced equipment records, stable equipment IDs, 21 power groups, component-to-group mappings, snapshot date, source links, and cost/power definitions. Some prices are explicit comparable-item allowances because the acquired model or variant is unknown. `scripts/build-lab-inventory.mjs` creates the workbook from that registry and accepts input and output paths as its first two arguments. It uses the bundled `@oai/artifact-tool` runtime. It does not require source notes or network access.

The site's power calculator reads this same registry through `src/lib/lab-power.ts`. Do not maintain a separate power estimate file.

The generator is an authoring tool and is not part of the site build. Use Codex's bundled spreadsheet runtime. If the package is not on the module search path, set `ARTIFACT_TOOL_MODULE` to its absolute ESM entry point. Generate into a temporary directory; then copy only `hackers-in-the-loop-lab-inventory.xlsx` into `public/lab/hack-lab-inventory.xlsx`. Rendered QA images and logs stay out of the public directory.

Example, with the runtime configured:

```bash
node scripts/build-lab-inventory.mjs src/content/lab-inventory.json /private/tmp/lab-inventory-review
```

## Updating

1. Edit the relevant existing equipment or power record while preserving its ID. For an added item, assign a new unique ID and an existing power-group ID, a new power group, or `none` if it is not part of the configured power model. `none` never means zero draw by itself.
2. Look up a current, model-specific price and published or measured power figure for every newly acquired device. Record the retrieval date, source URL, cost basis, and power basis. Where the exact variant or wattage is unavailable, use a clearly labeled comparable-item allowance or planning range and say what must be confirmed. Distinguish owner-reported purchase price, market replacement price, output capacity, idle draw, and wall draw. Update the snapshot date, quantity, shipping allowance, and any affected power assumptions. The generator derives formulas from the current record count. Its basic inputs may also be edited in the workbook's amber cells for local calculations.
3. Keep watts at the system-group level. Do not allocate host watts to SSDs, fans, power supplies, or spare cards without new measurements or a revised documented model. Update a GPU/FPGA example only when the chosen configuration is known.
4. Recompute registry control totals if the data changes, regenerate the workbook, review its totals and rendered sheets, and publish the single workbook. The registry's `lineTotalUSD` is the cost after its explicit source rounding adjustment.

## September 2026 acquisitions

EQ-53 is one NVIDIA P4 8 GB reported September 13. EQ-54 through EQ-60 are the UPS, DC supply, Luckfox Pico Mini A, Sipeed NanoKVM, Grove Vision AI Module V2, soldering setup, and M5Stack CoreS3 reported September 18. Price and power research was checked September 18. The UPS ($995) and bench supply ($69) use Shannon's reported prices, corroborated by current listings. The others use dated market prices or comparable-item allowances. The Lab page and workbook read from the registry. Installation and active use have not been confirmed, so these devices remain outside the current configured-lab power totals. The workbook's `Acquisition references` tab keeps cost and power sources next to each recent item.

| ID | Cost reference (USD) | Power reference | Qualification |
| --- | ---: | --- | --- |
| EQ-53 P4 GPU | 180 refurbished | 50 or 75 W board-power design | Not an idle or wall measurement; host overhead extra. |
| EQ-54 PR2200LCDSL UPS | 995 owner-reported | 6 W at no load; roughly 98-99% efficient at tested loads | 1,980 W is output capacity, not draw. UPS role and protected loads unconfirmed. |
| EQ-55 WEP 605D-III | 69 owner-reported | Up to 300 W DC output; about 375 W AC input at full output using a comparable 80% efficiency assumption | Actual wall power is load-dependent; efficiency is not a measured WEP specification. |
| EQ-56 Luckfox Pico Mini A | 12 base variant | 1-2 W planning allowance | Exact variant and board-level measurement unknown. |
| EQ-57 Sipeed NanoKVM | 113 provisional Cube Full Kit | Around 1 W for NanoKVM Cube | Exact acquired variant unknown; price and wattage must be revised once identified. |
| EQ-58 Grove Vision AI Module V2 | 17 bare module | 0.35-0.42 W in published inference examples | Camera and host are separate; not a universal maximum. |
| EQ-59 soldering setup | 50 comparable workstation | 30-60 W while heating for a 60 W-class iron | Model and kit contents unknown; a hot-air station could draw more. |
| EQ-60 M5Stack CoreS3 | 60 manufacturer listing | 1.5-3 W planning range | Assumed to be a new unit; confirm it is separate from EQ-29 before treating the cost or power as additive. |

Each unit price, its detailed basis, and source URLs are in `src/content/lab-inventory.json` and the workbook. Prices exclude tax and shipping except the original touchscreen shipping line. The rounded line costs above sum to $1,496 for these eight acquisitions.

## Rounding reconciliation

The original published extended lines total $29,749: $28,244 compute and $1,505 shared equipment. All eight later acquisitions bring the cost reference total to $31,245: $28,632 compute and $2,613 shared equipment. The KVM reference is $118.47 per unit, but its published line is $119. Applying conventional nearest-dollar rounding alone produces $31,244 overall. The workbook preserves the original published KVM line using a visible $1 adjustment. The unit price remains $118.47. All other lines round normally. The touchscreen has a separate $60 shipping input.

## QA completed

- The original 52 priced cost records match the source list, including 14 GPU cards split into test rotation and spares; eight later acquisitions have their own price and power references.
- All 21 power groups match the source model and current site data at creation.
- Core: 229.8 W idle, 406.5 W working, 907 W heavy.
- Whole lab: 339.3 W idle, 693 W working, 1,413 W heavy.
- Formula tests covered quantity updates, zero price, missing price, changed power and missing power. Missing inputs remain visible instead of becoming zero totals.
- The generator extends formulas for all 60 registry records and reconciles the $31,245 cost estimate to the registry controls. Unknown exact models remain marked provisional rather than blank or silently treated as actual purchase costs.
- Every affected sheet was rendered and visually checked. Detail tables have frozen headers and identifying columns, native filters, typed currency/power values, and explicit component inclusion notes.
- Exported XLSX contains formulas and cached totals, no error cells, and no old abbreviation or em dashes. XLSX structure and panes were inspected. Recalculation was verified with Artifact Tool; desktop Excel was not launched.

The generator supports `--verify-only` after its input/output arguments to check without exporting. Keep preview PNGs, QA logs and authoring scripts out of the public download directory.
