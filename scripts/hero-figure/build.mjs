// Builds the home-page hero figure: a figure-eight marble run on a bench base.
//
//   node scripts/hero-figure/build.mjs            writes public/hero-figure/hero-figure.svg and src/components/hero-figure/hero-data.ts
//   node scripts/hero-figure/build.mjs --audit    also proves the geometry (kit/audit.mjs) and exits 1 on a problem
//   node scripts/hero-figure/build.mjs --sizes    lists the SVG's weight by part
//
// The plan of the track is the brand loop: two lobes joined by two diagonals that cross in the
// middle, the first pass bridging the second. Marbles roll down the whole loop at one speed and a
// screw lift carries them back up, so the loop never stops. A chute of spare marbles beside the
// right lobe merges one in on a press. Every position the page draws comes from this file's model.
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "./kit/iso-kit.mjs";
import * as G from "./kit/lathe.mjs";
import { tubePieces, tubeSvg } from "./kit/tube.mjs";
import * as A from "./kit/audit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT = join(ROOT, "src", "components", "hero-figure", "hero-data.ts");
// The kit in ./kit is a verbatim copy of the Anatomy skill's kit (MIT, see ./kit/LICENSE).

// ---------------------------------------------------------------- true numbers
const PITCH = 12; // screw lead: one turn of the screw lifts a marble 12 units
const SPEED = 24; // units per second, on the track and in the lift
const MARBLE = 4; // marble radius
const RAIL_R = 0.9;
const HALF_GAUGE = 3; // rail centres sit 3 either side of the centreline
const RIDE = Math.sqrt((MARBLE + RAIL_R) ** 2 - HALF_GAUGE ** 2); // marble centre above the rail centres
const WIRE_R = 0.8; // the screw is a wire helix round a shaft
const HELIX = 9;
const SHAFT_R = 1.6;
const LOBE_R = 28;
const LOBE_C = 60;
const LOBE_H = 21;
const TIP = LOBE_C + LOBE_R; // the lobes' outer straights stand at x = ±TIP
const RISE = [-TIP, 0];
const AXIS = [-TIP - 6, 0]; // the marble rides 6 from the screw axis, held by two guide rods
const ON_WIRE = Math.sqrt((MARBLE + WIRE_R) ** 2 - (HELIX - (RISE[0] - AXIS[0])) ** 2);
const ROD_R = 0.8;
const ROD_AT = 11; // guide rods stand outside the helix
const ROD_ANGLES = [20, -20];


const PLATE = { x: -TIP - 34, y: -59, w: 2 * TIP + 46, d: 118, r: 9 };
const PLATE_H = 8;
const FOOT_H = 5;

const HB = 32; // bottom housing top
const Z_BOT = HB + RAIL_R; // the arriving rails lie on the housing top
const DROP = 40; // total fall of the track
const Z_TOP = Z_BOT + DROP;
const TOP_LO = Z_TOP - 6; // top housing
const TOP_HI = Z_TOP + 12;
const BOTTOM_HOUSING = { x: AXIS[0] - 13, y: -13, w: 28, d: 37, r: 3 };
const TOP_HOUSING = { x: AXIS[0] - 13, y: -13, w: 28, d: 26, r: 3 };
const SCREW_HOLE = 10.5;
const DROP_HOLE = { at: [-TIP, 15], r: 5.2 };
const RAIL_END_Y = 20.5; // arriving rails stop at the drop hole
const RAIL_START_Y = TOP_HOUSING.y; // departing rails leave the top housing's back face

const LIGHT_TRAIL = 64; // units of rail lit behind the orange marble

const WIDTH = 480;
const HEIGHT = 480;
const AZIMUTH = 72;
const ELEVATION = 42;

const audit = process.argv.includes("--audit");

// ---------------------------------------------------------------- the plan of the loop
const TAU = Math.PI * 2;
function lobeTangent() {
  const c = [-LOBE_C, -LOBE_H];
  const rho = Math.hypot(c[0], c[1]);
  return Math.atan2(c[1], c[0]) + Math.acos(-LOBE_R / rho); // angle of the tangent point on the back-left arc
}
const TANGENT = lobeTangent(); // about -39.5 degrees

function planPath() {
  const out = [[-TIP, 0]];
  const step = 0.25;
  const lineTo = (b) => {
    const a = out[out.length - 1];
    const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / step));
    for (let i = 1; i <= n; i++) out.push([a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);
  };
  const arc = (c, a0, a1) => {
    const n = Math.max(1, Math.ceil((Math.abs(a1 - a0) * LOBE_R) / step));
    for (let i = 1; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      out.push([c[0] + LOBE_R * Math.cos(a), c[1] + LOBE_R * Math.sin(a)]);
    }
  };
  const t = TANGENT + TAU; // about 320.5 degrees
  lineTo([-TIP, -LOBE_H]);
  arc([-LOBE_C, -LOBE_H], Math.PI, t);
  const T = out[out.length - 1];
  lineTo([-T[0], -T[1]]);
  arc([LOBE_C, LOBE_H], t - Math.PI, 0);
  lineTo([TIP, -LOBE_H]);
  arc([LOBE_C, -LOBE_H], 0, -(t - Math.PI));
  const U = out[out.length - 1];
  lineTo([-U[0], -U[1]]);
  arc([-LOBE_C, LOBE_H], TAU - t, Math.PI);
  lineTo([-TIP, 0]);
  return out;
}

