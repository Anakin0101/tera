import { skipToken } from '@reduxjs/toolkit/dist/query';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { useEffect, useMemo } from 'react';
import {
  useGetAccountsByCustomerIdQuery,
  useGetDepositsQuery,
  useGetLoansByCustomerIdQuery,
} from 'services/apis/productsAPI/productsAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setAccounts, setTotalAvailableBalance } from 'store/slices/products';
import { calculateSum } from 'utils/calculateSum';
import { groupedDataArray } from 'utils/groupDataByKey';

export const useTeraProducts = () => {
  const dispatch = useAppDispatch();
  const { customerId } = useAppSelector(state => state.profile);
  const { data: accounts } = useGetAccountsByCustomerIdQuery(customerId ?? skipToken);
  const { data: deposits } = useGetDepositsQuery(customerId ?? skipToken);
  const { data: loans } = useGetLoansByCustomerIdQuery(customerId ?? skipToken);
  const { groupedAccountsByIban, totalAvailableBalanceGEL } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    if (accounts) {
      const groupedAccounts: IGroupedAccountsByIban[] = groupedDataArray(accounts, 'accountIban');
      const balanceGEL = accounts.filter(acc => acc.ccy === 'GEL');
      const totalAvailableGEL = calculateSum(balanceGEL, 'balance');

      dispatch(setAccounts(groupedAccounts));
      dispatch(setTotalAvailableBalance(totalAvailableGEL));
    }
  }, [accounts, dispatch]);

  const totalDeposits = useMemo(() => {
    if (!deposits) {
      return 0;
    }
    return calculateSum(deposits, 'amount');
  }, [deposits]);

  const totalLoans = useMemo(() => {
    if (!loans) {
      return 0;
    }
    return calculateSum(loans, 'totalDebt');
  }, [loans]);

  return {
    groupedAccountsByIban,
    totalAvailableBalanceGEL,
    deposits,
    totalDeposits,
    loans,
    totalLoans,
  };
};
