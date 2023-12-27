import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setDepositDuration } from 'store/slices/deposit';

const ITEM_SIZE = 86;

export const useNewDepositAdditionalInfo = (ref: React.RefObject<FlatList>) => {
  const dispatch = useAppDispatch();
  const [withdraw, setWithdraw] = useState('');
  const [duration, setDuration] = useState('3');
  const [debouncedValue, setDebouncedValue] = useState('3');
  const lastValue = useRef('3');
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewDepositSummaryScreen'>>();
  const { depositType, initialAmount, currency } = useAppSelector(state => state.deposit);

  useEffect(() => {
    if (duration && Number(duration) > 3 && Number(duration) < 25) {
      lastValue.current = duration;
    }

    const timeout = setTimeout(() => setDebouncedValue(duration), 600);

    return () => clearTimeout(timeout);
  }, [duration]);

  useEffect(() => {
    if (debouncedValue && (Number(debouncedValue) < 3 || Number(debouncedValue) > 24)) {
      setDuration('');
    }

    if (debouncedValue && Number(debouncedValue) > 2 && Number(debouncedValue) < 25) {
      ref.current?.scrollToOffset({
        offset: (Number(debouncedValue) - 3) * ITEM_SIZE,
        animated: false,
      });
    }
  }, [debouncedValue, ref]);

  const handleItemPress = useCallback(
    (index: number) => {
      ref.current?.scrollToOffset({
        offset: index * ITEM_SIZE,
      });
    },
    [ref],
  );

  const handleNextPress = () => {
    if (!(withdraw && duration)) {
      return;
    }
    dispatch(
      setDepositDuration({
        duration: Number(duration),
        withdrawalPeriod: withdraw,
        interestRate: 11,
        specialInterestRate: 12.01,
        effectiveInterestRate: 12.01,
        benefit: 100,
      }),
    );
    navigate('NewDepositSummaryScreen');
  };

  const onChangeText = (value: string) => {
    const formatted = value.replace(/[,.]/g, '');
    setDuration(formatted);
  };

  const onBlur = () => {
    if (!duration) {
      setDuration(lastValue.current);
    }
  };

  return {
    withdraw,
    setWithdraw,
    duration,
    setDuration,
    debouncedValue,
    handleItemPress,
    handleNextPress,
    onChangeText,
    onBlur,
    depositType,
    initialAmount,
    currency,
  };
};
