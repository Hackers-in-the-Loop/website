import inventory from "../content/lab-inventory.json" with { type: "json" };

export function powerTotals(scope: "core" | "whole") {
  return inventory.powerGroups.filter((device) => scope === "whole" || device.scope === "Core")
    .reduce((totals, device) => totals.map((value, index) => value + [device.idleW, device.workingW, device.heavyW][index]), [0, 0, 0]);
}

export function monthlyPowerEstimate(scope: "core" | "whole", load: "working" | "heavy", hours: number, rate: number) {
  const totals = powerTotals(scope);
  const activeHours = Math.min(24, Math.max(0, Number.isFinite(hours) ? hours : 0));
  const unitRate = Math.max(0, Number.isFinite(rate) ? rate : 0);
  const kwh = (totals[0] * (24 - activeHours) + totals[load === "working" ? 1 : 2] * activeHours) * 30 / 1000;
  return { kwh, cost: kwh * unitRate };
}
