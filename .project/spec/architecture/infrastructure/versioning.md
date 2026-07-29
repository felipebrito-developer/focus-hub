# Versioning Rules

> **Status:** Stub — to be filled.
> **Scope:** Semantic versioning policy, changelog format, release tagging conventions.

---

## Semantic Versioning

This project follows [SemVer](https://semver.org/): `MAJOR.MINOR.PATCH`

- **MAJOR:** breaking change (API removal, schema breaking migration, nav structure overhaul)
- **MINOR:** new feature (new epic/feature shipped, backward-compatible)
- **PATCH:** bug fix, refactor, dependency bump (no behavior change)

### During Development (pre-1.0)

- Start at `0.1.0`.
- MINOR bumps for milestone completions.
- PATCH bumps for bug fixes within a milestone.
- No MAJOR bumps until 1.0 (everything is subject to change pre-1.0).

## Changelog Format

(Fill with: keepachangelog.com format? Per-milestone? Per-release?)

## Release Tagging

(Fill with: git tag format `v0.1.0`, annotation rules, etc.)

## Linear Integration

(Fill with: Linear cycles/releases usage, milestone → version mapping, etc.)