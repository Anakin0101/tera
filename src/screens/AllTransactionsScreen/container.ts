import { useEffect, useMemo, useState } from 'react';
import { TransactionFilters } from './AllTransactionsScreen.types';
import { useGetCustomerOperationsMutation } from 'services/apis/dashboardAPI/dashboardAPI';
import { groupTransactionsByDate } from 'utils/groupData';
import { getCurrentDateISO, getDateThreeMonthAgeISO } from 'utils/formatDate';

export const useAllTransactions = () => {
  const [getCustomerOperations, { data: customerOperations }] = useGetCustomerOperationsMutation();
  const [filters, setFilters] = useState<TransactionFilters>({
    startDate: '',
    endDate: '',
    iban: '',
    currency: null,
    type: '',
  });

  useEffect(() => {
    getCustomerOperations({
      count: 20,
      startDate: getDateThreeMonthAgeISO(),
      endDate: getCurrentDateISO(),
      accountNumber: null,
    });
  }, [getCustomerOperations]);

  const sections = useMemo(() => {
    if (!customerOperations) {
      return;
    }
    const groupedTransactions = groupTransactionsByDate(customerOperations);
    return groupedTransactions;
  }, [customerOperations]);

  return {
    filters,
    setFilters,
    sections,
  };
};
