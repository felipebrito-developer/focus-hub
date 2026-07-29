# Local Auth (Mocked)

> **Status:** Draft
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

- User credentials stored locally in SQLite (mocked — no hashing/encryption for MVP).
- Login persists across app restarts (AsyncStorage session token or flag).
- No password recovery flow (local-only, user re-registers if forgotten).
- Single-user device (no multi-account for MVP).

## Scope

**IN:**
- Welcome → Login → Register flow
- Local credential storage in SQLite
- Session persistence (stay logged in across restarts)
- Theme/integration with drawer (post-login navigates to Focus module)

**OUT:**
- Password hashing/encryption (deferred to `packages/security`)
- Multi-account support
- Password recovery
- Biometric auth (future)
- Any network/remote auth

## Open Questions (needs grill)

1. Where are credentials stored? New `user` table in schema? Or in AsyncStorage?
2. Does login gate the entire app, or can users skip to a demo mode?
3. Is the register flow mandatory on first launch, or optional?
