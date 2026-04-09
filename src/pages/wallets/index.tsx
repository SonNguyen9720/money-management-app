import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { walletService } from '../../services/walletService';
import { transactionService } from '../../services/transactionService';
import { WalletCard, TransactionList } from '../../components/domain';
import { Button, Input, Card } from '../../components/primitives';
import TransactionEntry from './TransactionEntry';

export default function WalletsPage() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<'bank' | 'cash' | 'credit'>('bank');
  const [balance, setBalance] = useState('0');

  const { data: wallets, isLoading: loadingWallets } = useQuery({
    queryKey: ['wallets', user?.id],
    queryFn: () => walletService.getWallets(user!.id),
    enabled: !!user,
  });

  const { data: transactions } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: () => transactionService.getTransactions(user!.id),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: (newWallet: Parameters<typeof walletService.createWallet>[0]) => walletService.createWallet(newWallet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      setIsCreating(false);
    }
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      createMutation.mutate({
        userId: user.id,
        name,
        type,
        balance: parseFloat(balance),
        currency: user.preferences.currency,
      });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
        <h2>My Wallets</h2>
        <Button onClick={() => setIsCreating(!isCreating)}>{isCreating ? 'Cancel' : 'Add Wallet'}</Button>
      </div>

      {isCreating && (
        <Card style={{ marginBottom: 'var(--spacing-md)' }}>
          <form onSubmit={handleCreate}>
            <Input label="Wallet Name" value={name} onChange={e => setName(e.target.value)} required />
            <div className="input-group">
              <label>Type</label>
              <select value={type} onChange={e => setType(e.target.value as any)} className="input-field">
                <option value="bank">Bank</option>
                <option value="cash">Cash</option>
                <option value="credit">Credit</option>
              </select>
            </div>
            <Input type="number" step="0.01" label="Initial Balance" value={balance} onChange={e => setBalance(e.target.value)} required />
            <Button type="submit" disabled={createMutation.isPending}>Save Wallet</Button>
          </form>
        </Card>
      )}

      {loadingWallets ? <p>Loading wallets...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
          {wallets?.map(w => <WalletCard key={w.id} wallet={w} />)}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
        <div>
          <TransactionEntry />
        </div>
        <div>
          <h2>Recent Transactions</h2>
          {transactions && <TransactionList transactions={transactions.slice(0, 10)} />}
        </div>
      </div>
    </div>
  );
}
