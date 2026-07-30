# Housekeeping Queue (M0 tail)

> **Purpose:** Deferred tasks, cleanup, debt, Linear hygiene. Address at end of Milestone 0 (or when blocking).
> **Owner:** architect only. Append here, not in current-work.md.
> **Rule:** See `.project/guidelines/housekeeping-queue.md` §"When to add".

## Pending

### Linear Hygiene
- [x] Move FEL-40 → Done in Linear — 2026-07-29 (verified: name @focus-hub/shared, exports map, bun biome check . exit 0)
- [x] Move FEL-34 → Done in Linear — 2026-07-29 (verified: biome.json both pkgs, lint/format scripts, bun biome check . exit 0; schema 2.5.6 not 1.9.0 — installed version, acceptable deviation)
- [ ] Cancel FEL-19 (duplicate of FEL-40 — older pre-slice artifact)
- [ ] Cancel FEL-20 (duplicate of FEL-34 — older pre-slice artifact)
- [ ] Create FEL-56 retroactively: [Infra] turbo.json + root package.json scripts + biome 2.5.6 fix (document the root-orchestration slicing gap + inline fix done)

### Workspace Gaps (record in .global/roadmap/workflow-roadmap.md)
- [ ] Subagent intermittent empty-output: react-native-developer returned empty twice on FEL-40; code-reviewer returned empty once. Investigate cause (step limit? skill load hang?).
- [ ] Subagent misreported status: FEL-34 subagent claimed lint GREEN but 29 errors remained. Architect must independently verify every "GREEN" claim.
- [ ] Nested .git in apps/mobile (resolved by removing + merging to root). Pattern to check during project setup.

### Migration Debt
- [ ] packages/security still named @liverubber/security (out of FEL-40 scope). Rename when security spec finalized or earlier if blocking workspace resolution.
- [ ] drizzle-kit version mismatch: mobile ^0.20.14 vs shared ^0.31.x. Reconcile during FEL-37.
- [ ] apps/mobile test stack still jest (jest.config.js, babel-jest, react-test-renderer present). FEL-41 handles migration.
- [ ] apps/mobile eslint/prettier devDeps still in package.json (config files removed in FEL-34; deps removal deferred to FEL-41).

### Spec / Docs
- [ ] Commit + reconcile pre-existing spec/doc changes (.project/roadmap/epics.md, milestone-0-foundation.md, local-auth.md, auth README) — status: user committed separately (da89c2a). Verify content matches committed state.
- [ ] Remove docs/_deprecated/ folder once all content confirmed migrated + no references remain (spec-rules.md §6).

### Verification Debt
- [ ] Phase 4.5 review gate not formally run for FEL-34/FEL-40 (code-reviewer subagent empty). Infra tasks — acceptable risk, but note for audit.
