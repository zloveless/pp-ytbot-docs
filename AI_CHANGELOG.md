# AI Changelog

All AI-assisted changes to this repository are logged here.

---

## 2026-07-10

### Add Project Z early-game command set from PDF, set as default
- Replaced the `vanilla-test.json` placeholder with real data extracted from `YTbot Project Z Commands-EarlyGame.pdf` — `src/data/commands/projectz-2026-early.json` (38 commands: 20 negative, 7 positive, 2 funny, 9 spawn)
- Flipped `default: true` from `vanilla-early.json` to `projectz-2026-early.json` so it's now the version shown on first load
- Verified `src/data/targets.json` (`@eerie`/`@guru`/`@all`/`@random`, 75% surcharge for `@all`) already matched the PDF exactly — no changes needed there
- Added the source PDF to the repo for reference

### Move zombie pools into JSON and rework spawn table presentation
- Added an optional `pools: [{ name, pool }]` array to the commands schema (`content.config.ts`) so each command-set JSON can define its own zombie rosters instead of a hardcoded `<dl>` in `spawns.mdx`
- Populated `pools` in both `vanilla-early.json` and `projectz-2026-early.json` (Normal, Strong, Ranged, Dogs, Animals, Bees — verified identical rosters across both versions)
- Added `src/components/ZombiePools.astro`, which renders each version's pools wrapped in a `data-ver`-tagged block so the existing version-select filtering picks it up automatically
- `spawns.mdx` now renders `<ZombiePools />` instead of the old static list
- `CommandTable.astro`: dropped the Notes column; the pool label now renders as a small badge on its own line under the Effect text — wrapped in a plain `<div>` because Bootstrap's `.badge` sets `display: inline-block !important`, which otherwise overrides a block wrapper and pulls the badge back onto the same line as the effect text
- Added an "Extra Zombies" column showing `extraZombieThreshold` (the per-donation-increment USD threshold), which was already in the schema but had never been rendered
- Trimmed spawn command `notes` text down to short `"Pool: <name>"` labels (e.g. `"Pool: Normal — Radiated"`); left the two screamer notes as freeform text since screamers aren't a named pool

### Split spawn commands into their own `spawns` array
- `content.config.ts`: `commands` schema entries no longer accept `category: "spawn"` (now `negative | positive | funny` only); added a sibling optional `spawns` array with the spawn-only fields (`baseCount`, `extraZombieThreshold`) and no `category` field, since every entry in it is implicitly a spawn
- Moved every `category: "spawn"` command out of `commands` and into the new `spawns` array in both `projectz-2026-early.json` and `vanilla-early.json`, dropping the now-redundant `category` key on each
- `CommandTable.astro`: `<CommandTable category="spawn" />` now reads from `e.data.spawns` instead of filtering the flat `commands` list; other categories still filter `e.data.commands` as before — no changes needed to `commands.mdx` or `spawns.mdx` call sites

---

## 2026-07-09

### Add second command version and persist dropdown selection across pages
- Added `src/data/commands/vanilla-test.json` — a small placeholder version (one command per category) to prove out the multi-version dropdown before a real second data set exists
- Added an optional `default: boolean` field to the commands schema (`content.config.ts`); `vanilla-early.json` is now flagged `default: true`
- `Base.astro` version dropdown now sorts the `default`-flagged version first and marks its `<option>` `selected`, instead of relying on `updatedAt` recency — a newer secondary version (like the test file, dated today) would otherwise silently become the default shown version
- Version selection now persists across page navigation via `localStorage` (`ytbot-version` key), mirroring the existing theme-toggle pattern — picking a version on Commands carries over to Spawns
- Added reference PDF `YTbot Commands-VanillaVersion_2026-06-26.pdf` (source for the June 26 spawn data update)

---

## 2026-06-13

### Update footer: add source credit, remove duplicate version
- Removed version/date from footer (duplicated by the navbar version dropdown)
- Added "Docs by Genesis" credit linking to github.com/zloveless and "Source on GitHub" linking to the repo

