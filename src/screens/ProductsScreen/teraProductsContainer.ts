import { skipToken } from '@reduxjs/toolkit/dist/query';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { useEffect, useMemo } from 'react';
import {
  useGetAccountsByCustomerIdQuery,
  useGetLoansByCustomerIdQuery,
} from 'services/apis/productsAPI/productsAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setAccounts, setTotalAvailableBalance, setTotalDeposits } from 'store/slices/products';
import { calculateSum } from 'utils/calculateSum';
import { groupAccountsByIban } from 'utils/groupData';

export const useTeraProducts = () => {
  const dispatch = useAppDispatch();
  const { customerId } = useAppSelector(state => state.profile);
  const { data: accounts } = useGetAccountsByCustomerIdQuery(customerId ?? skipToken);
  const { data: loans } = useGetLoansByCustomerIdQuery(customerId ?? skipToken);
  const { groupedAccountsByIban, totalAvailableBalanceGEL, deposits } = useAppSelector(
    state => state.products,
  );

  useEffect(() => {
    if (accounts) {
      const groupedAccounts: IGroupedAccountsByIban[] = groupAccountsByIban(
        accounts,
        'accountIban',
      );
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
    const filtered = deposits.filter(deposit => deposit.currency === 'GEL');
    return calculateSum(filtered, 'amount');
  }, [deposits]);

  useEffect(() => {
    dispatch(setTotalDeposits(totalDeposits));
  }, [dispatch, totalDeposits]);

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