const PLAN = planPath();
const flatLength = (pts) => {
  const s = [0];
  for (let i = 1; i < pts.length; i++) s.push(s[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return s;
};

// The track runs from the top housing's back face to the drop hole.
function trackPlan() {
  const s = flatLength(PLAN);
  let from = 0;
  let to = PLAN.length - 1;
  for (let i = 1; i < PLAN.length; i++) if (PLAN[i][1] <= RAIL_START_Y && PLAN[i - 1][1] > RAIL_START_Y && s[i] < 40) from = i;
  for (let i = PLAN.length - 2; i > 0; i--) if (PLAN[i][1] <= RAIL_END_Y && PLAN[i + 1][1] < RAIL_END_Y && s[i] > s[PLAN.length - 1] - 40) to = i;
  const pts = PLAN.slice(from, to + 1);
  pts[0] = [PLAN[from][0], RAIL_START_Y];
  pts[pts.length - 1] = [-TIP, RAIL_END_Y];
  return pts;
}
const TRACK_PLAN = trackPlan();
const TRACK_S = flatLength(TRACK_PLAN);
const TRACK_LENGTH = TRACK_S[TRACK_S.length - 1];
const FLAT_END = 4.6; // the last stretch lies flat on the bottom housing

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const railZ = (s) => Z_TOP - DROP * clamp(s / (TRACK_LENGTH - FLAT_END), 0, 1);

function planAt(s) {
  const at = clamp(s, 0, TRACK_LENGTH);
  let lo = 0;
  let hi = TRACK_S.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (TRACK_S[mid] <= at) lo = mid;
    else hi = mid;
  }
  const span = TRACK_S[hi] - TRACK_S[lo] || 1;
  const f = (at - TRACK_S[lo]) / span;
  const a = TRACK_PLAN[lo];
  const b = TRACK_PLAN[hi];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
}
function tangentAt(s) {
  const a = planAt(s - 0.5);
  const b = planAt(s + 0.5);
  const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  return [(b[0] - a[0]) / l, (b[1] - a[1]) / l];
}
const normalAt = (s) => {
  const t = tangentAt(s);
  return [-t[1], t[0]];
};
const centreAt = (s) => [...planAt(s), railZ(s)];
const railAt = (s, side) => {
  const c = planAt(s);
  const n = normalAt(s);
  return [c[0] + n[0] * HALF_GAUGE * side, c[1] + n[1] * HALF_GAUGE * side, railZ(s)];
};
const marbleOnTrack = (s) => {
  const c = centreAt(s);
  return [c[0], c[1], c[2] + RIDE];
};

// Where the two passes cross (for the posts to keep clear).
function crossings() {
  const out = [];
  for (let s = 1; s < TRACK_LENGTH; s += 0.5) {
    const [x, y] = planAt(s);
    if (Math.hypot(x, y) < 0.3) {
      if (!out.length || s - out[out.length - 1] > 20) out.push(s);
    }
  }
  return out;
}
const CROSSINGS = crossings();

// ---------------------------------------------------------------- the loop a marble travels
// Track first, then the lift: roll onto the bottom housing, drop into its hole, ride the screw up,
// and come out of the top housing's back face onto the start of the track.
const DROP_DEPTH = HB - 6; // marble centre once it has dropped inside the bottom housing
const ENTRY_Z = Z_BOT + RIDE;
const EXIT_Z = Z_TOP + RIDE;
const LIFT_LEGS = [
  [-TIP, RAIL_END_Y, ENTRY_Z],
  [-TIP, DROP_HOLE.at[1], ENTRY_Z],
  [-TIP, DROP_HOLE.at[1], DROP_DEPTH],
  [RISE[0], RISE[1], DROP_DEPTH],
  [RISE[0], RISE[1], EXIT_Z],
  [RISE[0], RAIL_START_Y, EXIT_Z],
];
const legLength = (pts) => pts.slice(1).reduce((sum, p, i) => sum + G.len3(G.sub3(p, pts[i])), 0);
// Stretch the hidden run inside the bottom housing so the whole loop is a whole number of screw turns:
// every marble then meets the wire at the same phase, lap after lap.
const RAW_LOOP = TRACK_LENGTH + legLength(LIFT_LEGS);
const LOOP_SITES = Math.ceil(RAW_LOOP / PITCH);
const LOOP = LOOP_SITES * PITCH;
const HIDDEN_EXTRA = LOOP - RAW_LOOP;
// The hidden run goes sideways under the housing top: lengthen it by dipping deeper.
LIFT_LEGS[2][2] -= HIDDEN_EXTRA / 2;
LIFT_LEGS[3][2] -= HIDDEN_EXTRA / 2;
const LIFT_LENGTH = legLength(LIFT_LEGS);
if (Math.abs(TRACK_LENGTH + LIFT_LENGTH - LOOP) > 1e-6) throw new Error("loop length is not whole turns");

const liftMarks = (() => {
  const out = [0];
  for (let i = 1; i < LIFT_LEGS.length; i++) out.push(out[i - 1] + G.len3(G.sub3(LIFT_LEGS[i], LIFT_LEGS[i - 1])));
  return out;
})();
function liftAt(d) {
  for (let i = 1; i < LIFT_LEGS.length; i++) {
    if (d <= liftMarks[i] + 1e-9) {
      const f = (d - liftMarks[i - 1]) / (liftMarks[i] - liftMarks[i - 1] || 1);
      return { p: G.lerp3(LIFT_LEGS[i - 1], LIFT_LEGS[i], clamp(f, 0, 1)), leg: i - 1 };
    }
  }
  return { p: LIFT_LEGS[LIFT_LEGS.length - 1], leg: LIFT_LEGS.length - 2 };
}
const RISE_START = TRACK_LENGTH + liftMarks[3]; // loop coordinate where the marble starts up the screw
function loopAt(u) {
  const at = ((u % LOOP) + LOOP) % LOOP;
  if (at <= TRACK_LENGTH) return { p: marbleOnTrack(at), zone: "track", s: at };
  const { p, leg } = liftAt(at - TRACK_LENGTH);
  const zone = leg === 0 ? "approach" : leg === 1 ? "drop" : leg === 2 ? "inside" : leg === 3 ? "rise" : "exit";
  return { p, zone, s: at };
}
// The wire under a rising marble: marbles stand on sites PITCH apart, and the helix's base height is
// chosen so a marble on a site sits on the wire at the rise point (angle 0) in every frame.
const WIRE_BASE = (((LIFT_LEGS[3][2] - ON_WIRE - RISE_START) % PITCH) + PITCH) % PITCH;

// ---------------------------------------------------------------- the merge chute
const MERGE_S = (() => {
  // the middle of the right lobe's outer straight (x = TIP)
  let best = 0;
  let near = Infinity;
  for (let s = 200; s < 450; s += 0.05) {
    const [x, y] = planAt(s);
    if (Math.abs(x - TIP) < 0.01 && Math.abs(y) < near) {
      near = Math.abs(y);
      best = s;
    }
  }
  return best;
})();
const MERGE_Z = railZ(MERGE_S);
const CHUTE_Y = planAt(MERGE_S)[1];
const CHUTE_END = TIP - HALF_GAUGE - RAIL_R - 1.5; // chute rails stop short of the track's inner rail
const CHUTE_START = CHUTE_END - 39.2;
const CHUTE_DROP = 3;
const LIP = MERGE_Z + RAIL_R + MARBLE + 0.45 - RIDE; // chute rail height at its end, so a marble clears the inner rail
const chuteZ = (x) => LIP + (CHUTE_DROP * (CHUTE_END - x)) / (CHUTE_END - CHUTE_START);
const CHUTE_R = 0.7;
const GATE_X = CHUTE_END - 5.2;
const GATE_R = 0.6;
const SPARES = 4;
const QUEUE = Array.from({ length: SPARES }, (_, i) => GATE_X - GATE_R - MARBLE - 0.2 - i * (MARBLE * 2 + 0.1));
const chuteMarble = (x) => [x, CHUTE_Y, chuteZ(x) + RIDE];
const MERGE_PATH = (() => {
  const a = chuteMarble(GATE_X - GATE_R - MARBLE - 0.2);
  const b = [CHUTE_END + 1.6, CHUTE_Y, a[2]];
  const c = [TIP - 1.6, CHUTE_Y, MERGE_Z + RIDE + 0.5];
  const d = marbleOnTrack(MERGE_S);
  return [a, b, c, d];
})();
const MERGE_LENGTH = legLength(MERGE_PATH);
function mergeAt(d) {
  let walked = 0;
  for (let i = 1; i < MERGE_PATH.length; i++) {
    const l = G.len3(G.sub3(MERGE_PATH[i], MERGE_PATH[i - 1]));
    if (d <= walked + l || i === MERGE_PATH.length - 1) return G.lerp3(MERGE_PATH[i - 1], MERGE_PATH[i], clamp((d - walked) / l, 0, 1));
    walked += l;
  }
  return MERGE_PATH[MERGE_PATH.length - 1];
}

// ---------------------------------------------------------------- camera
const fitPoints = [
  ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
  [AXIS[0], AXIS[1], TOP_HI + 13],
  [TOP_HOUSING.x, TOP_HOUSING.y, TOP_HI],
];
const P = k.fitProjection(fitPoints, WIDTH, HEIGHT, { pad: 74, azimuth: AZIMUTH, elevation: ELEVATION });
const at = (p) => k.iso(p, P);
const SCALE = G.scaleOf(P);
// facets for a round part: about one every 2.4 px of its rim on screen, for the tones only (outlines stay smooth enough)
const cylSteps = (r) => Math.max(10, Math.min(64, Math.ceil((TAU * r * SCALE) / 2.4)));
const cyl = (cx, cy, r, z, h, bevel = 0) => k.cylinder(cx, cy, r, z, h, P, cylSteps(r), bevel);
const V = G.viewOf(P);

// ---------------------------------------------------------------- recorder and helpers
const R = A.recorder(P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
function put(name, ref, svg, shapes, extra = {}) {
  return R.put({ name, at: ref, svg, shapes, ...extra });
}
const solid = (shape) => R.solid(shape);
const UP = (x, y) => ({ o: [x, y, 0], a: [0, 0, 1], u: [1, 0, 0], v: [0, 1, 0] });
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const rectAround = (c, t, n, along, across) => [
  [c[0] - t[0] * along - n[0] * across, c[1] - t[1] * along - n[1] * across],
  [c[0] + t[0] * along - n[0] * across, c[1] + t[1] * along - n[1] * across],
  [c[0] + t[0] * along + n[0] * across, c[1] + t[1] * along + n[1] * across],
  [c[0] - t[0] * along + n[0] * across, c[1] - t[1] * along + n[1] * across],
];
const ccw = (ring) => {
  let area = 0;
  for (let i = 0; i < ring.length; i++) {
    const [ax, ay] = ring[i];
    const [bx, by] = ring[(i + 1) % ring.length];
    area += ax * by - bx * ay;
  }
  return area > 0 ? ring : ring.slice().reverse();
};

const MARBLE_ART = S(G.sphereOf([0, 0, 0], MARBLE, P, { steps: 40 }), { tone: "hi", crease: "none" });
// one marble, drawn once and placed with <use>: its sphere is the same picture anywhere in an orthographic view
const MARBLE_DEF = `<defs><g id="hf-marble">${MARBLE_ART}</g></defs>`;

// ---------------------------------------------------------------- base
const STATIC_BACK = []; // drawn before every sorted item: the halo and the plate itself
function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 20))) {
    out.push(S(cyl(x, y, 7.4, -PLATE_H - FOOT_H, 1.6), { tone: "lo" }));
    out.push(S(cyl(x, y, 5.8, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6), { tone: "mid" }));
    solid(A.cylinder(x, y, 7.4, -PLATE_H - FOOT_H, 1.6, { name: "stand.flange", ground: true }));
    solid(A.cylinder(x, y, 5.8, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, { name: "stand.foot", ground: true }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid", inner: L(k.sideSeam(PLATE, -PLATE_H / 2, P, 8), { tone: "faint" }) }));
  solid(A.slab(PLATE, -PLATE_H, PLATE_H, { name: "stand.plate", ground: true }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 4.5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 9);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // the label plate on the front edge, the one engraved word in the drawing
  const label = { x: -22, y: PLATE.y + PLATE.d - 13, w: 44, d: 8.5, r: 1.6 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.3), 0.8, P), { tone: "faint" }));
  out.push(D([at([label.x + 3, label.y + label.d / 2, 0.8]), at([label.x + label.w - 3, label.y + label.d / 2, 0.8])], { size: 0.45 }));
  out.push(k.faceTextSvg(k.topMatrix([0, label.y + label.d / 2 + 1.3], 0.8, P, "x"), "HACK", { size: 3.6, tone: "mid", anchor: "middle" }));
  solid(A.slab(label, 0, 0.8, { name: "stand.label" }));
  STATIC_BACK.push(out.join(""));
}

