import { transactionService } from './transactionService';
import { walletService } from './walletService';

export const analyticsService = {
  getDashboardSummary: async (userId: string) => {
    const [transactions, wallets] = await Promise.all([
      transactionService.getTransactions(userId),
      walletService.getWallets(userId)
    ]);
    
    const totalBalance = wallets.reduce((sum, w) => sum + w.balance, 0);
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    const monthlyIncome = transactions.filter(t => t.type === 'income' && new Date(t.date).getMonth() === thisMonth && new Date(t.date).getFullYear() === thisYear)
      .reduce((sum, t) => sum + t.amount, 0);
      
    const monthlyExpense = transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === thisMonth && new Date(t.date).getFullYear() === thisYear)
      .reduce((sum, t) => sum + t.amount, 0);
      
    return {
      totalBalance,
      monthlyIncome,
      monthlyExpense,
      netCashFlow: monthlyIncome - monthlyExpense
    };
  }
};
