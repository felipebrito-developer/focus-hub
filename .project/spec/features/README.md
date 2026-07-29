# Features Specs

Each feature gets a subfolder named after the feature (kebab-case). Inside, three sub-specs divide concerns:

```
features/<feature-name>/
├── gaps.md               ← gap audit from Phase 3 PO slicing
├── business/
│   └── spec.md           ← WHY: problem, persona, journey, metrics, scope
├── ui/
│   └── spec.md           ← HOW IT LOOKS: states, components, wireframes, interactions
└── technical/
    └── spec.md           ← HOW IT WORKS: data models, contracts, failure modes, tests
```

## Existing Features

| Feature | Business | UI | Technical | Gaps | Linear Epic |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `focus-timer/` | ✅ | ✅ (draft) | ✅ | ✅ | FEL-5 (M3) |

## Adding a New Feature

1. Create `features/<feature-name>/` with `business/`, `ui/`, `technical/` subfolders.
2. Run the grill phase (architect interviews user — see `.global/guidelines/workflow-tdd-linear.md`).
3. Write `business/spec.md` first (WHY drives everything else).
4. Write `technical/spec.md` (HOW it works — data models, contracts).
5. Write `ui/spec.md` (HOW it looks — states, components, wireframes).
6. Spawn `@po-agent` for gap audit (`gaps.md`) + Linear slicing.
