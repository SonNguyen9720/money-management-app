import React from 'react';
import { Card } from '../primitives';
import { Wallet, Transaction } from '../../utils/schemas';

export const WalletCard: React.FC<{ wallet: Wallet }> = ({ wallet }) => (
  <Card style={{ marginBottom: 'var(--spacing-sm)' }}>
    <h3 style={{ margin: '0 0 8px 0' }}>{wallet.name} ({wallet.type})</h3>
    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
      {Number(wallet.balance).toFixed(2)} {wallet.currency}
    </p>
  </Card>
);

export const TransactionList: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
  <div>
    {transactions.map(tx => (
      <Card key={tx.id} style={{ marginBottom: 'var(--spacing-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong style={{ display: 'block' }}>{tx.note || tx.type.toUpperCase()}</strong>
          <small>{new Date(tx.date).toLocaleDateString()}</small>
        </div>
        <div style={{ color: tx.type === 'income' ? 'var(--success-color)' : 'var(--danger-color)', fontWeight: 'bold' }}>
          {tx.type === 'income' ? '+' : '-'}{Number(tx.amount).toFixed(2)}
        </div>
      </Card>
    ))}
  </div>
);
