# Focus Timer — Technical Spec (HOW)

> **Feature:** Focus Timer (Now Module)
> **Spec type:** Technical — system boundaries, data models, contracts, failure modes, test strategy.
> **Status:** Final.
> **Related:** [Business spec](../business/spec.md) · [UI spec](../ui/spec.md) · [Gap audit](../gaps.md)
> **Source docs:** `docs/Structure/db-structure.md`, `docs/UI/ui-principles.md`, `docs/UI/mobile-component-rules.md`.
> **Stack pin:** React Native (bare) + Jotai + SQLite (local-first). See `opencode.md`.
> **Open questions:** Resolved in [gap audit](../gaps.md) §"Open Questions".

---

## System Boundaries

- **UI layer:** `apps/mobile/src/features/now/screens/FocusScreen.tsx` + co-located molecules/organisms in `features/now/components/`. Follows `docs/UI/mobile-component-rules.md` (atomic separation, no inline screen-local components). See [UI spec](../ui/spec.md) for screen states + component breakdown.
- **State layer:** Jotai atoms in `features/now/state/focus-timer.ts` — owns running/paused, elapsedMs, phase (`focus`|`break`|`done`), activeTaskId, sessionId. Hardcoded defaults: `DEFAULT_FOCUS_MS = 25*60*1000`, `DEFAULT_BREAK_MS = 5*60*1000` (overrideable per-session).
- **Data layer:** `packages/shared/db/focus-session.ts` — query + insert helpers. Types in `packages/shared/@types/focus-session.ts`. SQLite via Drizzle (per `docs/Structure/db-structure.md` ORM direction).
- **Audio:** Expo AV (`expo-av` or `expo-audio` per current Expo SDK) for the phase-end sound cue. Asset bundled locally.
- **No backend / no network** for MVP. Local-first. `isSynced` + `lastSyncedAt` columns carried for future sync engine (per `db-structure.md` audit pattern) but unset in MVP.
- **UI conformance:** FocusScreen + all components MUST conform to `docs/UI/ui-principles.md` (pure-black/white ban, 60-30-10 palette, flat bento, ≤4 tabs, micro-animation timings 600ms fade / 200ms scale). Verified by `@design-reviewer` at review gate.
- **Pre-condition (blocker):** Drizzle migration infrastructure does not yet exist in `packages/shared/db/` (only `schema/` + `initial-data.ts`). A prerequisite task via `@db-engineer` — stand up `drizzle-kit` migration generator + runner + a baseline migration capturing current schema — MUST complete before the `focus_session` migration task. See [gap audit](../gaps.md) B3. Note: Milestone 0 uses `drizzle-kit push` (dev-only); formal migrations deferred to pre-deploy.

## Data Models & Schemas

### New table: `focus_session`
> Column naming follows the monorepo Drizzle convention: **DB column = snake_case**, **TS accessor = camelCase**. Timestamps are `text` (ISO 8601) to match every existing table (`created_at`, `completed_at`, etc.) — see [gap audit](../gaps.md) B1/B2.

| DB column (`snake_case`) | TS field | Type | Constraints | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `id` | id | text | PK | UUID v4. |
| `task_id` | taskId | text | FK → `task.id`, nullable, `onDelete: "set null"` | Nullable: allow free-focus sessions without a bound task (escape hatch, Q1). On task delete, FK nulls (M3). |
| `duration_ms` | durationMs | integer | NOT NULL | Actual elapsed focus time (excludes break). |
| `planned_duration_ms` | plannedDurationMs | integer | NOT NULL | What the user configured (for "did I complete" comparison). |
| `status` | status | text | NOT NULL CHECK in (`complete`,`partial`,`cancelled`) | `partial` = user abandoned mid-focus; `cancelled` = user explicitly cancelled before meaningful elapsed time. |
| `mood_score` | moodScore | integer | nullable, CHECK 1-5 | Null = skipped. (Diverges from `activity_log.mood_rating` which is NOT NULL — intentional, see M4.) |
| `started_at` | startedAt | text | NOT NULL | ISO 8601 datetime. |
| `ended_at` | endedAt | text | nullable | Null while running. |
| `phase` | phase | text | NOT NULL CHECK in (`focus`,`break`,`done`) | Phase at save time. |
| `is_synced` | isSynced | integer | NOT NULL default 0, `{ mode: "boolean" }` | Local-first audit column. |
| `last_synced_at` | lastSyncedAt | text | nullable | Local-first audit column. |

**Migration:** forward-only. **Requires the Drizzle migration infra prerequisite (System Boundaries).** Down/rollback path documented in the migration header (per `db-engineer` guardrails). Co-locate `focus-session.ts` schema under `packages/shared/db/schema/` (exported from `index.ts`) + a Drizzle migration file under `packages/shared/db/migrations/` once infra exists.

