import {
  BACKGROUNDS,
  LIMITS,
  formatCssSnippet,
  geometryMetrics,
  normalizeConfig,
  toCssVariables
} from "./geometry.js";

const heightInput = document.querySelector("#height");
const columnInput = document.querySelector("#column");
const skewInput = document.querySelector("#skew");
const shadowInput = document.querySelector("#shadow");
const backgroundInput = document.querySelector("#background");
const guidesInput = document.querySelector("#guides");
const resetButton = document.querySelector("#reset");
const copyButton = document.querySelector("#copy-css");
const mark = document.querySelector(".ribbon-mark");
const stage = document.querySelector(".mark-stage");
const output = document.querySelector("#css-output");
const status = document.querySelector("[data-status]");

const valueNodes = {
  height: document.querySelector("[data-height-value]"),
  column: document.querySelector("[data-column-value]"),
  skew: document.querySelector("[data-skew-value]"),
  ratio: document.querySelector("[data-ratio-value]")
};

const DEFAULTS = normalizeConfig({
  height: 260,
  column: 48,
  skew: 19.6,
  shadow: 24,
  background: "charcoal",
  guides: false
});

let config = { ...DEFAULTS };

heightInput.min = String(LIMITS.height.min);
heightInput.max = String(LIMITS.height.max);
columnInput.min = String(LIMITS.column.min);
columnInput.max = String(LIMITS.column.max);
skewInput.min = String(LIMITS.skew.min);
skewInput.max = String(LIMITS.skew.max);
shadowInput.min = String(LIMITS.shadow.min);
shadowInput.max = String(LIMITS.shadow.max);

function announce(message) {
  status.textContent = "";
  requestAnimationFrame(() => {
    status.textContent = message;
  });
}

function render() {
  config = normalizeConfig(config);
  const metrics = geometryMetrics(config);
  const vars = toCssVariables(config);

  for (const [name, value] of Object.entries(vars)) {
    mark.style.setProperty(name, value);
  }

  stage.dataset.background = config.background;
  stage.classList.toggle("show-guides", config.guides);

  heightInput.value = String(config.height);
  columnInput.max = String(Math.min(LIMITS.column.max, Math.floor(config.height * 0.26)));
  columnInput.value = String(config.column);
  skewInput.value = String(config.skew);
  shadowInput.value = String(config.shadow);
  backgroundInput.value = config.background;
  guidesInput.checked = config.guides;

  valueNodes.height.textContent = `${metrics.height}px`;
  valueNodes.column.textContent = `${metrics.column}px`;
  valueNodes.skew.textContent = `${metrics.skew}°`;
  valueNodes.ratio.textContent = metrics.aspectRatio.toFixed(3);

  output.textContent = formatCssSnippet(config);
}

heightInput.addEventListener("input", () => {
  config = { ...config, height: Number(heightInput.value) };
  render();
});

columnInput.addEventListener("input", () => {
  config = { ...config, column: Number(columnInput.value) };
  render();
});

skewInput.addEventListener("input", () => {
  config = { ...config, skew: Number(skewInput.value) };
  render();
});

shadowInput.addEventListener("input", () => {
  config = { ...config, shadow: Number(shadowInput.value) };
  render();
});

backgroundInput.addEventListener("change", () => {
  config = {
    ...config,
    background: BACKGROUNDS.includes(backgroundInput.value) ? backgroundInput.value : "charcoal"
  };
  render();
});

guidesInput.addEventListener("change", () => {
  config = { ...config, guides: guidesInput.checked };
  render();
});

resetButton.addEventListener("click", () => {
  config = { ...DEFAULTS };
  render();
  announce("Transform study reset.");
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(formatCssSnippet(config));
    announce("CSS variables copied.");
  } catch {
    announce("Clipboard access is unavailable. Select the code manually.");
  }
});

render();
