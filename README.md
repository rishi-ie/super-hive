# Mumbrane Desktop

A local-only desktop code editor for AI agents. No auth, no cloud, no accounts — just run it.

## Requirements

- [Bun](https://bun.sh/) v1.0+
- macOS (Windows/Linux untested)
- Git 2.20+

## Setup

```bash
# Install dependencies
bun install
```

## Dev

```bash
bun run dev
```

This starts the Electron desktop app in development mode with hot reload.

## Build

```bash
bun run build
```

Builds the production desktop app.

## Tech Stack

- Electron + React + TypeScript
- Bun + Turborepo
- TailwindCSS + shadcn/ui
- Drizzle ORM + SQLite (local)

## Project Structure

```
apps/desktop/          # Electron desktop app
packages/
  auth/               # Auth (stubbed for local-only)
  db/                 # Database schema (stubbed)
  local-db/           # Local SQLite database
  trpc/               # tRPC definitions
  ui/                 # Shared UI components
  shared/             # Shared utilities
```

## Notes

- This is a **local-only** build — no sign-in, no cloud sync, no analytics
- All data is stored locally in SQLite
- Git worktree-based development for AI agents
