# Specification: Milestone 0 — Foundation

> **Status:** Final (Phase 3 complete — Epic FEL-33 + tasks FEL-34–FEL-47 created in Linear under Milestone `0. Base Structure`).
> **Source docs:** `docs/Roadmaps/mobile-app.md` (Milestone 0), `docs/UI/ui-structure.md`, `docs/Structure/db-structure.md`, `docs/UI/ui-principles.md`.
> **Stack pin:** React Native 0.74 (bare) + Jotai + op-sqlite + Drizzle + React Native Paper + bun:test. See `opencode.md`.
> **Grill decisions:** 10 resolved — see Appendix A.

---

## Part A: Business & Product Rationale (WHY)

### Problem Statement

The mobile app has substantial scaffolding (11 Drizzle schema files, seed data, theme, auth screens, Jotai atoms) but is **not bootable into a working development loop**. Critical gaps block all downstream milestone work:

1. **Broken package wiring** — `packages/shared` is named `@liverubber/shared` but `apps/mobile` references `@focus-hub/shared`. Workspace resolution is broken; no shared code reaches the app.
2. **No DB connectivity** — `db/index.ts` has the schema import commented out. No `drizzle.config.ts`. No migrations. The 11 schema files are dead code.
3. **Dead app entry** — `App.tsx` renders a template "Focus Hub" placeholder. No navigation shell, no drawer, no tabs.
4. **No test infrastructure** — `jest.config.js` + jest deps present but zero tests. bun:test (the canonical stack) not wired.
5. **No lint/format** — no Biome config. No lint scripts.
6. **No i18n** — all UI strings hardcoded. pt-br + en-us not supported.
7. **Single hardcoded theme** — warm dark minimalist theme exists but is not switchable. No theme registry. No persistence.
8. **Missing nav libraries** — only `native-stack` installed. Drawer + bottom-tabs (required by `ui-structure.md`) not installed.

### Goal

Make the app **bootable, navigable, testable, and lintable** — with DB connected, shared package wired, i18n + multi-theme system in place. This is the foundation every subsequent milestone builds on. No feature screens; no routes beyond placeholder screens.

### Target Persona & User Journey

**Persona:** the developer (this milestone is internal infrastructure). The end-user sees nothing visible beyond a working drawer + 4 empty tab stacks + settings screen with theme toggle.

**Journey:**
1. Developer runs `bun install` → workspace resolves `@focus-hub/shared`.
2. Developer runs `bun test` → bun:test executes (no jest).
3. Developer runs `bun run lint` → Biome checks both packages.
4. Developer runs `bun run db:push` → Drizzle pushes schema to local SQLite.
5. Developer runs `bun run seed` → dev seed script populates local DB.
6. Developer runs `bun run ios` / `bun run android` → app boots → drawer with profile card + 4 module entries + settings → each module shows a BottomTab navigator with placeholder screens → settings screen has theme toggle (light/dark/warm-dark) persisted across restarts → UI strings render in detected locale (en-us default, pt-br fallback via `react-native-localize`).
7. First app launch (end-user) → DB initializes → if empty, first-launch bootstrap seeds default content (categories, default tags, default settings).

### Success Metrics

- **Boot reliability:** app launches without crash on iOS + Android. DB initializes < 500ms.
- **Workspace resolution:** `import { ... } from '@focus-hub/shared/db/schema'` resolves in mobile app. Zero `module not found` errors.
- **Test runner:** `bun test` exits 0 with at least one smoke test passing. `jest.config.js` deleted. No jest deps in any `package.json`.
- **Lint:** `bun run lint` exits 0 across both `apps/mobile` and `packages/shared`.
- **DB push:** `bun run db:push` applies all 11 schema files to a local SQLite file. Tables queryable.
- **Seed:** `bun run seed` populates DB from `initial-data.ts`. `bun run seed:reset` wipes + re-seeds.
- **Navigation:** drawer opens, navigates to all 4 stacks + settings. BottomTab renders in each stack.
- **i18n:** changing device locale to `pt-BR` renders Portuguese strings. Default fallback `en-US`.
- **Theme:** toggling theme in settings persists to AsyncStorage. Relaunching app restores selected theme.

### Scope & Non-Goals