### Fix extra spacing inside alert box on Spawn Reference
- MDX was wrapping inline content in a `<p>` tag (adding `margin-bottom: 1rem` inside the alert padding) because the text was on its own indented line inside the JSX div
- Fixed by inlining the alert content so MDX emits no block wrapper

### Add YouTube Super Chat minimum note to Spawn Reference
- Added `alert-info` Bootstrap alert at the top of `src/pages/commands/spawns.mdx` explaining that YouTube requires a $2.00 minimum Super Chat to attach a message (platform limit, not a bot restriction)

### Fix broken markdown body links after GitHub Pages migration
- `base: '/pp-ytbot-docs'` in `astro.config.mjs` is automatically applied to `.astro` template links but not to raw markdown body links
- Converted all four affected absolute links to relative paths so they resolve correctly regardless of base path:
  - `src/pages/how-it-works.md`: `/commands#valid-targets` → `../commands#valid-targets`
  - `src/pages/index.md`: `/how-it-works`, `/commands`, `/commands/spawns` → relative equivalents
  - `src/pages/commands.mdx`: `/how-it-works#command-syntax` → `../how-it-works#command-syntax`, `/commands/spawns` → `spawns`

---

## 2026-06-12

### Bootstrap Styles & Light/Dark Toggle
- Added `bootstrap@5.3.8`, `sass@1.101.0`, `@popperjs/core@2.11.8` via Yarn
- Created `src/styles/main.scss` — `@import 'bootstrap/scss/bootstrap'` entry point (variable overrides go before this line for Phase 4 palette work)
- Updated `src/layouts/Base.astro`:
  - Default `data-bs-theme="dark"` on `<html>`; inline `<head>` script overrides from `localStorage` or `prefers-color-scheme` before first paint (prevents FOUC)
  - Navbar with brand link, collapse-responsive nav links (Home, How It Works, Commands, Spawns), and sun/moon toggle button
  - `<script>` imports `bootstrap/dist/js/bootstrap.esm.js` for navbar collapse + handles toggle click event with `localStorage` persistence
  - Page content wrapped in Bootstrap `.container`
- Sass deprecation warnings during build are from Bootstrap 5.3's own SCSS (uses legacy `@import`/global color functions); Bootstrap 6 will fix these; build succeeds cleanly

---

### Phase 2 — RTF Extraction & Content Authoring
- Read all 963 lines of the RTF source across 8 sections
- Authored `src/content/commands/vanilla-early.json` — 38 commands total (20 negative, 7 positive, 2 funny, 9 spawn) with full schema: keyword, category, effect, cost, target, superChatMin, version, stage, notes, baseCount, extraZombieThreshold
- Added `"funny"` to the category enum in `src/content.config.ts` (RTF uses this as a distinct 4th category)
- Authored `src/pages/index.md` — home page with intro and quick links
- Authored `src/pages/how-it-works.md` — points system, Super Chats, Patreon/Discord bonus table, command syntax, bot behavior, error policy
- Added stub `src/layouts/Base.astro` (to be styled in Phase 4)
- Removed scaffold `index.astro` (conflicted with `index.md`)
- Confirmed clean `yarn build` — 2 pages built, zero errors
- Note: `extraZombieThreshold` stores USD-per-extra-zombie (from RTF's "Extra per (USD)" column), not viewer count as originally schematized in the plan

### Phase 1 — Bootstrap Astro SSG
- Scaffolded Astro 6 minimal template, merged into repo root (name and packageManager preserved)
- Merged Astro-specific entries into existing Yarn Berry `.gitignore`
- Merged `package.json`: added `scripts`, `type`, `version`, `engines`, `dependencies`
- Created `src/content/commands/` for versioned command data (Phase 2)
- Created `src/content.config.ts` with typed Zod schema for the commands collection (matches §2 data model)
- Confirmed `yarn build` succeeds

### Initial commit (aca3373)

### Initial commit (aca3373)
- Staged and committed existing baseline files: CLAUDE.md, implementation plan (`docs/project.html`), RTF source, Yarn 4 config, editorconfig, gitattributes, gitignore.
