# Focus Hub — App Summary

> **Status:** In development (Milestone 0 foundation phase)
> **Stack:** React Native 0.74 (bare) + Jotai + op-sqlite/Drizzle + React Native Paper + bun:test + Biome. Local-first, no backend.

## What Is This App

Focus Hub is a local-first mobile app for ADHD / depression-adjacent users. It provides a structured productivity system organized in 4 layers: **Strategic** (Meanings + Goals), **Structural** (Activities + Habits + Frequencies), **Operational** (Tasks + Focus Timer + Logs + Retrospectives), and **Logistical** (Resources + Pre-flight Checklists). See [architecture/product-layers.md](architecture/product-layers.md).

The core philosophy is reducing cognitive load: everything is grounded in personal meanings, tasks are filtered by energy tags, and the Focus Timer allows bounded execution intervals without punishing distraction (partial sessions are saved, not discarded).

All data is stored locally in SQLite. No backend, no network, no sync for MVP. The app is fully offline-capable. Local auth is a UX gate (mocked credentials), not a security boundary — see [architecture/services/local-auth.md](architecture/services/local-auth.md).

## Features

> **Layer tags:** L1=Strategic · L2=Structural · L3=Operational · L4=Logistical · X=Cross-cutting/Foundation.

| Feature | Layer | Status | Summary | Spec Path |
| :--- | :--- | :--- | :--- | :--- |
| Auth (local/mock) | X (M0) | Planned (M0) | Welcome→Login→Register, local SQLite credentials, session persists | [features/auth/README.md](features/auth/README.md) |
| Drawer Nav Shell | X (M0) | Planned (M0) | Root drawer: profile card + 4 module entries + Settings | [features/drawer/README.md](features/drawer/README.md) |
| Settings | X (M0) | Planned (M0) | Theme toggle (light/dark/warm-dark) + language selector, persisted | [features/settings/README.md](features/settings/README.md) |
| Meanings CRUD | L1 | Planned (M1) | Create/edit/delete personal values linked to categories | [features/meanings/README.md](features/meanings/README.md) |
| Goals CRUD | L1 | Planned (M1) | Goals linked to meanings, pizza-graph progress, milestones | [features/goals/README.md](features/goals/README.md) |
| Activities Catalog | L2 | Planned (M2) | Activity templates with energy cost (Low/Med/High), default units | [features/activities/README.md](features/activities/README.md) |
| Habits & Frequencies | L2 | Planned (M2) | Flexible frequency rules, habit CRUD, streak + reward (G3) | [features/habits/README.md](features/habits/README.md) |
| Exercise Plans | L2 | Planned (M2) | Body-part workouts, task-tree planning, day scheduling | [features/exercise-plans/README.md](features/exercise-plans/README.md) |
| Tasks CRUD | L3 | Planned (M3) | Master backlog, parent-child nesting, goal link, tag filtering | [features/tasks/README.md](features/tasks/README.md) |
| Focus Timer | L3 | Specced (M3) | Bounded focus intervals, task picker, mood rating, partial session saving | [features/focus-timer/README.md](features/focus-timer/README.md) |
| Activity Logs | L3 | Planned (M3) | Mood score (1-5), amount achieved, timestamp logging | [features/activity-logs/README.md](features/activity-logs/README.md) |
| Day Progress | L3 | Planned (M3) | Pizza graphs for daily progress, energy check-in | [features/day-progress/README.md](features/day-progress/README.md) |
| Day Tasks (incl. Events) | L3 | Planned (M3) | Filtered today task list, calendar events, swipe-to-complete | [features/day-tasks/README.md](features/day-tasks/README.md) |
| Mental Dump | L3 | Planned (M3) | Quick-entry text input, daily reflection prompt | [features/mental-dump/README.md](features/mental-dump/README.md) |
| Week Retrospective | L3 | Planned (M3) | Weekly review, mood vs activity correlation charts | [features/week-retrospective/README.md](features/week-retrospective/README.md) |
| Resource Types & Store | L4 | Planned (M4) | Define resource types (Money, Health), track numeric reserves | [features/resource-types/README.md](features/resource-types/README.md) |
| Resource Log | L4 | Planned (M4) | Transaction ledger, audit trail | [features/resource-log/README.md](features/resource-log/README.md) |
| Requirements & Assignments | L4 | Planned (M4) | Pre-flight checklists linked to tasks/habits, smart inventory alerts | [features/requirements/README.md](features/requirements/README.md) |
| Financial Overview | L4 | Planned (M4) | Financial health dashboard | [features/financial-overview/README.md](features/financial-overview/README.md) |
| Workout Execution | L3 | Planned (M2) | Execute planned workouts, set/rep tracking, rest timers | [features/workout-execution/README.md](features/workout-execution/README.md) |
| Life Logs (Journaling) | — | Deferred | Standalone journaling module, no layer dependency | [features/life-logs/README.md](features/life-logs/README.md) |

