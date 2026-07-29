# Neuro-Inclusive UI Principles

> **Status:** Final
> **Scope:** Cross-cutting UI spec — design philosophy + visual standards

## 1. Core Neuro-Principles

1. **Reduce Cognitive Load:** Every screen shows only what's needed for the current action. Eliminate decision paralysis.
2. **Reinforce Purpose:** Connect daily actions to personal meanings. Combat depressive apathy.
3. **Time-Blindness Mitigation:** Visual time indicators, bounded focus intervals, clear "what's next" cues.
4. **Modular Isolation:** User only sees features for their current mode (Drawer = mental reset between contexts).
5. **No Punishment:** Partial sessions saved, not discarded. Missed days don't break streaks permanently.

## 2. Visual & Sensory Standards

- **Low Visual Tension Palette:** Pure black (`#000000`) and pure white (`#FFFFFF`) banned. Use warm off-blacks (Charcoal) and warm off-whites (Bone).
- **60-30-10 Rule:** 60% dominant neutral (background), 30% secondary (surfaces/cards), 10% purposeful accent (CTAs).
- **Organic Typography:** High-contrast font weights, generous line-heights (min `1.5x`) to prevent "text swimming" during brain fog.
- **Flat "Bento Box" Architecture:** No heavy shadows. Subtle borders (`1px solid`), crisp corner radii. Structured "zones" of information.
- **Micro-Animations:** Scroll-entry fades (`600ms`), hover/active lifts (`200ms`, `scale(0.98)`). Motion must feel invisible, never distracting.

## 3. Navigation Architecture

- **Global Drawer:** The "Identity Anchor." Feels like a safe space. Contains user identity card (avatar + name + age).
- **Bottom Tabs:** Max 3-4 per module. Prevents choice paralysis.
- **Identity Card:** Top of drawer = user avatar + age. Reinforces "Future Self" continuity (combats depressive apathy).

## 4. UI Patterns & Behavior Rules

| Pattern | Trigger | UI Action | Clinical Goal |
| :--- | :--- | :--- | :--- |
| Context Reset | Module switch | 300ms fade transition | Clears working memory for new context |
| Rule of One | Any modal | Single high-contrast "Confirm" button | Prevents decision paralysis |
| Time-Blindness | Frequency display | "Daily — Happens Every Day" text | Makes recurrence explicit |
| Energy Filter | Action Hub | Filter tasks by Low/Balanced/High energy | Match tasks to current capacity |

## 5. Theme System

- Paper theme switching via Jotai + AsyncStorage.
- Registry of named themes: `light`, `dark`, `warm-dark` (default).
- Theme selection persists across sessions.
- See [infrastructure/frameworks.md](../infrastructure/frameworks.md) for theme tech details.
