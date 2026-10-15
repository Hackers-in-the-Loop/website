import type { HeroData } from "./hero-data";
import { gateOpen, glowLevel, initialState, loopUnits, mergeNow, mergePhase, mod, planMerge, queueTargets, readoutOf, step, type HeroState } from "./model";

// Drives the inline drawing: one requestAnimationFrame loop that writes transforms, opacities and
// the readout straight onto the SVG. No framework re-renders, nothing runs offscreen or under
// reduced motion (the figure still answers a press there, at once).

const SVG_NS = "http://www.w3.org/2000/svg";
const LONGEST_FRAME = 1 / 30;
const FIRST_DROP = 3.5; // seconds of running clock before the tour drops the first spare in
const DROP_EVERY = 12;
const QUIET = 3.6; // the tour waits this long after the reader's last press

export interface HeroHooks {
  readout: (text: string) => void;
  announce: (text: string) => void;
}

export interface HeroHandle {
  drop: () => void;
  dispose: () => void;
}

const fine = (value: number) => Math.round(value * 100) / 100;

export function startHero(svg: SVGSVGElement, data: HeroData, hooks: HeroHooks): HeroHandle {
  const state: HeroState = initialState(data);
  const still = window.matchMedia("(prefers-reduced-motion: reduce)");

  const slots = new Map<string, SVGGElement>();
  svg.querySelectorAll<SVGGElement>("g[data-slot]").forEach((node) => slots.set(node.dataset.slot ?? "", node));
  const nodes = new Map<string, SVGGElement>();
  svg.querySelectorAll<SVGGElement>("g[data-marble]").forEach((node) => nodes.set(node.dataset.marble ?? "", node));
  const glow: SVGPathElement[][] = Array.from({ length: data.glowCount }, () => []);
  svg.querySelectorAll<SVGPathElement>("path[data-glow]").forEach((node) => glow[Number(node.dataset.glow)]?.push(node));
  const helix = [...svg.querySelectorAll<SVGGElement>("g[data-helix]")];
  const gate = svg.querySelector<SVGGElement>("g[data-part='gate']");

  // a marble that starts hidden (inside a housing) has no node in the resting picture yet
  const nodeOf = (id: string, lit: boolean) => {
    let node = nodes.get(id);
    if (!node) {
      node = document.createElementNS(SVG_NS, "g");
      node.setAttribute("class", lit ? "hf-marble hf-lit" : "hf-marble");
      node.dataset.marble = id;
      const use = document.createElementNS(SVG_NS, "use");
      use.setAttribute("href", "#hf-marble");
      node.appendChild(use);
      nodes.set(id, node);
    }
    return node;
  };
  const place = (node: SVGGElement, slot: string, x: number, y: number) => {
    if (slot === "hide") {
      if (node.parentNode) node.parentNode.removeChild(node);
      return;
    }
    const host = slots.get(slot);
    if (!host) return;
    if (node.parentNode !== host) host.appendChild(node);
    node.setAttribute("transform", `translate(${fine(x)} ${fine(y)})`);
  };
  const along = (xy: number[], slotsOf: string[], at: number, wrap: number | null) => {
    const count = slotsOf.length;
    const u = wrap === null ? Math.min(Math.max(at, 0), count - 1) : mod(at, wrap);
    const i = Math.floor(u);
    const f = u - i;
    const j = wrap === null ? Math.min(i + 1, count - 1) : (i + 1) % count;
    const k = wrap === null ? Math.min(Math.round(u), count - 1) : Math.round(u) % count;
    return { x: xy[i * 2] + (xy[j * 2] - xy[i * 2]) * f, y: xy[i * 2 + 1] + (xy[j * 2 + 1] - xy[i * 2 + 1]) * f, slot: slotsOf[k] };
  };

  const spareAt = new Map(state.spares.map((spare) => [spare.id, spare.x]));
  const lit = new Set<number>();
  let said = "";

  function draw() {
    const t = state.t;
    for (const marble of state.marbles) {
      const p = along(data.loopXY, data.loopSlot, loopUnits(data, marble.site, t), data.loop);
      place(nodeOf(marble.id, marble.lit), p.slot, p.x, p.y);
    }
    for (const spare of state.spares) {
      const node = nodeOf(spare.id, false);
      if (state.merge?.id === spare.id) {
        const phase = mergePhase(data, state.merge, t);
        if (phase.phase !== "waiting") {
          const p = along(data.mergeXY, data.mergeSlot, phase.along, null);
          place(node, p.slot, p.x, p.y);
          continue;
        }
      }
      const p = along(data.chuteXY, data.chuteSlot, spareAt.get(spare.id) ?? spare.x, null);
      place(node, p.slot, p.x, p.y);
    }
    // the screw turns as fast as the marbles climb: one turn per pitch of travel
    const lift = (mod(data.speed * t, data.pitch) / data.pitch) * data.helixRise;
    for (const node of helix) node.setAttribute("transform", `translate(0 ${fine(-lift)})`);
    if (gate) {
      const open = gateOpen(data, state.merge, t);
      if (open > 0) gate.setAttribute("transform", `translate(0 ${fine(open * data.gateDrop)})`);
      else gate.removeAttribute("transform");
    }
    // the orange marble lights the rails behind it
    const leader = state.marbles.find((marble) => marble.lit);
    if (leader) {
      const units = loopUnits(data, leader.site, t);
      const first = Math.floor((units - data.trail) / data.glowStep) - 1;
      const last = Math.floor(units / data.glowStep) + 1;
      const now = new Set<number>();
      for (let g = first; g <= last; g++) {
        const segment = mod(g, Math.ceil(data.loop / data.glowStep));
        if (segment >= data.glowCount) continue;
        const level = glowLevel(data, units, segment);
        if (level <= 0.01) continue;
        now.add(segment);
        const text = level.toFixed(2);
        for (const path of glow[segment]) if (path.style.opacity !== text) path.style.opacity = text;
      }
      for (const segment of lit) if (!now.has(segment)) for (const path of glow[segment]) path.style.opacity = "";
      lit.clear();
      now.forEach((segment) => lit.add(segment));
    }
    const text = readoutOf(data, state);
    if (text !== said) {
      said = text;
      hooks.readout(text);
    }
  }

  let frame = 0;
  let last = 0;
  let visible = false;
  let nextDrop = FIRST_DROP;
  let quietUntil = 0;

  function tick(now: number) {
    const dt = last ? Math.min((now - last) / 1000, LONGEST_FRAME) : 1 / 60;
    last = now;
    frame = 0;
    if (still.matches) {
      draw();
      return;
    }
    const joined = step(data, state, dt);
    if (joined) hooks.announce(`A marble joined the loop. ${state.marbles.length} marbles are in it now.`);
    // the queue rolls up behind the gate
    const targets = queueTargets(data, state);
    for (const [id, target] of targets) {
      const x = spareAt.get(id) ?? target;
      const next = x + (target - x) * (1 - Math.exp(-dt / 0.22));
      spareAt.set(id, Math.abs(target - next) < 0.01 ? target : next);
    }
    // the idle tour drops a spare in now and then, as a reader would
    if (state.t >= nextDrop && state.t >= quietUntil && !state.merge && state.spares.length) {
      const merge = planMerge(data, state);
      if (merge) state.merge = merge;
      nextDrop = state.t + DROP_EVERY;
    }
    draw();
    if (visible) frame = requestAnimationFrame(tick);
  }
  const run = () => {
    if (!frame && visible) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  };
  const observer = new IntersectionObserver(
    (entries) => {
      visible = Boolean(entries[entries.length - 1]?.isIntersecting);
      if (visible) run();
    },
    { rootMargin: "120px 0px" },
  );
  observer.observe(svg);
  const onStill = () => {
    draw();
    run();
  };
  still.addEventListener("change", onStill);
  draw();

  return {
    drop() {
      quietUntil = state.t + QUIET;
      nextDrop = Math.max(nextDrop, state.t + QUIET);
      if (!state.spares.length) {
        hooks.announce(`The loop is full: all ${state.marbles.length} marbles are in it.`);
        return;
      }
      if (still.matches) {
        if (mergeNow(data, state)) {
          for (const spare of state.spares) spareAt.set(spare.id, spare.x);
          queueTargets(data, state).forEach((target, id) => spareAt.set(id, target));
          hooks.announce(`A marble joined the loop. ${state.marbles.length} marbles are in it now.`);
        }
        draw();
        return;
      }
      if (state.merge) return;
      state.merge = planMerge(data, state);
      run();
    },
    dispose() {
      cancelAnimationFrame(frame);
      frame = 0;
      observer.disconnect();
      still.removeEventListener("change", onStill);
    },
  };
}
