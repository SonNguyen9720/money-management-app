import { mockStorage } from './mockStorage';
import type { Category } from '../utils/schemas';

export const categoryService = {
  getCategories: async (userId: string): Promise<Category[]> => {
    const categories = await mockStorage.get<Category[]>('categories') || [];
    return categories.filter(c => c.userId === userId || c.userId === null);
  },
  createCategory: async (category: Omit<Category, 'id' | 'isArchived'>): Promise<Category> => {
    const categories = await mockStorage.get<Category[]>('categories') || [];
    const newCategory: Category = {
      ...category,
      id: crypto.randomUUID(),
      isArchived: false,
    };
    await mockStorage.set('categories', [...categories, newCategory]);
    return newCategory;
  },
  archiveCategory: async (id: string): Promise<void> => {
    const categories = await mockStorage.get<Category[]>('categories') || [];
    const index = categories.findIndex(c => c.id === id);
    if (index !== -1) {
      categories[index].isArchived = true;
      await mockStorage.set('categories', categories);
    }
  }
};
