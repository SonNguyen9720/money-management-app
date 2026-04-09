import { z } from 'zod';

export const UserPreferencesSchema = z.object({
  currency: z.string().default('USD'),
  theme: z.literal('light').default('light'),
  timezone: z.string().default('UTC'),
});
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  passwordHash: z.string(),
  preferences: UserPreferencesSchema,
});
export type User = z.infer<typeof UserSchema>;

export const WalletTypeSchema = z.enum(['bank', 'cash', 'credit']);
export const WalletSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string(),
  type: WalletTypeSchema,
  balance: z.number(),
  currency: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Wallet = z.infer<typeof WalletSchema>;

export const TransactionTypeSchema = z.enum(['income', 'expense', 'transfer']);
export const TransactionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  walletId: z.string().uuid(),
  categoryId: z.string().uuid(),
  type: TransactionTypeSchema,
  amount: z.number(),
  date: z.string(),
  note: z.string().nullable().optional(),
  linkedTransactionId: z.string().uuid().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Transaction = z.infer<typeof TransactionSchema>;

export const CategorySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().nullable(),
  name: z.string(),
  icon: z.string(),
  color: z.string(),
  type: TransactionTypeSchema,
  parentId: z.string().uuid().nullable().optional(),
  isArchived: z.boolean(),
});
export type Category = z.infer<typeof CategorySchema>;

export const BudgetSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  categoryId: z.string().uuid().nullable().optional(),
  amount: z.number(),
  period: z.literal('monthly'),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Budget = z.infer<typeof BudgetSchema>;

export const GoalSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string(),
  targetAmount: z.number(),
  currentAmount: z.number(),
  targetDate: z.string().nullable().optional(),
  status: z.enum(['active', 'completed', 'archived']),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Goal = z.infer<typeof GoalSchema>;

export const BillSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string(),
  amount: z.number(),
  dueDate: z.string(),
  isRecurring: z.boolean(),
  recurrenceInterval: z.enum(['monthly', 'yearly', 'weekly']).nullable().optional(),
  isPaid: z.boolean(),
  categoryId: z.string().uuid().nullable().optional(),
});
export type Bill = z.infer<typeof BillSchema>;
