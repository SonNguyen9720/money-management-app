import { mockStorage } from './mockStorage';
import { Bill } from '../utils/schemas';

export const billService = {
  getBills: async (userId: string): Promise<Bill[]> => {
    const bills = await mockStorage.get<Bill[]>('bills') || [];
    return bills.filter(b => b.userId === userId).sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  },
  createBill: async (bill: Omit<Bill, 'id' | 'isPaid'>): Promise<Bill> => {
    const bills = await mockStorage.get<Bill[]>('bills') || [];
    const newBill: Bill = {
      ...bill,
      id: crypto.randomUUID(),
      isPaid: false,
    };
    await mockStorage.set('bills', [...bills, newBill]);
    return newBill;
  },
  markPaid: async (id: string): Promise<void> => {
    const bills = await mockStorage.get<Bill[]>('bills') || [];
    const index = bills.findIndex(b => b.id === id);
    if (index !== -1) {
      bills[index].isPaid = true;
      await mockStorage.set('bills', bills);
    }
  }
};
