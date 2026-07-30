# Local Auth (Mocked)

> **Status:** Final (grill resolved — 3 Qs answered. Integrated into [milestone-0-foundation.md](milestone-0-foundation.md) §11. Auth epic FEL-48+ pending PO slicing.)
> **Scope:** Services spec — local authentication for M0 Foundation
> **Milestone:** M0 (G1=A)

## Concept

FocusHub uses local-only authentication with mocked user credentials. No backend, no network. The login flow is a UX gate, not a security boundary.

## Current State

Code exists in `apps/mobile/src/features/auth/`:
- `WelcomeScreen.tsx` — entry point
- `LoginScreen.tsx` — user + password input
- `RegisterScreen.tsx` — create local user
- `__tests__/` — existing tests (need migration to bun:test)

## Requirements

- User credentials stored locally in SQLite — new `user` table (Drizzle schema). Password stored plain (mocked — no hashing/encryption for MVP).
- Login persists across app restarts via session flag in SQLite (single source of truth — no AsyncStorage split).
- App is fully gated: no demo/guest mode. First launch must register before accessing any feature.
- Register is mandatory on first launch. No skip button. Welcome screen detects no user in DB → forces Register flow.
- Subsequent launches auto-login via persisted session flag (no re-entry of credentials).
- No password recovery flow (local-only, user re-registers if forgotten — wipes local data).
- Single-user device (no multi-account for MVP).

## Scope

**IN:**
- Welcome → Register (first launch) or auto-login (returning user) flow
- Login screen (for re-entry if session cleared manually)
- Local credential storage in SQLite `user` table
- Session persistence via SQLite session flag (stay logged in across restarts)
- Post-login navigates to Focus module (drawer shell)
- Theme/integration with drawer

**OUT:**
- Password hashing/encryption (deferred to `packages/security`)
- Multi-account support
- Password recovery
- Demo/guest mode
- Biometric auth (future)
- Any network/remote auth

## Data Model

New `user` table (in `packages/shared/db/schema/`):

| Column | Type | Notes |
| :--- | :--- | :--- |
| `id` | text (PK) | UUID |
| `name` | text | Display name |
| `email` | text (unique) | Login identifier |
| `password` | text | Plain (mocked, no hash) |
| `age` | integer | User age |
| `session_active` | integer (bool) | Session flag — `true` = logged in |
| `created_at` | text | ISO timestamp |
| `updated_at` | text | ISO timestamp |
| `is_synced` | integer (bool) | Future sync (default false) |
| `last_synced_at` | text | Future sync |

Single-row table (single-user device). `email` unique constraint for safety.

## Flow

1. **First launch (no user in DB):** Welcome screen → Register (mandatory, no skip) → create user row + set `session_active=true` → navigate to Focus module.
2. **Returning user (user exists, `session_active=true`):** Welcome screen → auto-login → Focus module (skip Login screen).
3. **Session cleared (user exists, `session_active=false`):** Welcome screen → Login screen → validate credentials → set `session_active=true` → Focus module.

## Key Decisions (Grill)

- **Q1 — Credential storage:** SQLite `user` table. Consistent with local-first + all other data in Drizzle. Password plain (mocked). Session flag in SQLite, not AsyncStorage (single source of truth).
- **Q2 — Login gate:** Full gate. No demo/guest mode. Reduces decision friction (neuro-inclusive). Personal data model requires user context.
- **Q3 — Register mandatory:** Yes, on first launch. No skip button. Welcome detects no user → forces Register. Subsequent launches auto-login.
