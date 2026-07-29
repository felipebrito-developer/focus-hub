# Focus Timer — Business Spec (WHY)

> **Feature:** Focus Timer (Now Module)
> **Spec type:** Business — problem, persona, journey, success metrics, scope.
> **Status:** Final.
> **Related:** [Technical spec](../technical/spec.md) · [UI spec](../ui/spec.md) · [Gap audit](../gaps.md)
> **Source docs:** `docs/Roadmaps/now.md` (Focus tab), `docs/BusinessRules/goals.md`.

---

## Problem Statement

ADHD users struggle with two compounding frictions when trying to execute tasks:
1. **Overwhelm / "where do I start"** — an undifferentiated backlog causes decision paralysis.
2. **Time blindness** — without an external time anchor, focus drifts or hyperfocus spirals uncontrollably.

The Focus Timer is the execution valve inside the Now module: it lets the user pick one today-flagged task, commit to a bounded focus interval, and produce a logged, mood-correlated record of effort — regardless of whether the session completed or was interrupted.

## Target Persona & User Journey

**Persona:** ADHD / depression-adjacent user who has already triaged their day (tasks flagged `is_for_today=true` via the Mental Backlog → Now flow).

**Journey:**
1. User opens the **Now** module → selects the **Focus** tab.
2. Picker lists today's incomplete tasks (`is_for_today=true AND status!='done'`), showing each task's `title`, `estimatedTime`, and energy `tag` (low/medium/high).
3. User taps a task → focus session config screen: suggested duration = task's `estimatedTime` (overrideable), break duration (overrideable, default from settings).
4. User starts the focus phase. Countdown + phase label + task title render. Sound cue fires at phase end.
5. On phase end (manual transition — no auto-continue), the user either:
   - Starts the break phase (countdown + "on break" label).
   - Saves the session (complete) → optional mood rating prompt (1-5, skippable → null).
   - Cancels (see Failure Modes in technical spec).
6. If interrupted/paused mid-focus and the user abandons, the partial session auto-saves with `status='partial'` + optional mood.
7. Session row writes to `focus_session` table (local SQLite). Mood feed-forward available to the Daily Retrospective tab later.

## Success Metrics

- **Reduce session drop-off:** ≥70% of started focus sessions produce a log row (complete OR partial). Validates "don't punish distraction."
- **Mood data coverage:** ≥40% of complete sessions carry a non-null mood score (optional by design; baseline for retrospective correlation).
- **Latency:** task picker renders < 200ms (single local SQLite query, no network).
- **Offline resilience:** 100% of timer + logging works with no network — local-first is the source of truth.
- **UX friction reduction:** zero mandatory steps between "session ends" and "session saved" except the optional mood prompt.

## Scope & Non-Goals

**IN scope (MVP):**
- Customizable focus + break durations (per-session override).
- Manual phase transitions (focus → break → done). No auto-continue.
- Task picker: today-flagged incomplete tasks only.
- `focus_session` table + completion logging (complete + partial).
- Optional skippable mood rating (1-5, null on skip).
- Foreground sound cue on phase end.
- One active session at a time (Jotai-enforced lock).

**OUT of scope (deferred to Phase 2+):**
- Auto-continue between phases.
- Long-break logic after N cycles.
- System local notifications / background timers (Expo Notifications).
- Auto-pause on app background (lifecycle hooks).
- Energy-tag-based task filtering in the picker (show all today tasks; filtering = later).
- Estimated-time-as-default-duration auto-binding (nice-to-have; manual entry for MVP).
- Mood trend visualization (lives in Daily Retrospective tab).
- Crash-recovery **prompt** UI ("resume or close as partial?") — MVP does silent partial-finalize on launch instead.
- Settings screen for default durations — MVP hardcodes 25/5 constants.
- Zero-distraction chrome mode for the Focus tab (roadmap `now.md`) — Phase 2.

---

## Appendix A: Grill Decisions (Phase 1)

1. **Timer modes:** customizable durations + manual phase transitions (no auto-continue). Reason: rigid timers cause "failure guilt" per `goals.md`.
2. **Task selection:** read task details (title, estimatedTime, energy tag) + write completion log. Reason: feeds `Activity_Logs` dopamine + audit per `goals.md`.
3. **Mood rating:** optional, skippable, null stored on skip. Reason: mandatory rating = friction = ADHD drop-off.
4. **Partial sessions:** saved with `status='partial'` + optional mood. Reason: losing 20 min of effort because user didn't hit complete = demoralizing.
5. **Notifications:** foreground + sound cue, no system notifications. Reason: Expo Notifications = native permissions + scope creep; sound gives essential phase-end signal without that.
6. **Data model:** new `focus_session` table (dedicated, normalized). Reason: reusing `activity_log` overloads generic table with timer-specific fields.
7. **Task eligibility:** today-flagged incomplete only (`is_for_today=true AND status!='done'`). Reason: Focus tab lives inside Now module = "execution hub for the current day"; showing all tasks dilutes focus (anti-overwhelm principle).
