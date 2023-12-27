import React from 'react';
import {
  useCallback,
  //  useEffect,
  useState,
} from 'react';
import { FlatList, View } from 'react-native';
import { openModal } from 'utils/modal';

const ITEM_SIZE = 86;

export const useTeraWallet = (ref: React.RefObject<FlatList>) => {
  const [duration, setDuration] = useState('3');
  // const [debouncedValue, setDebouncedValue] = useState('');

  // useEffect(() => {
  //   const timeout = setTimeout(() => setDebouncedValue(duration), 600);

  //   return () => clearTimeout(timeout);
  // }, [duration]);

  // useEffect(() => {
  //   if (debouncedValue && (Number(debouncedValue) < 3 || Number(debouncedValue) > 24)) {
  //     setDuration('');
  //   }

  //   if (debouncedValue && Number(debouncedValue) > 2 && Number(debouncedValue) < 25) {
  //     ref.current?.scrollToOffset({
  //       offset: (Number(debouncedValue) - 3) * ITEM_SIZE,
  //       animated: false,
  //     });
  //   }
  // }, [debouncedValue, ref]);

  const handleItemPress = useCallback(
    (index: number) => {
      ref.current?.scrollToOffset({
        offset: index * ITEM_SIZE,
      });
    },
    [ref],
  );

  const handleSelectDepositPress = () => {
    openModal({
      element: <View />,
      title: 'teraWallet.chooseDeposit',
    });
  };

  return {
    handleItemPress,
    duration,
    setDuration,
    handleSelectDepositPress,
  };
};