### Cross-cutting Notes
- **Auth (G1=A):** local-only mocked credentials, part of **M0** (not deferred). Login gate, not security boundary. See [architecture/services/local-auth.md](architecture/services/local-auth.md).
- **Events (G2=A):** calendar events (`event` table) are part of the **Day Tasks** feature (L3, M3), not a standalone feature.
- **Gamification (G3=A):** `milestone` (streaks → rewards) is cross-cutting, implemented as part of **M2** (Habits) where streak tracking begins. See [architecture/product-layers.md](architecture/product-layers.md#cross-layer-gamification-g3).

## Architecture

**Monorepo:** `apps/mobile` (React Native) + `packages/shared` (Drizzle schemas, types, seed data).

**DB:** Local SQLite via op-sqlite + Drizzle ORM. `drizzle-kit push` for dev (migrations deferred to pre-deploy). 11 schema files already exist. First-launch bootstrap seeds default content.

**State:** Jotai atoms with AsyncStorage persistence. Feature-local state in `src/features/<feature>/state/`.

**Navigation:** React Navigation — DrawerNavigator (root) → 4 BottomTab stacks (Focus, Goals, Store, Fitness) + Settings. Feature-based folder structure per [architecture/ui/ui-structure.md](architecture/ui/ui-structure.md).

**Theme:** Paper theme switching via Jotai. Registry of named themes (light, dark, warm-dark). Warm-dark = default.

**i18n:** i18next + react-i18next + react-native-localize. Flat JSON locale files (en-us default, pt-br). Detection via react-native-localize.

**Tests:** bun:test (canonical). Biome for lint/format (per-package configs).

See: [architecture/](architecture/) for technical specs (infrastructure/ui/services divisions).

## Current Needs

- **Milestone 0 (Foundation):** make app bootable, navigable, testable, lintable + **local auth gate**. 14 Linear tasks (FEL-34–FEL-47) under Epic FEL-33 + auth tasks (FEL-48+, pending PO slicing). See [roadmap/epics.md](../roadmap/epics.md).
- **Milestone 3 (Operational):** Focus Timer specced + sliced (FEL-5, FEL-6–FEL-17). 6 other epics need specs. Blocked by M0 + M1 + M2.
- **Milestones 1, 2, 4:** specs not yet written. Need grill → spec → PO slicing for each epic.

## Key Constraints

- **Neuro-inclusive UI:** pure black/white banned, 60-30-10 palette, flat bento, ≤4 tabs, micro-animation timings (600ms fade / 200ms scale). See [architecture/ui/ui-principles.md](architecture/ui/ui-principles.md).
- **Local-first:** no network dependency for any MVP feature. `isSynced` + `lastSyncedAt` columns carried for future sync.
- **No backend until post-MVP:** sync engine, AI-bridge, MCP server all deferred. Local auth is mocked (G1=A).