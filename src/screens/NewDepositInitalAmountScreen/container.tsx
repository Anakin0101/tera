import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { openModal } from 'utils/modal';
import { SelectAccountModal } from 'components/modals';
import { useHeaderHeight } from '@react-navigation/elements';
import { setAdjustResize, setAdjustPan } from 'rn-android-keyboard-adjust';
import { Account, Currency } from 'services/apis/productsAPI/productsAPI.types';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setInitialAmount } from 'store/slices/deposit';
import { openToast } from 'utils/toast';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useNewDepositInitialAmount = (ref: React.RefObject<TextInput>) => {
  const dispatch = useAppDispatch();
  const headerHeight = useHeaderHeight();
  const { offer } = useAppSelector(state => state.deposit);
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewDepositAdditionalInfoScreen'>>();
  const [amount, setAmount] = useState('');
  const [debouncedAmount, setDebouncedAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('GEL');
  const [creditAccount, setCreditAccount] = useState<Account | null>(null);
  const [debitAccount, setDebitAccount] = useState<Account | null>(null);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    setAdjustPan();
    return () => {
      setAdjustResize();
    };
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setCreditAccount(null);
      setDebitAccount(null);
    }
  }, [selectedCurrency]);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedAmount(amount), 1500);

    return () => clearTimeout(id);
  }, [amount]);

  useEffect(() => {
    if (
      offer &&
      debouncedAmount &&
      Number(debouncedAmount) < offer?.depositProducts[0].currencies[0].minAmount
    ) {
      openToast('newDeposit.warning', 'error');
      setAmount('');
    }
  }, [debouncedAmount, offer]);

  useEffect(() => {
    if (creditAccount && amount && creditAccount.balance < parseFloat(amount) && !isModalOpened) {
      openToast('newDeposit.balanceWarning', 'error');
      setCreditAccount(null);
    }
  }, [amount, creditAccount, isModalOpened]);

  const handleSelectAccountPress = (type: string) => {
    ref.current?.blur();
    setIsModalOpened(true);
    openModal({
      element: (
        <SelectAccountModal
          selectedAccount={type === 'from' ? creditAccount : debitAccount}
          onPress={type === 'from' ? setCreditAccount : setDebitAccount}
          selectedCurrency={selectedCurrency}
          setIsModalOpened={setIsModalOpened}
        />
      ),
      title: 'newDeposit.selectAcc',
      disablePanning: true,
      snapPoints: ['90%'],
    });
  };

  const handlePress = () => {
    if (!(amount && creditAccount && debitAccount)) {
      return;
    }
    dispatch(
      setInitialAmount({
        initialAmount: parseFloat(amount),
        currency: selectedCurrency,
        creditAccount: {
          id: creditAccount?.accountId,
          iban: creditAccount.accountIban,
          balance: creditAccount?.balance,
        },
        debitAccount: {
          id: debitAccount?.accountId,
          iban: debitAccount.accountIban,
          balance: debitAccount?.balance,
        },
      }),
    );
    navigate('NewDepositAdditionalInfoScreen');
  };

  return {
    headerHeight,
    handleSelectAccountPress,
    amount,
    setAmount,
    selectedCurrency,
    setSelectedCurrency,
    creditAccount,
    debitAccount,
    handlePress,
    offer,
  };
};
