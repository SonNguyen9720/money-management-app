import { mockStorage } from './mockStorage';
import { Goal } from '../utils/schemas';

export const goalService = {
  getGoals: async (userId: string): Promise<Goal[]> => {
    const goals = await mockStorage.get<Goal[]>('goals') || [];
    return goals.filter(g => g.userId === userId);
  },
  createGoal: async (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt' | 'currentAmount' | 'status'>): Promise<Goal> => {
    const goals = await mockStorage.get<Goal[]>('goals') || [];
    const newGoal: Goal = {
      ...goal,
      id: crypto.randomUUID(),
      currentAmount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await mockStorage.set('goals', [...goals, newGoal]);
    return newGoal;
  },
  contribute: async (id: string, amount: number): Promise<void> => {
    const goals = await mockStorage.get<Goal[]>('goals') || [];
    const index = goals.findIndex(g => g.id === id);
    if (index !== -1) {
      goals[index].currentAmount += amount;
      if (goals[index].currentAmount >= goals[index].targetAmount) {
        goals[index].status = 'completed';
      }
      goals[index].updatedAt = new Date().toISOString();
      await mockStorage.set('goals', goals);
    }
  }
};
