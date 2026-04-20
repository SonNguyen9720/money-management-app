import { Outlet, Navigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../utils/queryClient';
import { useAuthStore } from '../store/authStore';
import { budgetService } from '../services/budgetService';
import { transactionService } from '../services/transactionService';
import { billService } from '../services/billService';
import Sidebar from '../components/layout/Sidebar';
import MobileNav from '../components/layout/MobileNav';
import '../styles/tokens.css';
import '../styles/layout.css';

function AppLayout() {
  const { user } = useAuthStore();

  const { data: budgets } = useQuery({
    queryKey: ['budgets', user?.id],
    queryFn: () => budgetService.getBudgets(user!.id),
    enabled: !!user,
  });

  const { data: transactions } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: () => transactionService.getTransactions(user!.id),
    enabled: !!user,
  });

  const { data: bills } = useQuery({
    queryKey: ['bills', user?.id],
    queryFn: () => billService.getBills(user!.id),
    enabled: !!user,
  });

  const getExpensesForCategory = (catId?: string) => {
    if (!transactions) return 0;
    return transactions
      .filter(t => t.type === 'expense' && (!catId || t.categoryId === catId))
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const overBudgetItems = (budgets || []).filter(b => getExpensesForCategory(b.categoryId || undefined) > b.amount);
  const overdueBills = (bills || []).filter(b => !b.isPaid && new Date(b.dueDate) < new Date());

  return (
    <div className="app-layout">
      <div className="app-sidebar">
        <Sidebar />
      </div>

      <MobileNav />

      <main className="app-main">
        {overBudgetItems.length > 0 && (
          <div style={{ background: 'var(--danger-color)', color: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
            ⚠️ You have {overBudgetItems.length} budget(s) exceeding limits!
          </div>
        )}

        {overdueBills.length > 0 && (
          <div style={{ background: 'var(--danger-color)', color: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center' }}>
            ⚠️ You have {overdueBills.length} overdue bill(s)!
          </div>
        )}

        <Outlet />
      </main>
    </div>
  );
}

export default function Root() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout />
    </QueryClientProvider>
  );
}
