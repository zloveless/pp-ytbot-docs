# ytbot docs

Viewer-facing documentation site for the **@pseudoposse** YouTube chat bot. Covers the points system, all chat commands, and spawn mechanics across multiple game rulesets (a version dropdown in the nav bar lets viewers switch between them). Built with [Astro](https://astro.build) and deployed to GitHub Pages.

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
| Add / edit / remove a command | `src/data/commands/*.json` (one file per game version) |
| Add / edit a zombie spawn pool | `pools` array in the relevant `src/data/commands/*.json` |
| Add a whole new command version (shows up in the nav dropdown) | Add a new `src/data/commands/*.json` file — set `default: true` on at most one file |
| Rename or add a player target (`@handle`) | `src/data/targets.json` |
| Edit "How It Works" explanations | `src/pages/how-it-works.md` |
| Edit the home page | `src/pages/index.md` |
| Edit spawn mechanics explanations | `src/pages/commands/spawns.mdx` |

Currently shipped versions: `vanilla-early.json` (Vanilla 3.0) and `projectz-2026-early.json` (Project Z — Early Game, default). Command entries are validated against the schema in `src/content.config.ts`.

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
  content.config.ts  # Zod schema for command/pool data, loaded as an Astro content collection
  data/
    commands/         # one JSON file per game version (commands + zombie pools)
    targets.json      # valid @handle targets
  pages/              # Markdown/MDX pages → routes
  components/         # Astro components (CommandTable, ValidTargets, ZombiePools, …)
  layouts/            # Base layout (nav, theme toggle, version-select dropdown)
  styles/             # Global SCSS
docs/                 # Internal HTML docs (setup guide, implementation plan, changelog notes)
public/               # Static assets
.github/workflows/    # GitHub Actions deploy pipeline
```

The nav bar's version dropdown (in `Base.astro`) is populated from every file in `src/data/commands/` and just toggles the `data-ver` rows/blocks that `CommandTable` and `ZombiePools` render for each version — the selection persists across pages via `localStorage`.
