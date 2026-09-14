# Lab inventory download

The public workbook is `public/lab/hack-lab-inventory.xlsx`.

Use `src/content/lab-inventory.json` as the maintained registry. It contains all 52 priced equipment records, stable equipment IDs, 21 power groups, component-to-group mappings, snapshot date, source links, and cost/power definitions. `scripts/build-lab-inventory.mjs` creates the workbook from that registry and accepts input and output paths as its first two arguments. It uses the bundled `@oai/artifact-tool` runtime. It does not require source notes or network access.

The site's power calculator reads this same registry through `src/lib/lab-power.ts`. Do not maintain a separate power estimate file.

The generator is an authoring tool and is not part of the site build. Use Codex's bundled spreadsheet runtime. If the package is not on the module search path, set `ARTIFACT_TOOL_MODULE` to its absolute ESM entry point. Generate into a temporary directory; then copy only `hackers-in-the-loop-lab-inventory.xlsx` into `public/lab/hack-lab-inventory.xlsx`. Rendered QA images and logs stay out of the public directory.

Example, with the runtime configured:

```bash
node scripts/build-lab-inventory.mjs src/content/lab-inventory.json /private/tmp/lab-inventory-review
```

## Updating

1. Edit the relevant existing equipment or power record while preserving its ID. For an added item, assign a new unique ID and an existing power-group ID, a new power group, or `none` for passive hardware.
2. Update the snapshot date, source URL/note, quantity, unit estimate, shipping allowance and any affected power assumptions. The generator derives formulas from the current record count. Its basic inputs may also be edited in the workbook's amber cells for local calculations.
3. Keep watts at the system-group level. Do not allocate host watts to SSDs, fans, power supplies, or spare cards without new measurements or a revised documented model. Update a GPU/FPGA example only when the chosen configuration is known.
4. Recompute registry control totals if the data changes, regenerate the workbook, review its totals and rendered sheets, and publish the single workbook. The registry's `lineTotalUSD` is the cost after its explicit source rounding adjustment.

## Rounding reconciliation

The original published extended lines total $29,749: $28,244 compute and $1,505 shared equipment. The KVM reference is $118.47 per unit, but its published line is $119. Applying conventional nearest-dollar rounding alone produces $29,748 overall. The workbook preserves the published total using a visible $1 adjustment on the KVM row. The unit price remains $118.47. All other lines round normally. The touchscreen has a separate $60 shipping input.

## QA completed

- All 52 cost records match the source list, including 14 GPU cards split into test rotation and spares.
- All 21 power groups match the source model and current site data at creation.
- Core: 229.8 W idle, 406.5 W working, 907 W heavy.
- Whole lab: 339.3 W idle, 693 W working, 1,413 W heavy.
- Formula tests covered quantity updates, zero price, missing price, changed power and missing power. Missing inputs remain visible instead of becoming zero totals.
- An extra 53rd registry record was tested in verification-only mode. It extended the formulas and increased the total by its expected $25. No extra workbook was exported.
- Every sheet was rendered and visually checked. Detail tables have frozen headers and identifying columns, native filters, typed currency/power values, and explicit component inclusion notes.
- Exported XLSX contains formulas and cached totals, no error cells, and no old abbreviation or em dashes. XLSX structure and panes were inspected. Recalculation was verified with Artifact Tool; desktop Excel was not launched.

The generator supports `--verify-only` after its input/output arguments to check without exporting. Keep preview PNGs, QA logs and authoring scripts out of the public download directory.
