"use client";

import * as React from "react";
import { startHero, type HeroHandle } from "./engine";
import { HERO_DATA, HERO_SRC } from "./hero-data";

// The one client component. The server renders the resting picture as an <img> of the same SVG
// file; once that file is in the cache this component inlines it and hands it to the engine, which
// moves the marbles by writing attributes. React never re-renders per frame.

interface Props {
  restReadout: string;
  label: string;
  hint: string;
}

export function HeroLive({ restReadout, label, hint }: Props) {
  const stage = React.useRef<HTMLDivElement>(null);
  const host = React.useRef<HTMLDivElement>(null);
  const readout = React.useRef<HTMLSpanElement>(null);
  const live = React.useRef<HTMLSpanElement>(null);
  const handle = React.useRef<HeroHandle | null>(null);

  React.useEffect(() => {
    const controller = new AbortController();
    const box = host.current;
    const root = stage.current;
    fetch(HERO_SRC, { signal: controller.signal })
      .then((response) => (response.ok ? response.text() : Promise.reject(new Error(String(response.status)))))
      .then((text) => {
        if (controller.signal.aborted || !box || !root) return;
        box.innerHTML = text;
        const svg = box.querySelector("svg");
        if (!svg) return;
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
        svg.removeAttribute("role");
        svg.removeAttribute("aria-label");
        root.dataset.live = "";
        handle.current = startHero(svg, HERO_DATA, {
          readout: (value) => {
            if (readout.current && readout.current.textContent !== value) readout.current.textContent = value;
          },
          announce: (value) => {
            if (live.current) live.current.textContent = value;
          },
        });
      })
      .catch(() => {
        // the resting picture stays: nothing moves, but nothing is missing either
      });
    return () => {
      controller.abort();
      handle.current?.dispose();
      handle.current = null;
      if (box) box.innerHTML = "";
      if (root) delete root.dataset.live;
    };
  }, []);

  const drop = () => handle.current?.drop();

  return (
    <>
      <span className="hf-corner" data-corner="fig" aria-hidden="true">
        Fig 1
      </span>
      <span className="hf-corner" data-corner="title" aria-hidden="true">
        In the loop
      </span>
      <div
        ref={stage}
        className="hf-stage"
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={drop}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          drop();
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- an animated SVG the client takes over; next/image adds nothing here */}
        <img className="hf-still" src={HERO_SRC} alt="" width={HERO_DATA.view[0]} height={HERO_DATA.view[1]} decoding="async" fetchPriority="high" />
        <div ref={host} className="hf-host" />
      </div>
      <span className="hf-corner" data-corner="hint" aria-hidden="true">
        {hint}
      </span>
      <span ref={readout} className="hf-corner" data-corner="readout" aria-hidden="true">
        {restReadout}
      </span>
      <span ref={live} className="hf-sr" aria-live="polite" />
    </>
  );
}
