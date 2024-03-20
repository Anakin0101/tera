import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { MainStackRouteProps } from 'navigation/types';
import { groupBlockedTransactionsByTime, groupTransactionsByDate } from 'utils/groupData';
import { useAppSelector } from 'store/hooks/useAppSelector';
import {
  useGetAccountsByCustomerIdQuery,
  useGetCustomerOperationsMutation,
  useLazyGetBlockedTransactionsQuery,
} from 'services/apis';
import { getCurrentDateISO, getDateThreeMonthAgeISO, getISOString } from 'utils/formatDate';
import { TransactionFilters } from './AllTransactionsScreen.types';
import {
  BlockedTransactionType,
  CustomerOperationsReq,
  BlockedTransactionExtendedType,
} from 'services/apis/productsAPI/productsAPI.types';
import { useAsyncError } from 'hooks/useAsyncError';

const initialFilters = {
  startDate: '',
  endDate: '',
  accountNumber: null,
  currency: null,
  category: null,
};

export const useAllTransactions = () => {
  const { params } = useRoute<MainStackRouteProps<'AllTransactionsScreen'>>();
  const [search, onChangeText] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const { groupedAccountsByIban } = useAppSelector(state => state.products);
  const [
    getCustomerOperations,
    {
      data: customerOperations,
      isLoading: customerOperationsLoading,
      error: customerOperationsError,
    },
  ] = useGetCustomerOperationsMutation();
  const [blockedTransactionsLocal, setBlockedTransactionsLocal] = useState<
    BlockedTransactionExtendedType[] | undefined
  >();

  const [
    getBlockedTransactions,
    { isLoading: blockedTransactionsLoading, error: blockedTransactionsError },
  ] = useLazyGetBlockedTransactionsQuery();

  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    isError: accountsError,
  } = useGetAccountsByCustomerIdQuery();

  const throwError = useAsyncError();
  const [filters, setFilters] = useState<TransactionFilters>(initialFilters);

  useEffect(() => {
    if (customerOperationsError) {
      throwError('customerOperationsError');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerOperationsError]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const getCustomerOps = useCallback(() => {
    const request: CustomerOperationsReq = {
      count: 20,
      startDate: filters.startDate ? getISOString(filters.startDate) : getDateThreeMonthAgeISO(),
      endDate: filters.endDate ? getISOString(filters.endDate) : getCurrentDateISO(),
      searchWords: debouncedValue,
      splitOps: true,
    };

    if (filters?.currency) {
      request.currency = filters.currency;
    }

    if (filters?.category) {
      request.opCategory = filters.category;
    }

    if (filters.accountNumber || params?.accountNumber) {
      request.accountNumber = filters.accountNumber || params?.accountNumber;
    }

    getCustomerOperations(request);
  }, [debouncedValue, filters, params?.accountNumber, getCustomerOperations]);

  //   Account & BlockedTransactionType

  const getMoreDetailsAboutBlockedTransactions = useCallback(
    (transactions: BlockedTransactionType[]): BlockedTransactionExtendedType[] => {
      if (!isLoadingAccounts && !accountsError && accounts) {
        return transactions
          .map(transaction => {
            const account = accounts.find(acc => acc.accountId === transaction.accountId);
            if (!account) {
              return null; // Handle this case appropriately
            }

            return {
              ...transaction,
              description: transaction.owner,
              docDate: transaction.time,
              currency: account.ccy,
              isIncome: false,
              id: transaction.accountId,
            };
          })
          .filter((t): t is BlockedTransactionExtendedType => !!t);
      }
      return [];
    },
    [accounts, accountsError, isLoadingAccounts],
  );

  const requestBlockedTransactions = async () => {
    setFilters(initialFilters);
    const result = await getBlockedTransactions({});
    if (result && result.data) {
      //   setBlockedTransactionsLocal(result.data);
      const extendedTransactions = getMoreDetailsAboutBlockedTransactions(result.data);
      setBlockedTransactionsLocal(extendedTransactions);
    }
  };

  useEffect(() => {
    getCustomerOps();
  }, [getCustomerOps]);

  useEffect(() => {
    // Define a function to check if any filter other than 'blocked' is applied
    const isAnyNonBlockedFilterApplied = () => {
      return (
        filters.startDate !== initialFilters.startDate ||
        filters.endDate !== initialFilters.endDate ||
        filters.accountNumber !== initialFilters.accountNumber ||
        filters.currency !== initialFilters.currency ||
        filters.category !== initialFilters.category
      );
    };

    // Check if any non-blocked filter is applied
    if (isAnyNonBlockedFilterApplied() && blockedTransactionsLocal?.length) {
      setBlockedTransactionsLocal([]);
    }
  }, [blockedTransactionsLocal?.length, filters]);

  const sections = useMemo(() => {
    if (!customerOperations) {
      return;
    }

    const groupedTransactions = blockedTransactionsLocal?.length
      ? groupBlockedTransactionsByTime(
          getMoreDetailsAboutBlockedTransactions(blockedTransactionsLocal),
        )
      : groupTransactionsByDate(customerOperations);

    return groupedTransactions;
  }, [customerOperations, blockedTransactionsLocal, getMoreDetailsAboutBlockedTransactions]);

  const iban = useMemo(() => {
    return groupedAccountsByIban.find(acc => acc.accountNumber === filters.accountNumber)?.iban;
  }, [filters.accountNumber, groupedAccountsByIban]);

  const blockedTransactionsFilterActive = useMemo(() => {
    return !!blockedTransactionsLocal?.length;
  }, [blockedTransactionsLocal]);

  const clearBlockedTransactions = useCallback(() => {
    setBlockedTransactionsLocal([]);
    getCustomerOps();
  }, [getCustomerOps]);

  return {
    filters,
    setFilters,
    sections,
    onChangeText,
    search,
    iban,
    customerOperationsError,
    requestBlockedTransactions,
    blockedTransactionsError,
    loading: customerOperationsLoading || blockedTransactionsLoading,
    blockedTransactionsFilterActive,
    clearBlockedTransactions,
  };
};
