# Housekeeping Queue Rule (project-local)

> **Applies to:** focus-hub, all sessions.
> **Override:** user may ask to skip. Default = follow this rule.

---

## 1. Purpose

`housekeeping-queue.md` is a backlog of deferred tasks, cleanup, debt, and hygiene items that don't block the current work unit but must be addressed by the end of the current milestone.

It exists so the architect can stay focused on the active task without losing track of small follow-ups discovered mid-implementation.

## 2. Location

```
.project/
└── roadmap/
    ├── epics.md               ← big-picture epic overview
    ├── current-work.md        ← session handoff (what done, what next)
    └── housekeeping-queue.md  ← THIS: deferred cleanup + debt backlog
```

Sibling to `current-work.md` + `epics.md`. NOT inside `spec/`.

## 3. Ownership

- **Architect only** writes this file. Subagents do NOT.
- Architect appends items as they are discovered (mid-task, review, verification, or session end).
- Items are NOT duplicated in `current-work.md` — housekeeping stays here.

## 4. When to Add

Add an item when you discover work that:
1. Is NOT part of the active Linear task's acceptance criteria.
2. Is NOT blocking the current task (can defer).
3. MUST be done before the milestone closes (debt, hygiene, cleanup).
4. OR is a workspace-level gap/observation to record in `.global/roadmap/workflow-roadmap.md`.

Examples:
- Linear status hygiene (move to Done, cancel duplicates, create retroactive task).
- Migration debt (legacy deps, version mismatches, config drift).
- Spec/doc reconciliation after separate commits.
- Subagent reliability observations (empty output, misreported status).
- Verification debt (review gate skipped for infra task).

## 5. Format

```markdown
## Pending

### <Category>
- [ ] <item> — <one-line context/note>
```

Categories: `Linear Hygiene`, `Migration Debt`, `Spec / Docs`, `Verification Debt`, `Workspace Gaps`, or custom as needed.

## 6. When to Address

- **End of milestone:** architect walks the queue, creates Linear tasks or resolves items inline.
- **When blocking:** if a deferred item starts blocking new work, pull it into `current-work.md` as an active task + create/assign a Linear task.
- **Never auto-delete:** items stay until checked off. When checked, mark `[x]` + date, keep for audit until milestone closes.

## 7. Line Limit

200 lines. If approaching, move resolved items to an `archive/` subfolder (one file per milestone, e.g. `archive/m0-resolved.md`).

## 8. Relationship to Other Roadmap Files

| File | Scope | Update frequency |
|---|---|---|
| `current-work.md` | active session handoff | every task transition |
| `epics.md` | static epic overview | on epic scope change only |
| `housekeeping-queue.md` | deferred cleanup + debt | when item discovered + when resolved |
| `.global/roadmap/workflow-roadmap.md` | workspace-level gaps (cross-project) | on workspace-structure change |

`housekeeping-queue.md` = project-local debt. Workspace-level concerns (subagent reliability, tooling gaps affecting all projects) go to `.global/roadmap/workflow-roadmap.md` — but the architect may note them here first + promote to workflow-roadmap during milestone close.
