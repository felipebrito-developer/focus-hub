# Local Auth

> **Status:** Final
> **Linear Epic:** FEL-48
> **Milestone:** M0
> **Layer:** Foundation
> **Code Folder:** `src/features/auth/`

## Concept

Mocked local authentication (user + password). Welcome, Login, Register screens. Single-user device. Session persistence via SQLite.

## Scope

**IN:**
- Welcome screen (entry — detects first launch vs returning user)
- Register screen (mandatory first launch, no skip)
- Login screen (re-entry if session cleared)
- SQLite `user` table for credential storage (password plain, mocked)
- Session flag in SQLite (`session_active` column)
- Auto-login on returning launch
- Post-login navigation to Focus module (drawer shell)

**OUT:**
- Password hashing/encryption (deferred to `packages/security`)
- Multi-account support
- Password recovery
- Demo/guest mode
- Biometric auth (future)
- Any network/remote auth

## Specs

| Spec | Description | Path |
| :--- | :--- | :--- |
| Technical | Auth flow, data model, session logic | [architecture/services/local-auth.md](../../architecture/services/local-auth.md) |

## Key Decisions

- **Credential storage:** SQLite `user` table (Drizzle schema). Password plain (mocked, no hash for MVP). Session flag in SQLite, not AsyncStorage (single source of truth).
- **Login gate:** Full gate. No demo/guest mode. Reduces decision friction (neuro-inclusive). Personal data model requires user context.
- **Register mandatory:** Yes, on first launch. No skip button. Welcome detects no user → forces Register. Subsequent launches auto-login via persisted session flag.
