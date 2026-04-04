<!--
Sync Impact Report:
- Version change: 0.0.0 → 1.0.0 (Initial Ratification)
- List of modified principles:
  - Added: I. Separation of Concerns
  - Added: II. Mock-First API Strategy
  - Added: III. The Editorial Vault Design Compliance
  - Added: IV. Security & Resource Ownership
  - Added: V. Component Reusability
- Added sections: Technology Constraints, Development Workflow & Testing
- Removed sections: N/A
- Templates requiring updates: 
  - .specify/templates/plan-template.md (⚠ pending)
  - .specify/templates/spec-template.md (⚠ pending)
  - .specify/templates/tasks-template.md (⚠ pending)
- Follow-up TODOs: None.
-->

# Money Management App Constitution

## Core Principles

### I. Separation of Concerns
The application MUST strictly separate the React frontend from the Spring Boot backend. The frontend MUST utilize a layered architecture where UI components interact with an abstracted service layer, keeping UI state (Zustand) and server state (TanStack Query) distinctly separate.

### II. Mock-First API Strategy
All functional features MUST initially implement mock service layers returning static or localStorage-backed data. The integration with real REST APIs later MUST require zero component-level changes. Any API interactions MUST be routed through the service registry (`services/index.ts`).

### III. The Editorial Vault Design Compliance
All UI components MUST adhere strictly to "The Editorial Vault" design system. This includes light-mode only backgrounds (`#fbf9f8`), maximum radius borders (`9999px`), specific typography choices (Manrope/Inter), and the absence of hard borders in favor of diffused ambient shadows.

### IV. Security & Resource Ownership
Data protection and user isolation is non-negotiable. The frontend MUST implement JWT interceptors and rigorous client-side validation using Zod. All resources (wallets, transactions, budgets) MUST be logically bound to the authenticated user's scope.

### V. Component Reusability
Prioritize reusable UI blocks. Core design primitives (Buttons, Inputs, Modals, Data Tables) MUST be established early and consumed consistently throughout the application. One-off inline styles or bespoke CSS overriding the global custom properties are strictly prohibited.

## Technology Constraints

- **Core Stack**: React 19, TypeScript, Vite 8, React Router v7.
- **State Management**: TanStack Query v5 for server state, Zustand v5 (`persist`) for local client state.
- **Forms**: React Hook Form v7 coupled with Zod schemas.
- **Styling**: Vanilla CSS with custom properties mapping to Editorial Vault tokens. Tailwind or Material UI are avoided to favor custom CSS properties defined in `styles/tokens.css`.
- **MVP Scope Constraints**: Focus strictly on Core Features (Auth, Dashboard, Wallets, Transactions, Budgets, Goals, Reminders, Reports). Out-of-scope features (Bank sync, AI insights) MUST NOT introduce architectural bloat or be developed during the MVP phase.

## Development Workflow & Testing

- **Phase-Driven Rollout**: Features MUST be developed according to the phases outlined in `docs/implementation_plan.md` (Foundation → Core CRUD → Polish).
- **Quality Gates**: All code MUST pass `npm run build` and `npm run lint` without errors. Vitest MUST validate Zustand stores and Zod schemas.
- **Visual Verification**: Every new screen MUST be visually validated against Stitch's source-of-truth reference mockups across mobile (375px) to desktop (1440px) breakpoints.

## Governance

- This Constitution supersedes all other documentation and practices.
- Amendments to the technology stack or MVP scope MUST be approved, documented here, and synchronously updated in `docs/technical-spec.md` and `docs/implementation_plan.md`.
- **Version Bumping Policy**: Major versions for architectural shifts or new modules, Minor for new guidelines, Patch for phrasing refinements.
- **Compliance**: All PRs and code reviews MUST verify compliance against these principles.

**Version**: 1.0.0 | **Ratified**: 2026-04-03 | **Last Amended**: 2026-04-03
