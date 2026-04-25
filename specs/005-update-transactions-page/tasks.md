---

description: "Task list for Update Transactions Page implementation"
---

# Tasks: Update Transactions Page

**Input**: Design documents from `/specs/005-update-transactions-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Tests are NOT explicitly requested in the spec, following existing project patterns of manual visual verification and linting.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create directory structure for transactions feature in `src/pages/transactions/` and `src/components/transactions/`
- [X] T002 Register the `/transactions` route in `src/main.tsx`
- [X] T003 Update `src/components/layout/Sidebar.tsx` to link to the new Transactions page

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Define `TransactionListItem` and `QuickAddTemplate` types in `src/pages/transactions/types.ts`
- [X] T005 Implement date-based status inference utility in `src/pages/transactions/utils.ts` (Pending vs Completed)
- [X] T006 [P] Create base `TransactionsPage` container in `src/pages/transactions/index.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Transaction List (Priority: P1) 🎯 MVP

**Goal**: Display a chronological list of transactions with date headers, merchant names, amounts, and status badges.

**Independent Test**: Navigate to /transactions and see existing mock transactions grouped by date with correct styling and badges.

### Implementation for User Story 1

- [X] T007 [P] [US1] Implement `TransactionBadge` component in `src/components/transactions/TransactionBadge.tsx`
- [X] T008 [P] [US1] Create `TransactionItem` component in `src/components/transactions/TransactionItem.tsx`
- [X] T009 [US1] Implement `TransactionList` component in `src/components/transactions/TransactionList.tsx` with date grouping logic
- [X] T010 [US1] Integrate `TransactionList` into `TransactionsPage` and fetch data using `transactionService` via TanStack Query

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Search and Filter (Priority: P2)

**Goal**: Add a search bar that filters the transaction list by merchant name, note, or amount.

**Independent Test**: Type a keyword in the search bar and verify only matching transactions are shown.

### Implementation for User Story 2

- [X] T011 [P] [US2] Create `TransactionSearch` component in `src/components/transactions/TransactionSearch.tsx`
- [X] T012 [US2] Implement filtering logic in `TransactionsPage` using state to filter the list passed to `TransactionList`
- [X] T013 [US2] Add empty state message for when search returns no results in `TransactionList`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Quick Add Templates (Priority: P2)

**Goal**: Add shortcut chips for common categories that open the transaction creation flow.

**Independent Test**: Click a category chip and verify it opens the creation form with that category pre-filled.

### Implementation for User Story 3

- [X] T014 [P] [US3] Define static configuration for templates (Gas, Groceries, etc.) in `src/components/transactions/templatesConfig.ts`
- [X] T015 [US3] Create `QuickAddTemplates` component in `src/components/transactions/QuickAddTemplates.tsx`
- [X] T016 [US3] Implement click handler in `QuickAddTemplates` to open transaction creation modal/flow

**Checkpoint**: User Stories 1, 2, and 3 should now be independently functional

---

## Phase 6: User Story 4 - Transaction List Pagination (Priority: P3)

**Goal**: Implement client-side pagination with "Showing X to Y of Z" indicator.

**Independent Test**: Verify pagination controls appear with many transactions and correctly slice the list.

### Implementation for User Story 4

- [X] T017 [P] [US4] Create `PaginationControls` component in `src/components/transactions/PaginationControls.tsx`
- [X] T018 [US4] Implement pagination logic in `TransactionsPage` using `useState` for current page and limit

**Checkpoint**: All user stories are now implemented and functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T019 [P] Apply final "Editorial Vault" design refinements (spacing, typography, ambient shadows) across all components
- [X] T020 [P] Add loading skeleton states in `TransactionList.tsx`
- [X] T021 [P] Final linting and build check (`npm run lint`, `npm run build`)
- [X] T022 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 (P1) is the MVP and should be completed first
  - US2 and US3 (P2) can be done in parallel after US1
  - US4 (P3) depends on having a functional list (US1)
- **Polish (Final Phase)**: Depends on all user stories being complete

### Parallel Opportunities

- T007, T008 (US1) can be worked on together
- T011 (US2) and T014 (US3) can be worked on together once US1 is functional
- T017 (US4) can be worked on while US2/US3 are being finished
- Most setup and foundational types can be defined in parallel

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify the list displays correctly with mock data.

### Incremental Delivery

1. Foundation ready
2. Add US1 (View List) → MVP!
3. Add US2 (Search)
4. Add US3 (Quick Add)
5. Add US4 (Pagination)
6. Final Polish

---

## Notes

- [P] tasks = different files, no dependencies
- [USX] label maps task to specific user story for traceability
- Adhere strictly to "The Editorial Vault" - no 1px solid borders!
- Use TanStack Query for data fetching from `transactionService`.
