# Codebase Index

> Structural map of the repo. Content is data-driven (`src/data/*.ts`) and rendered
> by "runner" components that simulate Jupyter/VS Code notebook code cells.
> Paths below are relative to the repo root unless noted.

## Repo root

- `my-project/` — the Next.js application (all app code lives here)
- `.github/workflows/deploy.yml` — GitHub Actions: build static export → deploy to GitHub Pages
- `README.md` — starter readme
- `.gitignore`

## App root — `my-project/`

- `package.json` — deps + scripts (`dev`, `build`, `start`, `lint`)
- `next.config.ts` — `output: "export"` (static site), `images.unoptimized: true`
- `tsconfig.json` — path alias `@/*` → `./src/*`
- `postcss.config.mjs` — Tailwind v4 via `@tailwindcss/postcss`
- `eslint.config.mjs` — `eslint-config-next`
- `out/` — build output (static export; git-ignored, published to Pages)
- `org-logo/` — source logos (mirrored into `public/org-logo/` for serving)

## Routes — `my-project/src/app/` (App Router)

- `layout.tsx` — root layout; wraps app in `ThemeProvider` + `InstallProvider`; renders `SiteNav`, `ScrollMemory`, `SmoothAnchors`
- `page.tsx` — home; single scrolling page composing every section runner
- `globals.css` — CSS custom properties (VS Code Dark+/Light+ palette), Tailwind `@theme inline` mapping, base styles
- `favicon.ico`
- **Detail pages** (one item, back button):
  - `experience/[slug]/page.tsx`
  - `projects/[slug]/page.tsx`
  - `certifications/[slug]/page.tsx`
  - `volunteering/[slug]/page.tsx`
- **List pages** ("View All" targets on mobile):
  - `projects/page.tsx`
  - `certifications/page.tsx`
  - `volunteering/page.tsx`

> `[slug]` pages use `generateStaticParams` (required for static export).

## Components — `my-project/src/components/`

### State providers (in-memory; reset on page refresh)
- `InstallContext.tsx` — **core shared state.** `installed` flag, per-section output states, `install()`, and `runAll()` (staggered 0.25 s sequential run of all cells). `useInstall()` hook.
- `ThemeContext.tsx` — `ThemeProvider`, `useTheme()`, `ThemeToggle`. Default dark; sets `data-theme="light"` on `<html>`.

### Section runners (each = one notebook "code cell" on the home page)
- `AboutRunner.tsx` — `from stevenlu0830 import About`
- `ExperienceRunner.tsx` — outputs Experience cards
- `ProjectsRunner.tsx` — outputs Project cards (mobile: top 2 + View All)
- `TechSkillsRunner.tsx` — 4 linked cells, list-of-dicts output with icons
- `EducationRunner.tsx` — inline education list (logo + text)
- `CoursesRunner.tsx` — list-of-dicts course output
- `CertificationsRunner.tsx` — Certification cards (mobile: top 2 + View All)
- `VolunteeringRunner.tsx` — Volunteering cards (mobile: top 2 + View All)
- `FunFactsRunner.tsx` — 4 cells (travel, canto-pop, other songs, languages)
- `PipInstall.tsx` — first cell: `!pip install stevenlu0830`; "Run" + "Run all" buttons

### Shared UI primitives
- `codecell.tsx` — `CodeCell` (run button above box, right-aligned; horizontal-scroll code), `ImportCode`, `NameErrorLine`, `DictList`, `DisplayLine`
- `cards.tsx` — `ExperienceCard`, `ProjectCard`, `CertificationCard`, `VolunteeringCard`, `SkillTag`, `ViewAllButton`, `OrgLogo` (leftmost logo helper)
- `ContactIcons.tsx` — theme-aware contact icon row (GitHub swaps to light icon in light mode)
- `BackButton.tsx` — rounded-square back button with left-arrow icon (detail pages)

### Navigation & scroll behavior
- `SiteNav.tsx` — left sidebar (desktop `lg+`) / hamburger drawer (mobile); nav links, avatar, contacts, `ThemeToggle`
- `ScrollMemory.tsx` — exact scroll-position restore across in-app navigation
- `SmoothAnchors.tsx` — smooth scroll for nav-link anchors only (not global)

## Data — `my-project/src/data/` (typed content, no logic)

- `experience.ts` — `Job[]` (`slug`, `title`, `org`, `meta`, `logo`, `bullets`)
- `projects.ts` — `Project[]` (largest data file; names, dates, skills, description, attachments)
- `certifications.ts` — `Certification[]` (`slug`, `name`, `org`, `meta`, `logo`, `pdf?`)
- `volunteering.ts` — `Volunteering[]` (`slug`, `title`, `org`, `meta`, `logo`, `bullets`)
- `education.ts` — `Education[]` (`school`, `degree`, `years`, `logo`)
- `skills.ts` — `Skill[]` grouped by category (name + icon path + invert flag)
- `courses.ts` — relevant courses
- `funfacts.ts` — travel / songs / languages + section-title arg constants
- `contacts.ts` — `CONTACTS[]` (type, href, icon, `invert`, `lightIcon`)

## Static assets — `my-project/public/`

- `contact-icons/` — GitHub / LinkedIn / Gmail (GitHub has a light-mode variant)
- `org-logo/` — org logos for experience / education / certifications / volunteering
- `programming-icons/` — tech-skill icons
- `cert-attachments/` — certificate PDFs
- `projects-file-attachments/` — project files
- `*.svg` — Next.js starter icons (mostly unused)

## Deployment

- Trigger: push to `main` (or manual `workflow_dispatch`)
- `deploy.yml` builds in `my-project/`, runs `npm ci && npm run build`, `touch out/.nojekyll`, uploads `my-project/out`, deploys to GitHub Pages
- Live at `stevenlu0830.github.io`
