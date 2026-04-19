import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { analyticsService } from '../../services/analyticsService';
import { transactionService } from '../../services/transactionService';
import { exportToCSV } from '../../utils/csvExport';
import { Card, Button } from '../../components/primitives';
import { TransactionList } from '../../components/domain';
import Charts from '../reports/Charts';

export default function Dashboard() {
  const { user } = useAuthStore();
  
  const [filterMonth, setFilterMonth] = useState(new Date().getMonth());

  const { data: summary } = useQuery({
    queryKey: ['summary', user?.id],
    queryFn: () => analyticsService.getDashboardSummary(user!.id),
    enabled: !!user,
  });

  const { data: transactions } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: () => transactionService.getTransactions(user!.id),
    enabled: !!user,
  });

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    return transactions.filter(t => new Date(t.date).getMonth() === filterMonth);
  }, [transactions, filterMonth]);
  
  const handleExport = () => {
    if (filteredTransactions.length > 0) {
      exportToCSV(filteredTransactions, `transactions-${filterMonth}.csv`);
    }
  };

  const chartData = [
    { label: 'Income', value: summary?.monthlyIncome || 0, color: 'var(--success-color)' },
    { label: 'Expense', value: summary?.monthlyExpense || 0, color: 'var(--danger-color)' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--md-sys-color-surface-container-low)', minHeight: '100vh', padding: 'var(--spacing-xl)', fontFamily: 'var(--font-family)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)', paddingLeft: 'var(--spacing-xl)', paddingRight: 'var(--spacing-md)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', margin: 0, fontSize: '2rem', color: 'var(--md-sys-color-on-surface)' }}>Dashboard</h2>
        <div>
          <select value={filterMonth} onChange={e => setFilterMonth(parseInt(e.target.value))} className="input-field" style={{ marginRight: '8px' }}>
            <option value={new Date().getMonth() - 1}>Last Month</option>
            <option value={new Date().getMonth()}>This Month</option>
          </select>
          <Button onClick={handleExport} variant="secondary">Export CSV</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
        <Card>
          <h3 style={{ fontFamily: 'var(--font-display)', margin: '0 0 var(--spacing-md) 0', color: 'var(--md-sys-color-on-surface)' }}>Total Balance</h3>
          <p style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 'bold', margin: 0 }}>{summary?.totalBalance.toFixed(2)} {user?.preferences.currency}</p>
        </Card>
        <Card>
          <h3 style={{ fontFamily: 'var(--font-display)', margin: '0 0 var(--spacing-md) 0', color: 'var(--md-sys-color-on-surface)' }}>Monthly Income</h3>
          <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 'bold', color: 'var(--md-sys-color-secondary)', margin: 0 }}>{summary?.monthlyIncome.toFixed(2)} {user?.preferences.currency}</p>
        </Card>
        <Card>
          <h3 style={{ fontFamily: 'var(--font-display)', margin: '0 0 var(--spacing-md) 0', color: 'var(--md-sys-color-on-surface)' }}>Monthly Expense</h3>
          <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 'bold', color: 'var(--md-sys-color-tertiary)', margin: 0 }}>{summary?.monthlyExpense.toFixed(2)} {user?.preferences.currency}</p>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-xl)' }}>
        <Charts data={chartData} />
        <div style={{ backgroundColor: 'var(--md-sys-color-surface-container)', padding: 'var(--spacing-lg)', borderRadius: 'var(--border-radius-card)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', marginTop: 0, marginBottom: 'var(--spacing-lg)', color: 'var(--md-sys-color-on-surface)' }}>Recent Transactions</h3>
          <TransactionList transactions={filteredTransactions.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}
