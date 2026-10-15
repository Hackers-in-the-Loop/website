import { HERO_DATA } from "./hero-data";
import { HeroLive } from "./hero-live";
import { initialState, readoutOf } from "./model";
import "./hero-figure.css";

// The home-page hero: a figure-eight marble run whose working is "being in the loop". Marbles roll
// round an infinity-shaped track, a screw lift carries each one back up so the loop never stops,
// and a press drops a spare marble in from the chute. Built by scripts/hero-figure/build.mjs.

const LABEL = "A figure-eight marble run: marbles circle an infinity-shaped track and a screw lift carries them back up. Press to drop a spare marble into the loop.";

export function HeroFigure() {
  return (
    <div className="v2-home-mark hf-card">
      <HeroLive restReadout={readoutOf(HERO_DATA, initialState(HERO_DATA))} label={LABEL} hint="Press to drop one in" />
    </div>
  );
}
