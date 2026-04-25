import type { Transaction } from '../../utils/schemas';

export interface TransactionListItem extends Transaction {
  status: 'Pending' | 'Completed';
  formattedDate: string; // e.g. "Today, Oct 24"
  formattedAmount: string; // e.g. "-$24.50" or "+$4,250.00"
}

export interface QuickAddTemplate {
  id: string;
  label: string;      // e.g., "Gas", "Groceries"
  categoryId: string; // References an existing Category
  icon: string;       // Material Symbol icon name
}
