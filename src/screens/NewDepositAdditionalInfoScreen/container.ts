import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';

const ITEM_SIZE = 86;

export const useNewDepositAdditionalInfo = (ref: React.RefObject<FlatList>) => {
  const [withdraw, setWithdraw] = useState('');
  const [duration, setDuration] = useState('3');
  const [debouncedValue, setDebouncedValue] = useState('');
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewDepositSummaryScreen'>>();

  useEffect(() => {
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
    navigate('NewDepositSummaryScreen');
  };

  return {
    withdraw,
    setWithdraw,
    duration,
    setDuration,
    debouncedValue,
    handleItemPress,
    handleNextPress,
  };
};
