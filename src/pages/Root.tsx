import { Outlet, Navigate, useNavigate, NavLink } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../utils/queryClient';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/primitives';
import { authService } from '../services/authService';
import { budgetService } from '../services/budgetService';
import { transactionService } from '../services/transactionService';
import { billService } from '../services/billService';
import '../styles/tokens.css';

function AppLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await authService.logout();
    logout();
    navigate('/auth');
  };

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <header className="app-header" style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Money Management</h1>
        <nav style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
          <NavLink to="/wallets" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'var(--text-primary)' })}>Wallets</NavLink>
          <NavLink to="/categories" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'var(--text-primary)' })}>Categories</NavLink>
          <NavLink to="/budgets" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'var(--text-primary)' })}>Budgets</NavLink>
          <NavLink to="/goals" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'var(--text-primary)' })}>Goals</NavLink>
          <NavLink to="/bills" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'var(--text-primary)' })}>Bills</NavLink>
          <NavLink to="/settings" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal', color: 'var(--text-primary)' })}>Settings</NavLink>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <span>{user?.email}</span>
          <Button variant="secondary" onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      
      {overBudgetItems.length > 0 && (
        <div style={{ background: 'var(--danger-color)', color: 'white', padding: '8px', textAlign: 'center' }}>
          ⚠️ You have {overBudgetItems.length} budget(s) exceeding limits!
        </div>
      )}

      {overdueBills.length > 0 && (
        <div style={{ background: 'var(--danger-color)', color: 'white', padding: '8px', textAlign: 'center', borderTop: '1px solid white' }}>
          ⚠️ You have {overdueBills.length} overdue bill(s)!
        </div>
      )}

      <main className="app-main" style={{ flex: 1, padding: 'var(--spacing-md)' }}>
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
