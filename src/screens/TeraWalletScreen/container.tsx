import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { openModal } from 'utils/modal';
import {
  useGetAccountsByCustomerIdQuery,
  useGetTeraWalletInfoQuery,
} from 'services/apis/productsAPI/productsAPI';
import { SelectDepositModal } from 'components/modals/SelectDepositModal/SelectDepositModal';
import { ProductsStackScreenProps } from 'navigation/types';
import { Currency, WalletAccount } from 'services/apis/productsAPI/productsAPI.types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setWalletData } from 'store/slices/teraWallet';
import { FlatlistRef, ScrollViewRef } from './TeraWalletScreen.types';
import { TERA_WALLET_PDF_SCREEN } from 'navigation/ScreenNames';

const ITEM_SIZE = 86;

export const useTeraWallet = (ref: FlatlistRef, scrollViewRef: ScrollViewRef) => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<ProductsStackScreenProps<'TeraWalletPDFScreen'>>();
  const [amount, setAmount] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: teraWalletInfo } = useGetTeraWalletInfoQuery();
  const [selectedDeposit, setSelectedDeposit] = useState<WalletAccount | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('GEL');
  const { data: accounts } = useGetAccountsByCustomerIdQuery();

  const amounts = useMemo(() => {
    return teraWalletInfo?.amount?.map(item => ({
      ...item,
      value: parseFloat(item.value).toString(),
    }));
  }, [teraWalletInfo?.amount]);

  useEffect(() => {
    if (amounts) {
      setAmount(amounts[0].value);
      setDebouncedValue(amounts?.[0]?.value);
    }
  }, [amounts]);

  useEffect(() => {
    if (!amounts) {
      return;
    }
    const timeout = setTimeout(() => setAmount(amounts?.[activeIndex]?.value), 300);

    return () => clearTimeout(timeout);
  }, [activeIndex, amounts]);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(amount), 600);
    return () => clearTimeout(id);
  }, [amount]);

  useEffect(() => {
    if (!amounts) {
      return;
    }

    if (debouncedValue && !amounts.some(item => item.value === debouncedValue)) {
      setAmount('');
      return;
    }

    const index = amounts?.findIndex(item => item.value === debouncedValue);

    try {
      if (typeof index === 'number' && index > -1) {
        ref.current?.scrollToOffset({
          offset: index * ITEM_SIZE,
          animated: false,
        });
      }
    } catch (error) {
      console.warn('Error in useEffect in TeraWalletScreen container', error);
    }
  }, [amounts, debouncedValue, ref]);

  const onChangeText = (value: string) => {
    setAmount(value);
  };

  const onFocus = () => {
    scrollViewRef.current?.scrollToEnd();
  };

  const onBlur = () => {
    if (amounts && !amount) {
      setAmount(amounts?.[activeIndex]?.value);
    }
  };

  const handleItemPress = useCallback(
    (index: number) => {
      try {
        ref.current?.scrollToOffset({
          offset: index * ITEM_SIZE,
        });
      } catch (err) {
        console.warn('Error in handleItemPress on TeraWalletScreen', err);
      }
    },
    [ref],
  );

  const handleSelectDepositPress = () => {
    openModal({
      element: (
        <SelectDepositModal
          deposits={teraWalletInfo?.account || []}
          selectedDeposit={selectedDeposit}
          onPress={setSelectedDeposit}
          setSelectedCurrency={setSelectedCurrency}
        />
      ),
      title: 'teraWallet.chooseDeposit',
      disablePanning: true,
      snapPoints: ['90%'],
    });
  };

  const handleNextPress = () => {
    const selectedAmountItem = amounts?.find(item => item.value === amount);

    if (!(selectedDeposit && selectedAmountItem)) {
      return;
    }

    dispatch(
      setWalletData({
        accountId: selectedDeposit.accountId,
        amountId: selectedAmountItem?.key,
        currency: selectedCurrency,
      }),
    );

    navigate(TERA_WALLET_PDF_SCREEN);
  };

  const selectedDepositInfo = useMemo(() => {
    if (accounts && selectedDeposit) {
      return accounts?.find(item => item.accountId === selectedDeposit?.accountId);
    }
  }, [accounts, selectedDeposit]);

  return {
    handleItemPress,
    amount,
    handleSelectDepositPress,
    activeIndex,
    setActiveIndex,
    onChangeText,
    onBlur,
    onFocus,
    amounts,
    ITEM_SIZE,
    selectedDeposit,
    selectedCurrency,
    teraWalletInfo,
    handleNextPress,
    selectedDepositInfo,
  };
};
