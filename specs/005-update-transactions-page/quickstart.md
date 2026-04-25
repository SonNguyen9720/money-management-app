# Quickstart: Transactions Page

This feature updates the application with a new Transactions Page that clones the "Transactions List" Stitch design.

## Features
- **Date-Grouped List**: Views all transactions grouped chronologically.
- **Search**: Filters transactions by name, note, or amount.
- **Quick Add**: Pre-filled templates for common expenses (e.g., Gas, Groceries).
- **Pagination**: Client-side pagination for handling 1,000+ items smoothly.

## Development Constraints
- Use `useQuery` to fetch transactions from `transactionService`.
- No new backend/storage schemas required (status is inferred via date).
- UI strictly follows "The Editorial Vault" CSS tokens (e.g., `var(--surface-container-low)`).
- **No hard borders** (`1px solid`). Use `gap` and background shifts for separation.

## Entry Point
- `src/pages/transactions/index.tsx`
