# Focus-Hub Project Context & Stack Pin

## Project Metadata
- **Project Domain:** Focus-Hub (Productivity & Cognitive Load Management Ecosystem).
- **Mission:** Reduce user decision fatigue and optimize performance for ADHD / neuro-inclusive users.

## Tech Stack (pinned)
- **Mobile:** React Native / Expo (`apps/mobile/`).
- **Backend:** Node.js + TypeScript (`apps/<service>/` + `packages/`). Go is NOT used here (global default is Go-or-Node; focus-hub pins Node).
- **Shared packages:** `packages/shared/` (types, `AnyType`, db), `packages/security/` (auth, crypto).
- **Database:** Local-first SQLite (`packages/shared/db/`); remote sync is a secondary layer.
- **Package manager:** `bun` (workspace canonical). Lockfile: `bun.lock`.
- **Tests:** `bun:test` canonical. NEVER Jest. `apps/mobile/jest.config.js` is legacy migration debt — flagged for removal.
- **Lint/format:** Biome (`bun biome check --write .`).

## Delegation Model
The architect owns structure/rules and delegates implementation to role subagents:
- Mobile UI → `react-native-developer`
- Backend services → `node-developer`
- Web (if added) → `web-developer`
- DB schema/migrations → `db-engineer`
- Tests → `test-creator` (write) / `test-runner` (execute)
- Reviews → `design-reviewer` (UI/UX) / `code-reviewer` (quality/security)

The architect's `permission.task` allowlist (in this project's `opencode.json`) permits all generic role subagents and denies sibling-project (Job-search) personas.

## Strict Local Constraints
1. **Local Precedence:** `.project/` rules override generic boilerplate. Tailor decisions to local client hardware limits (mobile/web) running Focus-Hub.
2. **Neuro-Inclusive UI:** All UI must follow `docs/UI/ui-principles.md` + `docs/UI/component-knowledge-base.md`. Cognitive-load reduction is a hard requirement, not a preference.
3. **Feature Scope:** All code, routes, types, and automated components must serve the core mission of reducing decision fatigue and optimizing performance.
4. **Privacy First:** Never log raw credentials, `.env` values, or PII. Encrypt sensitive columns at the application layer.

## Project Docs
Consult `docs/index.md` for the documentation master index (business rules, roadmaps, UI specs, DB structure).
