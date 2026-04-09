import { mockStorage } from './mockStorage';
import { User } from '../utils/schemas';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    const users = await mockStorage.get<User[]>('users') || [];
    const user = users.find(u => u.email === email && u.passwordHash === password);
    if (!user) throw new Error('Invalid credentials');
    await mockStorage.set('currentUser', user);
    return user;
  },
  register: async (email: string, password: string): Promise<User> => {
    const users = await mockStorage.get<User[]>('users') || [];
    if (users.some(u => u.email === email)) throw new Error('User already exists');
    
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      passwordHash: password,
      preferences: { currency: 'USD', theme: 'light', timezone: 'UTC' }
    };
    await mockStorage.set('users', [...users, newUser]);
    await mockStorage.set('currentUser', newUser);
    return newUser;
  },
  logout: async (): Promise<void> => {
    await mockStorage.remove('currentUser');
  },
  getCurrentUser: async (): Promise<User | null> => {
    return await mockStorage.get<User>('currentUser');
  }
};
