# Personal Website
This personal website is made by Claude Code

# Technical README

> Living technical documentation for Steven Lu's personal portfolio website.
> A single-page, notebook-themed interactive résumé. Keep this file in sync as the
> project evolves.

## 1. What this is

An interactive personal portfolio styled as a **VS Code / Jupyter Notebook**. Every
content section (About, Experience, Projects, Technical Skills, Education, Relevant
Courses, Certifications, Volunteering, Fun Facts) is rendered as a **runnable Python
code cell**. The visitor first "runs" `!pip install stevenlu0830`; only then do the
other cells produce output. Running a cell before install yields a simulated Python
`NameError`, reinforcing the notebook illusion.

The site is statically exported and hosted on GitHub Pages at
`stevenlu0830.github.io`.

## 2. Tech stack

- **Next.js 15.5.4** — App Router, static export (`output: "export"`), Turbopack
- **React 19.1.0**
- **TypeScript 5**
- **Tailwind CSS v4** (`@tailwindcss/postcss`) — utility-first, CSS-variable theming
- **ESLint 9** (`eslint-config-next`)
- No runtime backend, database, or API — 100% static.

## 3. Directory layout

```
personal-website/
├─ .github/workflows/deploy.yml   # CI: build → GitHub Pages
├─ CODEBASE_INDEX.md              # structural map
├─ CONVENTIONS.md                 # coding patterns
├─ TECHNICAL_README.md            # this file
└─ my-project/                    # the Next.js app
   ├─ next.config.ts              # output:"export", images.unoptimized
   ├─ tsconfig.json               # @/* → ./src/*
   ├─ public/                     # static assets (icons, logos, PDFs)
   └─ src/
      ├─ app/                     # routes (App Router)
      ├─ components/              # UI + state providers
      └─ data/                    # typed content
```

See `CODEBASE_INDEX.md` for the file-by-file map.

## 4. Core architectural concepts

### 4.1 Data-driven content
All résumé content lives in `src/data/*.ts` as typed arrays (e.g. `EXPERIENCE: Job[]`,
`PROJECTS: Project[]`). Components never hard-code content — they map over data. To
add or edit an item, change the data file only.

### 4.2 The "runner" pattern (notebook cells)
Each section on the home page is a `*Runner.tsx` component that renders a fake code
cell and its output:

- It calls `useInstall()` to read the shared `installed` flag and this section's
  output state.
- A `run()` handler sets the output to `"ok"` (real content) when installed, else
  `"error"` (a `NameError`).
- The visual cell is `CodeCell` (from `codecell.tsx`): a bordered code box with the
  **Run button above it, right-aligned**, code that scrolls horizontally, and an
  output region below.

`PipInstall.tsx` is the special first cell (`!pip install stevenlu0830`). It carries
two buttons: **Run** (sets `installed`) and **Run all** (installs, then runs every
cell sequentially with a 0.25 s stagger).

### 4.3 Shared in-memory state (`InstallContext.tsx`)
A single React Context, mounted in `app/layout.tsx`, holds:

- `installed: boolean` and `install()`
- one output-state slot per section (`aboutOutput`, `experienceOutput`, …,
  plus grouped `techOutputs` and `funOutputs`)
- `runAll()` — builds an ordered list of ~16 step functions (pip → about →
  experience → projects → 4× skills → education → courses → certs → volunteering →
  4× fun facts) and fires them with `setTimeout(step, i * 250)` for a visible
  top-to-bottom cascade.

**Why in-memory (not `localStorage`):** run progress must survive client-side
navigation to a detail page and back, but **reset on a hard page refresh** — exactly
the lifetime of a React Context in the layout.

Multi-cell updates use **functional updaters** (`setTechOutputs(prev => …)`) so
batched state changes in one tick don't clobber each other.

### 4.4 Theming (`ThemeContext.tsx` + `globals.css`)
- `ThemeProvider` (in-memory, default **dark**) toggles `data-theme="light"` on the
  `<html>` element; `ThemeToggle` lives in the sidebar/drawer.