**IN scope (M0):**
- Fix `@liverubber/shared` → `@focus-hub/shared` package name.
- Wire `@focus-hub/shared` as `workspace:*` dependency in mobile (already referenced but broken due to name mismatch).
- `drizzle.config.ts` in `packages/shared` — config for op-sqlite dialect, schema glob, push-based (no migration files).
- Wire schema import in `apps/mobile/src/db/index.ts` — uncomment + connect to shared schema.
- `db:push` script — `drizzle-kit push` targeting local SQLite file.
- Dev seed script — `bun run seed` CLI script in `packages/shared` or `apps/mobile` (reads `initial-data.ts`, inserts via Drizzle).
- `seed:reset` script — wipes all tables + re-seeds.
- First-launch bootstrap — app checks if DB is empty on first launch, seeds default content if so.
- Delete `jest.config.js`, remove jest deps, add `@types/bun`, set test script to `"bun test"`, create `tests/` dir with smoke test.
- Per-package `biome.json` in `apps/mobile` and `packages/shared`. Lint + format scripts in each `package.json`.
- Install `@react-navigation/drawer` + `@react-navigation/bottom-tabs`.
- Drawer navigator with profile card header + 4 module entries (Focus, Goals, Store, Fitness) + Settings.
- 4 BottomTab navigators (one per module stack), each with placeholder screens matching `ui-structure.md` tabs.
- Settings screen with theme toggle (light, dark, warm-dark).
- i18n setup: `i18next` + `react-i18next` + `react-native-localize`. Flat JSON locale files (`locales/en-us.json`, `locales/pt-br.json`). Default `en-us`, fallback `en-us`, detection via `react-native-localize`.
- Multi-theme system: Paper theme switching via Jotai + AsyncStorage. Registry of named themes (light, dark, warm-dark). Existing warm-dark theme refactored into registry entry.
- Root `App.tsx` rewritten: JotaiProvider → PaperProvider (dynamic theme) → NavigationContainer → DrawerNavigator.

**OUT of scope (deferred):**
- Feature screens (any module content beyond placeholder).
- Route definitions inside stacks (just placeholder "Coming Soon" screens).
- Expo Router / Solito migration.
- Drizzle migration files (`drizzle-kit generate:migration`). Deferred to pre-deploy. Using `push` for dev.
- Sync engine, backend, AI-bridge.
- User profile form (name, age, avatar) — deferred to M1 Settings epic.
- App version footer — cosmetic, deferred.
- CI pipeline setup.

---

## Part B: Technical Architecture & Contracts (HOW)

### System Boundaries

- **Package layer:** `packages/shared` — owns all Drizzle schemas, Zod schemas, entity types, seed data, `drizzle.config.ts`, seed scripts. Exported as `@focus-hub/shared`.
- **App layer:** `apps/mobile` — owns navigation, theme registry, i18n, Jotai state, DB initialization (calls shared schema).
- **DB layer:** `apps/mobile/src/db/index.ts` — op-sqlite connection + Drizzle initialization with schema from `@focus-hub/shared/db/schema`. `initDb()` runs on app launch: opens connection, ensures schema is pushed, runs first-launch bootstrap if DB is empty.
- **State layer:** `apps/mobile/src/store/` — Jotai atoms. `themeAtom` (persisted to AsyncStorage via `jotai-async-storage` or custom atomWithStorage). `localeAtom` (persisted). Existing `appReadyAtom` + `userPreferencesAtom` refactored.
- **Theme layer:** `apps/mobile/src/theme/` — registry pattern: `themes/` directory with one file per named theme (light.ts, dark.ts, warm-dark.ts). `themeRegistry.ts` exports `{ name: MD3Theme }` map. Existing `theme/index.ts` warm-dark palette refactored into `themes/warm-dark.ts`.
- **i18n layer:** `apps/mobile/src/i18n/` — `config.ts` (i18next init with react-native-localize detection), `locales/en-us.json`, `locales/pt-br.json`.
- **Nav layer:** `apps/mobile/src/features/` — feature-based structure per `docs/UI/ui-structure.md`. `drawer/DrawerNavigator.tsx` (root), `focus/FocusStack.tsx`, `goals/GoalsStack.tsx`, `store/StoreStack.tsx`, `fitness/FitnessStack.tsx` (BottomTab navigators), `settings/SettingsScreen.tsx`. Each feature folder will grow its own `components/`, `screens/`, `state/` subfolders in later milestones.
- **UI conformance:** all screens + components conform to `docs/UI/ui-principles.md` (pure-black/white ban, 60-30-10 palette, flat bento, ≤4 tabs). Verified by `@design-reviewer` at review gate.
- **No backend / no network.** Local-first. `isSynced` + `lastSyncedAt` columns carried on all tables (already in schema) but unset.

### Component Contracts

#### 1. Package Fix — `packages/shared/package.json`

```json
{
  "name": "@focus-hub/shared",
  ...
  "exports": {
    ".": "./index.ts",
    "./@types/*": "./@types/*",
    "./db/schema": "./db/schema/index.ts",
    "./db/initial-data": "./db/initial-data.ts"
  }
}
```

