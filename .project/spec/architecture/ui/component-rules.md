# Component Rules & Reuse Workflow

> **Status:** Final
> **Scope:** Cross-cutting UI spec — atomic design, component reuse, structural mandates

## 1. Architectural Mandates

1. **Atomic Separation:** Components MUST NOT be defined locally within Screen files unless absolutely non-reusable. All standard components reside in `components/atoms`, `components/molecules`, or `components/organisms`.
2. **Feature Locality:** Shared components go to `src/components/`. Feature-specific components live in their feature directory (e.g., `src/features/focus/components/`).
3. **No Native `any`:** Use `AnyType` from `@focus-hub/shared` as the escape hatch if strictly necessary.
4. **TDD First:** Every feature component has a corresponding `.test.tsx` file using `bun:test`. NOT Jest.
5. **Biome Enforcement:** All changes MUST pass `bun biome check --write .`.

## 2. Component Reuse Workflow

### Phase A: Discovery (mandatory)
Before creating any new UI component in `apps/mobile/`:
- Search `apps/mobile/src/components/` (atoms, molecules, organisms).
- Search the specific feature's `components/` folder.
- Check the [component registry](component-registry.md) for existing patterns.

### Phase B: Decision Logic
- **Reuse:** If a suitable component exists, extend or compose it.
- **Refactor:** If an existing component is 80% there, refactor it to be more generic rather than duplicating.
- **Create:** Only create a new component if no existing pattern satisfies neuro-UI requirements or atomic structure.

### Phase C: Documentation
If a new shared component is created:
- Export it in the relevant `index.ts`.
- Add it to [component-registry.md](component-registry.md).
- Ensure it has a `.test.tsx` file.

## 3. Clinical Guardrails

- **Rule of One:** Each modal has one clearly high-contrast "Confirm" button.
- **Time-Blindness:** Frequencies must clearly state next occurrence (e.g., "Daily — Happens Every Day").
- **Cognitive Load:** Max 3-4 bottom tabs per module. No more.

## What Was Corrected (from legacy `docs/UI/mobile-component-rules.md`)

- ~~"bun:test or Jest"~~ → `bun:test` only (canonical)
