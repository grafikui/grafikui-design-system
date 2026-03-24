# @grafikui/design-system

Token-first visual architecture infrastructure for Grafikui projects.

[![Build Tokens](https://github.com/omrdev1/design-system/actions/workflows/build.yml/badge.svg)](https://github.com/omrdev1/design-system/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/@grafikui/design-system.svg)](https://www.npmjs.com/package/@grafikui/design-system)

## What this is

This is an MIT-licensed, token-first design system establishing the core structural methodology and identity layer of the Grafikui visual framework. It provides open contribution access, decoupling styling decisions into a single centralized source of truth accessible across various technologies.

## Quick start

### Installation
```bash
npm install @grafikui/design-system
```

### Consumption (CSS)
Import the scoped custom properties directly into your stylesheet pipeline:
```css
@import '@grafikui/design-system/css';

.button {
  background-color: var(--gfk-color-brand-default);
  border-radius: var(--gfk-radius-sm);
}
```

### Consumption (JavaScript/TypeScript)
Import the ESM tokens natively:
```javascript
import { colorBrandDefault, spacing4 } from '@grafikui/design-system';

const MyComponent = styled.div`
  background: ${colorBrandDefault};
  padding: ${spacing4};
`;
```

## Token categories

| Category | Description | File |
| -------- | ----------- | ---- |
| Color | Base primitives and context semantics | `tokens/color/*.json` |
| Typography | Families, weights, sizes, spacing | `tokens/typography/base.json` |
| Spacing | Strict 4px incremental scale | `tokens/spacing/base.json` |
| Radius | Border radii steps | `tokens/radius/base.json` |
| Motion | Timings and easing curves | `tokens/motion/base.json` |

## Using tokens
All CSS variables generated apply the prefixed `--gfk-` taxonomy to avoid global collisions. See the `dist` generated files for exact alias maps.

## Contributing

Review [CONTRIBUTING.md](./CONTRIBUTING.md) to understand exact governance workflows and addition protocols.

## Methodology

Review [METHODOLOGY.md](./METHODOLOGY.md) for the strategic reasoning dictating internal architectures, naming, and mathematical configurations here.

## License

MIT
