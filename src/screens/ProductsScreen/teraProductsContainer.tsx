import React from 'react';
import { useEffect, useMemo } from 'react';
import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setTotalDebt, setTotalDeposits } from 'store/slices/products';
import { calculateSum } from 'utils/calculateSum';
import { openModal } from 'utils/modal';
import { NewProducts } from 'components/modals/NewProducts/NewProducts';

export const useTeraProducts = () => {
  const dispatch = useAppDispatch();
  const { totalAvailableBalanceGEL, deposits, loans, overdrafts, creditCards } = useAppSelector(
    state => state.products,
  );
  const { groupedAccountsByIban } = useGroupedAccountsByIban();

  const allLoans = [...overdrafts, ...creditCards, ...loans];

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

  const onNewProductsPress = () => {
    openModal({
      element: <NewProducts />,
      title: 'newDeposit.newProduct',
      disablePanning: true,
    });
  };

  return {
    groupedAccountsByIban,
    totalAvailableBalanceGEL,
    deposits,
    totalDeposits,
    loans,
    totalLoans,
    allLoans,
    onNewProductsPress,
  };
};
