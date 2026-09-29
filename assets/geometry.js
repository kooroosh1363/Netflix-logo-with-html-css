export const LIMITS = Object.freeze({
  height: { min: 180, max: 420 },
  column: { min: 28, max: 90 },
  skew: { min: 10, max: 28 },
  shadow: { min: 0, max: 40 }
});

export const BACKGROUNDS = Object.freeze(["charcoal", "black", "paper"]);

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, Number(value)));
}

export function normalizeConfig(input = {}) {
  const height = Math.round(clamp(input.height ?? 260, LIMITS.height.min, LIMITS.height.max));
  const maxColumn = Math.min(LIMITS.column.max, Math.floor(height * 0.26));
  const column = Math.round(clamp(input.column ?? 48, LIMITS.column.min, maxColumn));
  const skew = Number(clamp(input.skew ?? 19.6, LIMITS.skew.min, LIMITS.skew.max).toFixed(1));
  const shadow = Math.round(clamp(input.shadow ?? 24, LIMITS.shadow.min, LIMITS.shadow.max));
  const background = BACKGROUNDS.includes(input.background) ? input.background : "charcoal";
  const guides = Boolean(input.guides);

  return { height, column, skew, shadow, background, guides };
}

export function geometryMetrics(config) {
  const value = normalizeConfig(config);
  const gap = Math.round(value.column * 0.82);
  const width = value.column * 2 + gap;
  const overlap = Math.round(value.column * 0.1);
  const capHeight = Math.max(18, Math.round(value.height * 0.09));
  const diagonalOffset = Math.round((Math.tan((value.skew * Math.PI) / 180) * value.height) / 2);

  return {
    ...value,
    gap,
    width,
    overlap,
    capHeight,
    diagonalOffset,
    aspectRatio: width / value.height
  };
}

export function toCssVariables(config) {
  const m = geometryMetrics(config);
  return {
    "--mark-height": `${m.height}px`,
    "--column-width": `${m.column}px`,
    "--mark-width": `${m.width}px`,
    "--mark-gap": `${m.gap}px`,
    "--mark-skew": `${m.skew}deg`,
    "--shadow-blur": `${m.shadow}px`,
    "--cap-height": `${m.capHeight}px`
  };
}

export function formatCssSnippet(config) {
  const vars = toCssVariables(config);
  return [
    ".ribbon-mark {",
    ...Object.entries(vars).map(([key, value]) => `  ${key}: ${value};`),
    "}"
  ].join("\n");
}