- `globals.css` defines the full palette twice: `:root` (VS Code **Dark+**) and
  `:root[data-theme="light"]` (VS Code **Light+**). Semantic variables:
  `--background`, `--surface`, `--border`, `--foreground`, `--muted`, `--accent`,
  `--fn`, `--pip`, `--cli`, `--comment`, `--keyword`, `--bracket`, `--errname`,
  `--errmsg`, `--linkhover`.
- Tailwind v4 `@theme inline` maps `--color-*` tokens; components reference variables
  directly via arbitrary values (`text-[var(--accent)]`).
- Theme resets to dark on refresh (in-memory, by design).

### 4.5 Navigation & scroll
- `SiteNav.tsx` — left **sidebar** on desktop (`lg+`), **hamburger drawer** on mobile
  (slides in from the left). Contains the avatar (home link), section links, contact
  icons, and the theme toggle.
- Detail pages (`experience/[slug]`, etc.) have a rounded-square `BackButton`.
- `ScrollMemory.tsx` restores the **exact** prior scroll position when returning from
  a detail page (uses `useLayoutEffect` + a `requestAnimationFrame` stability loop to
  wait out post-navigation layout growth before settling).
- `SmoothAnchors.tsx` applies smooth scrolling to **nav-link anchors only** — global
  `scroll-behavior: smooth` is intentionally avoided (it animated back-navigation).

### 4.6 Responsive rules
- `sm` (640px): content truncation — Projects / Certifications / Volunteering show
  the top 2 items plus a "View All" button (`ViewAllButton`) on mobile, hiding items
  ≥3 via `max-sm:hidden`; the full lists live at `/<section>` list-page routes.
- `lg` (1024px): switch between sidebar and hamburger drawer.

## 5. Content model (data types)

| File | Export | Key fields |
|------|--------|-----------|
| `experience.ts` | `EXPERIENCE: Job[]` | slug, title, org, meta, logo, bullets |
| `projects.ts` | `PROJECTS: Project[]` | slug, name, dates, skills, description, attachments |
| `certifications.ts` | `CERTIFICATIONS: Certification[]` | slug, name, org, meta, logo, pdf? |
| `volunteering.ts` | `VOLUNTEERING: Volunteering[]` | slug, title, org, meta, logo, bullets |
| `education.ts` | `EDUCATION: Education[]` | school, degree, years, logo |
| `skills.ts` | `SKILLS` (by category) | name, icon, invert |
| `courses.ts` | relevant courses | code, name |
| `funfacts.ts` | travel/songs/languages + title args | — |
| `contacts.ts` | `CONTACTS[]` | type, href, icon, invert, lightIcon |

Cards for these live in `cards.tsx`; each experience/education/cert/volunteering row
renders an `OrgLogo` (64×64, on a white rounded backdrop) at the **leftmost** side
with the text stacked to its right.

## 6. Component reference

| Component | Client? | Role / output |
|-----------|:------:|---------------|
| `InstallContext` | ✔ | Shared state provider + `useInstall()`; owns `runAll()` |
| `ThemeContext` | ✔ | `ThemeProvider`, `useTheme()`, `ThemeToggle` |
| `PipInstall` | ✔ | First cell; **Run** + **Run all** buttons |
| `AboutRunner` | ✔ | `About().display()` → self-intro text |
| `ExperienceRunner` | ✔ | Experience cards |
| `ProjectsRunner` | ✔ | Project cards (mobile: 2 + View All) |
| `TechSkillsRunner` | ✔ | 4 linked cells; list-of-dicts w/ inline icons |
| `EducationRunner` | ✔ | Inline education list (logo + text) |
| `CoursesRunner` | ✔ | List-of-dicts course output |
| `CertificationsRunner` | ✔ | Certification cards (mobile: 2 + View All) |
| `VolunteeringRunner` | ✔ | Volunteering cards (mobile: 2 + View All) |
| `FunFactsRunner` | ✔ | 4 cells: travel, canto-pop, other songs, languages |
| `CodeCell` | — | Reusable cell shell (run button + code + output) |
| `cards` | — | Card + `OrgLogo`, `SkillTag`, `ViewAllButton` |
| `ContactIcons` | ✔ | Theme-aware contact icon row |
| `SiteNav` | ✔ | Sidebar / drawer navigation |
| `BackButton` | — | Rounded-square back arrow (detail pages) |
| `ScrollMemory` | ✔ | Exact scroll restore across nav |
| `SmoothAnchors` | ✔ | Smooth scroll for nav anchors only |

