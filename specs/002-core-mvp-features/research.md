# Research: Core MVP Features

## 1. Handling Transfers Exceeding Balance
**Decision**: Allow transfers exceeding the current wallet balance but warn the user, leaving the wallet in a negative balance.
**Rationale**: In real life, users may encounter overdrafts or enter transactions out of chronological order. A strict block would prevent users from reconciling their balances correctly if they record an expense before the corresponding income.
**Alternatives considered**: Strict blocking (rejected as it hinders user flexibility during data entry).

## 2. Deleting a Category with Associated Transactions
**Decision**: Implement a "Soft Delete" (Archive) strategy.
**Rationale**: Deleting a category would orphan existing transactions and corrupt historical insights. Soft-deleting it removes it from selection dropdowns for new transactions but preserves it for historical reporting.
**Alternatives considered**: Cascade delete (rejected due to data loss). Re-assign to a generic "Uncategorized" category (possible future enhancement, but archive is simpler for MVP).

## 3. Handling Deleted Wallets with Assigned Goals
**Decision**: Goals will track their own accumulated progress independently of specific wallets. When logging a contribution, the funds are conceptually moved out of the wallet into a "goal fund" (or mathematically deducted). Thus, deleting a wallet doesn't deduct from the goal progress. 
**Rationale**: Simplifies the state management for MVP and prevents users from suddenly losing saving progress if they close a bank account.
**Alternatives considered**: Binding specific savings explicitly to specific sub-wallets (rejected as too complex for MVP).

## 4. Mock-First Storage Strategy
**Decision**: Implement the data layer using `localStorage` wrapped in a service registry (`services/index.ts`) that simulates network requests returning Promises.
**Rationale**: Adheres to Constitution II "Mock-First API Strategy" and allows seamless replacement with a real backend later.
**Alternatives considered**: In-memory only (rejected as data wouldn't survive page reloads).
