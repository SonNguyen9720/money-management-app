import React from 'react';
import type { TransactionListItem } from '../../pages/transactions/types';
import './transactions.css';

interface TransactionItemProps {
  transaction: TransactionListItem;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isIncome = transaction.type === 'income';
  const iconName = isIncome ? 'payments' : 'receipt_long';
  const iconBgClass = isIncome ? 'bg-secondary-container' : 'bg-tertiary-fixed';
  const iconColorClass = isIncome ? 'text-on-secondary-container' : 'text-on-tertiary-fixed-variant';

  return (
    <div className="transaction-item group">
      <div className={`transaction-icon-box ${iconBgClass} ${iconColorClass}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{iconName}</span>
      </div>
      
      <div className="transaction-item-main flex-1 min-w-0">
        <h4 className="transaction-merchant truncate">{transaction.note || 'Untitled Transaction'}</h4>
        <div className="transaction-subtext">
          <span className="text-xs text-outline">{new Date(transaction.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="transaction-category-badge">{transaction.type}</span>
        </div>
      </div>

      <div className="transaction-amount-container text-right">
        <p className={`transaction-amount ${isIncome ? 'text-secondary' : 'text-tertiary'}`}>
          {transaction.formattedAmount}
        </p>
        <p className="transaction-status-text">
          {transaction.status}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
