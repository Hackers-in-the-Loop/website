import assert from "node:assert/strict";
import test from "node:test";
import { powerTotals, monthlyPowerEstimate } from "../src/lib/lab-power.ts";

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.00001, `${actual} != ${expected}`);

test("power model reproduces the supplied whole-lab and core totals", () => {
  powerTotals("whole").forEach((value, i) => close(value, [339.3, 693, 1413][i]));
  powerTotals("core").forEach((value, i) => close(value, [229.8, 406.5, 907][i]));
});

test("default schedule reproduces the documented electricity estimate", () => {
  const estimate = monthlyPowerEstimate("whole", "working", 8, 0.15);
  close(estimate.kwh, 329.184);
  assert.equal(estimate.cost.toFixed(2), "49.38");
});

test("idle, heavy, and free electricity scenarios compute consistently", () => {
  close(monthlyPowerEstimate("core", "working", 0, 0.15).kwh, 165.456);
  assert.equal(monthlyPowerEstimate("whole", "heavy", 24, 0.15).cost.toFixed(2), "152.60");
  assert.equal(monthlyPowerEstimate("whole", "working", 8, 0).cost, 0);
});

test("invalid schedules and rates cannot produce negative or nonfinite bills", () => {
  assert.deepEqual(monthlyPowerEstimate("whole", "heavy", 30, 0.15), monthlyPowerEstimate("whole", "heavy", 24, 0.15));
  assert.equal(monthlyPowerEstimate("whole", "working", -5, -1).cost, 0);
  assert.ok(Number.isFinite(monthlyPowerEstimate("whole", "working", NaN, NaN).cost));
});
