# Project Structure

> **Status:** Final
> **Scope:** Cross-cutting infrastructure spec — monorepo layout + package boundaries

## Monorepo Layout

```
focus-hub/
├── apps/
│   └── mobile/                    # React Native 0.74 (bare) — primary client
│       └── src/
│           ├── app/                # App entry (App.tsx, providers, root nav)
│           ├── components/         # Shared UI components (cross-feature)
│           │   ├── atoms/          # Button, FAB, Input, Select, Typography
│           │   ├── molecules/      # Card, FormField, ProgressPizza, etc.
│           │   └── organisms/      # GlobalDrawerContent, Modals, Overlays
│           ├── features/           # Feature-based folders (one per feature)
│           │   ├── auth/           # Local auth (mocked login)
│           │   ├── drawer/         # Drawer + Profile Card
│           │   ├── focus/          # Focus Timer, Day Progress, Day Tasks, Mental Dump
│           │   ├── goals/          # Meanings, Goals, Habits, Activities, Tasks
│           │   ├── store/          # Resources, Inventory, Financial
│           │   ├── fitness/        # Exercise Plans, Workout Execution
│           │   ├── life-logs/      # Journaling (deferred)
│           │   └── settings/      # User Profile + Theme
│           ├── db/                 # op-sqlite + Drizzle config
│           ├── theme/             # Paper theme registry
│           ├── i18n/              # i18next config + locale JSON
│           └── state/             # Global Jotai atoms
├── packages/
│   ├── shared/                    # Single source of truth
│   │   └── db/
│   │       ├── schema/           # 11 Drizzle schema files (21 tables)
│   │       └── initial-data.ts    # Seed data (926 lines)
│   └── security/                  # PII scrubbing + encryption (future)
├── .project/
│   ├── spec/                      # Specs (this structure)
│   └── roadmap/                   # Roadmap + session handoff
├── docs/                          # Legacy docs (→ _deprecated/ after migration)
├── turbo.json
└── package.json
```

## Package Boundaries

### `apps/mobile`
- Imports schemas + types from `@focus-hub/shared`.
- Does NOT import from `packages/security` until security spec is finalized.
- Feature folders are self-contained: each has its own `components/`, `state/`, `screens/`.

### `packages/shared`
- Exports Drizzle schemas, derived TS types, and seed data.
- Package name: `@focus-hub/shared` (NOT `@liverubber/shared` — fix pending in FEL-40).
- No React Native imports — pure TS/Drizzle.

### `packages/security`
- Exists in monorepo. Content TBD — see [services/security.md](../services/security.md).
- Will provide: PII scrubbing utilities, local data encryption.
- Deferred to post-MVP or stretch goal.

## Import Rules
- `apps/mobile` → `@focus-hub/shared` (schemas, types, seed data)
- `apps/mobile` features → `src/components/` (shared atoms/molecules/organisms)
- `apps/mobile` features → `src/db/` (Drizzle client)
- `apps/mobile` features → `src/theme/` (Paper theme)
- `apps/mobile` features → `src/i18n/` (translations)
- Cross-feature imports: discouraged. Use shared components or global state.
- `packages/shared` → no app imports (pure layer)
- `packages/security` → no app imports (pure layer)

## What Was Corrected (from legacy `docs/Structure/workspace-mapping.md`)

- ~~React Native (Expo)~~ → bare React Native 0.74
- ~~`skills-lock.json`~~ → removed (opencode agents replace)
- ~~`.agents` directory removed~~ → now uses `.global/agents/` (symlinked into `~/.config/opencode/agents/`)
- ~~`docs/index.md` as Master Index~~ → `.project/spec/app-summary.md`
- Added `packages/shared/db/schema/` as actual schema location
- Added `features/` folder structure (was missing in original)
