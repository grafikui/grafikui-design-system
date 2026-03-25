# Contributing to @grafikui/design-system

> **Note on `dist/`:** The compiled `dist/` folder is intentionally tracked in this repository. It contains the built CSS, JS, and JSON outputs that consumers install directly. This is standard practice for token packages distributed without a separate build step on the consumer side. Running `npm run build` locally will produce a diff only if token values have actually changed — this is expected and correct. Do not add `dist/` to `.gitignore`.

This repository manages token-first design decisions. Do not submit pull requests containing React components or CSS-in-JS abstractions here. The output is JSON and plain CSS.

## Adding a new token

All tokens must be defined within the `tokens/` directory using JSON.

1. Locate the correct category file targeting your token (e.g. `tokens/color/semantic.json`).
2. Implement your token using standard Style Dictionary format (`{ "value": "..." }`).
3. Follow the semantic naming convention: `category.concept.variant`. Do not use decorative names. 
   - **Correct**: `color.text.secondary`
   - **Incorrect**: `color.dark-grey`
   - Example format for a new surface token:
     ```json
     "surface": {
       "sunken": { "value": "{color.base.gray.800}" }
     }
     ```

## Modifying an existing token

Update the `value` property in the respective JSON file.
Ensure that if you update a base primitive in `base.json`, you verify any semantic aliases relying on it still resolve properly. The build will intentionally fail if you orphan an alias.

## Local Development

1. Run `npm install` to install dependencies.
2. Run `npm run build` to compile the tokens using Style Dictionary. 
3. Verify outputs inside the `dist/` folder (`css`, `js`, `json`). Note: `dist/` is gitignored.

## Running validation

Before committing, run:
```bash
npm run validate
```
This script audits the JSON structure traversing the raw files.
- **Passing output**: `✅ Token validation passed successfully!`
- **Failing output**: explicitly flags missing values, orphaned aliases, or sequence gaps and exits with code 1.

## Pull Request Conventions

- One concern per PR. 
- Descriptive title mapping to the specific token segment updated.
- Reference related issues using standard syntax (`Resolves #12`).
- CI will block all PRs that do not pass token compilation. Read the logs.
