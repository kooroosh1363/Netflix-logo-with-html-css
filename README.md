# RibbonLab — CSS Transform & Shadow Study

RibbonLab modernizes the original 2023 Netflix-style CSS logo exercise into an interactive transform and layering lab.

The visual is an **unofficial red ribbon-style N reconstruction** made with HTML and CSS. It uses regular elements, gradients, transforms, masks, and shadows rather than SVG, canvas, or image assets.

> Educational exercise only. This repository is not affiliated with or endorsed by Netflix.

## What changed

The original repository contained:

- one fixed `140 × 250px` construction
- approximate centering with `margin-left: 50%` and `translateX(-50px)`
- no responsive behavior
- no geometry controls or explanation
- no tests or CI
- a two-line README
- an unrelated Dynamics 365 `.gitignore`
- a scratch `text.txt` file
- an incorrect page title: `Netflix google`

RibbonLab turns the experiment into a small CSS-engineering portfolio piece.

## Features

- CSS-only ribbon-style N construction
- live height control
- live column-width control
- live diagonal-skew control
- adjustable shadow depth
- Charcoal / Black / Paper stage presets
- optional geometry guides
- derived aspect-ratio readout
- generated CSS custom-property snippet
- clipboard copy action
- responsive layout
- keyboard-visible focus states
- reduced-motion support
- zero runtime dependencies

## Geometry architecture

The geometry lives in:

```text
assets/geometry.js
```

It owns:

- height bounds
- column-width bounds
- skew constraints
- shadow constraints
- derived gap and width
- crop-cap height
- aspect-ratio calculation
- CSS custom-property generation

The browser layer in `assets/main.js` only applies the normalized geometry to the DOM.

## Construction technique

The reconstruction uses:

1. two vertical red columns;
2. one skewed red diagonal strip;
3. layered gradients for fold depth;
4. box/drop shadows for overlap separation;
5. a curved crop mask at the bottom;
6. CSS custom properties for live tuning.

## Local development

No runtime package installation is required.

Run a static server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Tests

```bash
npm test
```

Run the complete quality gate:

```bash
npm run check
```

The suite verifies normalization, geometry constraints, derived metrics, CSS-variable output, and deterministic snippet generation.

## CI

Every pull request and push to `main` runs JavaScript syntax checks and the Node test suite.

## GitHub Pages

Enable:

**Settings → Pages → Source → GitHub Actions**

Then run:

**Actions → Deploy Pages → Run workflow**

## Scope

RibbonLab is an educational CSS transform study. It is not an official brand asset generator and should not be treated as a source of canonical Netflix logo specifications.

## License

MIT.
