import { useState } from 'react';
import { TransactionFilters } from './AllTransactionsScreen.types';

export const useAllTransactions = () => {
  const [filters, setFilters] = useState<TransactionFilters>({
    startDate: '',
    endDate: '',
    iban: '',
    currency: null,
    type: '',
  });

  return {
    filters,
    setFilters,
  };
};
