# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

**Miri Verbs Ionic** is a migration of the Flutter app *Miriverbs* (a gamified, Duolingo-style app for learning English verbs by CEFR level A1–C2) to **Ionic 8 + Angular 20 standalone**. Phase 1 (design system + UI flows on mock data) is complete; Supabase/Firebase backends and native Capacitor platforms are **planned but not yet integrated** — all `core/services/` currently return hardcoded data behind a simulated `delay()`.

## Commands

```bash
npm start          # ng serve → http://localhost:4200 (dev)
npm run build      # → www/  (must pass before considering a task done)
npm run lint       # ESLint (flat config in .eslintrc.json via @angular-eslint)
npm test           # Karma + Jasmine, all specs
ng test --include='**/auth.service.spec.ts'   # single spec file
```

Native (not yet run): `npx cap add ios|android`, then `npm run build && npx cap sync`.
Requires Node 24.x. Capacitor `appId` is still the scaffold default `io.ionic.starter`; do not change it without agreement.

## Architecture

Feature-First Clean Architecture under `src/app/`:

- `core/` — shared logic: `models/` (TS interfaces), `data/syllabus.data.ts` (`SYLLABUS_VERBS`, 348 verbs), `services/` (singleton `@Injectable({ providedIn: 'root' })`, mock), `theme/app-theme.ts` (design tokens + `CEFR_UNITS`), `widgets/` (reusable dumb components).
- `features/<domain>/<screen>/` — smart page components (`*.page.ts/html/scss`). Domains: `splash`, `onboarding`, `auth/login`, `home`, `verbs`, `multiplayer`.

Data flow: page `inject()`s a service → service returns a typed `Promise` from mock data → page stores result in a `signal()` that drives the template. Pages never touch `localStorage` or a backend directly — that goes through services.

Routing: every route is lazy via `loadComponent` in [src/app/app.routes.ts](src/app/app.routes.ts). Cross-screen data uses `queryParams` (unit title, level, sublevel) and `history.state` (passing the verb list into `PracticePage`).

### Domain rules (preserved from Flutter, mostly in `ProgressService`)
- 6 CEFR levels × 6 sublevels × 10 verbs, unlocked sequentially.
- Practice passes at **score ≥ 8/10**; passing marks the sublevel complete and unlocks the next.
- Failed verbs are re-queued to the end of the quiz ("Repaso" banner).

## Conventions that matter here

- **Standalone only** — no `NgModule`. Use `imports: [...]` on each `@Component`, `inject()` over constructor DI.
- **Modern control flow** — `@if / @for / @switch`, not `*ngIf`. Prefer `signal()` / `computed()` for local state.
- **Ionic imports** come from `@ionic/angular/standalone`.
- **Reuse widgets** — buttons → `TactileButtonComponent`, progress → `SquishyProgressBarComponent`, user feedback → `ToastService` (never `alert()`; `ToastService` builds DOM directly, by design — see ADR-006).
- **Design tokens** live in both `core/theme/app-theme.ts` (TS) and `src/theme/variables.scss` (Ionic CSS vars) — keep them in sync; don't hardcode colors outside the theme.
- **User-facing text and domain comments are in Spanish.**
- Relative core imports: `../../../core/...` from `features/<x>/<screen>/`.
- Don't call Supabase/Firebase from components (services will become the repository layer). Don't create markdown outside `.ai/`, `tasks/`, `docs/`.

## Project docs (read these for depth before large changes)

- `.ai/` — AI working context: `project.md`, `context.md` (current phase/state), `rules.md`, `stack.md` (verified versions), `commands.md`.
- `docs/` — `architecture.md` (diagrams), `conventions.md`, `decisions.md` (ADRs 001–007).
- `tasks/` — `current.md` and `backlog.md` (what's in progress / next). **Update `tasks/current.md` and `.ai/context.md` after significant work.**

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
