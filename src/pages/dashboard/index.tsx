import React, { useState, useMemo } from 'react';
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
        <h2>Dashboard</h2>
        <div>
          <select value={filterMonth} onChange={e => setFilterMonth(parseInt(e.target.value))} className="input-field" style={{ marginRight: '8px' }}>
            <option value={new Date().getMonth() - 1}>Last Month</option>
            <option value={new Date().getMonth()}>This Month</option>
          </select>
          <Button onClick={handleExport} variant="secondary">Export CSV</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
        <Card>
          <h3>Total Balance</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{summary?.totalBalance.toFixed(2)} {user?.preferences.currency}</p>
        </Card>
        <Card>
          <h3>Monthly Income</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>{summary?.monthlyIncome.toFixed(2)} {user?.preferences.currency}</p>
        </Card>
        <Card>
          <h3>Monthly Expense</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--danger-color)' }}>{summary?.monthlyExpense.toFixed(2)} {user?.preferences.currency}</p>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
        <Charts data={chartData} />
        <div>
          <h3>Recent Transactions</h3>
          <TransactionList transactions={filteredTransactions.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
}
