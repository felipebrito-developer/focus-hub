# Gap Audit: Focus Timer (Now Module)

> **Audited specs:** [business/spec.md](business/spec.md) + [technical/spec.md](technical/spec.md) (originally `SPEC-focus-timer.md`, Phase 2 Draft)
> **Auditor:** Architect (inline; `@po-agent` spawn unavailable this session — see note §0)
> **Cross-referenced docs:** `docs/BusinessRules/goals.md`, `docs/Structure/db-structure.md`, `docs/UI/ui-principles.md`, `docs/UI/mobile-component-rules.md`, existing Drizzle schema (`packages/shared/db/schema/*.ts`)
> **Outcome:** **Conditional Pass** — 3 blockers (B1–B3) + 4 minor gaps (M1–M4) + 3 open questions resolved (Q1–Q3). All 11 spec changes applied. Spec is **Final**.

---

## §0 — Provenance Note (process deviation)
Per `.global/guidelines/workflow-architect-po.md` Step 2, the gap audit is owned by `@po-agent`. This session exposes no subagent-spawn (Task) tool, so the Architect ran the audit inline. This stays in-scope: the only artifact produced is this gap audit file (architect-owned meta scaffolding). The PO persona's acceptance-criteria rigor + Linear gap-tracking (`gap`/`needs-architect-review` issue) were **not** applied. The Phase 3 PO slicing for Milestone 0 was later run through `@po-agent` properly.

---

## Blockers (resolved)

### B1 — Timestamp column type inconsistency
- **Spec said:** `startedAt`, `endedAt`, `lastSyncedAt` are `integer` (Unix epoch ms).
- **Codebase reality:** Every existing timestamp column (`created_at`, `updated_at`, `completed_at`, `last_synced_at`) is **`text`** (ISO datetime string), per `packages/shared/db/schema/*.ts`.
- **Resolution (APPLIED):** All timestamps are now `text` (ISO 8601) in the technical spec. Aligns with existing convention.

### B2 — `lastSyncedAt` type mismatch
- Resolved by B1 (use `text`).

### B3 — Migration infrastructure does not exist
- **Codebase reality:** `packages/shared/db/` contained only `schema/` + `initial-data.ts`. No `migrations/` directory.
- **Resolution (APPLIED):** Milestone 0 Foundation spec establishes `drizzle-kit push` for dev. Formal migration files deferred to pre-deploy. The technical spec documents this as a pre-condition. See [architecture/milestone-0-foundation.md](../../architecture/milestone-0-foundation.md).

---

## Minor Gaps (resolved)

### M1 — Column-name convention ambiguity
- **Resolution (APPLIED):** Technical spec table now has explicit `DB column (snake_case)` / `TS field (camelCase)` pairing.

### M2 — `task.status` has no constrained vocabulary
- **Resolution (APPLIED):** Technical spec pins `done` as terminal status. `@db-engineer` to add CHECK constraint. Picker defensively reads `status IS NULL OR status != 'done'` until then.

### M3 — `taskId` FK delete behavior
- **Resolution (APPLIED):** Technical spec states `references(() => task.id, { onDelete: "set null" })` explicitly.

### M4 — No bridge from `focus_session` to `activity_log`
- **Resolution (APPLIED):** Technical spec has boundary note — `focus_session` is self-contained for MVP. Phase 2+ will project into `activity_log`.

---

## UI / UX alignment

- Technical spec references `docs/UI/mobile-component-rules.md` (atomic separation, no inline screen-local components) — **file exists** ✓.
- UI conformance clause added to technical spec: FocusScreen + components MUST conform to `docs/UI/ui-principles.md` (palette, 60-30-10, flat bento, ≤4 tabs, micro-animation timings). Verified by `@design-reviewer` at review gate.
- Dedicated [UI spec](ui/spec.md) created with screen states, component breakdown, wireframes (TBD), interaction patterns, accessibility notes.
- Roadmap `now.md` mentions "Zero-distraction UI mode" for the Focus tab — deferred to Phase 2. Flagged in business spec OUT of scope.

---

## Open Questions — Resolved

### Q1 — Free-focus sessions (nullable `taskId`): in MVP?
- **Decision: IN scope.** Keep nullable `taskId` escape hatch.
- **Rationale:** ADHD users hit decision paralysis on "pick a task"; free-focus (just start a timer) lowers the activation-energy floor. Nullable FK is already designed. Cost is negligible (one nullable column). Aligns with `goals.md` "reduce cognitive load" mission.

### Q2 — Crash-recovery prompt ("resume or close as partial"): MVP or Phase 2?
- **Decision: DEFER prompt to Phase 2. MVP = silent auto-close.**
- **Rationale:** On app launch: detect `endedAt IS NULL` session → silently finalize it as `status='partial'`, `endedAt=launchTime`, `durationMs` = last persisted `updateSessionProgress` value. No prompt. Preserves "don't punish distraction" guarantee without the UX/testing burden.

### Q3 — Default focus/break durations: settings screen or hardcode?
- **Decision: HARDCODE 25/5 for MVP.**
- **Rationale:** 25/5 is the canonical Pomodoro default. Per-session override covers deviation. Hardcode as named constants in `features/now/state/focus-timer.ts`. A settings epic can later read these from a `settings` table.

---

## All 11 spec changes applied. Spec is Final.

Linear slicing complete: Epic `FEL-5` + tasks `FEL-6`–`FEL-17` created under Milestone `3. The Operational Layer`.
