# Data Model: Transactions Page

## Client-Side Models (Derived)

Since we are using the existing `Transaction` schema, we only need to define the derived models used by the UI layer.

### TransactionListItem
Represents a formatted transaction ready for display.
```typescript
interface TransactionListItem extends Transaction {
  status: 'Pending' | 'Completed';
  formattedDate: string; // e.g. "Today, Oct 24"
  formattedAmount: string; // e.g. "-$24.50" or "+$4,250.00"
}
```

### QuickAddTemplate
Static configuration for quick-add chips.
```typescript
interface QuickAddTemplate {
  id: string;
  label: string;      // e.g., "Gas", "Groceries"
  categoryId: string; // References an existing Category
  icon: string;       // Material Symbol icon name
}
```
