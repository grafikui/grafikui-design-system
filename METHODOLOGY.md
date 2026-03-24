# Methodology

Design tokens enforce architectural integrity across the entire rendering layer. This repository exists to declare what the Grafikui aesthetic is as programmable data, decoupled from any specific frontend framework.

## Why tokens first

Injecting ad-hoc hex codes and pixel spacing boundaries at the component level generates "Design Debt" — the silent accumulation of fragmented states and near-miss variables. 
By defining visual decisions primarily as JSON tokens, we build a single source of truth. If a primary surface color requires modification, we do not refactor hundreds of dispersed components. We update one token, recompile our outputs, and zero manual code migration is required on the consumer level.

## The Naming Convention

**Category → Concept → Variant** (`color.text.secondary`)

Semantic naming outlasts decorative naming. A token named `color.dark-grey` breaks the system mentally if a rebrand or theming shift requires it to become blue. `color.text.secondary` retains its purpose objectively regardless of the underlying raw value.

## The 4px Grid

The spacing scale (`tokens/spacing/base.json`) utilizes a strict 4px base unit rule.
Every layout measurement is mathematically predictable. This produces inherent visual consistency without rigid UI enforcement documentation, as any combination of 4px increments snaps to the same spatial rhythm.

## Alias Chains

We compose tokens in chains:
1. **Base Palette**: Raw primitives without explicit function (`color.base.coral.500: #C04828`).
2. **Semantic Alias**: The variable the engineer writes, referencing the base (`color.brand.default: {color.base.coral.500}`).

This indirection allows the system to support dark mode inversion seamlessly in the future, routing aliases to completely different primitives depending on the context environment.

## Scope

This package is exclusively scoped for dictating internal structural properties corresponding directly to the aesthetic and spatial demands of Grafikui. It is explicitly **not** a universal agnostic framework. It expresses a distinct point of view for products that want to achieve identical interaction benchmarks.

## Auditability

Every token value is published transparently in human-readable JSON files inside the repository. It avoids proprietary or closed-circle application tooling locking away the system values. You can read the source of truth cleanly directly from GitHub.
