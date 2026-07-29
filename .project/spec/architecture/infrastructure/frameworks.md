# Frameworks & Tech Stack

> **Status:** Final
> **Scope:** Cross-cutting infrastructure spec

## Stack Pin

| Layer | Technology | Version | Rationale |
| :--- | :--- | :--- | :--- |
| Runtime | Bun | latest | Monorepo workspace manager, test runner, script executor |
| Mobile | React Native | 0.74 (bare) | Not Expo — direct native module control for op-sqlite |
| State | Jotai | latest | Atomic state management, AsyncStorage persistence |
| DB | op-sqlite | latest | Fastest SQLite for React Native |
| ORM | Drizzle | latest | Type-safe SQL, push-based dev migrations |
| UI | React Native Paper | latest | Material Design components, theme system |
| Navigation | React Navigation | latest | Drawer + BottomTab stacks |
| i18n | i18next + react-i18next + react-native-localize | latest | Flat JSON locales, device detection |
| Tests | bun:test | latest | Canonical — NOT Jest |
| Lint/Format | Biome | latest | Per-package configs |
| Build | Turborepo | latest | Monorepo task orchestration |

## Architecture Principles

### Local-First
- SQLite on device is the **only** source of truth for MVP.
- No network dependency for any MVP feature.
- `isSynced` + `lastSyncedAt` audit columns on all tables for future sync.
- No backend, no cloud, no remote API until post-MVP.

### Shared Package — Single Source of Truth
- All Drizzle schema definitions live in `packages/shared/db/schema/`.
- All shared TypeScript types derive from Drizzle schemas.
- All seed/initial data lives in `packages/shared/db/initial-data.ts`.
- The mobile app imports types + schemas from `@focus-hub/shared`.

### Test-Driven Development (TDD)
- `bun:test` is canonical. Jest is banned.
- Tests written before implementation (Phase 4 Red→Green).
- Every feature component has a corresponding `.test.tsx` file.

### Privacy First
- All user data stays on device.
- `packages/security` (exists, content TBD) will provide PII scrubbing + local encryption for future sync.
- Never log or export raw credentials.

## Deferred Architecture (post-MVP)

| Component | Purpose | Status |
| :--- | :--- | :--- |
| Backend (`apps/service`) | Node.js data provider via MCP | Deferred |
| AI-Bridge (`apps/ai-bridge`) | Ollama/Gemini orchestrator with privacy router | Deferred |
| Sync Engine | Remote sync via backend | Deferred |
| `packages/security` | PII scrubbing + encryption | Exists, content TBD — [services/security.md](../services/security.md) |

## What Was Corrected (from legacy `docs/BusinessRules/context.md`)

- ~~TanStack Query~~ → not in stack (Jotai handles state)
- ~~Expo~~ → bare React Native 0.74
- ~~`shared/@types/`~~ → `packages/shared/db/schema/` (Drizzle schemas)
- ~~`skills-lock.json`~~ → removed (opencode agents replace this)
- ~~`docs/index.md` Master Index~~ → `.project/spec/app-summary.md`
