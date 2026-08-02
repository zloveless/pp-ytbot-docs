# AI Changelog

All AI-assisted changes to this repository are logged here.

---

## 2026-08-01

### Add site-wide Double Point Weekend alert
- Added a Bootstrap `alert-warning` banner to `src/layouts/Base.astro`, inside `<main>` above `<slot />`, so it shows at the top of every page (home, how-it-works, commands, spawns) noting passive point gain is 2x normal for the weekend
- Verified via `yarn build` that the banner text renders in all four generated pages

### Sync Project Z data with LVL200 Aug-1 update: elite/cop repricing, new charged/infernal elite tier, small boss and Gargul rebases
- New source doc (`YTbot Project Z Commands-LVL200_Aug1.pdf`) repriced two existing boss-tier spawns in `src/data/commands/projectz-2026.json`: `spawn pz_elites` 500/$5.00/base15 → 450/$4.50/base20; `spawn pz_elite_cops` 550/$5.50/base5 → 500/$5.00/base8 (both `extraZombieThreshold` unchanged)
- Added a new spawn command the doc introduced: `spawn pz_elites_charged_infernal` (550 pts, $5.50 min, baseCount 16, extraZombieThreshold 1.00), reusing the existing `Elite` pool (notes `Pool: Elite — Charged/Infernal`) since its roster is identical to `spawn pz_elites`'s
- `spawn pz_small_boss`'s `baseCount` rose 4→6 (cost/superChatMin/extraZombieThreshold/pool unchanged)
- `spawn pz_mini_boss_gargul` repriced 650/$6.50 → 750/$7.50 (baseCount/extraZombieThreshold/pool unchanged); the other three mini-boss spawns (Devourer, BurningFlesh, BearDaddy) are unchanged
- Bumped `updatedAt` to `2026-08-01`
- The non-spawn commands table (negative/positive/funny), all other spawn tiers (rad/super normal/strong/ranged/badass, dogs, animals, bees, screamers), zombie pool rosters, Super Chat/points/Patreon/Discord economy text, and command syntax rules are unchanged from the prior revision (verified against the new PDF's full text)
- Verified via `yarn build`: the new command and updated values render correctly on `dist/commands/spawns/index.html`

## 2026-07-31

### Fix Home link doing nothing from any sub-page
- `src/layouts/Base.astro`'s `base` const is `import.meta.env.BASE_URL` with the trailing slash stripped — since the site has no `base` path configured (root domain deploy), `BASE_URL` is `/` and `base` evaluates to `""`. The navbar-brand link and the "Home" nav link both used `href={base}` directly, so they rendered as `href=""`, which browsers resolve to the *current* URL rather than root. Clicking Home from any sub-page (e.g. `/commands/spawns`) just reloaded that same page
- Fixed both bare `href={base}` spots to `href={base || '/'}`. Left every other link (`` `${base}/how-it-works` `` etc.) untouched — falling back the shared `base` const itself to `'/'` would have produced double-slash URLs like `//how-it-works` on those
- Verified via `yarn build`: `dist/index.html`, `dist/how-it-works/index.html`, and `dist/commands/spawns/index.html` now all render `href="/"` for Home

### Verify LVL200 zombie pool rosters against corrected v2 source doc
- User got the pool rosters confirmed directly with the bot creator and re-uploaded `YTbot Project Z Commands-LVL200_July31_v2.pdf`, which fills in each surviving spawn row's Zombie Pool cell with the actual roster instead of the v1 doc's "Same as spawn X zombie pool" placeholders. Diffed v1 vs v2 page-by-page: only the spawn table's Zombie Pool column text changed, no cost/baseCount/threshold changes anywhere
- Confirmed `Normal` (`spawn rad normal`'s cell), `Strong` (`spawn rad strong`'s cell), and `Badass` (`spawn rad badass`'s cell) rosters in v2 match `src/data/commands/projectz-2026.json`'s existing `pools` entries verbatim — no changes needed
- Flagged one discrepancy rather than applying it: v2's `spawn rad ranged` row lists its Zombie Pool as `Biker, Lumberjack, Fat Mama, Hawaiian, Bowler, Soldier, Cop` — identical, word-for-word, to the `Strong` row directly above it, and inconsistent with `Ranged`'s roster (`Rancher, Chuck, Cop`) in every prior doc revision back to `EarlyGame`. Reads as a copy-paste duplication in the source doc, not an intentional change. Left the `Ranged` pool unchanged pending the user re-confirming with the creator specifically on this row
- No changes to `src/data/commands/projectz-2026.json`, `spawns.mdx`, or `updatedAt` (still `2026-07-31` from the same-day LVL200 sync below) — this pass only verified data already in place
- Added the source PDF to the repo for reference

### Sync Project Z data with LVL200 update: base/feral spawn tiers retired, rad/super tiers repriced, new boss command line
- New source doc (`YTbot Project Z Commands-LVL200_July31.pdf`) drops 7 spawn commands from `src/data/commands/projectz-2026.json` entirely: `spawn normal`, `spawn feral normal`, `spawn strong`, `spawn feral strong`, `spawn ranged`, `spawn feral ranged`, `spawn feral badass`. The doc's "Full List of All Commands" table no longer lists these rows, even though surviving rows still say "Same as spawn normal zombie pool" / "Same as spawn feral badass pool" (stale back-references to the now-gone commands). Confirmed with the user this is an intentional retirement of the easy tiers at LVL200, not a table that lost rows — removed rather than kept
- Repriced/rebased every surviving rad/super spawn tier (cheaper points, bigger `baseCount`, `extraZombieThreshold` normalized to $0.50/$0.75 across the board): `spawn rad normal` 300/$3.00/base15 → 200/$2.00/base25; `spawn super normal` 450/$4.50/base15/$1.00-thresh → 300/$3.00/base25/$0.50-thresh; `spawn rad strong` 350/$3.50/base15 → 250/$2.50/base25; `spawn super strong` 500/$5.00/base15/$1.00-thresh → 350/$3.50/base25/$0.50-thresh; `spawn rad ranged` 500/$5.00/base15 → 300/$3.00/base25; `spawn super ranged` 600/$6.00/base15/$1.00-thresh → 400/$4.00/base25/$0.75-thresh; `spawn rad badass` 500/$5.00/base15 → 300/$3.00/base25; `spawn super badass` 600/$6.00/base15/$1.00-thresh → 400/$4.00/base25/$0.75-thresh
- `spawn dogs`/`spawn animals`/`spawn bees` `baseCount` rose 10→25/20/15 respectively (cost/superChatMin/extraZombieThreshold unchanged); `spawn pz_elites` got cheaper and bigger: 600/$6.00/base8 → 500/$5.00/base15 (extraZombieThreshold unchanged)
- Added six new boss-tier spawn commands the doc introduced: `spawn pz_elite_cops` (550 pts, $5.50 min, baseCount 5, extraZombieThreshold 1.00, notes `Pool: Elite Cops`), `spawn pz_small_boss` (600 pts, $6.00 min, baseCount 5, extraZombieThreshold 1.50, notes `Pool: Small Boss`), and four `spawn pz_mini_boss_*` commands — `devourer`/`burningflesh`/`beardaddy`/`gargul`, each 650 pts, $6.50 min, baseCount 2, extraZombieThreshold 2.00, single-member pools named after the boss
- These new commands draw from zombie pools not previously in this file's `pools` array — added `Elite Cops` (`Cop`), `Small Boss` (`Major, Brigadier, Chief, Authority, Professor, Alex, Biba`), and single-member `Devourer`/`BurningFlesh`/`BearDaddy`/`Gargul` pool entries so they show up in the Zombie Pools reference (following the existing `Bees` single-member-pool precedent)
- Bumped `updatedAt` to `2026-07-31`
- Updated the hardcoded Super Chat math example in `spawns.mdx` (`!spawn normal` $1.00-min/$0.25-thresh/base30 → `!spawn rad normal` $2.00-min/$0.50-thresh/base25) since the command it referenced no longer exists
- The non-spawn commands table (negative/positive/funny), zombie pool rosters for existing pools, Super Chat/points/Patreon/Discord economy text, and command syntax rules are unchanged from the prior revision (verified byte-for-byte against the prior PDF's text)

## 2026-07-26

### Sync Project Z data with Jul-26 update: trip repriced, two new "super" spawn tiers, pz_elites base count bump
- New source doc (`YTbot Project Z Commands-LVL100_Jul26.pdf`) repriced `trip` in `src/data/commands/projectz-2026.json`: 400 pts/$4.00 min → 600 pts/$6.00 min (effect text and target unchanged)
- Added two new spawn commands the doc introduced: `spawn super ranged` (600 pts, $6.00 min, baseCount 15, extraZombieThreshold 1, notes `Pool: Ranged — Super`) and `spawn super badass` (600 pts, $6.00 min, baseCount 15, extraZombieThreshold 1, notes `Pool: Badass — Super`) — both reuse the existing `Ranged`/`Badass` pools
- `spawn pz_elites`'s `baseCount` rose 5→8 (`cost`/`superChatMin`/`extraZombieThreshold`/pool unchanged)
- Bumped `updatedAt` to `2026-07-26`
- Everything else (other command point costs, other spawn commands, zombie pool rosters, Super Chat/points/Patreon/Discord economy text, command syntax rules) is unchanged from the prior revision

## 2026-07-25

### Sync Project Z data with Jul-25 update: two new "super" spawn tiers, pz_elites base count fix
- New source doc (`YTbot Project Z Commands-LVL100_July25.pdf`) added two new spawn commands to `src/data/commands/projectz-2026.json`: `spawn super normal` (450 pts, $4.50 min, baseCount 15, extraZombieThreshold 1, notes `Pool: Normal — Super`) and `spawn super strong` (500 pts, $5.00 min, baseCount 15, extraZombieThreshold 1, notes `Pool: Strong — Super`) — both reuse the existing `Normal`/`Strong` pools
- The doc's first draft had a typo: both new rows were mislabeled under existing keywords (`spawn rad normal` and `spawn rad strong` respectively, duplicating those rows with different prices). Confirmed the correct keywords (`spawn super normal`/`spawn super strong`) with the user after they re-uploaded a corrected PDF
- `spawn pz_elites`'s `baseCount` rose 3→5 (`cost`/`superChatMin`/`extraZombieThreshold`/pool unchanged)
- Bumped `updatedAt` to `2026-07-25`
- Everything else (point costs on non-spawn commands, other spawn commands, zombie pool rosters, Super Chat/points/Patreon/Discord economy text, command syntax rules) is unchanged from the prior revision

## 2026-07-24 (docs cleanup)

### Repurpose docs/ for source command docs, drop stale HTML plans
- Deleted `docs/project.html` (Implementation Plan), `docs/setup.html` (an ELI5 update guide that had gone stale — still described the pre-version-dropdown, `vanilla-early.json`-only setup), and `docs/data-update-2026-06-19.html` (a one-off update log now redundant with this changelog). None of the three fed the Astro build — `docs/` isn't referenced by `astro.config.mjs`, `src/`, or the GitHub Actions deploy workflow
- Moved all 7 source PDFs/RTFs (the bot creator's command docs used to author `src/data/commands/*.json`) from the repo root into `docs/`
- Updated `README.md`: removed the dead `docs/setup.html` link and changed the `docs/` line in the project-structure block to describe its new purpose (source command docs, not internal HTML docs)

## 2026-07-24

### Sync Project Z data with LVL100 base-count increase, spawn pz_elites, and two new Rad variants
- New source doc (`YTbot Project Z Commands-LVL100.pdf`) raised `baseCount` on every existing spawn command in `src/data/commands/projectz-2026.json`: `spawn normal`/`spawn strong` 25/20→30, `spawn feral normal`/`spawn rad normal`/`spawn feral strong`/`spawn rad strong`/`spawn feral ranged`/`spawn feral badass` 8 or 5→15, `spawn ranged` 15→20, `spawn dogs`/`spawn animals`/`spawn bees` 6→10
- `spawn feral ranged`'s `cost`/`superChatMin` also rose 400/$4.00 → 425/$4.25 (now matches `spawn feral badass`'s price)
- Added three new spawn commands the doc introduced: `spawn rad ranged` and `spawn rad badass` (both 500 pts, $5.00 min, baseCount 15, extraZombieThreshold 0.75, reusing the existing `Ranged`/`Badass` pools), and `spawn pz_elites` (600 pts, $6.00 min, baseCount 3, extraZombieThreshold 0.75, notes `Pool: Elite`)
- `spawn pz_elites` draws from a zombie pool not previously in this file's `pools` array (`Fat Mama, Hawaiian, Cop, Wight, Soldier, Biker, Hazmat, Lumberjack, Spider, Party Girl, Burnt, Darlene`) — added an `Elite` pool entry so it shows up in the Zombie Pools reference
- Bumped `updatedAt` to `2026-07-24`
- Updated the hardcoded Super Chat math example in `spawns.mdx` (base 25 → base 30) to match the new `spawn normal` baseCount
- Everything else (point costs on non-spawn commands, Super Chat/points/Patreon/Discord economy text, command syntax rules) is unchanged from the prior revision

## 2026-07-18

### Sync Project Z data with base-count increase and new Rad/Feral spawn variants
- New source doc (`YTbot Project Z Commands-EarlyGame_Jul18.rtf`) raised `baseCount` on every existing spawn command in `src/data/commands/projectz-2026.json`: `spawn normal` 20→25, `spawn feral normal` 5→8, `spawn strong` 15→20, `spawn feral strong` 5→8, `spawn ranged` 9→15, `spawn dogs`/`spawn animals`/`spawn bees` 4→6. `spawn bees`'s `extraZombieThreshold` also rose 0.25→0.5
- Added three new spawn commands the doc introduced: `spawn rad normal` (300 pts, $3.00 min, baseCount 5, notes `Pool: Normal — Rad`), `spawn rad strong` (350 pts, $3.50 min, baseCount 5, notes `Pool: Strong — Rad`), and re-added `spawn feral ranged` (400 pts, $4.00 min, baseCount 8, notes `Pool: Ranged — Feral`) plus a brand-new `spawn feral badass` (425 pts, $4.25 min, baseCount 8, notes `Pool: Badass — Feral`)
- `spawn feral badass` draws from a zombie pool not previously in this file's `pools` array (`Wight, Mutated, Cop, Rancher, Chuck`) — added a `Badass` pool entry so it shows up in the Zombie Pools reference, unlike `vanilla-early.json`'s Badass rows which reference a pool that was never defined
- Bumped `updatedAt` to `2026-07-18`
- Updated the hardcoded Super Chat math example in `spawns.mdx` (base 20 → base 25) to match the new `spawn normal` baseCount
- Everything else (point costs on unrelated commands, Super Chat/points/Patreon/Discord economy text, command syntax rules) is unchanged from the prior revision

## 2026-07-17 (custom domain)

### Configure GitHub Pages for the custom domain github.cncfps.com
- Added `public/CNAME` (content: `github.cncfps.com`) — the Actions-based Pages deploy (`actions/upload-pages-artifact`) doesn't auto-write a CNAME the way "deploy from a branch" does, so it has to ship in the build output
- Updated `astro.config.mjs`: `site` changed to `https://github.cncfps.com` and the `base: '/pp-ytbot-docs'` override removed — a custom domain serves the Pages site from the root, so the old subpath base would have broken every internal link/asset URL
- Still required outside this repo: a `CNAME` DNS record (`github.cncfps.com` → `zloveless.github.io`) at the DNS provider, and setting the custom domain in repo Settings → Pages

## 2026-07-17

### Rename Project Z data file to drop the "early-game" scoping (mid-game update)
- New source doc from the bot creator (`YTbot Project Z Commands-MidGame.rtf`) turned out to be data-identical to the current early-game set — every command's point cost, Super Chat minimum, effect text, and every spawn command's `baseCount`/`extraZombieThreshold`/zombie pool matched exactly (verified field-by-field). The doc itself is no longer scoped to a single game stage (it just notes "As Game Stage increases, base counts will also increase"), so the early/mid split doesn't apply to this data — one file covers both
- Renamed `src/data/commands/projectz-2026-early.json` → `projectz-2026.json` and changed `label` from `"Project Z — Early Game"` to `"Project Z"`; `default: true` and all command/spawn/pool data carried over unchanged. Bumped `updatedAt` to `2026-07-17`
- No code changes needed — `src/content.config.ts` loads commands via a glob over `src/data/commands/*.json`, so nothing references the old filename directly
- Updated `README.md`'s "Currently shipped versions" line to match the new filename/label
- Added the source RTF to the repo for reference, alongside the untracked `YTbot Project Z Commands-EarlyGame_Jul12.pdf` from the prior update

## 2026-07-12

### Sync Project Z early-game data with updated PDF (feral re-add + base spawn increases)
- Re-verified `spawn feral normal`/`spawn feral strong` (user had already re-added these to `src/data/commands/projectz-2026-early.json` per the new PDF) and fixed two data-entry mistakes: `superChatMin` was 1 on both rows but should be `cost / 100` like every other row — 2 and 2.5 respectively (matching the PDF's $2.00/$2.50 minimums); `notes` on both rows read `"Pool: Feral Normal"` (a copy-paste artifact, wrong on the Strong row) — changed to the `"Pool: <Name> — Feral"` convention already used by `vanilla-early.json`'s Badass/Feral rows
- The new PDF (`YTbot Project Z Commands-EarlyGame_Jul12.pdf`) also raised `baseCount` on six existing spawn commands, unrelated to the feral re-add: `spawn normal` 8→20, `spawn strong` 5→15, `spawn ranged` 3→9, `spawn dogs`/`spawn animals`/`spawn bees` 2→4. Feral normal/strong `baseCount` of 5 was already correct
- Bumped `updatedAt` to `2026-07-12`
- Updated the hardcoded Super Chat math example in `spawns.mdx` (base 25 → base 20) to match the new `spawn normal` baseCount — this example isn't version-filtered so it tracks the default (projectz) version's numbers
- Everything else in the PDF (point costs, min prices, extra-zombie thresholds, zombie pool rosters, points/Patreon/Discord economy text, command syntax rules) is unchanged from the prior revision

## 2026-07-10

### Add home-base and POI spawn notes to Spawn Reference
- Added an `alert-warning` above the spawn command table: spawns aren't allowed while the streamer is at home base (admins will `killall` anything called in there); screamers are exempt since their horde comes in via the telnet `spawnscouts` command regardless of location
- Added an `alert-info` alongside it: spawns inside points of interest can fail to appear if there isn't enough open space for a large horde, and the bot admin usually catches it and spawns the zombies in using magic points

### Remove feral spawn variants from Project Z early-game data
- Removed `spawn feral normal` and `spawn feral strong` entries from `src/data/commands/projectz-2026-early.json`'s `spawns` array (not present in the source PDF's early-game command set)

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
