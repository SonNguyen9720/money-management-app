import React from 'react';
import { Card } from '../primitives';
import type { Wallet, Transaction } from '../../utils/schemas';

export const WalletCard: React.FC<{ wallet: Wallet }> = ({ wallet }) => (
  <Card style={{ marginBottom: 'var(--spacing-md)' }}>
    <h3 style={{ fontFamily: 'var(--font-display)', margin: '0 0 var(--spacing-sm) 0', color: 'var(--md-sys-color-on-surface)' }}>{wallet.name} ({wallet.type})</h3>
    <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 'bold', margin: 0 }}>
      {Number(wallet.balance).toFixed(2)} {wallet.currency}
    </p>
  </Card>
);

export const TransactionList: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
    {transactions.map(tx => (
      <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <strong style={{ display: 'block', color: 'var(--md-sys-color-on-surface)' }}>{tx.note || tx.type.toUpperCase()}</strong>
          <small style={{ color: 'var(--text-secondary)' }}>{new Date(tx.date).toLocaleDateString()}</small>
        </div>
        <div style={{ 
            color: tx.type === 'income' ? 'var(--md-sys-color-on-secondary-container)' : 'var(--md-sys-color-tertiary)', 
            backgroundColor: tx.type === 'income' ? 'var(--md-sys-color-secondary-container)' : 'var(--md-sys-color-tertiary-fixed)',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontWeight: 'bold',
            fontSize: '0.875rem'
        }}>
          {tx.type === 'income' ? '+' : '-'}{Number(tx.amount).toFixed(2)}
        </div>
      </div>
    ))}
  </div>
);