// ---------------------------------------------------------------- track: rails, ties, posts
const RAIL_ROUTES = [1, -1].map((side) => {
  const pts = [];
  const n = Math.ceil(TRACK_LENGTH / 1);
  for (let i = 0; i <= n; i++) pts.push(railAt((TRACK_LENGTH * i) / n, side));
  return pts;
});
const TIE_STEP = 7;
const TIES = [];
for (let s = 6; s <= TRACK_LENGTH - FLAT_END - 2; s += TIE_STEP) TIES.push(s);
const POST_TIES = new Set();
TIES.forEach((s, i) => {
  const nearUpper = CROSSINGS.length && Math.abs(s - CROSSINGS[0]) < 12;
  if ((i % 6 === 0 || i === TIES.length - 1) && !nearUpper) POST_TIES.add(i);
});
const GLOW_STEP = 3;
const RAIL_CHUNKS = []; // per rail: its drawn chunks, for the light added once the order is known
const GLOW_COUNT = Math.ceil(TRACK_LENGTH / GLOW_STEP);

function rails() {
  RAIL_ROUTES.forEach((route, r) => {
    const name = `track.rail${r ? "R" : "L"}`;
    // the arriving end is a cut rail lying on the bottom housing at the drop hole, not a port
    R.route(name, route, RAIL_R, { ends: [true, false], touch: ["track.tie*", "track.saddle*", "lift.bottom"] });
    const arc = [0];
    for (let i = 1; i < route.length; i++) arc.push(arc[i - 1] + G.len3(G.sub3(route[i], route[i - 1])));
    const arcAt = (sc) => {
      const f = (clamp(sc, 0, TRACK_LENGTH) / TRACK_LENGTH) * (route.length - 1);
      const i = Math.min(route.length - 2, Math.floor(f));
      return arc[i] + (arc[i + 1] - arc[i]) * (f - i);
    };
    const pieces = tubePieces(route, RAIL_R, P, { maxLength: 9, spacing: 3 });
    const side = r ? -1 : 1;
    const chunks = [];
    pieces.forEach((piece, index) => {
      const item = put(`${name}:${index}`, piece.mid, tubeSvg(piece, { tone: "hi" }), [A.tube(piece.points, piece.radii)], { route: name, chunk: index });
      chunks.push({ item, from: piece.from, to: piece.to });
    });
    RAIL_CHUNKS.push({ side, chunks, arc, arcAt });
  });
}

