import { mockStorage } from './mockStorage';
import { Wallet } from '../utils/schemas';

export const walletService = {
  getWallets: async (userId: string): Promise<Wallet[]> => {
    const wallets = await mockStorage.get<Wallet[]>('wallets') || [];
    return wallets.filter(w => w.userId === userId);
  },
  createWallet: async (wallet: Omit<Wallet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Wallet> => {
    const wallets = await mockStorage.get<Wallet[]>('wallets') || [];
    const newWallet: Wallet = {
      ...wallet,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await mockStorage.set('wallets', [...wallets, newWallet]);
    return newWallet;
  },
  updateBalance: async (id: string, amountChange: number): Promise<void> => {
    const wallets = await mockStorage.get<Wallet[]>('wallets') || [];
    const index = wallets.findIndex(w => w.id === id);
    if (index !== -1) {
      wallets[index].balance += amountChange;
      wallets[index].updatedAt = new Date().toISOString();
      await mockStorage.set('wallets', wallets);
    }
  }
};
