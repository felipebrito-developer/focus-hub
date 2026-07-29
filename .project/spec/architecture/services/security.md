# Security Package (Future)

> **Status:** Draft — needs discussion (Q12)
> **Scope:** Services spec — `packages/security` future feature

## Concept

`packages/security` exists in the monorepo but has no finalized spec. It will provide PII scrubbing and local data encryption for future sync/cloud features.

## Status

- Package directory exists: `packages/security/`
- Content TBD — needs architecture discussion
- NOT part of M0 Foundation
- Deferred to post-MVP or stretch goal

## Planned Capabilities

| Capability | Purpose | Priority |
| :--- | :--- | :--- |
| PII Scrubber | Remove names/IDs from strings before any cloud sync | Future |
| Local Encryption | Encrypt sensitive SQLite data at rest | Future |
| Credential Hashing | Hash local auth passwords (currently mocked plaintext) | Future — depends on [local-auth.md](local-auth.md) |

## Dependencies

- May depend on `react-native-keychain` or similar for secure storage.
- Coordinate with local auth — once security package provides hashing, local auth should adopt it.

## Open Questions

1. What PII fields need scrubbing? (user name, task titles, meaning names, journal entries?)
2. Encryption scope — entire DB or specific columns?
3. Key management — where does the encryption key live? (device keystore?)
4. Is this needed before sync engine, or can sync work with plaintext + transport encryption?
