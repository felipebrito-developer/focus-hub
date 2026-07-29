# Spec Directory Structure

This folder holds all project specifications, organized into three top-level categories: **architecture** (cross-cutting, split into infrastructure/ui/services), **features** (one subfolder per product feature), and **assets** (reference images).

## Structure

```
.project/spec/
├── README.md                       ← you are here (structure guide)
├── app-summary.md                  ← master index: what app is, all features, architecture (≤250 lines)
├── architecture/                   ← cross-cutting technical specs (not feature-specific)
│   ├── README.md
│   ├── product-layers.md           ← 4-layer conceptual model (Strategic/Structural/Operational/Logistical)
│   ├── milestone-0-foundation.md   ← M0 spec: bootable app, DB, tests, nav, i18n, theme, auth
│   ├── infrastructure/             ← foundational technical specs
│   │   ├── frameworks.md           ← tech stack summary, version pins, rationale
│   │   ├── project-structure.md    ← monorepo layout, package boundaries, import rules
│   │   ├── db-structure.md         ← DB schema, tables, relationships, seeding
│   │   ├── versioning.md           ← semantic versioning policy, changelog format
│   │   └── deploy-plan.md          ← release pipeline, signing, store submission
│   ├── ui/                         ← UI/UX architecture specs
│   │   ├── ui-principles.md        ← neuro-inclusive design philosophy, clinical guardrails
│   │   ├── ui-structure.md         ← feature-based folder organization
│   │   ├── ui-screens.md           ← screen blueprint, visual breakdown
│   │   ├── ui-modules.md           ← navigation modules (Now, Mental Backlog, Body Care, Home Inventory)
│   │   ├── component-rules.md      ← component reuse, atomic design, structure rules
│   │   └── component-registry.md   ← named component catalog
│   └── services/                   ← service-layer specs (future + local)
│       ├── local-auth.md           ← M0 local mocked auth (G1=A)
│       ├── security.md             ← encryption/key management (future, packages/security)
│       └── future-architecture.md  ← deferred: backend, AI-bridge, MCP, sync
├── features/                       ← feature-specific specs (one subfolder per feature)
│   ├── README.md                   ← how to add new features
│   └── <feature-name>/             ← kebab-case (21 features specced)
│       ├── README.md               ← feature summary + concept (≤250 lines) — THE INDEX
│       ├── gaps.md                 ← gap audit from PO slicing (Phase 3)
│       ├── business/spec.md        ← WHY: problem, persona, journey, metrics, scope
│       ├── ui/spec.md              ← HOW IT LOOKS: states, components, wireframes, interactions
│       └── technical/spec.md       ← HOW IT WORKS: data models, contracts, failure modes, tests
└── assets/
    └── references/                 ← UI reference screenshots (BodyCare, HomeInventory, Now Module)
```

## Three Architecture Divisions

`architecture/` is subdivided by concern:

| Division | Holds | Examples |
| :--- | :--- | :--- |
| `infrastructure/` | Foundational technical specs — stack, structure, DB, versioning, deploy | `frameworks.md`, `project-structure.md`, `db-structure.md` |
| `ui/` | UI/UX architecture specs — design philosophy, screens, modules, component rules | `ui-principles.md`, `component-registry.md` |
| `services/` | Service-layer specs — local auth, security, future backend/AI/sync | `local-auth.md`, `security.md`, `future-architecture.md` |

Cross-cutting specs that span all three (e.g. `product-layers.md`, `milestone-0-foundation.md`) live directly in `architecture/` root.

## Rules

1. **`architecture/`** — only cross-cutting technical specs. No feature-specific logic.
2. **`features/<feature-name>/`** — one subfolder per product feature (kebab-case).
3. **Each feature has 3 sub-specs:**
   - `business/spec.md` — the WHY. Problem statement, target persona, user journey, success metrics, scope boundaries, product decisions.
   - `ui/spec.md` — the HOW IT LOOKS. Screen states, component breakdown (atoms/molecules/organisms), wireframes, interaction patterns, accessibility.
   - `technical/spec.md` — the HOW IT WORKS. System boundaries, data models, API/interface contracts, failure modes, test strategy.
4. **`gaps.md`** — lives at the feature root. Contains the PO/architect gap audit from Phase 3.
5. **File naming:** `spec.md` is the canonical filename within each subfolder. Supplementary files in `details/` use descriptive kebab-case names.
6. **Cross-references:** use relative markdown links between sub-specs (e.g. `[technical spec](../technical/spec.md)`).
7. **Line limits:** `spec.md` ≤500, feature `README.md` ≤250, `app-summary.md` ≤250. Overflow → extract into `details/` subfolder.

## Workflow

Specs are produced by the 4-phase workflow defined in `.global/guidelines/workflow-tdd-linear.md`:

1. **Grill** (architect interviews user) → decisions recorded in business spec Appendix.
2. **Spec** (architect writes) → business/ui/technical specs created.
3. **PO slicing** (`@po-agent`) → gap audit (`gaps.md`) + Linear epic + tasks created.
4. **TDD** (developer subagents) → implement from specs, verified by reviewers.
