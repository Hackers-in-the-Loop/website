# Brand exports

The current brand is **Hackers in the Loop**, with **HACK** as its compact mark. Use the SVGs in `public/brand/`.

The earlier files under `assets/` and `reference/`, plus the earlier strategy and guidelines in this directory, are historical. They contain superseded naming and positioning and should not be exported or served as current branding.

Current motion: an orange infinity symbol with a traveling dot and a trail that tapers behind it. Reduced-motion users see a static mark. Use cream (#f4f2ea) for the header and hero, neutral off-white (#fdfdfd) for the body, and brand black (#111315) for the footer and hero animation background. Calls to action are orange. Header and footer logos are static. Animate only the hero infinity motif. The static 512 × 512 PNG at public/brand/hack-discord-icon.png is ready for use as the Discord server icon.

Rebuild the current SVGs and PNG with `node scripts/build-brand.mjs`. The geometry uses rounded lobes and a smooth crossing. The static dot sits on the upper-right shoulder; the hero dot travels at a constant pace with its trail.

The hero has its own `public/brand/hack-hero.svg` treatment with a subtle glow, warm highlights and a steady traveling light. Keep the ordinary wordmarks and Discord icon flat and static. Large information-rich application sections use black with orange buttons; orange backgrounds are reserved for the smaller invitation banners.
