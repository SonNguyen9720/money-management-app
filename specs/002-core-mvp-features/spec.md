# Feature Specification: Core MVP Features

**Feature Branch**: `[###-core-mvp-features]`
**Created**: 2026-04-09
**Status**: Draft
**Input**: User description: "the product features in @docs/product-feature.md"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Authentication and Account Management (Priority: P1)

Users need to sign up, log in, manage their profile, and set preferences like preferred currency to personalize their experience using the application securely.

**Why this priority**: Without an account, users cannot securely save and manage their financial data. It's the critical first step for the app.

**Independent Test**: Can be fully tested by creating an account, logging out, resetting the password, and verifying profile customization saves correctly.

**Acceptance Scenarios**:
1. **Given** a new user on the landing page, **When** they submit valid credentials, **Then** an account is created and they enter the onboarding flow.
2. **Given** a logged-out user, **When** they enter valid credentials, **Then** they are logged into their dashboard.

---

### User Story 2 - Fundamental Wallet and Transaction Tracking (Priority: P1)

Users need to create wallets (like bank accounts or cash) and record daily income, expenses, and inter-wallet transfers to accurately track their real-world money.

**Why this priority**: Without adding wallets and tracking transactions, the app offers no core financial management value.

**Independent Test**: Can be tested by creating two wallets, logging expenses and income in each, executing a transfer, and verifying updated wallet balances.

**Acceptance Scenarios**:
1. **Given** an authenticated user, **When** they create a new wallet with an initial balance, **Then** the new wallet appears with the correct amount.
2. **Given** an existing wallet, **When** a user records an expense of 50 in a specific category, **Then** the wallet's balance decreases by 50, and the transaction is listed in recent history.

---

### User Story 3 - Categorization and Organization (Priority: P2)

Users need to assign custom or default categories to their transactions to organize their spending habits.

**Why this priority**: Essential for meaningful reporting and budgeting; users need to know exactly what they are spending money on (e.g., Food, Transport).

**Independent Test**: Can be tested by creating a custom category, assigning it to a new transaction, and verifying the category appears correctly on the transaction list.

**Acceptance Scenarios**:
1. **Given** a user viewing their categories, **When** they create a new custom expense category, **Then** it becomes available to select on new transactions.

---

### User Story 4 - Budgeting and Financial Goals (Priority: P2)

Users need to establish monthly spend limits per category and track savings goals to prevent overspending and actively save for the future.

**Why this priority**: Transitioning a user from passively tracking past expenses to actively managing future financial health.

**Independent Test**: Can be tested by creating a budget limit for a category, adding expenses exceeding that limit, and verifying an overspending alert appears.

**Acceptance Scenarios**:
1. **Given** a budget limit for "Food", **When** related transactions exceed 80% of the budget, **Then** a warning alert is triggered.
2. **Given** a $1000 savings goal, **When** the user logs a $100 contribution, **Then** the goal progress increments by 10%.

---

### User Story 5 - Reminders and Bills (Priority: P2)

Users need to schedule recurring upcoming bills and receive reminders to avoid late payments.

**Why this priority**: Helps users prevent real-life financial penalties, increasing the app's usefulness.

**Independent Test**: Can be tested by creating an unpaid bill due tomorrow, verifying a reminder notification triggers, and marking it as paid.

**Acceptance Scenarios**:
1. **Given** a recurring bill for the 1st of the month, **When** the user views upcoming bills, **Then** the bill is listed with the amount and due date.

---

### User Story 6 - Insights, Reporting, and Dashboard (Priority: P3)

Users need high-level dashboard summaries and detailed visual reports (CSV export, charts) to evaluate their monthly cash flow and net worth.

**Why this priority**: Provides the payoff for consistent tracking, offering actionable overviews. It builds strictly upon data from prior stories.

**Independent Test**: Can be tested by navigating to the reports section and verifying charts accurately reflect existing mock transaction data across date ranges.

**Acceptance Scenarios**:
1. **Given** multiple transactions this month, **When** the user views the dashboard, **Then** total income, expense, and net cash flow are accurately calculated and displayed.

### Edge Cases

- What happens when a user attempts to transfer money out of a wallet exceeding its current balance? (Allowed with negative balance or restricted?) 
- How does the system handle deleting a category that has hundreds of associated historical transactions?
- What happens to a savings goal if the contribution comes from a wallet that gets deleted?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow users to register with credential validation, authenticate, and securely log out.
- **FR-002**: System MUST allow users to set preferences (currency, timezone, language, theme).
- **FR-003**: System MUST provide the ability to create, edit, archive, and delete custom wallets of various types.
- **FR-004**: System MUST allow users to log income, expense, and transfer transactions against selected wallets and categories.
- **FR-005**: System MUST provide default categories and allow users to create, edit, and delete custom parent-child categories/tags.
- **FR-006**: System MUST allow users to create monthly budgets overall or per-category and track used/remaining amounts.
- **FR-007**: System MUST calculate total balances, net cash flow, and budget usage for immediate display on a dashboard.
- **FR-008**: System MUST support creating savings goals with target dates and allow incremental contributions.
- **FR-009**: System MUST support recurring reminders for upcoming bills and allow marking them as paid.
- **FR-010**: System MUST generate visual reports for income/expense, categorization, and cash flow with date-range filtering.
- **FR-011**: System MUST dispatch in-app notifications for overdue bills, overspending alerts, and budget threshold warnings.
- **FR-012**: System MUST protect routes via JWT/session-based authentication and enforce strict resource ownership validation.

- **FR-013**: System MUST implement secure user-password reset via emailed password recovery links.
- **FR-014**: System MUST deploy historical reports using CSV export by processing the request on the server and providing a download link in the UI upon completion.

### Key Entities 

- **User**: Represents the account holder, containing personal settings, credentials, and preference settings.
- **Wallet**: Represents a storage of funds (Bank, Cash, Credit Card). Holds a current tracking balance.
- **Transaction**: Represents a movement of funds (Income, Expense, Transfer) referencing a wallet, category, timestamp, and amount.
- **Category/Tag**: Represents an organizational label for a transaction. Can be default or custom.
- **Budget**: Represents a temporal numeric boundary against a specific category or overall spending.
- **Goal**: Represents a target amount assigned for savings, containing a due date and accumulated contribution sum.
- **Bill/Reminder**: Represents scheduled future events indicating an amount that needs resolving.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can complete initial account setup and onboard their first wallet in under 2 minutes.
- **SC-002**: System correctly calculates and displays accurate multi-wallet balances and net cash flows across all currencies selected.
- **SC-003**: The dashboard and reports load with chart aggregations in under 2 seconds for a user with up to 5000 transactions.
- **SC-004**: 95% of attempts to log a fast new expense transaction take less than 10 seconds of user interaction time.

## Assumptions

- Users have stable internet connectivity (offline support is out of scope for MVP).
- The web application will be single-user per account initially (Shared wallets/Family finance are declared "future features").
- Account resets and notifications assume an email-based communications architecture.
- Authentication relies on standard username/password (and optionally OAuth), without immediate strict hardware 2FA.
- The web application targets standard desktop and mobile browser dimensions using a responsive layout.
