# @grafikui/design-system

Token-first visual architecture infrastructure for Grafikui projects.

[![Build Tokens](https://github.com/Grafikui/grafikui-design-system/actions/workflows/build.yml/badge.svg)](https://github.com/Grafikui/grafikui-design-system/actions/workflows/build.yml)

**Documentation:** [system.grafikui.com](https://system.grafikui.com)

## What this is

An MIT-licensed, token-first design system establishing the core structural methodology and identity layer of the Grafikui visual framework. Decouples styling decisions into a single centralized source of truth — distributable as CSS custom properties, ESM, or JSON.

## Quick start

Clone the repo and build the token outputs locally:

```bash
git clone https://github.com/Grafikui/grafikui-design-system.git
cd grafikui-design-system
npm install
npm run build
```

This produces three outputs in `dist/`:

| Output | Path | Use |
| ------ | ---- | --- |
| CSS custom properties | `dist/css/tokens.css` | Import into any stylesheet |
| ESM exports | `dist/js/tokens.mjs` | Import in JS/TS projects |
| JSON | `dist/json/tokens.json` | Consume in any toolchain |

### Using the CSS tokens

```css
@import './dist/css/tokens.css';

.button {
  background-color: var(--gfk-color-brand-default);
  border-radius: var(--gfk-radius-sm);
  transition-duration: var(--gfk-motion-duration-normal);
}
```

### Using the JS tokens

```javascript
import { colorBrandDefault, radiusSm } from './dist/js/tokens.mjs';
```

> **npm package** — `@grafikui/design-system` will be published to npm. Until then, consume directly from the built `dist/` outputs above.

## Token categories

| Category | Description | File |
| -------- | ----------- | ---- |
| Color | Base primitives and semantic aliases | `tokens/color/*.json` |
| Typography | Families, weights, sizes, line-height, letter-spacing | `tokens/typography/base.json` |
| Spacing | Strict 4px incremental scale | `tokens/spacing/base.json` |
| Radius | Border radius scale | `tokens/radius/base.json` |
| Motion | Duration scale and easing curves | `tokens/motion/base.json` |

## Using tokens

All CSS variables use the `--gfk-` prefix to avoid global collisions. See `dist/css/tokens.css` for the full output, or browse the live docs at [system.grafikui.com](https://system.grafikui.com).

## Contributing

Review [CONTRIBUTING.md](./CONTRIBUTING.md) for token naming conventions, the addition workflow, and PR requirements.

## Methodology

Review [METHODOLOGY.md](./METHODOLOGY.md) for the reasoning behind the token architecture, naming system, and spatial grid.

## License

MIT
