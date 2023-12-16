import { useEffect, useMemo, useState } from 'react';
import { TransactionFilters } from './AllTransactionsScreen.types';
import { useGetCustomerOperationsMutation } from 'services/apis/dashboardAPI/dashboardAPI';
import { groupTransactionsByDate } from 'utils/groupData';
import dayjs from 'dayjs';

const currentDate = dayjs().toISOString();
const threeMonthsAgo = dayjs().subtract(3, 'month').toISOString();

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
      startDate: threeMonthsAgo,
      endDate: currentDate,
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
