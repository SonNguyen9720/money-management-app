---
description: "Task list for Core MVP Features implementation"
---

# Tasks: Core MVP Features

**Input**: Design documents from `/specs/002-core-mvp-features/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan in `src/`
- [x] T002 Initialize Vite React TypeScript project in `./`
- [x] T003 [P] Install core dependencies (Zustand, TanStack Query, React Router, Zod, React Hook Form) in `package.json`
- [x] T004 [P] Configure Vitest and linting/formatting tools in `vite.config.ts`
- [x] T005 Setup base CSS tokens (`tokens.css`) per Editorial Vault design in `src/styles/tokens.css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Setup `localStorage` wrapper service in `src/services/mockStorage.ts`
- [x] T007 Build mock delay interceptor for realistic latency in `src/services/delay.ts`
- [x] T008 [P] Configure TanStack Query client provider in `src/utils/queryClient.ts`
- [x] T009 [P] Create React Router layout and root provider in `src/pages/Root.tsx`
- [x] T010 Create primitive UI components (Buttons, Inputs, Cards) in `src/components/primitives/index.tsx`
- [x] T011 Define base types for User/Wallet/Transaction in `src/utils/schemas.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Authentication and Account Management (Priority: P1) 🎯 MVP

**Goal**: Users securely sign up, log in, manage profile, and set preferences.

**Independent Test**: Create an account, log out, log in, and verify preference updates persist.

### Implementation for User Story 1

- [x] T012 [P] [US1] Implement Mock AuthService (login, register, reset password) in `src/services/authService.ts`
- [x] T013 [P] [US1] Create Zustand Auth Store in `src/store/authStore.ts`
- [x] T014 [P] [US1] Implement Mock UserService for preferences in `src/services/userService.ts`
- [x] T015 [P] [US1] Build Authentication forms (Login, Register) in `src/pages/auth/index.tsx`
- [x] T016 [US1] Protect routes using Auth Store state in `src/pages/Root.tsx`
- [x] T017 [US1] Build Settings UI for User Preferences in `src/pages/dashboard/Settings.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Fundamental Wallet and Transaction Tracking (Priority: P1)

**Goal**: Create wallets, record daily income, expenses, and inter-wallet transfers.

**Independent Test**: Create two wallets, log expenses, execute transfer, and verify balances dynamically update.

### Implementation for User Story 2

- [x] T018 [P] [US2] Implement Mock WalletService in `src/services/walletService.ts`
- [x] T019 [P] [US2] Implement Mock TransactionService in `src/services/transactionService.ts`
- [x] T020 [US2] Build Wallet List and Creation UI in `src/pages/wallets/index.tsx`
- [x] T021 [US2] Build Domain components (WalletCard, TransactionList) in `src/components/domain/index.tsx`
- [x] T022 [US2] Create Transaction Entry form in `src/pages/wallets/TransactionEntry.tsx`
- [x] T023 [US2] Connect UI to TanStack Query for dynamic balance recalculation in `src/pages/wallets/index.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Categorization and Organization (Priority: P2)

**Goal**: Assign categories to organize transactions (with safe pseudo/soft-delete).

**Independent Test**: Create a custom category, apply it to a new transaction, and soft-delete it.

### Implementation for User Story 3

- [x] T024 [P] [US3] Implement Mock CategoryService with soft delete (Archive) in `src/services/categoryService.ts`
- [x] T025 [US3] Build Category Management UI in `src/pages/dashboard/Categories.tsx`
- [x] T026 [US3] Integrate category selection dropdown into Transaction Entry form in `src/pages/wallets/TransactionEntry.tsx`

**Checkpoint**: Core tracking is complete and categorizable.

---

## Phase 6: User Story 4 - Budgeting and Financial Goals (Priority: P2)

**Goal**: Establish spending limits and track savings goals separately from wallet balances.

**Independent Test**: Create a budget, exceed it to trigger alerts. Add goal, log contributions.

### Implementation for User Story 4

- [x] T027 [P] [US4] Implement Mock BudgetService in `src/services/budgetService.ts`
- [x] T028 [P] [US4] Implement Mock GoalService (independent of wallet deletion) in `src/services/goalService.ts`
- [x] T029 [US4] Build Budget Management and Overspending Alerts UI in `src/pages/budgeting/Budgets.tsx`
- [x] T030 [US4] Build Goals Tracker and Contribution UI in `src/pages/budgeting/Goals.tsx`
- [x] T031 [US4] Integrate passive budget alerts into the global app layout in `src/pages/Root.tsx`

---

## Phase 7: User Story 5 - Reminders and Bills (Priority: P2)

**Goal**: Schedule recurring bills and get notifications to avoid late payments.

**Independent Test**: Schedule upcoming bill, view reminder on load, mark it as paid.

### Implementation for User Story 5

- [x] T032 [P] [US5] Implement Mock BillService for reminders in `src/services/billService.ts`
- [x] T033 [US5] Build Upcoming Bills Tracking UI in `src/pages/dashboard/Bills.tsx`
- [x] T034 [US5] Integrate notification dispatcher for overdue/upcoming bills in `src/pages/Root.tsx`

---

## Phase 8: User Story 6 - Insights, Reporting, and Dashboard (Priority: P3)

**Goal**: Dashboard summaries, CSV export, and chart visualizations.

**Independent Test**: Load Dashboard, visually verify income/expense summaries, download CSV.

### Implementation for User Story 6

- [x] T035 [P] [US6] Implement AnalyticsService for aggregating stats in `src/services/analyticsService.ts`
- [x] T036 [P] [US6] Build CSV export generation helper in `src/utils/csvExport.ts`
- [x] T037 [US6] Build main Dashboard layout with summary widgets in `src/pages/dashboard/index.tsx`
- [x] T038 [US6] Create Visual Charts (Recharts/Victory) for cash flow in `src/pages/reports/Charts.tsx`
- [x] T039 [US6] Integrate filtering (by date, user timezone, wallets) on the Dashboard in `src/pages/dashboard/index.tsx`

---

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T040 [P] Conduct responsive design audit down to 375px mobile view
- [x] T041 Ensure sub-2-second data generation performance with 5000 mock items via Vitest in `src/services/perf.test.ts`
- [x] T042 Error handling polish (Toast notifications for mutations) across all pages
- [x] T043 Clean up unused CSS tokens in `src/styles/tokens.css`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup & Foundational**: Must complete first. Blocks all user stories.
- **US1 & US2**: Start concurrently directly after Foundation (Independent).
- **US3**: Depends on US2 (Needs Transactions).
- **US4**: Depends on US3 (For Budget Categories) and US2.
- **US5**: Independent of US2, but relates to US1.
- **US6**: Depends on all previous data-producing stories.

### Parallel Opportunities

- Foundation services + primitive components can be split across UI and Data teams.
- Services (US1-US6 tasks prefixed with [P]) can be built concurrently.
- User Story 1 (Auth) and User Story 2 (Wallets) can be worked on entirely in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup and Foundational constraints.
2. Build US1 and US2.
3. Validate tracking of real transfers and balances.
4. Expand cleanly into Categories (US3) once baseline transaction models stabilize.
