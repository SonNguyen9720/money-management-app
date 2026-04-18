import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { billService } from '../../services/billService';
import { Card, Input, Button } from '../../components/primitives';

export default function BillsPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { data: bills } = useQuery({
    queryKey: ['bills', user?.id],
    queryFn: () => billService.getBills(user!.id),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: (newBill: any) => billService.createBill(newBill),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bills'] })
  });

  const markPaidMutation = useMutation({
    mutationFn: (id: string) => billService.markPaid(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bills'] })
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      createMutation.mutate({
        userId: user.id,
        name,
        amount: parseFloat(amount),
        dueDate,
        isRecurring: false,
      });
      setName('');
      setAmount('');
      setDueDate('');
    }
  };

  return (
    <div>
      <h2>Upcoming Bills</h2>
      <Card style={{ marginBottom: 'var(--spacing-md)' }}>
        <h3>Schedule Bill</h3>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, marginBottom: 0 }}>
            <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div style={{ flex: 1, marginBottom: 0 }}>
            <Input type="number" step="0.01" label="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <div style={{ flex: 1, marginBottom: 0 }}>
            <Input type="date" label="Due Date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
          </div>
          <Button type="submit" disabled={createMutation.isPending}>Add Bill</Button>
        </form>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        {bills?.filter(b => !b.isPaid).map(bill => {
          const isOverdue = new Date(bill.dueDate) < new Date();
          return (
            <Card key={bill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: isOverdue ? '2px solid var(--danger-color)' : undefined }}>
              <div>
                <strong>{bill.name}</strong> - {bill.amount.toFixed(2)} {user?.preferences.currency}
                <div style={{ fontSize: '0.875rem', color: isOverdue ? 'var(--danger-color)' : 'var(--text-secondary)' }}>
                  Due: {new Date(bill.dueDate).toLocaleDateString()}
                </div>
              </div>
              <Button onClick={() => markPaidMutation.mutate(bill.id)}>Mark Paid</Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