function ties() {
  TIES.forEach((s, i) => {
    const c = planAt(s);
    const t = tangentAt(s);
    const n = normalAt(s);
    // ties are level and the rails fall across them: each one's top meets the rails at its downhill edge
    const z = railZ(s + (POST_TIES.has(i) ? 1.7 : 0.9)) - RAIL_R;
    if (POST_TIES.has(i)) {
      // a saddle on a post: wider and thicker than a tie
      const ring = ccw(rectAround(c, t, n, 1.7, 5.2));
      const top = z;
      const h = 1.8;
      const name = `track.saddle${i}`;
      const paths = k.extrude(ring, top - h, h, P, { convex: true, bevel: 0.4 });
      const screws = [-3.9, 3.9].map((o) => at([c[0] + n[0] * o, c[1] + n[1] * o, top]));
      put(name, [c[0], c[1], top - h / 2], S(paths, { tone: "mid" }) + D(screws, { size: 0.42 }), [solid(A.extruded(ring, top - h, h, { name }))]);
      const post = `track.post${i}`;
      const z0 = 0;
      const z1 = top - h;
      const footScrews = D([at([c[0] + 1.95, c[1], z0 + 1.3]), at([c[0] - 1.95, c[1], z0 + 1.3])], { size: 0.32, tone: "lo" });
      put(`${post}.foot`, [c[0], c[1], 0.6], S(cyl(c[0], c[1], 2.6, z0, 1.3, 0.3), { tone: "mid" }) + footScrews, [solid(A.cylinder(c[0], c[1], 2.6, z0, 1.3, { name: `${post}.foot` }))]);
      put(post, [c[0], c[1], (z0 + z1) / 2], S(cyl(c[0], c[1], 1.25, z0 + 1.3, z1 - z0 - 2.4), { tone: "mid", crease: "none" }), [solid(A.cylinder(c[0], c[1], 1.25, z0 + 1.3, z1 - z0 - 2.4, { name: post }))]);
      put(`${post}.cap`, [c[0], c[1], z1 - 0.55], S(cyl(c[0], c[1], 2, z1 - 1.1, 1.1), { tone: "mid" }), [solid(A.cylinder(c[0], c[1], 2, z1 - 1.1, 1.1, { name: `${post}.cap` }))]);
    } else {
      const ring = ccw(rectAround(c, t, n, 0.9, 4.6));
      const name = `track.tie${i}`;
      put(name, [c[0], c[1], z - 0.55], S(k.extrude(ring, z - 1.1, 1.1, P, { convex: true }), { tone: "lo" }), [solid(A.extruded(ring, z - 1.1, 1.1, { name }))]);
    }
  });
}

