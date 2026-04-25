# Feature Specification: Update Transactions Page

**Feature Branch**: `005-update-transactions-page`  
**Created**: 2026-04-21  
**Status**: Draft  
**Input**: User description: "In the transactions page, we MUST clone the UI from the 'Transactions List' Stitch design. We have 'Quick add templates' part, Search part and list of transactions part in this screen."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Transaction List (Priority: P1)

A user navigates to the Transactions page to see all their financial transactions in a clear, chronologically grouped list. The page displays a prominent "Transactions" headline, followed by a list of transactions grouped by date (e.g., "Today, Oct 24", "October 22"). Each transaction item shows the merchant/description name, the amount (negative for expenses, positive for income), and a status badge ("Pending" or "Completed"). No divider lines are used between items — only vertical whitespace separates them, following the Editorial Vault design philosophy.

**Why this priority**: Viewing transactions is the core purpose of the page. Without the list, no other features are useful.

**Independent Test**: Can be fully tested by navigating to the Transactions page and verifying that transactions appear grouped by date with correct merchant names, amounts, and status badges.

**Acceptance Scenarios**:

1. **Given** a user has existing transactions, **When** they navigate to the Transactions page, **Then** they see a list of transactions grouped by date in reverse chronological order
2. **Given** a user has transactions on multiple dates, **When** they view the list, **Then** each date group shows a date header (e.g., "Today, Oct 24" for today's transactions, or "October 22" for past dates)
3. **Given** a transaction is an expense, **When** it is displayed, **Then** the amount is shown with a negative sign and expense styling (e.g., "-$24.50")
4. **Given** a transaction is income, **When** it is displayed, **Then** the amount is shown with a positive sign and income styling (e.g., "+$4,250.00")
5. **Given** a transaction has a pending status, **When** it is displayed, **Then** a "Pending" badge is shown in a distinct visual style
6. **Given** a transaction has a completed status, **When** it is displayed, **Then** a "Completed" badge is shown

---

### User Story 2 - Search and Filter Transactions (Priority: P2)

A user wants to quickly find specific transactions by searching with a keyword. A search bar is prominently placed at the top of the transaction list area. The user types a search term, and the list dynamically filters to show only matching transactions (matching by merchant name, note, or amount).

**Why this priority**: Search is essential for any list with significant volume of data. Without it, finding specific transactions in a long list is tedious.

**Independent Test**: Can be tested by typing a search term and verifying that only matching transactions appear in the list.

**Acceptance Scenarios**:

1. **Given** the Transactions page is loaded, **When** the user views the main content area, **Then** a search bar is visible above the transaction list
2. **Given** the user types "Netflix" into the search bar, **When** the search is applied, **Then** only transactions containing "Netflix" in their description or note are displayed
3. **Given** the user clears the search bar, **When** the field is empty, **Then** the full transaction list is restored

---

### User Story 3 - Quick Add Templates (Priority: P2)

A user wants to quickly record a frequently occurring expense without filling out a full form. The page displays a "Quick Add Templates" section with predefined category shortcuts (e.g., "Gas", "Groceries", "Coffee", "Netflix"). Each template appears as a compact, tappable chip/pill with a category icon and label. Tapping a template opens a streamlined transaction creation flow pre-filled with that category.

**Why this priority**: Quick add templates reduce friction for recurring expenses, making daily transaction logging much faster.

**Independent Test**: Can be tested by tapping a Quick Add Template chip and verifying that a transaction creation flow opens with the correct category pre-selected.

**Acceptance Scenarios**:

1. **Given** the Transactions page is loaded, **When** the user views the area above the transaction list, **Then** a "Quick Add Templates" section is visible with category chips
2. **Given** Quick Add Templates are displayed, **When** the user views the section, **Then** they see category chips including at minimum: Gas (Transport), Groceries, Food & Dining, Coffee (Lifestyle), Netflix (Entertainment)
3. **Given** the user taps a Quick Add Template chip, **When** the tap is registered, **Then** a transaction creation form/modal opens with the corresponding category pre-selected
4. **Given** the Quick Add Templates section is displayed, **When** the user views the chips, **Then** each chip shows a category icon and label

---

### User Story 4 - Transaction List Pagination (Priority: P3)

A user has a large number of transactions and needs to navigate through them efficiently. The page displays a pagination indicator showing the current range and total count (e.g., "Showing 1 to 5 of 1,240 transactions") with navigation controls to move between pages.

**Why this priority**: Pagination ensures performance and usability when the transaction list is very large, but the core viewing experience takes precedence.

**Independent Test**: Can be tested by verifying pagination controls appear when there are more transactions than the per-page limit, and that navigating between pages loads the correct data.

**Acceptance Scenarios**:

1. **Given** a user has more transactions than fit on one page, **When** they view the bottom of the transaction list, **Then** they see a pagination indicator with the current range and total count
2. **Given** the user is on the first page, **When** they navigate to the next page, **Then** the list updates to show the next set of transactions
3. **Given** the user is on the last page, **When** they view the pagination controls, **Then** the "next" control is disabled

---

### Edge Cases

- What happens when the user has zero transactions? → An empty state message is displayed with a call-to-action to add a first transaction
- What happens when a search returns no results? → A "no results found" message is displayed with a suggestion to adjust the search term
- What happens when the transaction list is loading? → A loading skeleton or spinner is displayed in place of the transaction items
- What happens when the network/storage fails to load transactions? → An error message is displayed with a retry option

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a "Transactions" page accessible via navigation with a prominent headline
- **FR-002**: System MUST display transactions grouped by date in reverse chronological order, with date headers formatted as "Today, [Month Day]" for the current date, or "[Month] [Day]" for past dates
- **FR-003**: Each transaction item MUST show: merchant/description name, transaction amount (formatted with currency symbol and sign), and a status badge ("Pending" or "Completed")
- **FR-004**: Income amounts MUST be displayed with a "+" prefix and styled with the growth/positive color theme
- **FR-005**: Expense amounts MUST be displayed with a "−" prefix and styled with the expense/outflow color theme
- **FR-006**: System MUST display a "Quick Add Templates" section above the transaction list, showing predefined category shortcut chips with icons and labels
- **FR-007**: The Quick Add Templates section MUST include at minimum these template categories: Gas (Transport), Groceries, Food & Dining, Coffee (Lifestyle), Netflix (Entertainment)
- **FR-008**: Tapping a Quick Add Template chip MUST open a transaction creation flow pre-filled with the corresponding category
- **FR-009**: System MUST display a search bar above the transaction list that filters transactions by merchant name, note, or amount as the user types
- **FR-010**: System MUST implement pagination for the transaction list, showing a configurable number of transactions per page (default: 10) with a pagination indicator displaying the current range and total count
- **FR-011**: The page layout MUST follow "The Editorial Vault" design system — no solid 1px borders for sectioning, boundaries defined through tonal surface color shifts, asymmetric editorial spacing, and Manrope/Inter typography
- **FR-012**: Transaction items MUST be separated by vertical whitespace (no divider lines), using the tonal layering system for visual grouping
- **FR-013**: System MUST show an empty state when there are no transactions
- **FR-014**: System MUST show a loading state while transactions are being fetched

### Key Entities

- **Transaction**: A financial record with merchant/description, amount, date, type (income/expense/transfer), category, status, and wallet association
- **Category**: A classification for transactions (e.g., Transport, Groceries, Entertainment) with an icon, color, and type
- **Quick Add Template**: A predefined shortcut mapping a label and icon to a specific category for rapid transaction creation

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can view their full transaction history organized by date within 2 seconds of page load
- **SC-002**: Users can find a specific transaction via search in under 5 seconds
- **SC-003**: Users can initiate a quick-add transaction in under 2 taps/clicks from the Transactions page
- **SC-004**: The Transactions page UI matches the "Transactions List" Stitch design screen at 95%+ visual fidelity, following the Editorial Vault design system tokens
- **SC-005**: 90% of users can successfully identify the status and amount of any given transaction at a glance
- **SC-006**: Page handles lists of 1,000+ transactions without noticeable performance degradation

## Assumptions

- The existing Transaction data model (with fields: id, userId, walletId, categoryId, type, amount, date, note, status timestamps) provides sufficient data for this UI
- Transaction "status" (Pending/Completed) will be derived from a new field or inferred from existing data (e.g., transactions older than today are "Completed", transactions created today may be "Pending")
- The sidebar navigation already includes a "Transactions" link that routes to this page
- Category data (icons, names, colors) exists in the system and can be used for Quick Add Template rendering
- The page inherits the app-level layout (sidebar + main content) from the Root layout component
- Quick Add Template categories are defined as a static configuration, not user-customizable in this version
- Currency formatting follows the user's preferences already stored in the system
