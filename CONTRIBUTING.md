# Contributing to @grafikui/design-system

> **Note on `dist/`:** The compiled `dist/` folder is intentionally tracked in this repository. It contains the built CSS, JS, and JSON outputs that consumers use directly. This is standard practice for token packages distributed without a separate build step on the consumer side. Running `npm run build` locally will produce a diff only if token values have actually changed — this is expected and correct. Do not add `dist/` to `.gitignore`.

This repository manages token-first design decisions. Do not submit pull requests containing React components or CSS-in-JS abstractions. The output is JSON and plain CSS.

## Adding a new token

All tokens must be defined within the `tokens/` directory using JSON.

1. Locate the correct category file for your token (e.g. `tokens/color/semantic.json`).
2. Implement your token using standard Style Dictionary format (`{ "value": "..." }`).
3. Follow the semantic naming convention: `category.concept.variant`. Do not use decorative names.
   - **Correct**: `color.text.secondary`
   - **Incorrect**: `color.dark-grey`
   - Example — adding a new surface token:
     ```json
     "surface": {
       "sunken": { "value": "{color.base.gray.800}" }
     }
     ```

## Modifying an existing token

Update the `value` property in the relevant JSON file. If you modify a base primitive in `base.json`, verify that any semantic aliases referencing it still resolve correctly. The build will fail if an alias is orphaned.

## Local Development

1. Run `npm install` to install dependencies.
2. Run `npm run build` to compile tokens via Style Dictionary.
3. Verify outputs in `dist/` (`css/tokens.css`, `js/tokens.mjs`, `json/tokens.json`).
4. `dist/` is tracked in the repo — committing updated dist files after a token change is correct and expected.

## Running validation

Before committing, run:

```bash
npm run validate
```

- **Passing output**: `✅ Token validation passed successfully!`
- **Failing output**: explicitly flags missing values, orphaned aliases, or spacing sequence gaps — exits with code 1.

## Pull Request conventions

- One concern per PR.
- Descriptive title mapping to the specific token segment changed.
- Reference related issues using `Resolves #N` syntax.
- CI runs `validate` and `build` on every PR targeting `tokens/**` — a failing CI run blocks merge.