// ---------------------------------------------------------------- the lift
const LIFT_PARTS = {};
function lift() {
  const [ax, ay] = AXIS;
  // bottom housing: on the plate, rails lie on its top, a drop hole and the screw's hole in it
  const bh = BOTTOM_HOUSING;
  const holes =
    `<path class="hf-void" d="${k.pathOf(k.circleRing(ax, ay, SCREW_HOLE, 72).map(([x, y]) => at([x, y, HB])), true)}"/>` +
    L(k.ring(ax, ay, SCREW_HOLE, HB, P, 72), { tone: "lo" }) +
    L(k.ring(ax, ay, SCREW_HOLE + 1.6, HB, P, 72), { tone: "faint" }) +
    `<path class="hf-void" d="${k.pathOf(k.circleRing(DROP_HOLE.at[0], DROP_HOLE.at[1], DROP_HOLE.r, 48).map(([x, y]) => at([x, y, HB])), true)}"/>` +
    L(k.ring(DROP_HOLE.at[0], DROP_HOLE.at[1], DROP_HOLE.r, HB, P, 48), { tone: "lo" }) +
    D([at([bh.x + 3.5, bh.y + 3.5, HB]), at([bh.x + bh.w - 3.5, bh.y + 3.5, HB]), at([bh.x + 3.5, bh.y + bh.d - 3.5, HB]), at([bh.x + bh.w - 3.5, bh.y + bh.d - 3.5, HB])], { size: 0.5 });
  // an access cover on the front face, with four screws
  const coverY = bh.y + bh.d;
  const cover = [
    [bh.x + 5, coverY, 4],
    [bh.x + bh.w - 5, coverY, 4],
    [bh.x + bh.w - 5, coverY, HB - 6],
    [bh.x + 5, coverY, HB - 6],
  ];
  const coverLine = L(k.pathOf(cover.map(at), true), { tone: "lo" }) + D(cover.map(([x, y, z], i) => at([x + (i === 0 || i === 3 ? 2 : -2), y, z + (i < 2 ? 2 : -2)])), { size: 0.45 });
  put(
    "lift.bottom",
    [bh.x + bh.w / 2, bh.y + bh.d / 2, HB / 2],
    S(k.slabOf(bh, 0, HB, P, 6, 0.8), { tone: "mid", inner: L(k.sideSeam(bh, 6, P, 6), { tone: "faint" }) + coverLine }) + holes,
    [solid(A.slab(bh, 0, HB, { name: "lift.bottom" }))],
  );

  // guide rods, standing on the bottom housing and carrying the top housing
  ROD_ANGLES.forEach((deg, i) => {
    const a = (deg * Math.PI) / 180;
    const x = ax + ROD_AT * Math.cos(a);
    const y = ay + ROD_AT * Math.sin(a);
    const name = `lift.rod${i}`;
    put(name, [x, y, (HB + TOP_LO) / 2], S(cyl(x, y, ROD_R, HB, TOP_LO - HB), { tone: "mid", crease: "none" }) + S(cyl(x, y, 1.6, HB, 1.2), { tone: "mid" }), [
      solid(A.cylinder(x, y, ROD_R, HB, TOP_LO - HB, { name })),
      solid(A.ring(UP(x, y), HB, HB + 1.2, ROD_R, 1.6, { name: `${name}.collar` })),
    ]);
  });

  // the screw: shaft plus a wire helix, drawn a turn longer at each end so it can move up by a
  // turn and repeat; the hole's cylinder clips it below the housing top, the top housing hides the rest
  const helixFrom = HB - PITCH - 2;
  const helixTo = TOP_LO + PITCH + 2;
  const wire = (from, to) => {
    const pts = [];
    const turns = (to - from) / PITCH;
    const n = Math.ceil(turns * 64);
    for (let i = 0; i <= n; i++) {
      const z = from + ((to - from) * i) / n;
      const angle = ((z - WIRE_BASE) / PITCH) * TAU;
      pts.push([ax + HELIX * Math.cos(angle), ay + HELIX * Math.sin(angle), z]);
    }
    return pts;
  };
  const route = wire(helixFrom, helixTo);
  const pieces = tubePieces(route, WIRE_R, P, { maxLength: 5, spacing: 1.4 });
  const facing = (p) => (p[0] - ax) * V[0] + (p[1] - ay) * V[1];
  const back = pieces.filter((piece) => facing(piece.mid) < 0);
  const front = pieces.filter((piece) => facing(piece.mid) >= 0);
  const clipRing = [];
  for (let i = 0; i < 72; i++) {
    const a = (i / 72) * TAU;
    clipRing.push(at([ax + SCREW_HOLE * Math.cos(a), ay + SCREW_HOLE * Math.sin(a), HB]));
    clipRing.push(at([ax + SCREW_HOLE * Math.cos(a), ay + SCREW_HOLE * Math.sin(a), TOP_HI + 4]));
  }
  const clip = k.pathOf(G.hullOf(clipRing), true);
  const shaft = S(cyl(ax, ay, SHAFT_R, HB, TOP_LO - HB), { tone: "mid", crease: "none" }) + S(cyl(ax, ay, 2.6, HB, 1.6), { tone: "mid" });
  LIFT_PARTS.clip = clip;
  LIFT_PARTS.rise = PITCH * SCALE * Math.cos((ELEVATION * Math.PI) / 180);
  const svg =
    `<defs><clipPath id="hf-screw-clip"><path d="${clip}"/></clipPath></defs>` +
    `<g clip-path="url(#hf-screw-clip)">` +
    `<g data-helix="back">${back.map((piece) => tubeSvg(piece, { tone: "mid" })).join("")}</g>` +
    shaft +
    `<g data-helix="front">${front.map((piece) => tubeSvg(piece, { tone: "hi" })).join("")}</g>` +
    `<g data-slot="lift"></g>` +
    `</g>`;
  // record the screw as drawn at rest, with the shaft and the column the marbles ride in
  const visible = route.filter((p) => p[2] >= HB && p[2] <= TOP_LO);
  put("lift.screw", [ax, ay, (HB + TOP_LO) / 2], svg, [
    A.tube(visible, WIRE_R, { name: "lift.wire" }),
    solid(A.cylinder(ax, ay, SHAFT_R, HB, TOP_LO - HB, { name: "lift.shaft" })),
    solid(A.ring(UP(ax, ay), HB, HB + 1.6, SHAFT_R, 2.6, { name: "lift.shaft.collar" })),
    A.cylinder(RISE[0], RISE[1], MARBLE, HB, TOP_LO - HB, { name: "lift.column" }),
  ], { lift: true });

  // the drop hole: a marble falls through it, clipped by the hole's own cylinder
  const dropRing = [];
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * TAU;
    dropRing.push(at([DROP_HOLE.at[0] + DROP_HOLE.r * Math.cos(a), DROP_HOLE.at[1] + DROP_HOLE.r * Math.sin(a), HB]));
    dropRing.push(at([DROP_HOLE.at[0] + DROP_HOLE.r * Math.cos(a), DROP_HOLE.at[1] + DROP_HOLE.r * Math.sin(a), HB + 12]));
  }
  put(
    "lift.drop",
    [DROP_HOLE.at[0], DROP_HOLE.at[1], HB + 4],
    `<defs><clipPath id="hf-drop-clip"><path d="${k.pathOf(G.hullOf(dropRing), true)}"/></clipPath></defs><g clip-path="url(#hf-drop-clip)"><g data-slot="drop"></g></g>`,
    [A.cylinder(DROP_HOLE.at[0], DROP_HOLE.at[1], MARBLE, HB, ENTRY_Z + MARBLE - HB, { name: "lift.dropping" })],
  );

  // top housing with the motor on it
  const th = TOP_HOUSING;
  const thTop =
    L(k.planOutline(k.insetPlan(th, 3.2), TOP_HI, P), { tone: "faint" }) +
    D([at([th.x + 5, th.y + 5, TOP_HI]), at([th.x + th.w - 5, th.y + 5, TOP_HI]), at([th.x + 5, th.y + th.d - 5, TOP_HI]), at([th.x + th.w - 5, th.y + th.d - 5, TOP_HI])], { size: 0.5 });
  put("lift.top", [th.x + th.w / 2, th.y + th.d / 2, (TOP_LO + TOP_HI) / 2], S(k.slabOf(th, TOP_LO, TOP_HI - TOP_LO, P, 6, 0.8), { tone: "mid", inner: L(k.sideSeam(th, TOP_LO + 6, P, 6), { tone: "faint" }) }) + thTop, [
    solid(A.slab(th, TOP_LO, TOP_HI - TOP_LO, { name: "lift.top" })),
  ]);
  const m0 = TOP_HI;
  const motor =
    S(cyl(ax, ay, 8.5, m0, 1.4, 0.3), { tone: "mid" }) +
    S(cyl(ax, ay, 7, m0 + 1.4, 9), { tone: "mid", inner: L(k.sideArc(ax, ay, 7, m0 + 4.5, P, 32), { tone: "faint" }) }) +
    L(k.knurl(ax, ay, 7, m0 + 5.2, m0 + 10.4, 40, P), { tone: "lo" }) +
    S(cyl(ax, ay, 5.2, m0 + 10.4, 1.6, 0.3), { tone: "mid" }) +
    L(k.ring(ax, ay, 2.2, m0 + 12, P, 24), { tone: "lo" }) +
    D([at([ax, ay, m0 + 12])], { size: 0.55, tone: "hi" });
  put("lift.motor", [ax, ay, m0 + 6], motor, [
    solid(A.cylinder(ax, ay, 8.5, m0, 1.4, { name: "lift.motor.flange" })),
    solid(A.cylinder(ax, ay, 7, m0 + 1.4, 9, { name: "lift.motor" })),
    solid(A.cylinder(ax, ay, 5.2, m0 + 10.4, 1.6, { name: "lift.motor.cap" })),
  ]);
  // a terminal box on the motor's side
  const box = { x: ax + 7, y: ay - 3.2, w: 4.2, d: 6.4, r: 1 };
  put("lift.terminal", [box.x + box.w / 2, box.y + box.d / 2, m0 + 5], S(k.slabOf(box, m0 + 2.6, 5.4, P, 3, 0.3), { tone: "mid" }) + D([at([box.x + box.w / 2, box.y + 1.6, m0 + 8]), at([box.x + box.w / 2, box.y + box.d - 1.6, m0 + 8])], { size: 0.4 }), [
    solid(A.slab(box, m0 + 2.6, 5.4, { name: "lift.terminal" })),
  ]);
}

