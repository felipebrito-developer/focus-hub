# Epics & Goals

## Milestone 0: Base Structure
**Goal:** App boots, navigates, stores data locally, tests run.
**Linear Milestone ID:** `aec24a44-5f7c-4fe5-98dd-52208d93de49`

| Epic | Linear ID | Goal | Spec | Tasks |
| :--- | :--- | :--- | :--- | :--- |
| EPIC: M0 Foundation | FEL-33 | Wire+fix + base infra + nav shell + i18n + multi-theme + auth gate | [architecture/milestone-0-foundation.md](../spec/architecture/milestone-0-foundation.md) | FEL-34–FEL-47 (14 tasks) |
| EPIC: Local Auth (Mocked) | FEL-48 | user table + session atoms + AuthStack + Welcome/Register/Login refactor + tests | [architecture/services/local-auth.md](../spec/architecture/services/local-auth.md) | FEL-49–FEL-55 (7 tasks) |

### M0 Task Dependency Phases
- **Phase 1 (parallel):** FEL-40 (pkg rename), FEL-34 (Biome), FEL-39 (nav libs), FEL-43 (i18n), FEL-42 (theme), FEL-41 (bun:test)
- **Phase 2 (sequential, after FEL-40):** FEL-37 (drizzle.config) → FEL-35 (wire schema) → FEL-38 (seed) → FEL-36 (bootstrap)
- **Phase 3 (after nav+i18n+theme):** FEL-45 (tab stacks) → FEL-46 (settings) → FEL-44 (drawer)
- **Phase 4 (auth, after DB wired + nav libs):** FEL-49 (user schema) → FEL-54 (session atoms) → FEL-52 (AuthStack) → FEL-50/55/51 (Welcome/Register/Login, parallel) → FEL-53 (tests)
- **Phase 5 (after ALL incl auth):** FEL-47 (App.tsx rewrite + auth gate) — depends on FEL-54 + FEL-52

---

## Milestone 1: The Strategic Layer
**Goal:** User can create Meanings + Goals, link them, visualize progress.
**Depends on:** Milestone 0 (DB, types, navigation).

| Epic | Linear ID | Goal | Spec | Tasks |
| :--- | :--- | :--- | :--- | :--- |
| EPIC: Meanings CRUD | — | Create/edit/delete meanings, list view | TBD | — |
| EPIC: Goals CRUD | — | Create/edit/delete goals, dashboard with pizza graphs | TBD | — |

---

## Milestone 2: The Structural Layer
**Goal:** User can define Activity templates + flexible Frequencies, track Habits with streaks.
**Depends on:** Milestone 1.

| Epic | Linear ID | Goal | Spec | Tasks |
| :--- | :--- | :--- | :--- | :--- |
| EPIC: Activities Catalog | — | Activity templates (icon, units, energy cost) CRUD | TBD | — |
| EPIC: Frequencies & Habits | — | Flexible frequency rules, habit CRUD, streaks | TBD | — |
| EPIC: Exercise Plans | — | Body-part workouts, task-tree, scheduling | TBD | — |

---

## Milestone 3: The Operational Layer
**Goal:** Daily execution hub — tasks, focus timer, activity logs, retrospectives.
**Depends on:** Milestone 1 + 2.

| Epic | Linear ID | Goal | Spec | Tasks |
| :--- | :--- | :--- | :--- | :--- |
| EPIC: Now Module (Focus Timer) | FEL-5 | Focus timer: pick task, focus interval, log session | [features/focus-timer/README.md](../spec/features/focus-timer/README.md) | FEL-6–FEL-17 (12 tasks) |
| EPIC: Day Progress | — | Pizza graphs, energy check-in | TBD | — |
| EPIC: Day Tasks | — | Filtered task list, swipe-to-complete | TBD | — |
| EPIC: Mental Dump | — | Quick-entry text, daily reflection | TBD | — |
| EPIC: Tasks CRUD | — | Master backlog, nesting, goal link, tags | TBD | — |
| EPIC: Activity Logs | — | Mood score, amount achieved, timestamp | TBD | — |
| EPIC: Week Retrospective | — | Weekly review, mood vs activity correlation | TBD | — |

---

## Milestone 4: The Logistical Layer
**Goal:** Resource inventory + pre-flight checklists to prevent flow interruption.
**Depends on:** Milestone 3.

| Epic | Linear ID | Goal | Spec | Tasks |
| :--- | :--- | :--- | :--- | :--- |
| EPIC: Resource Types & Store | — | Define resource types, track reserves | TBD | — |
| EPIC: Resource Log | — | Transaction ledger, audit trail | TBD | — |
| EPIC: Requirements & Assignments | — | Pre-flight checklists linked to tasks/habits | TBD | — |
| EPIC: Financial Overview | — | Financial health dashboard | TBD | — |

---

## Deferred (post-mobile MVP)
- Life Logs (journaling) — no layer dependency
- Backend / MCP Server — user deferred
- AI-Bridge (Ollama/Gemini) — depends on backend
- Sync Engine — local-first for MVP