**Task-status dependency (M2):** the picker filter depends on `task.status` having a defined terminal value. This spec pins `done` as the terminal status. `@db-engineer` should add a CHECK constraint to `task.status` (or document the canonical vocabulary: e.g. `todo` / `in_progress` / `done`) in the same migration pass; the picker defensively reads `status IS NULL OR status != 'done'` until then.

**Boundary note (M4):** `focus_session` is self-contained for MVP — the Daily Retrospective tab reads it directly. A Phase 2+ task will project completed `focus_session` rows into `activity_log` (or a shared view) so the legacy mood/dopamine loop sees focus effort. No `activity_log` row is written by the timer in MVP.

### Reused tables (read-only)
- `task` — picker source. Columns used: `id`, `title`, `estimatedTime`, `is_for_today`, `status`, plus energy `tag` via `task_tag` join.

## API & Interface Contracts

No HTTP API (MVP is local-only). Internal TS contracts:

### `listTodayTasksForFocus(): Promise<FocusPickerTask[]>`
- **Returns:** `{ id, title, estimatedTime, energyTag }[]` filtered by `is_for_today=true AND status!='done'`.
- **Errors:** throws on SQLite errors; UI shows empty-state on `[]`.

### `startFocusSession(input: { taskId?: string, plannedDurationMs, plannedBreakMs }): Promise<FocusSession>`
- **Effect:** inserts a row with `status='partial'`, `phase='focus'`, `startedAt=now`, `endedAt=null`, `durationMs=0`. Returns the row.
- **Precondition:** no other session with `endedAt IS NULL` exists (one active session lock). Throws `FocusSessionConflictError` otherwise.

### `updateSessionProgress(sessionId, { elapsedMs, phase }): Promise<void>`
- **Effect:** idempotent update of `durationMs` + `phase`. Called by the Jotai timer tick every N seconds (debounced) so a crash preserves partial data.

### `completeSession(sessionId, input: { status, moodScore?, endedAt=now }): Promise<FocusSession>`
- **Effect:** sets `status` (complete|partial|cancelled), `moodScore`, `endedAt`. Marks the session terminal.
- **Validation:** `moodScore` null or 1-5; else throws.

### `playPhaseEndCue(): Promise<void>`
- **Effect:** plays bundled audio asset. No-op if sound disabled in settings.

## Failure Modes & Edge Handling

| Failure | Handling |
| :--- | :--- |
| **App crash mid-session** | `updateSessionProgress` persisted last `elapsedMs` within debounce window (≤3s). On next app open, the open session (`endedAt IS NULL`) is detected → silently finalized as `status='partial'`, `endedAt=launchTime` (Q2 — crash-recovery *prompt* deferred to Phase 2). |
| **User force-quits app** | Same as crash — partial row persists. Recovery flow as above. |
| **Task deleted while session active** | `taskId` FK nullable → on task delete, set `focus_session.taskId = NULL` (cascade-null, `onDelete: "set null"`). Session keeps running, just unbound. |
| **Two sessions attempted concurrently** | `startFocusSession` precondition check throws `FocusSessionConflictError`. UI prevents the call via Jotai lock (one active `sessionId` atom). |
| **User cancels before any elapsed time** | Save with `status='cancelled'`, `durationMs=0`. Avoids noise in the complete/partial analytics. |
| **Sound asset missing / audio permission denied** | `playPhaseEndCue` catches + logs abstractly (no PII). Timer still functions silently. UI shows a subtle visual phase-end indicator as fallback. |
| **SQLite write failure** | Surface a non-blocking toast "Session not saved." Keep the timer UI running so the user isn't punished by data-layer failure. Retry write on next tick. |
| **Offline** | No degraded mode — local-first means offline IS the happy path. No special handling. |

## Test Strategy (Phase 4 input)

- **Unit (test-creator, `bun:test`):**
  - Duration parsing/validation.
  - `listTodayTasksForFocus` filter logic (mock SQLite).
  - `startFocusSession` precondition (conflict throws).
  - `completeSession` mood validation (1-5 + null).
- **Contract:** migration applies cleanly; rollback documented.
- **Component (`*.test.tsx`):** FocusScreen renders picker; tapping a task calls `startFocusSession`; mood prompt renders skip + 1-5 buttons; partial save on unmount-without-complete.
- **Edge:** on app launch, an open session (`endedAt IS NULL`) is silently finalized as `status='partial'`, `endedAt=launchTime`, `durationMs` = last persisted progress (Q2 — crash-recovery *prompt* deferred to Phase 2).
