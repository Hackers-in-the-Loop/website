import type { HeroData } from "./hero-data";

// The marble run as numbers. Every marble on the loop stands on a site: sites are one screw turn
// (data.pitch) apart and the loop is a whole number of sites, so a marble always meets the screw's
// wire at the same phase. All of them move at one speed, on the rails and up the lift alike.

export interface LoopMarble {
  id: string;
  site: number;
  lit: boolean;
}

export interface Spare {
  id: string;
  /** Position along the chute, in units from the back of the queue (data.queue[0] is the gate). */
  x: number;
}

export interface Merge {
  id: string;
  site: number;
  /** Clock time at which the merging marble reaches the merge point on the track. */
  at: number;
}

export interface HeroState {
  t: number;
  marbles: LoopMarble[];
  spares: Spare[];
  merge: Merge | null;
}

export const mod = (value: number, by: number) => ((value % by) + by) % by;

export function initialState(data: HeroData): HeroState {
  return {
    t: 0,
    marbles: data.start.map((site, index) => ({ id: `m${index}`, site, lit: index === data.lit })),
    spares: data.queue.map((x, index) => ({ id: `s${index}`, x })),
    merge: null,
  };
}

/** Where a marble on a site is along the loop, in units (unbounded: it counts whole laps). */
export const loopUnits = (data: HeroData, site: number, t: number) => site * data.pitch + data.speed * t;

/** Seconds a released marble takes from the gate to the track. */
export const mergeSeconds = (data: HeroData) => data.mergeLength / data.speed;

/** Laps the orange marble has finished since the figure started, plus one: the lap it is on. */
export const lapOf = (data: HeroData, t: number) => Math.floor((data.speed * t) / data.loop) + 1;

export function readoutOf(data: HeroData, state: HeroState) {
  return `${state.marbles.length} in the loop · lap ${lapOf(data, state.t)}`;
}

const freeSite = (data: HeroData, state: HeroState, site: number) =>
  !state.marbles.some((marble) => {
    const gap = Math.abs(mod(marble.site - site, data.sites));
    return gap === 0 || gap === 1 || gap === data.sites - 1;
  });

/**
 * Plan the next spare's merge: the earliest moment, at least `lead` seconds plus the roll from the
 * gate away, when a free site (with a free site either side) passes the merge point.
 */
export function planMerge(data: HeroData, state: HeroState, lead = 0.3): Merge | null {
  if (state.merge || !state.spares.length) return null;
  const earliest = state.t + lead + mergeSeconds(data);
  const period = data.loop / data.speed;
  let best: Merge | null = null;
  for (let site = 0; site < data.sites; site++) {
    if (!freeSite(data, state, site)) continue;
    const first = (data.mergeS - site * data.pitch) / data.speed;
    const at = first + Math.ceil((earliest - first) / period) * period;
    if (!best || at < best.at) best = { id: state.spares[0].id, site, at };
  }
  return best;
}

/** Where the merge stands at time t: waiting behind the gate, rolling down the merge path, or done. */
export function mergePhase(data: HeroData, merge: Merge, t: number) {
  const release = merge.at - mergeSeconds(data);
  if (t < release) return { phase: "waiting" as const, along: 0, release };
  if (t < merge.at) return { phase: "rolling" as const, along: (t - release) * data.speed, release };
  return { phase: "done" as const, along: data.mergeLength, release };
}

/** How far the gate pin is pulled down, 0 to 1: it opens just before the release and closes behind the marble. */
export function gateOpen(data: HeroData, merge: Merge | null, t: number) {
  if (!merge) return 0;
  const release = merge.at - mergeSeconds(data);
  const ease = (x: number) => {
    const u = Math.min(1, Math.max(0, x));
    return u * u * (3 - 2 * u);
  };
  return ease((t - (release - 0.28)) / 0.18) * (1 - ease((t - (release + 0.32)) / 0.22));
}

/** Advance the clock and settle a merge that has reached the track. Returns true when a marble joined. */
export function step(data: HeroData, state: HeroState, dt: number) {
  state.t += dt;
  const merge = state.merge;
  if (!merge || state.t < merge.at) return false;
  state.marbles.push({ id: merge.id, site: merge.site, lit: false });
  state.spares = state.spares.filter((spare) => spare.id !== merge.id);
  state.merge = null;
  return true;
}

/**
 * Merge a spare at once, for reduced motion: the first free site at or just past the merge point
 * takes it, and the queue closes up.
 */
export function mergeNow(data: HeroData, state: HeroState) {
  if (state.merge || !state.spares.length) return false;
  const here = (data.mergeS - data.speed * state.t) / data.pitch;
  for (let offset = 0; offset < data.sites; offset++) {
    const site = mod(Math.floor(here) - offset, data.sites);
    if (!freeSite(data, state, site)) continue;
    const spare = state.spares.shift();
    if (!spare) return false;
    state.marbles.push({ id: spare.id, site, lit: false });
    return true;
  }
  return false;
}

/** The position each spare in the chute is rolling toward: the queue closes up behind the gate. */
export function queueTargets(data: HeroData, state: HeroState) {
  const waiting = state.spares.filter((spare) => spare.id !== state.merge?.id);
  const rolling = state.merge && mergePhase(data, state.merge, state.t).phase !== "waiting";
  return new Map(waiting.map((spare, index) => [spare.id, data.queue[index + (state.merge && !rolling ? 1 : 0)] ?? data.queue[data.queue.length - 1]]));
}

/** How brightly each light segment on the rails glows behind the orange marble (0 to 1). */
export function glowLevel(data: HeroData, litUnits: number, segment: number) {
  const centre = (segment + 0.5) * data.glowStep;
  const behind = mod(litUnits - centre, data.loop);
  if (behind > data.trail) return 0;
  return Math.pow(1 - behind / data.trail, 1.6);
}