// ---------------------------------------------------------------- the merge chute with its gate
function chute() {
  const route = (side) => {
    const pts = [];
    for (let x = CHUTE_START; x <= CHUTE_END + 1e-6; x += 1) pts.push([x, CHUTE_Y + side * HALF_GAUGE, chuteZ(x)]);
    return pts;
  };
  [1, -1].forEach((side, r) => {
    const name = `chute.rail${r ? "R" : "L"}`;
    const pts = route(side);
    // the lower end is a cut rail resting on pads over the gate, not a port
    R.route(name, pts, CHUTE_R, { ends: [true, false], touch: ["chute.tie*", "chute.pad*"] });
    tubePieces(pts, CHUTE_R, P, { maxLength: 8 }).forEach((piece, index) =>
      put(`${name}:${index}`, piece.mid, tubeSvg(piece, { tone: "hi" }), [A.tube(piece.points, piece.radii)], { route: name, chunk: index }),
    );
  });
  // end stop at the top of the chute: rails end on its face
  const stop = { x: CHUTE_START - 3, y: CHUTE_Y - 5.2, w: 3, d: 10.4, r: 0.8 };
  const stopZ = chuteZ(CHUTE_START) - 2.4;
  put("chute.stop", [stop.x + 1.5, CHUTE_Y, stopZ + 3.5], S(k.slabOf(stop, stopZ, 7, P, 3, 0.4), { tone: "mid" }) + D([at([stop.x + 1.5, CHUTE_Y - 3.4, stopZ + 7]), at([stop.x + 1.5, CHUTE_Y + 3.4, stopZ + 7])], { size: 0.42 }), [
    solid(A.slab(stop, stopZ, 7, { name: "chute.stop" })),
  ]);
  // cross ties under the chute rails and two posts
  const xs = [];
  for (let x = CHUTE_START + 4; x <= CHUTE_END - 2; x += 7) xs.push(x);
  xs.forEach((x, i) => {
    const z = chuteZ(x + 0.9) - CHUTE_R;
    const plan = { x: x - 0.9, y: CHUTE_Y - 4.4, w: 1.8, d: 8.8, r: 0.4 };
    const name = `chute.tie${i}`;
    put(name, [x, CHUTE_Y, z - 0.55], S(k.slabOf(plan, z - 1.1, 1.1, P, 2), { tone: "lo" }), [solid(A.slab(plan, z - 1.1, 1.1, { name }))]);
  });
  // posts under the stop and under the gate
  const posts = [CHUTE_START - 1.5, GATE_X - 1];
  posts.forEach((x, i) => {
    const top = i === 0 ? stopZ : chuteZ(x) - CHUTE_R - 1.1 - 2.2;
    const name = `chute.post${i}`;
    const footScrews = D([at([x + 1.95, CHUTE_Y, 1.3]), at([x - 1.95, CHUTE_Y, 1.3])], { size: 0.32, tone: "lo" });
    put(`${name}.foot`, [x, CHUTE_Y, 0.6], S(cyl(x, CHUTE_Y, 2.6, 0, 1.3, 0.3), { tone: "mid" }) + footScrews, [solid(A.cylinder(x, CHUTE_Y, 2.6, 0, 1.3, { name: `${name}.foot` }))]);
    put(name, [x, CHUTE_Y, top / 2], S(cyl(x, CHUTE_Y, 1.25, 1.3, top - 1.3), { tone: "mid", crease: "none" }), [solid(A.cylinder(x, CHUTE_Y, 1.25, 1.3, top - 1.3, { name }))]);
  });
  // the gate: a solenoid body under the chute end and the pin that stops the queue
  const body = { x: GATE_X - 3, y: CHUTE_Y - 3.4, w: CHUTE_END - GATE_X + 3, d: 6.8, r: 1 };
  const bodyTop = chuteZ(GATE_X) - CHUTE_R - 1.1;
  const bodyZ = bodyTop - 2.2;
  put("chute.solenoid", [body.x + body.w / 2, CHUTE_Y, bodyZ + 1.1], S(k.slabOf(body, bodyZ, 2.2, P, 3, 0.4), { tone: "mid" }) + D([at([body.x + 1.2, CHUTE_Y - 2.2, bodyTop]), at([body.x + 1.2, CHUTE_Y + 2.2, bodyTop])], { size: 0.4 }), [
    solid(A.slab(body, bodyZ, 2.2, { name: "chute.solenoid" })),
  ]);
  // two pads on the solenoid carry the rails' cut ends, either side of the pin
  [1, -1].forEach((side, i) => {
    const pad = { x: CHUTE_END - 2.6, y: CHUTE_Y + side * HALF_GAUGE - 1.3, w: 2.6, d: 2.6, r: 0.5 };
    const top = chuteZ(CHUTE_END) - CHUTE_R;
    const name = `chute.pad${i}`;
    put(name, [pad.x + 1.3, pad.y + 1.3, (bodyTop + top) / 2], S(k.slabOf(pad, bodyTop, top - bodyTop, P, 2), { tone: "mid" }), [solid(A.slab(pad, bodyTop, top - bodyTop, { name }))]);
  });
  const pinTop = chuteZ(GATE_X) + RIDE + 1.5;
  put(
    "chute.gate",
    [GATE_X, CHUTE_Y, pinTop - 3],
    `<g data-part="gate">${S(cyl(GATE_X, CHUTE_Y, GATE_R, bodyTop, pinTop - bodyTop), { tone: "hi", crease: "none" })}</g>`,
    [solid(A.cylinder(GATE_X, CHUTE_Y, GATE_R, bodyTop, pinTop - bodyTop, { name: "chute.gate" }))],
  );
  LIFT_PARTS.gateDrop = (pinTop - bodyTop - 0.3) * SCALE * Math.cos((ELEVATION * Math.PI) / 180);
}

// ---------------------------------------------------------------- stations: where a marble sits in the order
const STATIONS = [];
function station(path, index, p) {
  const item = put(`marble.${path}${index}`, p, "", [A.ball(p, MARBLE)], { station: { path, index } });
  STATIONS.push(item);
  return item;
}

// ---------------------------------------------------------------- build
base();
rails();
ties();
lift();
chute();

const LOOP_STEP = 1; // one sample per unit of loop
const LOOP_SAMPLES = LOOP / LOOP_STEP;
const loopSamples = [];
for (let i = 0; i < LOOP_SAMPLES; i++) loopSamples.push(loopAt(i * LOOP_STEP));
const STATION_EVERY = 2;
loopSamples.forEach((sample, i) => {
  if ((sample.zone === "track" || sample.zone === "approach" || sample.zone === "exit") && i % STATION_EVERY === 0) station("loop", i, sample.p);
});
const CHUTE_SAMPLES = [];
for (let x = QUEUE[QUEUE.length - 1]; x <= QUEUE[0] + 1e-6; x += 1) CHUTE_SAMPLES.push(chuteMarble(x));
CHUTE_SAMPLES.forEach((p, i) => station("chute", i, p));
const MERGE_SAMPLES = [];
for (let d = 0; d <= MERGE_LENGTH + 1e-6; d += 1) MERGE_SAMPLES.push(mergeAt(d));
MERGE_SAMPLES.forEach((p, i) => station("merge", i, p));

