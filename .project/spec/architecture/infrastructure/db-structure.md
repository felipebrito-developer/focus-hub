# Database Structure & Schema

> **Status:** Final
> **Scope:** Cross-cutting infrastructure spec — all 21 tables, relationships, patterns

## Architecture Concepts

1. **Strategic Hierarchy:** Everything grounded in `meaning` → `category_type` → `goal` → `task`.
2. **Tagging (Neuro-UI):** Tasks/habits filtered by `tag_type` (energy levels) to reduce cognitive load.
3. **Audit Columns:** Every table carries `isSynced` (integer 0/1) + `lastSyncedAt` (text timestamp) for future sync.
4. **Type Tables:** `category_type`, `tag_type`, `frequency_type` are enum-like reference tables (seeded, not user-created).
5. **Per-Entity Logs:** Logging is per-entity (`activity_log`, `resource_log`, etc.). Future: more log tables for store, habits, events as needed.

## Schema Files (source of truth)

All schemas live in `packages/shared/db/schema/`. 11 files, 21 tables:

| File | Tables |
| :--- | :--- |
| `assets.ts` | `asset`, `goal_assets`, `meaning_assets` |
| `core.ts` | `category_type`, `frequency_type`, `tag_type` |
| `goals.ts` | `goal`, `milestone` |
| `habits_events.ts` | `habit`, `event` |
| `logs.ts` | `activity_log` |
| `meanings.ts` | `meaning` |
| `resources.ts` | `resource_type`, `resource_store`, `resources_assignments`, `resource_log` |
| `rewards.ts` | `reward` |
| `tasks.ts` | `task`, `task_tag` |

---

## Table Reference

### 1. Type / Reference Tables (seeded enums)

