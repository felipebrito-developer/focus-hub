# Focus Timer

> **Status:** Final
> **Linear Epic:** FEL-5
> **Milestone:** M3 — Operational Layer
> **Layer:** Operational
> **Code Folder:** `src/features/focus/`

## Concept

Focus Timer is the core execution tool of Focus Hub. It provides bounded focus intervals with a task picker, mood rating, and partial session saving. The design philosophy is non-punitive: partial sessions are saved, not discarded — supporting ADHD users who get distracted without "failing" the session.

The timer connects a specific task from the backlog to a time-boxed execution window. After each session, the user logs a mood score (1-5) and the amount achieved. This data feeds into the Week Retrospective for mood-vs-activity correlation.

## Scope

**IN:**
- Task selection from backlog (filtered by energy level)
- Configurable timer duration (Pomodoro-style intervals)
- Zero-distraction UI during active session (Meaning Anchor display)
- Partial session saving (distraction acknowledged, session preserved)
- Mood rating post-session (1-5)
- Amount achieved logging
- Session history (uses `activity_log` table)
- Logistical gate: pre-session resource/capacity check

**OUT:**
- Background timer (timer only active when app foreground — MVP)
- Cross-device session sync (deferred — local-only for MVP)
- AI-driven session recommendations (deferred — AI-Bridge)
- Group/social focus sessions (not in scope)

## Specs

| Spec | Description | Path |
| :--- | :--- | :--- |
| Business | WHY: problem, persona, journey, metrics, scope | [business/spec.md](business/spec.md) |
| UI | HOW IT LOOKS: states, components, wireframes, interactions | [ui/spec.md](ui/spec.md) |
| Technical | HOW IT WORKS: data models, contracts, failure modes, tests | [technical/spec.md](technical/spec.md) |
| Gap Audit | PO gap audit — all resolved | [gaps.md](gaps.md) |

## Key Decisions

1. **Non-punitive sessions:** Partial sessions saved, not discarded. Distraction is acknowledged, not penalized.
2. **Mood rating (1-5):** Post-session mood score feeds into Week Retrospective correlation analysis.
3. **Meaning Anchor:** During active session, the linked task's parent Meaning is displayed to reinforce purpose.
4. **Logistical Gate:** Pre-session check verifies required resources are available before starting.
5. **Energy filtering:** Task picker filters by energy tag (Low/Balanced/High) to match current capacity.
6. **Activity log integration:** Sessions logged via `activity_log` table (moodScore, amountAchieved, timestamp).
7. **Timer UI:** Zero-distraction mode — minimal UI during active focus, trajectory summary on completion.
8. **No background timer:** MVP constraint — timer pauses if app backgrounds.
