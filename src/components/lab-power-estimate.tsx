"use client";

import { useState } from "react";
import { monthlyPowerEstimate } from "@/lib/lab-power";

export function LabPowerEstimate() {
  const [scope, setScope] = useState<"core" | "whole">("whole");
  const [load, setLoad] = useState<"working" | "heavy">("working");
  const [hours, setHours] = useState(8);
  const [rate, setRate] = useState("0.15");
  const estimate = monthlyPowerEstimate(scope, load, hours, Number(rate));
  return <div className="power-estimate">
    <h3>Estimate monthly electricity</h3>
    <p>Choose a daily schedule. The remaining hours use the idle estimate.</p>
    <div className="power-controls">
      <label>Equipment<select value={scope} onChange={(e) => setScope(e.target.value as "core" | "whole")}><option value="whole">Whole lab, including benches</option><option value="core">Core cluster</option></select></label>
      <label>Active workload<select value={load} onChange={(e) => setLoad(e.target.value as "working" | "heavy")}><option value="working">Mixed work</option><option value="heavy">Heavy load</option></select></label>
      <label>Electricity rate (USD / kWh)<input type="number" min="0" step="0.01" value={rate} onChange={(e) => setRate(e.target.value)} /></label>
      <label>Active hours per day: {hours}<input type="range" min="0" max="24" step="1" value={hours} onChange={(e) => setHours(Number(e.target.value))} /></label>
    </div>
    <div className="power-result" aria-live="polite" aria-atomic="true"><strong>${estimate.cost.toFixed(2)}<span> / 30-day month</span></strong><p>{estimate.kwh.toFixed(1)} kWh · {24 - hours} hours idle + {hours} hours {load === "working" ? "mixed work" : "heavy load"} each day</p></div>
    <p className="lab-fineprint">Planning estimates, not meter readings. Excludes room cooling, the household router, fixed utility charges, and battery recharging after an outage. The whole-lab model includes a projected, populated Agent Blade.</p>
  </div>;
}
