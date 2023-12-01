import { skipToken } from '@reduxjs/toolkit/dist/query';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { useEffect, useMemo } from 'react';
import { useGetAccountsByCustomerIdQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import {
  setAccounts,
  setTotalAvailableBalance,
  setTotalDebt,
  setTotalDeposits,
} from 'store/slices/products';
import { calculateSum } from 'utils/calculateSum';
import { groupAccountsByIban } from 'utils/groupData';

export const useTeraProducts = () => {
  const dispatch = useAppDispatch();
  const { customerId } = useAppSelector(state => state.profile);
  const { data: accounts } = useGetAccountsByCustomerIdQuery(customerId ?? skipToken);
  const {
    groupedAccountsByIban,
    totalAvailableBalanceGEL,
    deposits,
    loans,
    overdrafts,
    creditCards,
  } = useAppSelector(state => state.products);

  const allLoans = [...overdrafts, ...creditCards, ...loans];

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

  const totalLoans = useMemo(() => {
    const loansInGEL = loans.filter(loan => loan.currency === 'GEL');
    const overdraftsInGEL = overdrafts.filter(overdraft => overdraft.currency === 'GEL');
    const creditCardGEL = creditCards.filter(cc => cc.currency === 'GEL');

    const loansSum = calculateSum(loansInGEL, 'totalDebt');
    const overdraftsSum = calculateSum(overdraftsInGEL, 'totalDebt');
    const ccSum = calculateSum(creditCardGEL, 'creditLimit');

    return loansSum + overdraftsSum + ccSum;
  }, [creditCards, loans, overdrafts]);

  useEffect(() => {
    dispatch(setTotalDeposits(totalDeposits));
    dispatch(setTotalDebt(totalLoans));
  }, [dispatch, totalDeposits, totalLoans]);

  return {
    groupedAccountsByIban,
    totalAvailableBalanceGEL,
    deposits,
    totalDeposits,
    loans,
    totalLoans,
    allLoans,
  };
};
