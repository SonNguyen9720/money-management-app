# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implementation of the Core MVP Features (Authentication, Wallets, Transactions, Budgets, Goals, Reminders, Reports) using a local mock service layer. This will lay the frontend foundation before integrating a real backend, adhering to strict design guidelines and data structures.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript, React 19  
**Primary Dependencies**: Vite 8, React Router v7, Zustand v5, TanStack Query v5, Zod, React Hook Form v7  
**Storage**: localStorage Mock Database  
**Testing**: Vitest  
**Target Platform**: Web Browser (Desktop down to 375px Mobile)
**Project Type**: Single Page Application (SPA)  
**Performance Goals**: < 2s load time for 5000 transactions, fast data entry  
**Constraints**: Mock-First Backend, specific Editorial Vault design compliance  
**Scale/Scope**: Single User MVP with core CRUD and Dashboard reporting

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Separation of Concerns**: Frontend UI clearly separated from the abstracted `services` layer. Use `Zustand` (UI state) and `TanStack Query` (Server state state).
- [x] **II. Mock-First API Strategy**: Implemented local storage wrapper to simulate REST services. Data models defined.
- [x] **III. The Editorial Vault Design Compliance**: Documented style constraints mapped (`tokens.css`). No inline styles allowed.
- [x] **IV. Security & Resource Ownership**: `userId` is firmly present on ALL resource models to enforce ownership isolation.
- [x] **V. Component Reusability**: Primitive components must be established immediately instead of one-offs.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── components/          # Reusable Editorial Vault UI Components
│   ├── primitives/      # Buttons, Inputs, Cards
│   └── domain/          # TransactionList, WalletCard
├── pages/               # React Router layout and page components
│   ├── auth/
│   ├── dashboard/
│   ├── wallets/
│   ├── budgeting/
│   └── reports/
├── services/            # Mock Backend Service Registry (mock-first strategy)
├── store/               # Zustand hooks (e.g., authStore.ts, preferencesStore.ts)
├── styles/              # Global CSS & tokens.css
└── utils/               # Helpers, formatters, schema validations
```

**Structure Decision**: Standard React/Vite domain-driven structure, strictly isolating UI components from the service/data layer via Zustand and TanStack Query.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None      | N/A        | N/A                                 |
