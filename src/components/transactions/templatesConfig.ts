import type { QuickAddTemplate } from '../../pages/transactions/types';

export const templatesConfig: QuickAddTemplate[] = [
  { id: '1', label: 'Gas', categoryId: 'gas-id', icon: 'local_gas_station' },
  { id: '2', label: 'Groceries', categoryId: 'groceries-id', icon: 'shopping_cart' },
  { id: '3', label: 'Coffee', categoryId: 'coffee-id', icon: 'coffee' },
  { id: '4', label: 'Rent', categoryId: 'rent-id', icon: 'home' },
  { id: '5', label: 'Salary', categoryId: 'salary-id', icon: 'payments' },
];
