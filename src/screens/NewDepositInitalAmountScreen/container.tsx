import React, { useEffect, useMemo, useState } from 'react';
import { TextInput } from 'react-native';
import { openModal } from 'utils/modal';
import { SelectAccountModal } from 'components/modals';
import { useHeaderHeight } from '@react-navigation/elements';
import { setAdjustResize, setAdjustPan } from 'rn-android-keyboard-adjust';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { Currency } from 'services/apis/productsAPI/productsAPI.types';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setInitialAmount } from 'store/slices/deposit';
import { openToast } from 'utils/toast';

export const useNewDepositInitialAmount = (ref: React.RefObject<TextInput>) => {
  const dispatch = useAppDispatch();
  const headerHeight = useHeaderHeight();
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewDepositAdditionalInfoScreen'>>();
  const [amount, setAmount] = useState('');
  const [debouncedAmount, setDebouncedAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('GEL');
  const [fromAccount, setFromAccount] = useState<IGroupedAccountsByIban | null>(null);
  const [toAccount, setToAccount] = useState<IGroupedAccountsByIban | null>(null);

  useEffect(() => {
    setAdjustPan();
    return () => {
      setAdjustResize();
    };
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedAmount(amount), 1500);

    return () => clearTimeout(id);
  }, [amount]);

  useEffect(() => {
    if (debouncedAmount && Number(debouncedAmount) < 10) {
      openToast('newDeposit.warning', 'error');
      setAmount('');
    }
  }, [debouncedAmount]);

  const handleSelectAccountPress = (type: string) => {
    ref.current?.blur();
    openModal({
      element: (
        <SelectAccountModal
          selectedAccount={type === 'from' ? fromAccount : toAccount}
          onPress={type === 'from' ? setFromAccount : setToAccount}
        />
      ),
      title: 'newDeposit.selectAcc',
      disablePanning: true,
      snapPoints: ['90%'],
    });
  };

  const total = useMemo(() => {
    if (fromAccount) {
      const balanceInSelectedCurrency = fromAccount.accounts.find(
        acc => acc.ccy === selectedCurrency,
      );
      return balanceInSelectedCurrency?.balance || 0;
    }
  }, [fromAccount, selectedCurrency]);

  const totalDestAccount = useMemo(() => {
    if (toAccount) {
      const balanceInSelectedCurrency = toAccount.accounts.find(
        acc => acc.ccy === selectedCurrency,
      );
      return balanceInSelectedCurrency?.balance || 0;
    }
  }, [toAccount, selectedCurrency]);

  const handlePress = () => {
    dispatch(
      setInitialAmount({
        initialAmount: Number(amount),
        currency: selectedCurrency,
        initAccount: fromAccount?.iban || '',
        finalAccount: toAccount?.iban || '',
        initAccountAvailableBalance: total || 0,
        finalAccountAvailableBalance: totalDestAccount || 0,
      }),
    );
    navigate('NewDepositAdditionalInfoScreen');
  };

  return {
    headerHeight,
    handleSelectAccountPress,
    total,
    totalDestAccount,
    amount,
    setAmount,
    selectedCurrency,
    setSelectedCurrency,
    fromAccount,
    toAccount,
    handlePress,
  };
};
