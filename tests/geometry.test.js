import test from "node:test";
import assert from "node:assert/strict";
import {
  LIMITS,
  formatCssSnippet,
  geometryMetrics,
  normalizeConfig,
  toCssVariables
} from "../assets/geometry.js";

test("normalization clamps transform geometry", () => {
  const config = normalizeConfig({
    height: 120,
    column: 300,
    skew: 90,
    shadow: -20,
    background: "invalid",
    guides: 1
  });

  assert.equal(config.height, LIMITS.height.min);
  assert.equal(config.column, Math.floor(LIMITS.height.min * 0.26));
  assert.equal(config.skew, LIMITS.skew.max);
  assert.equal(config.shadow, LIMITS.shadow.min);
  assert.equal(config.background, "charcoal");
  assert.equal(config.guides, true);
});

test("geometry metrics remain internally consistent", () => {
  const metrics = geometryMetrics({ height: 260, column: 48, skew: 19.6 });

  assert.equal(metrics.gap, 39);
  assert.equal(metrics.width, 135);
  assert.equal(metrics.capHeight, 23);
  assert.equal(Number(metrics.aspectRatio.toFixed(3)), 0.519);
});

test("CSS variables map normalized geometry", () => {
  assert.deepEqual(toCssVariables({ height: 260, column: 48, skew: 19.6, shadow: 24 }), {
    "--mark-height": "260px",
    "--column-width": "48px",
    "--mark-width": "135px",
    "--mark-gap": "39px",
    "--mark-skew": "19.6deg",
    "--shadow-blur": "24px",
    "--cap-height": "23px"
  });
});

test("generated snippet is deterministic", () => {
  const snippet = formatCssSnippet({ height: 200, column: 40, skew: 18, shadow: 20 });

  assert.match(snippet, /--mark-height: 200px;/);
  assert.match(snippet, /--column-width: 40px;/);
  assert.match(snippet, /--mark-skew: 18deg;/);
  assert.match(snippet, /--shadow-blur: 20px;/);
});
