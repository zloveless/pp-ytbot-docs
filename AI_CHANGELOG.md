# AI Changelog

All AI-assisted changes to this repository are logged here.

---

## 2026-06-13

### Update footer: add source credit, remove duplicate version
- Removed version/date from footer (duplicated by the navbar version dropdown)
- Added "Docs by Genesis" credit linking to github.com/zloveless and "Source on GitHub" linking to the repo

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
