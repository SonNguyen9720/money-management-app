import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { budgetService } from '../../services/budgetService';
import { transactionService } from '../../services/transactionService';
import { categoryService } from '../../services/categoryService';
import { Card, Input, Button } from '../../components/primitives';

export default function BudgetsPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const { data: budgets } = useQuery({
    queryKey: ['budgets', user?.id],
    queryFn: () => budgetService.getBudgets(user!.id),
    enabled: !!user,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories', user?.id],
    queryFn: () => categoryService.getCategories(user!.id),
    enabled: !!user,
  });

  const { data: transactions } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: () => transactionService.getTransactions(user!.id),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: (newBudget: any) => budgetService.createBudget(newBudget),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['budgets'] })
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      createMutation.mutate({
        userId: user.id,
        amount: parseFloat(amount),
        categoryId: categoryId || undefined,
        period: 'monthly'
      });
      setAmount('');
    }
  };

  const getExpensesForCategory = (catId?: string) => {
    if (!transactions) return 0;
    return transactions
      .filter(t => t.type === 'expense' && (!catId || t.categoryId === catId))
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div>
      <h2>Budgets</h2>
      <Card style={{ marginBottom: 'var(--spacing-md)' }}>
        <h3>Set Budget</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Category (Optional)</label>
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="input-field">
              <option value="">Overall Budget</option>
              {categories?.filter(c => c.type === 'expense').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
            <Input type="number" step="0.01" label="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <Button type="submit" disabled={createMutation.isPending}>Add Budget</Button>
        </form>
      </Card>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
        {budgets?.map(budget => {
          const spent = getExpensesForCategory(budget.categoryId || undefined);
          const percent = Math.min((spent / budget.amount) * 100, 100);
          const over = spent > budget.amount;
          const catName = budget.categoryId ? categories?.find(c => c.id === budget.categoryId)?.name : 'Overall';

          return (
            <Card key={budget.id} style={{ border: over ? '2px solid var(--danger-color)' : undefined }}>
              <h4>{catName} Budget</h4>
              <p>{spent.toFixed(2)} / {budget.amount.toFixed(2)} {user?.preferences.currency}</p>
              <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${percent}%`, height: '100%', background: over ? 'var(--danger-color)' : 'var(--accent-color)' }} />
              </div>
              {over && <p style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '8px' }}>⚠️ Over budget!</p>}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