## 7. How-to recipes

### Add an experience / volunteering item
1. Append an entry to `EXPERIENCE` / `VOLUNTEERING` in `src/data/*.ts` with a unique
   `slug`, the text fields, a `logo` path, and `bullets`.
2. Drop the logo into `public/org-logo/` and mirror it in the top-level `org-logo/`.
3. The home-page card and the `/<section>/[slug]` detail page render automatically
   (the `[slug]` route reads the same data via `generateStaticParams`).

### Add a new résumé section (new cell)
1. Create `src/data/<section>.ts` with a typed export.
2. Create `<Section>Runner.tsx` following the runner pattern (§4.2): `useInstall()`,
   a `run()` that branches on `installed`, and a `CodeCell`.
3. Add an output slot for it in `InstallContext.tsx` and include it in `runAll()`'s
   ordered step list so **Run all** covers it.
4. Mount the runner in `app/page.tsx` and add a nav link in `SiteNav.tsx`.

### Add a contact icon
Append to `CONTACTS` in `src/data/contacts.ts` (`type`, `href`, `icon`; set `invert`
for dark-only logos and `lightIcon` for a light-mode variant), and add the asset to
`public/contact-icons/`.

### Change theme colors
Edit the CSS variables in `src/app/globals.css` — the dark block (`:root`) and/or the
light block (`:root[data-theme="light"]`). No component changes needed.

## 8. Known limitations & notes

- **No tests** — no unit/e2e suite yet; the quality gate is type-check + lint + manual
  browser verification.
- **State is ephemeral by design** — run progress and theme reset on hard refresh.
- **Static only** — no server features (no SSR, ISR, route handlers, or image
  optimization); anything requiring a server will not work on Pages.
- **`generateStaticParams` is mandatory** for every `[slug]` route or the export fails.
- The in-app preview pane sometimes fails to paint below the fold; verify via DOM
  inspection (`getComputedStyle`, element queries) when screenshots come back blank.

## 9. Local development

```bash
cd my-project
npm install          # first time
npm run dev          # http://localhost:3000 (Turbopack)
npm run build        # static export → my-project/out
npm run lint         # eslint
npx tsc --noEmit     # type-check
```

Preview the app through the in-app Browser pane (never run dev servers via a raw
shell). Verify changes by DOM inspection when the pane won't paint.

## 10. Build & deployment

- **Static export:** `next build` writes a fully static site to `my-project/out`
  (no Node server — required for GitHub Pages). `next/image` runs `unoptimized`.
- **CI (`.github/workflows/deploy.yml`):** on push to `main` (or manual dispatch),
  build in `my-project/`, `touch out/.nojekyll` (so `_next/` is served verbatim),
  upload `my-project/out`, and deploy to GitHub Pages.
- **Live:** `stevenlu0830.github.io`.
- **Note:** dynamic `[slug]` routes require `generateStaticParams()` — a missing one
  breaks the export.

## 11. Conventions & gotchas

- Read `CONVENTIONS.md` before contributing.
- All colors via CSS variables — never hard-code hex in components.
- Cell/theme state is in-memory by design (persists across nav, resets on refresh).
- `"use client"` is required on any component using hooks/context/handlers.
- **Do not `git push` without explicit user confirmation** — a push to `main`
  auto-deploys to the public site.

## 12. Change log

- Added org logos (leftmost) to Experience / Education / Certifications / Volunteering.
- Sequential "Run all" with a 0.25 s per-cell stagger, centralized in `InstallContext`.
- Theme-aware GitHub contact icon (light-mode variant).
- Light/dark mode toggle (VS Code Light+ palette).