`apps/mobile/package.json` already has `"@focus-hub/shared": "workspace:*"` — name fix resolves the break.

#### 2. Drizzle Config — `packages/shared/drizzle.config.ts`

```ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema/index.ts',
  out: './drizzle',          // push artifacts (not migrations)
  dialect: 'sqlite',
  dbCredentials: {
    url: ':memory:',         // push target for CLI; app uses op-sqlite at runtime
  },
});
```

Scripts in `packages/shared/package.json`:
```json
{
  "db:push": "drizzle-kit push",
  "db:studio": "drizzle-kit studio"
}
```

#### 3. DB Init — `apps/mobile/src/db/index.ts`

```ts
import { drizzle } from 'drizzle-orm/op-sqlite';
import { open } from '@op-engineering/op-sqlite';
import * as schema from '@focus-hub/shared/db/schema';
import { seedIfEmpty } from './bootstrap';

export const sqliteDb = open({ name: 'focus-hub.sqlite', location: 'default' });
export const db = drizzle(sqliteDb, { schema });

export const initDb = async () => {
  sqliteDb.execute('PRAGMA foreign_keys = ON');
  await seedIfEmpty(db);  // first-launch bootstrap
};
```

#### 4. Seed Scripts — `packages/shared/db/seed.ts`

- `seed(db)`: inserts all rows from `initial-data.ts` into respective tables. Idempotent (uses `INSERT OR IGNORE`).
- `seedReset(db)`: `DELETE FROM` all tables in reverse dependency order, then `seed(db)`.
- Exported for both CLI use (`bun run seed`) and in-app bootstrap (`seedIfEmpty` checks row count, calls `seed` if 0).

Scripts in `apps/mobile/package.json`:
```json
{
  "db:push": "drizzle-kit push --config ../../packages/shared/drizzle.config.ts",
  "seed": "bun ../../packages/shared/db/seed.ts",
  "seed:reset": "bun ../../packages/shared/db/seed.ts --reset"
}
```

#### 5. Test Infrastructure

**Delete:** `apps/mobile/jest.config.js`.
**Remove from devDeps:** `jest`, `babel-jest`, `react-test-renderer`, `@types/react-test-renderer`, `eslint`, `@react-native/eslint-config`, `prettier` (replaced by Biome).
**Add to devDeps:** `@types/bun`.
**Script:** `"test": "bun test"`.
**Dir:** `apps/mobile/tests/` with `smoke.test.ts` (asserts `1+1===2` + imports a shared type to verify workspace resolution).

`packages/shared` already has `@types/bun` — no change needed there.

#### 6. Biome Config — per-package

`apps/mobile/biome.json`:
```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "organizeImports": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": { "recommended": true }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "lineWidth": 100
  },
  "javascript": {
    "formatter": { "quoteStyle": "single", "semicolons": "asNeeded" }
  }
}
```

`packages/shared/biome.json`: same structure (may diverge later for non-JS files).

Scripts (both packages):
```json
{
  "lint": "biome check .",
  "format": "biome format --write ."
}
```

`@biomejs/biome` as devDependency in both packages.

#### 7. Navigation — `apps/mobile/src/navigation/`

**`features/drawer/DrawerNavigator.tsx`:**
- `createDrawerNavigator()`.
- Drawer items: Focus, Goals, Store, Fitness, Settings.
- Header: profile card (placeholder avatar + "Guest" — no profile form in M0).
- Each module item → respective BottomTab stack.
- Settings item → `SettingsScreen`.

**`features/focus/FocusStack.tsx`** (and `features/goals/GoalsStack.tsx`, `features/store/StoreStack.tsx`, `features/fitness/FitnessStack.tsx` — identical pattern):
- `createBottomTabNavigator()`.
- Tabs per `ui-structure.md`: Focus module = Progress, Now, Action Hub (3 tabs). Other modules = placeholder tabs (1-2 tabs, "Coming Soon" screen).
- Each tab renders a `PlaceholderScreen` with module name + tab name (i18n-translated).

**`features/settings/SettingsScreen.tsx`:**
- Theme toggle: segmented control or radio list — Light / Dark / Warm Dark.
- Writes to `themeAtom` → persisted to AsyncStorage.
- Language selector: en-us / pt-br (overrides auto-detection, persisted to `localeAtom`).

#### 8. i18n — `apps/mobile/src/i18n/`

