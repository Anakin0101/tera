import { useEffect, useMemo, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { MainStackRouteProps } from 'navigation/types';
import { groupTransactionsByDate } from 'utils/groupData';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useGetCustomerOperationsMutation } from 'services/apis/dashboardAPI/dashboardAPI';
import { getCurrentDateISO, getDateThreeMonthAgeISO, getISOString } from 'utils/formatDate';
import { TransactionFilters } from './AllTransactionsScreen.types';

export const useAllTransactions = () => {
  const { params } = useRoute<MainStackRouteProps<'AllTransactionsScreen'>>();
  const [search, onChangeText] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const { groupedAccountsByIban } = useAppSelector(state => state.products);
  const [getCustomerOperations, { data: customerOperations }] = useGetCustomerOperationsMutation();
  const [filters, setFilters] = useState<TransactionFilters>({
    startDate: '',
    endDate: '',
    accountNumber: null,
    currency: null,
    category: null,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    getCustomerOperations({
      count: 20,
      startDate: filters.startDate ? getISOString(filters.startDate) : getDateThreeMonthAgeISO(),
      endDate: filters.endDate ? getISOString(filters.endDate) : getCurrentDateISO(),
      accountNumber: filters.accountNumber || params?.accountNumber,
      opCategory: filters.category,
      currency: filters.currency,
      searchWords: debouncedValue,
      splitOps: true,
    });
  }, [filters, debouncedValue, getCustomerOperations, params?.accountNumber]);

  const sections = useMemo(() => {
    if (!customerOperations) {
      return;
    }
    const groupedTransactions = groupTransactionsByDate(customerOperations);
    return groupedTransactions;
  }, [customerOperations]);

  const iban = useMemo(() => {
    return groupedAccountsByIban.find(acc => acc.accountNumber === filters.accountNumber)?.iban;
  }, [filters.accountNumber, groupedAccountsByIban]);

  return {
    filters,
    setFilters,
    sections,
    onChangeText,
    search,
    iban,
  };
};
