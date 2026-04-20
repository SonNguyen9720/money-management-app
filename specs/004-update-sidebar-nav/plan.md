# Implementation Plan: Update Sidebar Navigation

**Branch**: `004-update-sidebar-nav` | **Date**: 2026-04-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-update-sidebar-nav/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

This feature replaces the existing top navigation bar with a persistent left-hand sidebar navigation menu for desktop users. The UI must strictly match the "Overview dashboard" design from the "Wallet management" project in Google Stitch, adhering to "The Editorial Vault" design system.

## Technical Context

**Language/Version**: TypeScript / React 19  
**Primary Dependencies**: React Router v7, Vite 8  
**Storage**: N/A (UI layout feature only)  
**Testing**: Vitest, React Testing Library  
**Target Platform**: Web (Desktop & Mobile viewports)
**Project Type**: web-application  
**Performance Goals**: Instant route switching without full page reloads  
**Constraints**: Must use existing `styles/tokens.css`, no Tailwind or Material UI  
**Scale/Scope**: Impacts all authenticated routes via the main layout component

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Separation of Concerns**: Changes isolated to UI components (`AppLayout`, `Sidebar`).
- [x] **Mock-First API Strategy**: N/A (no API integration).
- [x] **The Editorial Vault Design Compliance**: Strictly follows tokens (`#fbf9f8` background, `9999px` radii, specific typography).
- [x] **Security & Resource Ownership**: Maintains existing JWT routing constraints.
- [x] **Component Reusability**: Introduces a reusable `Sidebar` and mobile fallback navigation component.

## Project Structure

### Documentation (this feature)

```text
specs/004-update-sidebar-nav/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
├── styles/
│   └── tokens.css
```

**Structure Decision**: Single React SPA project structure. The `AppLayout.tsx` will be modified to include the new `Sidebar` component instead of a top navigation bar.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*(No violations - blank)*
