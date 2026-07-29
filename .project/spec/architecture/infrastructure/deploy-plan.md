# Deploy Plan

> **Status:** Stub — to be filled.
> **Scope:** Release pipeline, code signing, store submission (App Store + Play Store).

---

## Current State

No deploy target. App is in development (Milestone 0). Local-first, no backend. Deploy plan deferred until MVP features complete (post-Milestone 4).

## iOS App Store

(Fill with: provisioning, signing, TestFlight, submission checklist.)

## Google Play Store

(Fill with: signing, internal testing track, production rollout.)

## CI/CD Pipeline

(Fill with: GitHub Actions / local build script, EAS Build (if Expo migration), Fastlane, etc.)

## Pre-Deploy Checklist

Before first deploy, these MUST be completed:
- [ ] Migrate from `drizzle-kit push` to `drizzle-kit generate:migration` (versioned migrations shipped with app)
- [ ] Remove dev seed script from production build
- [ ] Configure first-launch bootstrap for production (default content only, no dev data)
- [ ] App icon + splash screen
- [ ] Store listing assets (screenshots, description, privacy policy)
- [ ] Minimum iOS / Android version tested
- [ ] Crash reporting integration (deferred from MVP — add before deploy)