# Future Architecture (Deferred)

> **Status:** Draft
> **Scope:** Services spec — deferred architecture for post-MVP

All items below are deferred until after the mobile MVP is complete. Local-first, no backend is the MVP constraint.

## Deferred Components

### 1. Backend (`apps/service`)
- **Purpose:** Node.js data provider via Model Context Protocol (MCP).
- **Scope:** Remote data sync, cross-device persistence, cloud backup.
- **Dependencies:** Sync engine, MCP server library.
- **Status:** Not started. Deferred to post-MVP.

### 2. AI-Bridge (`apps/ai-bridge`)
- **Purpose:** Orchestrator for routing local inference (Ollama) and cloud inference (Gemini).
- **Scope:** Privacy Router — maintains strict privacy boundaries between local and cloud inference.
- **Dependencies:** Backend (MCP server), Ollama local setup, Gemini API.
- **Status:** Not started. Depends on backend.

### 3. Sync Engine
- **Purpose:** Remote data synchronization using `isSynced` + `lastSyncedAt` audit columns already in schema.
- **Scope:** Bidirectional sync, conflict resolution, offline-first queue.
- **Dependencies:** Backend (remote endpoint).
- **Status:** Not started. All audit columns are already in schema — prepared for future sync.

### 4. MCP Server
- **Purpose:** Model Context Protocol server for AI tool integration.
- **Scope:** Expose Focus Hub data/models to AI assistants via standard protocol.
- **Dependencies:** Backend.
- **Status:** Not started.

## Architecture Diagram (future)

```
Mobile (apps/mobile)
  ↕ (sync engine)
Backend (apps/service)
  ├── MCP Server
  └── AI-Bridge (apps/ai-bridge)
       ├── Ollama (local inference)
       └── Gemini (cloud inference, privacy-gated)
```

## What Was Preserved (from legacy `docs/Roadmaps/global.md`)

Only the "Future Architecture" section was migrated. The rest of `global.md` (phases, completed items) was superseded by `roadmap/epics.md` + `roadmap/current-work.md`.
