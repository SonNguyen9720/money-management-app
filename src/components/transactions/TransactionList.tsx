import React from 'react';
import TransactionItem from './TransactionItem';
import type { TransactionListItem } from '../../pages/transactions/types';
import './transactions.css';

interface TransactionListProps {
  transactions: TransactionListItem[];
  isLoading?: boolean;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, isLoading }) => {
  if (isLoading) {
    return (
      <div className="transaction-list-loading">
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton-group">
            <div className="skeleton-header" style={{ height: '20px', width: '100px', backgroundColor: 'var(--md-sys-color-surface-container-high)', marginBottom: 'var(--spacing-md)', borderRadius: '4px' }}></div>
            {[1, 2].map(j => (
              <div key={j} className="skeleton-item" style={{ height: '60px', backgroundColor: 'var(--md-sys-color-surface-container-low)', marginBottom: 'var(--spacing-sm)', borderRadius: '12px' }}></div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return <div className="transaction-list-empty">No transactions found.</div>;
  }

  // Group by formattedDate
  const groups: { [date: string]: TransactionListItem[] } = {};
  transactions.forEach(tx => {
    if (!groups[tx.formattedDate]) {
      groups[tx.formattedDate] = [];
    }
    groups[tx.formattedDate].push(tx);
  });

  return (
    <div className="transaction-list">
      {Object.entries(groups).map(([date, items]) => (
        <div key={date} className="transaction-list-group">
          <div className="transaction-date-header-container">
            <h2 className="transaction-date-header">{date}</h2>
            <span className="transaction-date-count">{items.length} Transactions</span>
          </div>
          <div className="transaction-items-wrapper">
            {items.map(item => (
              <TransactionItem key={item.id} transaction={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
