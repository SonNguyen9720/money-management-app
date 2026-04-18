import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { goalService } from '../../services/goalService';
import { Card, Input, Button } from '../../components/primitives';

export default function GoalsPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');

  const { data: goals } = useQuery({
    queryKey: ['goals', user?.id],
    queryFn: () => goalService.getGoals(user!.id),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: (newGoal: any) => goalService.createGoal(newGoal),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['goals'] })
  });

  const contributeMutation = useMutation({
    mutationFn: ({ id, amount }: { id: string, amount: number }) => goalService.contribute(id, amount),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['goals'] })
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      createMutation.mutate({
        userId: user.id,
        name,
        targetAmount: parseFloat(targetAmount)
      });
      setName('');
      setTargetAmount('');
    }
  };

  return (
    <div>
      <h2>Financial Goals</h2>
      <Card style={{ marginBottom: 'var(--spacing-md)' }}>
        <h3>New Goal</h3>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, marginBottom: 0 }}>
            <Input label="Goal Name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div style={{ flex: 1, marginBottom: 0 }}>
            <Input type="number" step="0.01" label="Target Amount" value={targetAmount} onChange={e => setTargetAmount(e.target.value)} required />
          </div>
          <Button type="submit" disabled={createMutation.isPending}>Add Goal</Button>
        </form>
      </Card>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
        {goals?.map(goal => {
          const percent = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

          return (
            <Card key={goal.id}>
              <h4>{goal.name} {goal.status === 'completed' && '🎉'}</h4>
              <p>{goal.currentAmount.toFixed(2)} / {goal.targetAmount.toFixed(2)} {user?.preferences.currency}</p>
              <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${percent}%`, height: '100%', background: 'var(--success-color)' }} />
              </div>
              
              {goal.status !== 'completed' && (
                <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', gap: '8px' }}>
                  <Button variant="secondary" onClick={() => contributeMutation.mutate({ id: goal.id, amount: 50 })}>+ 50</Button>
                  <Button variant="secondary" onClick={() => contributeMutation.mutate({ id: goal.id, amount: 100 })}>+ 100</Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
