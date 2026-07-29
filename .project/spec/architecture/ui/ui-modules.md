# UI Modules — Display Names & Module Mapping

> **Status:** Final
> **Scope:** Cross-cutting UI spec — module display names, tab breakdowns, code-folder mapping

FocusHub restructures the app into 5 core modules (4 active + 1 deferred) designed around daily focus, mental offloading, physical health, and resource management.

## Module Mapping

| Code Folder | Display Name | Layer | Features | Status |
| :--- | :--- | :--- | :--- | :--- |
| `focus` | Now | Operational | Focus Timer, Day Progress, Day Tasks, Mental Dump | M3 |
| `goals` | Mental Backlog | Strategic + Structural + Operational | Meanings, Goals, Habits, Activities, Tasks, Week Retrospective | M1-M3 |
| `store` | Home Inventory | Logistical | Resource Types, Resource Log, Financial Overview, Requirements | M4 |
| `fitness` | Body Care | Structural | Exercise Plans, Workout Execution | M2 (plans), deferred (execution) |
| `life-logs` | Life Logs | Deferred | Journaling, Event Timeline, Analytics | post-M4 |
| `settings` | Settings | Foundation | Profile, Theme, Preferences | M0 |
| `drawer` | (navigation) | Foundation | Identity Card, Module List, Footer | M0 |
| `auth` | (login flow) | Foundation | Mocked local login | M0 |

## Module Details

### 1. Now (`focus/`)
**Description:** The execution hub for the current day. Track immediate progress, focus on active tasks, perform daily mental offloading.
**Tabs:**
- Day Progress — visual overview of daily progress (charts, completion rates).
- Day Tasks — all tasks scheduled for today + calendar events.
- Focus Timer — select a task, use focus timer to complete it. Access to older/delayed "Now" tasks.
- Mental Dump — quick offload of thoughts/ideas, daily reflection without cluttering main task list.

### 2. Mental Backlog (`goals/`)
**Description:** The strategic planning center. Offloads cognitive burden by managing long-term objectives and unassigned tasks.
**Tabs:**
- Goals Dashboard — track and update long-term goals (pizza graphs).
- Habits — manage recurring daily/weekly routines + streaks.
- Meanings — define the "Why" behind goals, connect tasks to personal values.
- Tasks Management — master backlog of all unassigned tasks.
- Week Retrospective — higher-level reflection, review past week, plan next.

### 3. Body Care (`fitness/`)
**Description:** Physical health, exercise tracking, bodily well-being routines.
**Tabs:**
- Exercises Overview — current exercises, health habits, physical progress.
- Exercise Plans — create workout routines, schedule across days.
- Workout Execution — active screen to follow planned exercise (deferred — neuro-visual pacer, circular rest timer).

### 4. Home Inventory (`store/`)
**Description:** Logistical and financial management center. Tracks personal resources and financial health to reduce life administration anxiety.
**Tabs:**
- Financial Overview — high-level dashboard of financial state.
- Resources Inventory — manage physical/digital resources, add/remove items, schedule acquisition tasks.
- Inventory Log — audit trail of inventory changes.

### 5. Life Logs (`life-logs/`) — Deferred
**Description:** Tracking general life events, journal entries, broader historical logs.
**Tabs:**
- Core Journaling — rich text/markdown daily logs, tagging to meanings/goals.
- Event Timeline — vertical timeline of major life events.
- Analytics (future) — AI-driven insights combining life logs with retrospectives.

### User Settings (`settings/`)
- Profile — display name, age, avatar.
- Preferences — color theme (light/dark/warm-dark).
- Game Modes — progression styles (future, defaults "Classic").

### Local Auth (`auth/`)
- Mocked local login (user + password stored locally).
- Part of M0 Foundation (G1).
