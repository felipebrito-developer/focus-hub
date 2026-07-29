# Focus Timer — UI Spec (HOW IT LOOKS)

> **Feature:** Focus Timer (Now Module)
> **Spec type:** UI — screen states, component breakdown, wireframes, interaction patterns.
> **Status:** Draft — to be refined during Phase 4 implementation + `@design-reviewer` review.
> **Related:** [Business spec](../business/spec.md) · [Technical spec](../technical/spec.md) · [Gap audit](../gaps.md)
> **Source docs:** `docs/UI/ui-principles.md`, `docs/UI/mobile-component-rules.md`, `docs/UI/ui-screens.md`.

---

## Screen States

The Focus Timer has the following distinct screen states, driven by the Jotai `focus-timer` state machine:

| State | Trigger | UI Elements |
| :--- | :--- | :--- |
| **Picker** | User enters Focus tab, no active session | Task list (today's incomplete), "Free Focus" escape-hatch button, empty-state if no tasks |
| **Config** | User taps a task (or Free Focus) | Task title (or "Free Focus"), duration input (default 25min), break input (default 5min), Start button |
| **Focus Running** | User taps Start | Countdown timer (large), phase label ("Focus"), task title, Pause button, elapsed progress ring |
| **Break Running** | Focus phase ends → user taps "Start Break" | Countdown timer (large), phase label ("Break"), Skip Break button |
| **Mood Prompt** | Session completes (user taps "Save") | Mood rating 1-5 buttons, "Skip" button, session summary (duration, task) |
| **Saved / Done** | Mood submitted or skipped | Confirmation toast, returns to Picker |

### State Transitions

```
Picker → Config → Focus Running ──→ Break Running → Mood Prompt → Picker
                         │              │
                         ├→ Save (complete) → Mood Prompt
                         ├→ Pause → (resume or save as partial)
                         └→ App crash/force-quit → silent partial finalize on next launch
```

## Component Breakdown

Follows `docs/UI/mobile-component-rules.md` atomic separation. No inline screen-local components.

### Organisms
- **FocusPickerList** — renders today's incomplete tasks as a flat list. Each item shows title, estimatedTime, energy tag chip. Calls `listTodayTasksForFocus()`.
- **FocusConfigForm** — duration + break inputs with Start CTA. Reads/overrides defaults from `DEFAULT_FOCUS_MS` / `DEFAULT_BREAK_MS`.
- **FocusTimerDisplay** — large countdown + phase label + task title + progress ring. Reads from Jotai timer atoms.
- **MoodRatingPrompt** — 1-5 button row + Skip. Calls `completeSession()` on submit.

### Molecules
- **TaskPickerItem** — single task row: title, estimatedTime label, energy tag chip.
- **DurationInput** — labeled numeric input with +/- steppers (5min increments).
- **PhaseEndIndicator** — subtle visual fallback when sound cue fails (pulse animation).

### Atoms
- **PhaseLabel** — text label ("Focus" / "Break" / "Done") with theme color per phase.
- **EnergyTagChip** — colored chip for energy level (low/medium/high).
- **CountdownText** — large monospace countdown display.

## Wireframes

> **TBD** — to be created during Phase 4 implementation. Can be hand-drawn or Figma sketches. The `@design-reviewer` agent will verify conformance to `docs/UI/ui-principles.md` at the review gate.

### Layout guidance (from ui-principles.md)
- **Palette:** 60-30-10 rule. 60% background (warm dark), 30% surface, 10% accent (terracotta for focus phase, olive for break phase).
- **Pure black/white BANNED.** Use warm charcoal `#161513` background, warm off-white `#EAE6DF` text.
- **Flat bento** — no heavy shadows. Use surface elevation (`#1E1C1A` → `#262421`) for depth.
- **≤4 tabs** in the Now module BottomTab navigator.
- **Micro-animations:** 600ms fade transitions between states, 200ms scale on button press.

## Interaction Patterns

| Action | Response |
| :--- | :--- |
| Tap task in picker | Navigate to Config screen with task pre-filled |
| Tap "Free Focus" | Navigate to Config with no task (taskId = null) |
| Tap Start | Transition to Focus Running, call `startFocusSession()`, start countdown |
| Tap Pause | Pause countdown, show "Resume" + "Save" buttons |
| Phase end (focus) | Sound cue fires, show "Start Break" + "Save" buttons (no auto-continue) |
| Phase end (break) | Show "Save Session" button |
| Tap Save | Call `completeSession()`, show Mood Prompt |
| Tap Skip (mood) | Call `completeSession({ moodScore: null })`, return to Picker |
| Swipe back mid-session | Auto-save as partial, return to Picker |

## Accessibility

- Countdown text uses large fontSize (≥32) for legibility.
- Mood rating buttons have accessibility labels ("Rate mood 1 of 5", etc.).
- Phase transitions announce via `AccessibilityInfo.announceForAccessibility()`.
- Haptic feedback on phase end (light vibration) as supplement to sound cue.

## Open UI Questions (to resolve during implementation)

1. **Progress ring vs. linear progress bar?** Ring is more engaging but takes more space. Linear is minimal. Recommend ring (aligns with "phD neuro-recommendation" in `ui-structure.md`).
2. **Picker sorting?** By estimatedTime? By energy tag? By priority? Default: insertion order. Filtering = Phase 2.
3. **Break phase visual differentiation?** Same screen with color swap (terracotta → olive)? Or separate screen? Recommend same screen + color swap for continuity.