const isStation = (item) => Boolean(item.station);
const ownPath = (item) => item.name === "lift.drop" || item.name === "lift.screw";
const skip = (a, b) => A.sameRun(a, b) || (isStation(a) && isStation(b)) || (ownPath(a) && isStation(b)) || (ownPath(b) && isStation(a));
const overlaps = A.overlapsOf(R.items, P, { states: [0], skip });
const solved = A.orderKeys(R.items, overlaps);
R.items.forEach((item, index) => (item.key = solved.keys[index]));
R.settled = { items: R.items.slice(), overlaps, solved, states: [0] };

const order = R.items.map((item, index) => ({ item, index })).sort((x, y) => x.item.key - y.item.key || x.index - y.index);
const statics = [];
const slotOf = new Map();
for (const { item } of order) {
  if (isStation(item)) slotOf.set(item, statics.length);
  else statics.push(item);
}
// The light on the rails: segments GLOW_STEP long behind the orange marble, drawn inside the rail
// chunks so the bridge and the posts still cover them. Where two chunks overlap at a joint, the
// light there belongs to whichever chunk is drawn later, or that chunk's body would cut it.
{
  const rank = new Map(statics.map((item, index) => [item, index]));
  for (const { side, chunks, arc, arcAt } of RAIL_CHUNKS) {
    const sAt = (a) => {
      let lo = 0;
      let hi = arc.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (arc[mid] <= a) lo = mid;
        else hi = mid;
      }
      const f = (a - arc[lo]) / (arc[hi] - arc[lo] || 1);
      return ((lo + f) / (arc.length - 1)) * TRACK_LENGTH;
    };
    chunks.forEach((chunk, index) => {
      const before = chunks[index - 1];
      const after = chunks[index + 1];
      const from = before ? chunk.from + (rank.get(chunk.item) > rank.get(before.item) ? -0.5 : 0.5) : chunk.from;
      const to = after ? chunk.to + (rank.get(chunk.item) > rank.get(after.item) ? 0.5 : -0.5) : chunk.to;
      const paths = [];
      for (let g = 0; g < GLOW_COUNT; g++) {
        const a0 = Math.max(from, arcAt(g * GLOW_STEP));
        const a1 = Math.min(to, arcAt(Math.min(TRACK_LENGTH, (g + 1) * GLOW_STEP)) + 0.05);
        if (a1 - a0 < 0.02) continue;
        const n = Math.max(1, Math.ceil((a1 - a0) / 1.5));
        const pts = [];
        for (let j = 0; j <= n; j++) {
          const p = railAt(sAt(a0 + ((a1 - a0) * j) / n), side);
          pts.push(at([p[0], p[1], p[2] + RAIL_R * 0.55]));
        }
        paths.push(`<path class="hf-glow" data-glow="${g}" d="${k.pathOf(pts)}"/>`);
      }
      chunk.item.svg += paths.join("");
    });
  }
}
const usedSlots = new Set([...slotOf.values()]);
const body = [MARBLE_DEF, STATIC_BACK.join("")];
statics.forEach((item, j) => {
  if (usedSlots.has(j)) body.push(`<g data-slot="${j}"></g>`);
  body.push(item.svg);
});
if (usedSlots.has(statics.length)) body.push(`<g data-slot="${statics.length}"></g>`);

// per-sample slots for the page
const stationSlot = (path, index) => {
  const item = STATIONS.find((s) => s.station.path === path && s.station.index === index);
  return item ? String(slotOf.get(item)) : null;
};
const loopStations = STATIONS.filter((s) => s.station.path === "loop");
const slotByLoopIndex = new Map(loopStations.map((s) => [s.station.index, String(slotOf.get(s))]));
const loopSlot = loopSamples.map((sample, i) => {
  if (sample.zone === "drop") return "drop";
  if (sample.zone === "rise") return sample.p[2] < HB - MARBLE - 0.2 || sample.p[2] > TOP_LO + MARBLE + 0.2 ? "hide" : "lift";
  if (sample.zone === "inside") return "hide";
  if (sample.zone === "drop" && sample.p[2] < HB - MARBLE) return "hide";
  const even = i - (i % STATION_EVERY);
  const next = (even + STATION_EVERY) % LOOP_SAMPLES;
  const pick = i % STATION_EVERY < STATION_EVERY / 2 ? even : next;
  return slotByLoopIndex.get(pick) ?? slotByLoopIndex.get(even) ?? "hide";
});
// a dropping marble is hidden once it is wholly below the housing top
loopSamples.forEach((sample, i) => {
  if (sample.zone === "drop" && sample.p[2] + MARBLE < HB - 0.1) loopSlot[i] = "hide";
});

const ORIGIN = at([0, 0, 0]);
const flatOf = (p) => {
  const [x, y] = at(p);
  return [Math.round((x - ORIGIN[0]) * 100) / 100, Math.round((y - ORIGIN[1]) * 100) / 100];
};

// ---------------------------------------------------------------- the model's starting state
const START_SITES = [0, 7, 14, 20, 27, 34, 41, 47]; // of 54 sites, PITCH apart on the loop
const LIT = 3; // the orange marble starts on site 20

const data = {
  view: [WIDTH, HEIGHT],
  pitch: PITCH,
  speed: SPEED,
  loop: LOOP,
  sites: LOOP_SITES,
  trackLength: Math.round(TRACK_LENGTH * 1000) / 1000,
  glowStep: GLOW_STEP,
  glowCount: GLOW_COUNT,
  trail: LIGHT_TRAIL,
  helixRise: Math.round(LIFT_PARTS.rise * 1000) / 1000,
  gateDrop: Math.round(LIFT_PARTS.gateDrop * 100) / 100,
  mergeS: Math.round(MERGE_S * 1000) / 1000,
  mergeLength: Math.round(MERGE_LENGTH * 1000) / 1000,
  queueGap: Math.round((QUEUE[0] - QUEUE[1]) * 1000) / 1000,
  queue: QUEUE.map((x) => Math.round((x - QUEUE[QUEUE.length - 1]) * 1000) / 1000),
  spares: SPARES,
  start: START_SITES,
  lit: LIT,
  loopXY: loopSamples.map((s) => flatOf(s.p)).flat(),
  loopSlot,
  chuteXY: CHUTE_SAMPLES.map(flatOf).flat(),
  chuteSlot: CHUTE_SAMPLES.map((_, i) => stationSlot("chute", i) ?? "hide"),
  mergeXY: MERGE_SAMPLES.map(flatOf).flat(),
  mergeSlot: MERGE_SAMPLES.map((_, i) => stationSlot("merge", i) ?? "hide"),
};

// ---------------------------------------------------------------- the resting picture
// Marbles at t = 0 are drawn into their slots, so the picture is right before any script runs.
const marbleSvg = (id, lit, xy) =>
  lit
    ? `<g class="hf-marble hf-lit" data-marble="${id}" transform="translate(${xy[0]} ${xy[1]})"><circle class="hf-bloom" cx="${ORIGIN[0].toFixed(2)}" cy="${ORIGIN[1].toFixed(2)}" r="${(MARBLE * SCALE * 2.1).toFixed(1)}"/><use href="#hf-marble"/></g>`
    : `<g class="hf-marble" data-marble="${id}" transform="translate(${xy[0]} ${xy[1]})"><use href="#hf-marble"/></g>`;
