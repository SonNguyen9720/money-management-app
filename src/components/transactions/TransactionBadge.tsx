import React from 'react';
import './transactions.css';

interface TransactionBadgeProps {
  status: 'Pending' | 'Completed';
}

const TransactionBadge: React.FC<TransactionBadgeProps> = ({ status }) => {
  return (
    <span className={`transaction-badge ${status.toLowerCase()}`}>
      {status}
    </span>
  );
};

export default TransactionBadge;