| Table | Description | Key Columns | Relationships |
| :--- | :--- | :--- | :--- |
| `category_type` | High-level pillars (Strategic, Health, etc.) | `id`, `name`, `categoryColor` | Root for goals/meanings |
| `tag_type` | Semantic labels (#urgent, #low-energy) | `id`, `name`, `color` | Associated with tasks via `task_tag`, habits via `habit_tag` |
| `frequency_type` | Recurrence patterns (Daily, Weekly, Work Days, Weekend) | `id`, `name`, `description` | Linked to habits |

### 2. Strategy & Meaning

| Table | Description | Key Columns | Relationships |
| :--- | :--- | :--- | :--- |
| `meaning` | Purpose-driven values (Family, Wealth, Health) | `id`, `name`, `categoryId`, `intrinsicMotivation` | Belongs to `category_type`. Has `meaning_assets` |
| `goal` | Concrete objectives linked to meanings | `id`, `title`, `categoryId`, `status`, `deadline` | Contains `milestone`s + `task`s. Has `goal_assets` |
| `milestone` | Quantifiable results for a goal + gamification streaks | `id`, `goalId`, `title`, `isAchieved` | Belongs to `goal`. Replaces legacy `outcome` table |

> **Milestone/Gamification (G3):** `milestone` table serves dual purpose: (1) quantifiable result for a goal, (2) streak tracking for habits/tasks that unlock `reward`s or achievements. Part of M2 (Habits) implementation.

### 3. Execution & Progress

| Table | Description | Key Columns | Relationships |
| :--- | :--- | :--- | :--- |
| `task` | Individual units of work | `id`, `goalId`, `isForToday`, `estimatedTime`, `title`, `status`, `parentTaskId` | Optionally nested (subtasks via `parentTaskId`). Linked to `goal`. Filtered by `task_tag` |
| `task_tag` | Junction: tasks ↔ tag_type | `taskId`, `tagId` | Many-to-many |
| `habit` | Recurring actions for behavioral conditioning | `id`, `name`, `meaningId`, `estimatedTime`, `streakCount` | Linked to `meaning` for purpose. Has `habit_tag` |
| `habit_tag` | Junction: habits ↔ tag_type | `habitId`, `tagId` | Many-to-many |
| `activity` | Activity templates (Reading, Exercise) | `id`, `name`, `icon`, `defaultUnits`, `energyCost` | Template for tasks/habits. Energy: Low/Med/High |
| `activity_log` | Historical record of activity completion | `id`, `activityId`, `amountAchieved`, `moodScore`, `timestamp` | Tracks mood (1-5) + amount. Mood-tracking replacement for legacy `user_log` |

### 4. Events

| Table | Description | Key Columns | Relationships |
| :--- | :--- | :--- |
| `event` | Calendar events with date, resources, place | `id`, `date`, `title`, `address`, `resourceIds` | Part of Day Tasks feature (G2). Links resources needed |

### 5. Resource Logistics

| Table | Description | Key Columns | Relationships |
| :--- | :--- | :--- |
| `resource_type` | Resource definitions (Money, Health) | `id`, `name`, `categoryId`, `amountType` | Linked to `category_type` |
| `resource_store` | Numeric reserve of a resource | `id`, `resourceTypeId`, `amount` | Current balance |
| `resource_log` | Transaction ledger | `id`, `resourceId`, `amountChange`, `type` | Audit trail of store changes |
| `resources_assignments` | Polymorphic pre-flight requirement mapping | `id`, `resourceId`, `entityRelatedId`, `amount` | Maps requirements to tasks/habits |

### 6. Gamification

| Table | Description | Key Columns | Relationships |
| :--- | :--- | :--- |
| `reward` | Dopamine-driven incentives | `id`, `name`, `type`, `description` | Unlocked via milestone streaks. System-wide engagement |

### 7. Assets (future feature)

| Table | Description | Key Columns | Relationships |
| :--- | :--- | :--- |
| `asset` | Documents (audio, video, images) that remind of goals/meanings | `id`, `type`, `uri`, `title` | Linked via junction tables below |
| `goal_assets` | Junction: goals ↔ assets | `goalId`, `assetId` | Many-to-many |
| `meaning_assets` | Junction: meanings ↔ assets | `meaningId`, `assetId` | Many-to-many |

> **Assets = future feature (Q6).** Documents/media that reinforce goals/meanings. Not specced in detail yet. Deferred to post-MVP or stretch goal.

---

## Planned Tables (not yet in schema)

| Table | Purpose | Status |
| :--- | :--- | :--- |
| `store_log` | Per-entity log for resource store transactions (separate from `resource_log`?) | Planned — needs spec (Q4) |
| `habit_log` | Per-entity completion history for habits (streak data) | Planned — part of M2 |
| `event_log` | Per-entity log for calendar events | Planned — needs spec |

> **Per-entity logging pattern (Q4):** User wants logs separated per entity. `activity_log` and `resource_log` exist. `habit_log`, `event_log`, and potentially `store_log` are planned. Each log tracks its entity's history independently.

---

## What Was Corrected (from legacy `docs/Structure/db-structure.md`)

| Legacy doc | Reality | Fix |
| :--- | :--- | :--- |
| `category` table | `category_type` (enum table) | Renamed |
| `tag` table | `tag_type` (enum table) | Renamed |
| `outcome` table | Does not exist — replaced by `milestone` (Q3) | Removed |
| `audit_log` table | Does not exist — audit via `isSynced`/`lastSyncedAt` columns | Removed |
| `user_log` table | Does not exist — mood tracking via `activity_log.moodScore` | Removed |
| `habit_log` table | Does not exist yet — planned | Marked as planned |
| Missing: `activity` | Exists in code | Added |
| Missing: `event` | Exists in code | Added |
| Missing: `asset` + junctions | Exists in code | Added (future feature) |
| Missing: `frequency_type` | Exists in code | Added |
| Missing: `milestone` | Exists in code | Added |
| Missing: `task_tag`, `habit_tag` | Exist in code | Added |
