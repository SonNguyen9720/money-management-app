# Tasks: Update Dashboard Screen

**Input**: Design documents from `/specs/003-update-dashboard/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Verify and update `src/styles/tokens.css` to contain required "Editorial Vault" tokens (Manrope, Inter, box-shadow variables with 8px offset)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

*(No blocking setup since project foundation exists and this is purely a presentation layout change)*

---

## Phase 3: User Story 1 - View Updated Dashboard (Priority: P1) 🎯 MVP

**Goal**: Dashboard visually matches the premium "Wallet Management" design, maintaining an immersive high-end experience.

**Independent Test**: Can be fully tested by opening the dashboard and comparing it against the Stitch "Wallet Management" design.

### Implementation for User Story 1

- [x] T002 [US1] Update `src/pages/Dashboard.tsx` to remove any hard borders and structure the main layout to use asymmetrical spacing and `var(--md-sys-color-surface-container-low)` base color.
- [x] T003 [P] [US1] Update dashboard widget components in `src/components/dashboard/` to utilize `surface_container_lowest` backgrounds with elevated ambient shadows, avoiding hard borders.
- [x] T004 [P] [US1] Update typography for dashboard headers and balance summaries to explicitly use `Manrope` display tokens and `Inter` for standard labels.
- [x] T005 [P] [US1] Replace standard dividing lines within transaction list previews on the Dashboard with whitespace separating blocks.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T006 Ensure responsive resizing does not break the layout for extreme viewport sizes (from 375px up to 1440px)
- [x] T007 Run visual validation across all interactive elements (hover states without harsh outlines)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: N/A for this task.
- **User Stories (Phase 3+)**: Depend on Setup completion.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Setup (Phase 1).

### Within Each User Story

- Verify required tokens exist before styling components.
- Main dashboard wrapper before internal widget adjustment.

### Parallel Opportunities

- Updates to individual dashboard widgets (T003, T004, T005) can be completed in parallel after the main container structure (T002) is decided.

---

## Parallel Example: User Story 1

```bash
# Launch layout element styling updates in parallel
Task: Update dashboard widget components ...
Task: Update typography for dashboard headers ...
Task: Replace standard dividing lines within transaction lists ...
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (`tokens.css` validation)
2. Complete Phase 3: User Story 1 (Apply layout, styles, structural changes)
3. **STOP and VALIDATE**: Test User Story 1 independently against Stitch reference.
4. Deploy/demo if ready.
