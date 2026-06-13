# ytbot docs

Viewer-facing documentation site for the **@pseudoposse** YouTube chat bot. Covers the points system, all chat commands, and spawn mechanics. Built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Quick start

```sh
corepack enable      # once per machine — gives you Yarn
yarn install
yarn dev             # preview at http://localhost:4321
```

Always use `yarn` — never `npm` or `npx`.

## Common updates

| What changed | File to edit |
|---|---|
| Add / edit / remove a command | `src/data/commands/vanilla-early.json` |
| Rename or add a player target (`@handle`) | `src/data/targets.json` |
| Edit "How It Works" explanations | `src/pages/how-it-works.md` |
| Edit the home page | `src/pages/index.md` |
| Edit spawn mechanics | `src/pages/commands/spawns.mdx` |

See [`docs/setup.html`](docs/setup.html) for a full ELI5 walkthrough.

## Build & deploy

```sh
yarn build    # outputs to dist/
```

Pushing to `main` triggers an automatic GitHub Actions deploy to GitHub Pages — no manual step needed.

### One-time setup (new repo)

After forking or transferring this repo, go to **Settings → Pages** and set the source to **"GitHub Actions"**. That's it — subsequent pushes to `main` deploy automatically.

## Project structure

```
src/
  data/
    commands/         # command data (JSON, one file per version+stage)
    targets.json      # valid @handle targets
  pages/              # Markdown/MDX pages → routes
  components/         # Astro components (CommandTable, ValidTargets, …)
  layouts/            # Base layout
  styles/             # Global SCSS
docs/                 # Internal HTML docs (setup guide, implementation plan)
public/               # Static assets
.github/workflows/    # GitHub Actions deploy pipeline
```
