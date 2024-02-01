import React, { useCallback } from 'react';
import { useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setTotalDebt, setTotalDeposits } from 'store/slices/products';
import { calculateSum } from 'utils/calculateSum';
import { closeModal, openModal } from 'utils/modal';
import { NewProducts } from 'components/modals/NewProducts/NewProducts';
import { ProductsStackScreenProps } from 'navigation/types';
import {
  LOAN_REQUEST_SCREEN,
  SELECT_DEPOSIT_SCREEN,
  CARD_ORDER_TYPE_SCREEN,
  TARIFF_PACKAGES_SCREEN,
} from 'navigation/ScreenNames';

export const useTeraProducts = () => {
  const dispatch = useAppDispatch();
  const { totalAvailableBalanceGEL, deposits, loans, overdrafts, creditCards } = useAppSelector(
    state => state.products,
  );
  const { groupedAccountsByIban, isLoadingAccounts, refetch } = useGroupedAccountsByIban();

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

  const { navigate } = useNavigation<ProductsStackScreenProps<'SelectDepositScreen'>>();

  const onDepositPress = useCallback(() => {
    closeModal();
    navigate(SELECT_DEPOSIT_SCREEN);
  }, [navigate]);

  const onLoanPress = useCallback(() => {
    closeModal();
    navigate(LOAN_REQUEST_SCREEN);
  }, [navigate]);
  const onTariffPress = useCallback(() => {
    closeModal();
    navigate(TARIFF_PACKAGES_SCREEN);
  }, [navigate]);

  const onCardPress = useCallback(() => {
    closeModal();
    navigate(CARD_ORDER_TYPE_SCREEN);
  }, [navigate]);

  const products = useMemo(() => {
    return [
      {
        image: require('assets/images/Gold.png'),
        title: 'newDeposit.tariffPackage',
        onPress: onTariffPress,
      },
      {
        image: require('assets/images/Card.png'),
        title: 'newDeposit.card',
        onPress: onCardPress,
      },
      {
        image: require('assets/images/Deposit.png'),
        title: 'newDeposit.deposit',
        onPress: onDepositPress,
      },
      {
        image: require('assets/images/TeraWallet.png'),
        title: 'newDeposit.teraWallet',
        onPress: () => {},
      },
      {
        image: require('assets/images/Loan.png'),
        title: 'newDeposit.loan',
        onPress: onLoanPress,
      },
    ];
  }, [onDepositPress, onLoanPress, onTariffPress, onCardPress]);

  const onNewProductsPress = () => {
    openModal({
      element: <NewProducts products={products} />,
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
    isLoadingAccounts,
    refetch,
  };
};
