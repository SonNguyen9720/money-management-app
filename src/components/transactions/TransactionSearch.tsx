import React from 'react';
import './transactions.css';

interface TransactionSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const TransactionSearch: React.FC<TransactionSearchProps> = ({ value, onChange }) => {
  return (
    <section className="search-section">
      <div className="search-container">
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search transactions, merchants, or notes..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <button className="filter-btn">
          <span className="material-symbols-outlined filter-icon">calendar_today</span>
          Date
        </button>
        <button className="filter-btn">
          <span className="material-symbols-outlined filter-icon">category</span>
          Category
        </button>
        <button className="filter-btn">
          <span className="material-symbols-outlined filter-icon">account_balance_wallet</span>
          Wallets
        </button>
      </div>
    </section>
  );
};

export default TransactionSearch;
