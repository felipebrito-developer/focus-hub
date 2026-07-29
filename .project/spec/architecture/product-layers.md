# Product Layers — Purpose & Action Model

> **Status:** Final
> **Scope:** Architecture spec — 4-layer conceptual model + friction points
> **Source:** Migrated from `docs/BusinessRules/goals.md`

## Core Objective

**Reduce cognitive load** (critical for ADHD) and **reinforce purpose** (critical for depression).

Focus Hub organizes all features into 4 conceptual layers. Each layer addresses a specific mental friction point.

---

## Layer 1: Strategic (The "Why")

**Purpose:** Combat the "emptiness" and lack of motivation found in depression. Every goal or habit is anchored to a Meaning — an emotional North Star.

| Entity | DB Table | Purpose | Spec | Milestone |
| :--- | :--- | :--- | :--- | :--- |
| Meanings | `meaning` | Purpose-driven values (Family, Wealth, Health) | [features/meanings/README.md](../features/meanings/README.md) | M1 |
| Goals | `goal` | Turn abstract desires into concrete targets with progress tracking | [features/goals/README.md](../features/goals/README.md) | M1 |

**Meaning spec:** Title, Intrinsic Motivation (Why), Color Tag, Category link.
**Goal spec:** Title, Status, Deadline, Category, Meaning link, Milestones.

---

## Layer 2: Structural (The "How")

**Purpose:** Eliminate decision paralysis ("I don't know where to start") with templates and flexible frequencies.

| Entity | DB Table | Purpose | Spec | Milestone |
| :--- | :--- | :--- | :--- | :--- |
| Activities | `activity` | Template library — define "Exercise" once, reuse everywhere. Energy cost (Low/Med/High) | [features/activities/README.md](../features/activities/README.md) | M2 |
| Frequencies | `frequency_type` | Flexible habits (3x/week) instead of rigid dates — reduces "failure guilt" | [features/habits/README.md](../features/habits/README.md) | M2 |
| Habits | `habit` | Recurring actions linked to meanings. Streak tracking. | [features/habits/README.md](../features/habits/README.md) | M2 |
| Exercise Plans | `task` (typed) | Body-part workouts, task-tree planning, day scheduling | [features/exercise-plans/README.md](../features/exercise-plans/README.md) | M2 |

**Activity spec:** Name, Icon, Default Units, Energy Cost (Low/Medium/High).
**Habit spec:** Name, Meaning link, Frequency, Estimated Time, Streak Count.

---

## Layer 3: Operational (The "Now")

**Purpose:** Break down overwhelming projects. Immediate dopamine hits + mood tracking. Bounded focus intervals.

| Entity | DB Table | Purpose | Spec | Milestone |
| :--- | :--- | :--- | :--- | :--- |
| Tasks | `task` | Self-referencing hierarchy (subtasks), requirement inheritance, goal link, tags | [features/tasks/README.md](../features/tasks/README.md) | M3 |
| Focus Timer | (uses `task`) | Bounded focus intervals, task picker, mood rating, partial session saving | [features/focus-timer/README.md](../features/focus-timer/README.md) | M3 |
| Activity Logs | `activity_log` | Mood rating (1-5), amount achieved, timestamp | [features/activity-logs/README.md](../features/activity-logs/README.md) | M3 |
| Day Progress | (aggregate) | Pizza graphs for daily progress, energy check-in | [features/day-progress/README.md](../features/day-progress/README.md) | M3 |
| Day Tasks | `task` + `event` | Filtered today list, calendar events, swipe-to-complete | [features/day-tasks/README.md](../features/day-tasks/README.md) | M3 |
| Mental Dump | (new table?) | Quick-entry text, daily reflection prompt | [features/mental-dump/README.md](../features/mental-dump/README.md) | M3 |
| Week Retrospective | (aggregate) | Weekly review, mood vs activity correlation charts | [features/week-retrospective/README.md](../features/week-retrospective/README.md) | M3 |
| Events | `event` | Calendar events with date, resources, place | (part of Day Tasks) | M3 |

**Task spec:** Parent ID for infinite nesting, Status, Goal link, Estimated Time, Tags, `isForToday`.
**Activity Log spec:** Timestamp, Amount Achieved, Mood Score (1-5).

---

## Layer 4: Logistical (The Support)

**Purpose:** Prevent "Flow Interruption" due to missing materials (the ADHD hyperfocus killer). Inventory management + automatic preparation checklists.

| Entity | DB Table | Purpose | Spec | Milestone |
| :--- | :--- | :--- | :--- | :--- |
| Resource Types | `resource_type` | Define resource types (Money, Health) with amount type | [features/resource-types/README.md](../features/resource-types/README.md) | M4 |
| Resource Store | `resource_store` | Track numeric reserves | [features/resource-types/README.md](../features/resource-types/README.md) | M4 |
| Resource Log | `resource_log` | Transaction ledger, audit trail | [features/resource-log/README.md](../features/resource-log/README.md) | M4 |
| Requirements | `resources_assignments` | Polymorphic pre-flight checklists linked to tasks/habits | [features/requirements/README.md](../features/requirements/README.md) | M4 |
| Financial Overview | (aggregate) | Financial health dashboard | [features/financial-overview/README.md](../features/financial-overview/README.md) | M4 |

**Requirement spec:** Current balance, Minimum threshold, Polymorphic link to any action (Task, Habit, Event).

---

## Cross-Layer: Gamification (G3)

| Entity | DB Table | Purpose | Milestone |
| :--- | :--- | :--- | :--- |
| Milestones | `milestone` | Streak tracking on habits/tasks that unlock rewards | M2 (Habits) |
| Rewards | `reward` | Dopamine-driven incentives for completing tasks/streaks | M2+ |

Gamification is cross-cutting but implemented as part of M2 (Habits) where streak tracking begins.

---

## Friction Points & Solutions

| Friction Point | App Solution | Technical Implementation |
| :--- | :--- | :--- |
| Overwhelmed by choice | Focus Mode UI | Displays only one subtask + immediate requirements |
| "Out of sight, out of mind" | Smart Inventory | Alerts if you lack materials before starting a task |
| Lack of energy | Energy Filter | Suggests "Low Energy" activities during depressive episodes |
| "Time blindness" | Estimated Time | Adds time-dimension to tasks to visualize the day |