**`config.ts`:**
```ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localize from 'react-native-localize';
import enUs from './locales/en-us.json';
import ptBr from './locales/pt-br.json';

const resources = { 'en-us': { translation: enUs }, 'pt-br': { translation: ptBr } };
const fallback = 'en-us';
const detected = Localize.findBestAvailableLanguage(Object.keys(resources))?.languageTag || fallback;

i18n.use(initReactI18next).init({
  resources,
  lng: detected,
  fallbackLng: fallback,
  interpolation: { escapeValue: false },
});

export default i18n;
```

**Locale files:** flat JSON. Keys namespaced by screen/feature:
```json
{
  "nav.focus": "Focus",
  "nav.goals": "Goals",
  "nav.store": "Store",
  "nav.fitness": "Fitness",
  "nav.settings": "Settings",
  "settings.theme": "Theme",
  "settings.theme.light": "Light",
  "settings.theme.dark": "Dark",
  "settings.theme.warmDark": "Warm Dark",
  "settings.language": "Language",
  "placeholder.comingSoon": "Coming Soon"
}
```

#### 9. Multi-Theme System — `apps/mobile/src/theme/`

**`themes/warm-dark.ts`:** existing palette from `theme/index.ts` refactored into a named export.
**`themes/dark.ts`:** standard MD3DarkTheme with minor tweaks (no pure black — use `#121212`).
**`themes/light.ts`:** standard MD3LightTheme with warm tint (background `#FAF9F7`, not pure white).

**`themeRegistry.ts`:**
```ts
import type { MD3Theme } from 'react-native-paper';
import { warmDark } from './themes/warm-dark';
import { dark } from './themes/dark';
import { light } from './themes/light';

export type ThemeName = 'warm-dark' | 'dark' | 'light';
export const themeRegistry: Record<ThemeName, MD3Theme> = {
  'warm-dark': warmDark,
  'dark': dark,
  'light': light,
};
export const defaultTheme: ThemeName = 'warm-dark';
```

**`store/theme.ts`:**
```ts
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { themeRegistry, defaultTheme, type ThemeName } from '../theme/themeRegistry';

export const themeNameAtom = atomWithStorage<ThemeName>('theme-name', defaultTheme);
export const themeAtom = atom((get) => {
  const name = get(themeNameAtom);
  return themeRegistry[name];
});
```

App reads `themeAtom` and passes to `PaperProvider`. Changing `themeNameAtom` triggers re-render. Persisted via AsyncStorage (atomWithStorage).

#### 10. Root `App.tsx` — rewritten

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { Provider as JotaiProvider } from 'jotai';
import { useAtomValue } from 'jotai';
import { themeAtom } from './store/theme';
import { initDb } from './db';
import { DrawerNavigator } from './features/drawer/DrawerNavigator';
import './i18n/config';
import { useEffect } from 'react';

