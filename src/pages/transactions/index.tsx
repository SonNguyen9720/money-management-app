import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { transactionService } from '../../services/transactionService';
import TransactionList from '../../components/transactions/TransactionList';
import { inferStatus, formatDate, formatAmount } from './utils';
import type { TransactionListItem, QuickAddTemplate } from './types';
import TransactionSearch from '../../components/transactions/TransactionSearch';
import QuickAddTemplates from '../../components/transactions/QuickAddTemplates';
import PaginationControls from '../../components/transactions/PaginationControls';
import '../../components/transactions/transactions.css';

const TransactionsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions', user?.id],
    queryFn: () => transactionService.getTransactions(user!.id),
    enabled: !!user,
  });

  const handleTemplateSelect = (template: QuickAddTemplate) => {
    alert(`Quick Add: ${template.label} template selected. Creation flow coming soon!`);
  };

  const filteredTransactions = transactions.filter(tx => {
    const query = searchQuery.toLowerCase();
    return (
      (tx.note || '').toLowerCase().includes(query) ||
      tx.amount.toString().includes(query) ||
      tx.type.toLowerCase().includes(query)
    );
  });

  const totalItems = filteredTransactions.length;
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const processedTransactions: TransactionListItem[] = paginatedTransactions.map(tx => ({
    ...tx,
    status: inferStatus(tx.date),
    formattedDate: formatDate(tx.date),
    formattedAmount: formatAmount(tx.amount, tx.type),
  }));

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="transactions-page-container">
      <header className="transactions-header">
        <h1 className="transactions-title">Transactions</h1>
      </header>

      <QuickAddTemplates onSelect={handleTemplateSelect} />

      <TransactionSearch value={searchQuery} onChange={handleSearchChange} />
      
      <TransactionList 
        transactions={processedTransactions} 
        isLoading={isLoading} 
      />

      <PaginationControls 
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TransactionsPage;
