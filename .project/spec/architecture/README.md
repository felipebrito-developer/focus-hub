# Architecture Specs

This folder contains cross-cutting technical architecture specs — decisions and conventions that apply to the entire project, not to a single feature. It is divided into three concerns: **infrastructure**, **ui**, and **services**.

## Root Files (cross-division)

| File | Status | Description |
| :--- | :--- | :--- |
| `product-layers.md` | ✅ Final | 4-layer conceptual model: Strategic / Structural / Operational / Logistical + gamification cross-layer |
| `milestone-0-foundation.md` | ✅ Final | M0 foundation: bootable app, DB wiring, test infra, nav shell, i18n, theme system, local auth |

## `infrastructure/` — Foundational Technical Specs

| File | Status | Description |
| :--- | :--- | :--- |
| `frameworks.md` | 🔲 Stub | Tech stack summary, version pins, selection rationale |
| `project-structure.md` | ✅ Final | Monorepo layout, package boundaries, import rules, folder conventions |
| `db-structure.md` | ✅ Final | DB schema, table entities, relationships, seeding patterns |
| `versioning.md` | 🔲 Stub | Semantic versioning policy, changelog format, release tagging |
| `deploy-plan.md` | 🔲 Stub | Release pipeline, code signing, store submission (App Store + Play Store) |

## `ui/` — UI/UX Architecture Specs

| File | Status | Description |
| :--- | :--- | :--- |
| `ui-principles.md` | ✅ Final | Neuro-inclusive design philosophy + clinical guardrails (ADHD constraints) |
| `ui-structure.md` | ✅ Final | Feature-based folder organization, navigation stack |
| `ui-screens.md` | ✅ Final | Visual breakdown of all application screens |
| `ui-modules.md` | ✅ Final | Navigation modules (Now, Mental Backlog, Body Care, Home Inventory) |
| `component-rules.md` | ✅ Final | Component reuse, atomic design, structure rules |
| `component-registry.md` | ✅ Final | Named component catalog |

## `services/` — Service-Layer Specs

| File | Status | Description |
| :--- | :--- | :--- |
| `local-auth.md` | 📝 Draft | M0 local mocked auth (G1=A). 3 open grill questions. |
| `security.md` | 📝 Draft | Encryption scope, key management, PII fields (future `packages/security`). 4 open grill questions. |
| `future-architecture.md` | ✅ Final | Deferred: Node backend, AI-bridge (Ollama/Gemini), MCP server, sync engine |

## Rules

- Only cross-cutting specs here. Feature-specific logic goes in `../features/<feature-name>/`.
- Each spec follows the dual structure: Part A (rationale/why) + Part B (contracts/how).
- Specs here may be referenced by feature specs (e.g. a feature's technical spec references `infrastructure/frameworks.md` for the DB ORM choice).
- Status markers: ✅ Final · 📝 Draft · 🔲 Stub.
