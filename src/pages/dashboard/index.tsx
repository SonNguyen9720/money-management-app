import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { analyticsService } from '../../services/analyticsService';
import { transactionService } from '../../services/transactionService';
import { exportToCSV } from '../../utils/csvExport';
import { Button } from '../../components/primitives';
import '../../styles/dashboard.css';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [filterMonth] = useState(new Date().getMonth());

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
    return transactions.filter(t => new Date(t.date).getMonth() === filterMonth).slice(0, 5);
  }, [transactions, filterMonth]);

  const handleExport = () => {
    if (filteredTransactions.length > 0) {
      exportToCSV(filteredTransactions, `transactions-${filterMonth}.csv`);
    }
  };

  const totalBalance = summary?.totalBalance || 0;
  const income = summary?.monthlyIncome || 0;
  const expense = summary?.monthlyExpense || 0;
  const netCashFlow = income - expense;

  // Dummy data to match the design aesthetics when logic is not yet fully implemented
  const growth = 12.5;
  const monthlyGrowthValue = 15820.00;
  const savingsGoalProgress = 65;
  const topBudgets = [
    { name: 'Food & Drink', spent: 850, limit: 1200, color: 'var(--md-sys-color-primary)' },
    { name: 'Housing', spent: 2100, limit: 2100, color: 'var(--md-sys-color-tertiary)' },
    { name: 'Entertainment', spent: 320, limit: 500, color: 'var(--md-sys-color-secondary)' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Header Section */}
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Portfolio Overview</h1>
          <p className="dashboard-subtitle">Welcome back, your financial digest is ready.</p>
        </div>
        <div className="dashboard-actions">
          <Button onClick={handleExport} variant="secondary">Download Report</Button>
          <Button variant="primary" style={{ boxShadow: '0 4px 12px rgba(0,86,210,0.2)' }}>Transfer Funds</Button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="dashboard-bento">

        {/* 1. Total Balance Hero Card */}
        <div className="bento-hero hero-card">
          <div className="hero-bg-glow"></div>
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
            <div>
              <span className="hero-label">Total Available Balance</span>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <h2 className="hero-balance">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: user?.preferences.currency || 'USD' }).format(totalBalance)}
                </h2>
                <div className="hero-growth-badge">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>trending_up</span>
                  {growth}%
                </div>
              </div>
            </div>
            <div style={{ marginTop: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '96px', width: '100%', maxWidth: '300px' }}>
                {/* Simulated Chart Bars */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '100%', height: '50%', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}></div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.3)', width: '100%', height: '75%', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}></div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: '100%', height: '66%', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}></div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.4)', width: '100%', height: '80%', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}></div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.3)', width: '100%', height: '50%', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}></div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.5)', width: '100%', height: '100%', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}></div>
                <div style={{ backgroundColor: 'var(--md-sys-color-secondary-fixed)', width: '100%', height: '100%', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', boxShadow: '0 0 15px rgba(172,244,164,0.5)' }}></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px 0' }}>Monthly Growth</p>
                <p style={{ color: 'white', fontWeight: 700, fontFamily: 'var(--font-display)', fontSize: '1.25rem', margin: 0 }}>
                  +{new Intl.NumberFormat('en-US', { style: 'currency', currency: user?.preferences.currency || 'USD' }).format(monthlyGrowthValue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2 & 3. Income/Expense & Cash Flow */}
        <div className="bento-side">
          <div className="stat-card-row">
            <div className="stat-card">
              <div className="stat-icon income">
                <span className="material-symbols-outlined">south_west</span>
              </div>
              <p className="stat-label">Income</p>
              <p className="stat-value">{new Intl.NumberFormat('en-US', { style: 'currency', currency: user?.preferences.currency || 'USD', maximumFractionDigits: 0 }).format(income)}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon expense">
                <span className="material-symbols-outlined">north_east</span>
              </div>
              <p className="stat-label">Expenses</p>
              <p className="stat-value">{new Intl.NumberFormat('en-US', { style: 'currency', currency: user?.preferences.currency || 'USD', maximumFractionDigits: 0 }).format(expense)}</p>
            </div>
          </div>

          <div className="cash-flow-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p className="stat-label">Net Cash Flow</p>
                <h3 className="stat-value" style={{ fontSize: '1.875rem' }}>
                  {netCashFlow >= 0 ? '+' : ''}{new Intl.NumberFormat('en-US', { style: 'currency', currency: user?.preferences.currency || 'USD', maximumFractionDigits: 0 }).format(netCashFlow)}
                </h3>
              </div>
              <span style={{ backgroundColor: 'var(--md-sys-color-secondary-container)', color: 'var(--md-sys-color-on-secondary-container)', padding: '4px 12px', borderRadius: '9999px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em' }}>
                Surplus reached
              </span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ backgroundColor: 'var(--md-sys-color-secondary)', width: '72%' }}></div>
            </div>
            <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '11px', fontWeight: 500, lineHeight: 1.2, margin: 0 }}>
              You've saved 35% more than last month. Excellent trajectory.
            </p>
          </div>
        </div>

        {/* 4. Top Budgets */}
        <div className="bento-card bento-budgets">
          <div className="bento-card-title">
            <span>Top Budgets</span>
            <span className="material-symbols-outlined" style={{ color: 'var(--text-secondary)' }}>more_horiz</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {topBudgets.map((budget, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{budget.name}</span>
                  <span style={{ color: 'var(--md-sys-color-on-surface)' }}>${budget.spent} / ${budget.limit}</span>
                </div>
                <div className="progress-bar-bg" style={{ height: '8px', margin: 0 }}>
                  <div className="progress-bar-fill" style={{ backgroundColor: budget.color, width: `${Math.min((budget.spent / budget.limit) * 100, 100)}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <button style={{ width: '100%', marginTop: '32px', padding: '12px', color: 'var(--md-sys-color-primary)', fontSize: '0.875rem', fontWeight: 700, borderTop: '1px solid rgba(195, 198, 214, 0.3)', backgroundColor: 'transparent', borderLeft: 'none', borderRight: 'none', borderBottom: 'none', cursor: 'pointer', borderRadius: '12px' }}>
            View All Budgets
          </button>
        </div>

        {/* 5. Recent Transactions */}
        <div className="bento-card bento-activity">
          <div className="bento-card-title">
            <span>Recent Activity</span>
            <button style={{ color: 'var(--md-sys-color-primary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer' }}>See All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {filteredTransactions.length > 0 ? filteredTransactions.map((tx) => (
              <div key={tx.id} className="activity-item">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="activity-icon-box">
                    <span className="material-symbols-outlined" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                      {tx.type === 'expense' ? 'shopping_bag' : 'payments'}
                    </span>
                  </div>
                  <div>
                    <p className="activity-title">{tx.note || (tx.type === 'expense' ? 'Payment' : 'Income')}</p>
                    <p className="activity-subtitle">{tx.type === 'expense' ? 'Expense' : 'Income'} • {new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`activity-amount ${tx.type === 'expense' ? 'negative' : 'positive'}`}>
                  {tx.type === 'expense' ? '-' : '+'}{new Intl.NumberFormat('en-US', { style: 'currency', currency: user?.preferences.currency || 'USD' }).format(tx.amount)}
                </span>
              </div>
            )) : (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: '24px 0' }}>No recent activity.</p>
            )}
          </div>
        </div>

        {/* 6. Savings Goal Doughnut */}
        <div className="bento-card bento-savings" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 className="bento-card-title" style={{ width: '100%', marginBottom: '24px' }}>Savings Goal</h3>
          <div className="doughnut-wrapper">
            <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--md-sys-color-surface-container-low)" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--md-sys-color-primary)" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset={`${251.2 - (251.2 * savingsGoalProgress) / 100}`} style={{ strokeLinecap: 'round' }} />
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.875rem', fontWeight: 900, color: 'var(--md-sys-color-on-surface)' }}>{savingsGoalProgress}%</span>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <p style={{ fontWeight: 700, color: 'var(--md-sys-color-on-surface)', margin: 0 }}>New Car Fund</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>$45,500 of $70,000</p>
          </div>
          <button style={{ marginTop: '24px', backgroundColor: 'var(--md-sys-color-surface-container-low)', color: 'var(--md-sys-color-on-surface)', fontSize: '0.75rem', fontWeight: 700, padding: '8px 24px', borderRadius: '9999px', border: 'none', cursor: 'pointer' }}>
            Add Funds
          </button>
        </div>

      </div>
    </div>
  );
}
