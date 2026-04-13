import { mockStorage } from './mockStorage';
import type { Transaction } from '../utils/schemas';
import { walletService } from './walletService';

export const transactionService = {
  getTransactions: async (userId: string): Promise<Transaction[]> => {
    const txs = await mockStorage.get<Transaction[]>('transactions') || [];
    return txs.filter(t => t.userId === userId).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
  createTransaction: async (tx: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'linkedTransactionId'> & { destinationWalletId?: string }): Promise<Transaction> => {
    const txs = await mockStorage.get<Transaction[]>('transactions') || [];
    const now = new Date().toISOString();
    
    // Simple Income/Expense
    if (tx.type !== 'transfer') {
      const newTx: Transaction = {
        ...tx,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };
      await mockStorage.set('transactions', [...txs, newTx]);
      
      const balanceChange = tx.type === 'income' ? tx.amount : -tx.amount;
      await walletService.updateBalance(tx.walletId, balanceChange);
      return newTx;
    } 
    
    // Transfer logic
    if (tx.type === 'transfer' && tx.destinationWalletId) {
      const sourceId = crypto.randomUUID();
      const destId = crypto.randomUUID();
      
      const sourceTx: Transaction = {
        ...tx,
        id: sourceId,
        type: 'expense',
        linkedTransactionId: destId,
        note: `Transfer to wallet ${tx.destinationWalletId}${tx.note ? ' - ' + tx.note : ''}`,
        createdAt: now,
        updatedAt: now,
      };
      
      const destTx: Transaction = {
        ...tx,
        id: destId,
        walletId: tx.destinationWalletId,
        type: 'income',
        linkedTransactionId: sourceId,
        note: `Transfer from wallet ${tx.walletId}${tx.note ? ' - ' + tx.note : ''}`,
        createdAt: now,
        updatedAt: now,
      };
      
      await mockStorage.set('transactions', [...txs, sourceTx, destTx]);
      await walletService.updateBalance(tx.walletId, -tx.amount);
      await walletService.updateBalance(tx.destinationWalletId, tx.amount);
      return sourceTx;
    }
    
    throw new Error('Invalid transaction logic');
  }
};
