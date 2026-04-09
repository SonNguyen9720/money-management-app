import { mockStorage } from './mockStorage';
import { User, UserPreferences } from '../utils/schemas';

export const userService = {
  updatePreferences: async (userId: string, preferences: UserPreferences): Promise<User> => {
    const users = await mockStorage.get<User[]>('users') || [];
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error('User not found');
    
    const updatedUser = { ...users[userIndex], preferences: { ...users[userIndex].preferences, ...preferences } };
    users[userIndex] = updatedUser;
    await mockStorage.set('users', users);
    
    const currentUser = await mockStorage.get<User>('currentUser');
    if (currentUser?.id === userId) {
      await mockStorage.set('currentUser', updatedUser);
    }
    
    return updatedUser;
  }
};
