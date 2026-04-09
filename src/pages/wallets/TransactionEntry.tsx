import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { walletService } from '../../services/walletService';
import { transactionService } from '../../services/transactionService';
import { categoryService } from '../../services/categoryService';
import { Card, Input, Button } from '../../components/primitives';

export default function TransactionEntry() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  
  const [type, setType] = useState<'income' | 'expense' | 'transfer'>('expense');
  const [walletId, setWalletId] = useState('');
  const [destWalletId, setDestWalletId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const { data: wallets } = useQuery({
    queryKey: ['wallets', user?.id],
    queryFn: () => walletService.getWallets(user!.id),
    enabled: !!user,
  });

  const { data: categories } = useQuery({
    queryKey: ['categories', user?.id],
    queryFn: () => categoryService.getCategories(user!.id),
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: (tx: any) => transactionService.createTransaction(tx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['wallets'] });
      setAmount('');
      setNote('');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !walletId) return;

    mutation.mutate({
      userId: user.id,
      walletId,
      destinationWalletId: type === 'transfer' ? destWalletId : undefined,
      categoryId,
      type,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      note,
    });
  };

  const activeCategories = categories?.filter(c => !c.isArchived && c.type === type) || [];

  return (
    <Card style={{ marginBottom: 'var(--spacing-md)' }}>
      <h3>Log Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Type</label>
          <select value={type} onChange={e => { setType(e.target.value as any); setCategoryId(''); }} className="input-field">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>

        <div className="input-group">
          <label>From Wallet</label>
          <select value={walletId} onChange={e => setWalletId(e.target.value)} required className="input-field">
            <option value="">Select a wallet...</option>
            {wallets?.map(w => <option key={w.id} value={w.id}>{w.name} ({w.balance})</option>)}
          </select>
        </div>

        {type === 'transfer' && (
          <div className="input-group">
            <label>To Wallet</label>
            <select value={destWalletId} onChange={e => setDestWalletId(e.target.value)} required className="input-field">
              <option value="">Select a wallet...</option>
              {wallets?.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
            </select>
          </div>
        )}

        <div className="input-group">
          <label>Category</label>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required className="input-field">
            <option value="">Select a category...</option>
            {activeCategories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
          </select>
        </div>

        <Input type="number" step="0.01" label="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
        <Input label="Note" value={note} onChange={e => setNote(e.target.value)} />
        
        <Button type="submit" disabled={mutation.isPending}>Save Transaction</Button>
      </form>
    </Card>
  );
}
