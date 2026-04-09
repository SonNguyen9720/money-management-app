import { mockStorage } from './mockStorage';
import { Budget } from '../utils/schemas';

export const budgetService = {
  getBudgets: async (userId: string): Promise<Budget[]> => {
    const budgets = await mockStorage.get<Budget[]>('budgets') || [];
    return budgets.filter(b => b.userId === userId);
  },
  createBudget: async (budget: Omit<Budget, 'id' | 'createdAt' | 'updatedAt'>): Promise<Budget> => {
    const budgets = await mockStorage.get<Budget[]>('budgets') || [];
    const newBudget: Budget = {
      ...budget,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await mockStorage.set('budgets', [...budgets, newBudget]);
    return newBudget;
  }
};
