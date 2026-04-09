import { delay } from './delay';

export const mockStorage = {
  get: async <T>(key: string): Promise<T | null> => {
    await delay(200);
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  set: async <T>(key: string, value: T): Promise<void> => {
    await delay(200);
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: async (key: string): Promise<void> => {
    await delay(200);
    localStorage.removeItem(key);
  }
};