export default function App() {
  const theme = useAtomValue(themeAtom);
  useEffect(() => { initDb(); }, []);
  return (
    <JotaiProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    </JotaiProvider>
  );
}
```

### Dependency Changes Summary

| Package | Add | Remove |
| :--- | :--- | :--- |
| `apps/mobile` deps | `@react-navigation/drawer`, `@react-navigation/bottom-tabs`, `i18next`, `react-i18next`, `react-native-localize`, `jotai` (already) | — |
| `apps/mobile` devDeps | `@types/bun`, `@biomejs/biome` | `jest`, `babel-jest`, `react-test-renderer`, `@types/react-test-renderer`, `eslint`, `@react-native/eslint-config`, `prettier` |
| `packages/shared` devDeps | `@biomejs/biome` | — |
| `packages/shared` name | `@focus-hub/shared` (rename) | `@liverubber/shared` |

### Failure Modes & Edge Handling

| Failure | Handling |
| :--- | :--- |
| **DB push fails (schema mismatch)** | `drizzle-kit push` logs the conflicting table. Developer resolves before app launch. App-side `initDb` catches + logs; app still boots (DB features degrade gracefully). |
| **First-launch bootstrap fails (seed insert error)** | `seedIfEmpty` catches, logs abstractly (no PII). App boots without seed data. User sees empty states (acceptable for M0). |
| **AsyncStorage read fails (theme/locale)** | `atomWithStorage` falls back to default value (`warm-dark` / `en-us`). App boots with defaults. |
| **Device locale not in resources** | `react-native-localize` returns `undefined` → fallback to `en-us`. |
| **Drawer/tab navigation crash** | React Navigation error boundaries catch. Placeholder screens have no logic, so crash risk is near-zero. |
| **Workspace resolution fails after rename** | `bun install` at root re-links. Verified by smoke test importing from `@focus-hub/shared`. |

### Test Strategy (Phase 4 input)

- **Unit (test-creator, `bun:test`):**
  - Smoke test: `1+1===2` + import from `@focus-hub/shared` resolves.
  - Theme registry: all 3 themes exist, `defaultTheme` = `'warm-dark'`.
  - Seed logic: `seedIfEmpty` calls `seed` when row count = 0, skips when > 0 (mock db).
  - i18n: `i18n.t('nav.focus')` returns string for both locales.
- **Integration:**
  - `db:push` applies schema → tables queryable (in-memory SQLite test).
  - `seedReset` wipes + re-seeds → row counts match expected.
- **Component (`*.test.tsx`):**
  - `SettingsScreen` renders 3 theme options; tapping one updates `themeNameAtom`.
  - `DrawerNavigator` renders 5 drawer items.
- **Manual QA:**
  - App boots on iOS simulator + Android emulator.
  - Drawer navigates to all 4 stacks + settings.
  - BottomTabs render in each stack.
  - Theme toggle persists across app restart.
  - Language change reflects immediately in UI.

### Exit Criteria

1. `bun install` → workspace resolves, no errors.
2. `bun test` → exits 0 (smoke test passes).
3. `bun run lint` → exits 0 (both packages).
4. `bun run db:push` → schema applied to local SQLite.
5. `bun run seed` → DB populated from `initial-data.ts`.
6. `bun run seed:reset` → DB wiped + re-seeded.
7. App launches → drawer + 4 stacks + settings navigable.
8. Theme toggle persists across restarts.
9. i18n renders in detected locale (pt-br or en-us).
10. First-launch bootstrap seeds DB if empty.

---

## Appendix A: Grill Decisions (Phase 1)

1. **Scope (Q1):** wire+fix + base infra (drizzle.config, migration, seed, biome, bun:test) + base nav structure (no routes) + i18n + multi-theme system base. Reason: everything downstream depends on a bootable, testable app.
2. **i18n library (Q2):** `i18next` + `react-i18next` + `react-native-localize`. Reason: de facto RN i18n stack, large ecosystem, lazy-loadable namespaces.
3. **Theme system (Q3):** Paper theme switching via Jotai + AsyncStorage, registry of named themes. Reason: leverages existing Paper + Jotai infra, simple, persistent, extensible.
4. **Navigation libraries (Q4):** add `@react-navigation/drawer` + `@react-navigation/bottom-tabs`. Reason: completes existing react-navigation setup, matches `ui-structure.md` exactly, no migration.
5. **Drizzle config (Q5):** `drizzle-kit push` for dev. Migration files deferred to pre-deploy. Reason: no deploy target yet, push is simpler for active dev. Noted as future debt.
6. **Seed strategy (Q6):** dev-only seed script + first-launch bootstrap. Reason: dev script for development loop, bootstrap for end-user default content (categories, tags, settings).
7. **bun:test migration (Q7):** clean break — delete jest, add `@types/bun`, `"bun test"`. Reason: zero existing tests = zero migration cost. Clean slate prevents debt.
8. **Biome (Q8):** per-package `biome.json`. Reason: future packages may have different languages/rules. Granular overrides.
9. **i18n locale files (Q9):** flat JSON per locale, default `en-us`, fallback `en-us`, detection via `react-native-localize`. Reason: simple for MVP, can namespace later if scale demands.
10. **Package name fix (Q10):** rename `@liverubber/shared` → `@focus-hub/shared`, wire `workspace:*`. Reason: it's a bug, not a feature decision. Fix now so M1 imports work.

---

## Appendix B: Pre-existing Assets (what already exists and is reused)

| Asset | Location | Status |
| :--- | :--- | :--- |
| 11 Drizzle schema files | `packages/shared/db/schema/*.ts` | ✅ Reused as-is. Wired via `drizzle.config.ts`. |
| Seed data (926 lines) | `packages/shared/db/initial-data.ts` | ✅ Reused. Consumed by seed script + bootstrap. |
| Entity types | `packages/shared/@types/` | ✅ Reused. |
| Warm dark theme palette | `apps/mobile/src/theme/index.ts` | ♻️ Refactored into `themes/warm-dark.ts`. |
| Jotai atoms | `apps/mobile/src/store/index.ts` | ♻️ Refactored. `appReadyAtom` kept, `userPreferencesAtom` split into `themeNameAtom` + `localeAtom`. |
| op-sqlite + Drizzle init | `apps/mobile/src/db/index.ts` | ♻️ Refactored. Schema import uncommented, bootstrap added. |
| `@focus-hub/shared: workspace:*` dep | `apps/mobile/package.json` line 15 | ✅ Already referenced. Name fix in shared makes it resolve. |