function restBody() {
  const slots = new Map();
  const place = (slot, xy, lit, id) => {
    if (slot === "hide" || slot === null) return;
    slots.set(slot, (slots.get(slot) ?? "") + marbleSvg(id, lit, xy));
  };
  START_SITES.forEach((site, i) => {
    const index = Math.round(((site * PITCH) % LOOP) / LOOP_STEP) % LOOP_SAMPLES;
    place(loopSlot[index], [data.loopXY[index * 2], data.loopXY[index * 2 + 1]], i === LIT, `m${i}`);
  });
  QUEUE.forEach((x, i) => {
    const index = Math.round(x - QUEUE[QUEUE.length - 1]);
    place(data.chuteSlot[index], [data.chuteXY[index * 2], data.chuteXY[index * 2 + 1]], false, `s${i}`);
  });
  let html = body.join("");
  for (const [slot, marbles] of slots) html = html.replace(`<g data-slot="${slot}"></g>`, `<g data-slot="${slot}">${marbles}</g>`);
  return html;
}

// The drawing's own tokens: the kit's dark theme warmed toward the card it sits on, and the brand
// orange as the one coloured accent (the lit marble and the light it leaves on the rails).
const HF_CSS = `
.hf-art{--anatomy-paper:#1b1716;--anatomy-face:#262120;--anatomy-top:#2a2524;
--anatomy-shade-0:#141110;--anatomy-shade-1:#181413;--anatomy-shade-2:#1d1918;--anatomy-shade-3:#221e1d;
--anatomy-lit-top:#2e2827;--anatomy-lit-shade:#221d1c;
--anatomy-hi:#e4ddd3;--anatomy-mid:#8a817b;--anatomy-lo:#57504c;--anatomy-faint:#3a3432;--anatomy-lit:#ff553d;
--anatomy-halo:#040303;--anatomy-halo-opacity:.85;--anatomy-dot:#ece6dc;--hf-signal:#ff553d;--hf-void:#0b0909}
.hf-void{fill:var(--hf-void);stroke:none}
.hf-glow{fill:none;stroke:var(--hf-signal);stroke-width:1.15;stroke-linecap:butt;opacity:0}
.hf-marble{--anatomy-shade-0:#4b4644;--anatomy-shade-1:#69635f;--anatomy-shade-2:#8f8882;--anatomy-shade-3:#c9c2b9;--anatomy-hi:#efe9e0}
.hf-marble .iso-fill{fill:#3a3634}
.hf-lit{--anatomy-paper:#7a2216;--anatomy-shade-0:#b9311f;--anatomy-shade-1:#e0412b;--anatomy-shade-2:#ff553d;--anatomy-shade-3:#ff8b74;--anatomy-hi:#ffc2b5}
.hf-lit .iso-fill{fill:#a52b1b}
.hf-bloom{fill:var(--hf-signal);opacity:.16;filter:blur(3px)}
`;
const ART = restBody();
const LABEL =
  "A figure-eight marble run on a bench base. Steel marbles roll down a two-rail track shaped like an infinity loop, one pass bridging the other where they cross, and a screw lift carries each one back up so the loop never stops. One marble glows orange and lights the rails behind it. A chute beside the right lobe holds spare marbles behind a gate.";
const svgFile = `<svg xmlns="http://www.w3.org/2000/svg" class="iso iso-svg hf-art" data-theme="dark" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}" role="img" aria-label="${LABEL}"><style>${k.ISO_CSS.replace(/\s*\n\s*/g, "")}${HF_CSS.replace(/\n/g, "")}</style>${ART}</svg>\n`;
writeFileSync(join(ROOT, "public", "hero-figure", "hero-figure.svg"), svgFile);

const ts = `// Generated by scripts/hero-figure/build.mjs from the same model that draws public/hero-figure/hero-figure.svg.
// Do not edit by hand: change the build script and run \`node scripts/hero-figure/build.mjs\`.
export interface HeroData {
  view: number[];
  pitch: number;
  speed: number;
  loop: number;
  sites: number;
  trackLength: number;
  glowStep: number;
  glowCount: number;
  trail: number;
  helixRise: number;
  gateDrop: number;
  mergeS: number;
  mergeLength: number;
  queueGap: number;
  queue: number[];
  spares: number;
  start: number[];
  lit: number;
  loopXY: number[];
  loopSlot: string[];
  chuteXY: number[];
  chuteSlot: string[];
  mergeXY: number[];
  mergeSlot: string[];
}

export const HERO_SRC = "/hero-figure/hero-figure.svg?v=${createHash("sha256").update(svgFile).digest("hex").slice(0, 10)}";
export const HERO_LABEL = ${JSON.stringify(LABEL)};
export const HERO_DATA: HeroData = ${JSON.stringify(data)};
`;
writeFileSync(OUT, ts);
const file = svgFile;

const solids = R.solids.length;
console.log(
  `wrote public/hero-figure/hero-figure.svg · ${(file.length / 1024).toFixed(1)} KB, ${OUT.replace(ROOT + "/", "")} · ${(ts.length / 1024).toFixed(1)} KB · ${statics.length} drawn items · ${solids} recorded solids · ${R.tubes.length} tube runs · ${STATIONS.length} marble stations · loop ${LOOP} (${LOOP_SITES} sites) · track ${TRACK_LENGTH.toFixed(1)} · crossings ${CROSSINGS.map((c) => c.toFixed(1)).join(", ")} · cycles ${solved.cycles.length} · dropped ${solved.dropped.length}`,
);
if (solved.cycles.length) console.log(solved.cycles.slice(0, 12).map((c) => `cycle ${R.items[c.a].name} × ${R.items[c.b].name}`).join("\n"));

if (audit) {
  A.auditOrExit(R, P, { cover: ["lift.screw", "lift.drop", "marble.*"], frames: [], apart: false });
}

if (process.argv.includes("--sizes")) {
  const by = new Map();
  for (const item of statics) {
    const key = item.name.replace(/[0-9:#].*$/, "").replace(/\.(foot|cap)$/, "");
    by.set(key, (by.get(key) ?? 0) + item.svg.length);
  }
  console.log([...by].sort((a, b) => b[1] - a[1]).map(([n, s]) => `${n} ${(s / 1024).toFixed(1)}K`).join("\n"), "\nback", (STATIC_BACK.join("").length / 1024).toFixed(1));
  const parts = new Map();
  for (const shape of R.solids) {
    const key = (shape.name ?? "?").replace(/[0-9#].*$/, "").replace(/\.(foot|cap|collar|flange)$/, "");
    parts.set(key, (parts.get(key) ?? 0) + 1);
  }
  console.log("solids by part:", [...parts].map(([n, c]) => `${n} ${c}`).join(", "));
}
