# Conventions

> Coding patterns for this repo. Follow these when adding or changing code.

## Architecture
- **Data-driven content.** All portfolio content lives in `src/data/*.ts` as typed
  arrays; components render it. Add a résumé item by editing data, not JSX.
- **Runner pattern.** Each home-page section is a `*Runner.tsx` "code cell": call
  `useInstall()`, define `run()` that sets its output to `"ok"` when `installed`
  else `"error"`, and render via `CodeCell` (or a bespoke box).
- **Notebook metaphor.** Nothing renders until `!pip install stevenlu0830` runs;
  before that, running any cell shows a Python-style `NameError` (`NameErrorLine`).

## State
- **In-memory React Context only** (`InstallContext`, `ThemeContext`). Never use
  `localStorage`/`sessionStorage` for cell/theme state — state must **persist across
  in-app navigation but reset on a hard refresh**.
- **Functional state updaters** (`setX(prev => …)`) whenever multiple updates can
  batch in one tick (e.g. Run All, multi-cell clicks) to avoid stale-closure clobber.
- Providers live in `app/layout.tsx` so state is shared app-wide.

## Styling
- **Tailwind v4**, utility-first. No CSS modules.
- **All colors come from CSS variables** defined in `globals.css`
  (`:root` dark, `:root[data-theme="light"]` light). Reference them with arbitrary
  values: `text-[var(--accent)]`, `border-[var(--fn)]`. Never hard-code hex in JSX.
- Palette mirrors **VS Code Dark+ / Light+** syntax highlighting.
- **Responsive breakpoints (Mac-style):** `sm` (640px) for content truncation
  (`max-sm:hidden` to hide items ≥3 on mobile); `lg` (1024px) for sidebar vs.
  hamburger drawer.
- Long code lines **scroll horizontally, never wrap**: `overflow-x-auto` +
  `whitespace-nowrap`. Run button sits **above** the box, right-aligned.

## Images
- Use `next/image` with `unoptimized` (static export has no optimizer) and explicit
  `width`/`height`. Serve from `public/…`; reference with absolute `/path` strings.
- Logos render on a `bg-white rounded p-1` backdrop so dark/transparent logos stay
  visible in both themes.

## Components & files
- `"use client"` at the top of any component using hooks, context, or handlers.
- **Naming:** PascalCase for components (`ExperienceRunner.tsx`); shared primitive
  modules are lowercase (`cards.tsx`, `codecell.tsx`).
- Import via the `@/` alias (`@/data/experience`, `@/components/...`), not deep
  relative paths.
- Detail pages under `app/<section>/[slug]/`; each `[slug]` route **must** export
  `generateStaticParams()` (static export requires it).

## Quality gate
- Before finishing a change: `npx tsc --noEmit` and `npm run lint` must both pass.
- Verify observable changes in the browser (DOM inspection is acceptable when the
  preview pane won't paint).

## Git / deploy
- Push to `main` triggers the Pages deploy — **do not push without explicit user
  confirmation.**
- Commit messages: short imperative summary.
