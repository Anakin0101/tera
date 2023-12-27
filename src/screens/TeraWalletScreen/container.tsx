import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { openModal } from 'utils/modal';

const ITEM_SIZE = 86;

const arr = [0.25, 0.5, 1, 2, 3, 4];

const arrayRange = (start: number, stop: number, step: number) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step);
};

const data = [...arr, ...arrayRange(5, 100, 5)];

export const useTeraWallet = (
  ref: React.RefObject<FlatList>,
  scrollViewRef: React.RefObject<ScrollView>,
) => {
  const [duration, setDuration] = useState('0.25');
  const [debouncedValue, setDebouncedValue] = useState('0.25');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setDuration(String(data[activeIndex])), 600);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(duration), 600);
    return () => clearTimeout(id);
  }, [duration]);

  useEffect(() => {
    if (debouncedValue && !data.includes(Number(debouncedValue))) {
      setDuration('');
      return;
    }

    const index = data.findIndex(num => num === Number(debouncedValue));
    if (index > -1) {
      ref.current?.scrollToOffset({
        offset: index * ITEM_SIZE,
        animated: false,
      });
    }
  }, [debouncedValue, ref]);

  const onChangeText = (value: string) => {
    setDuration(value);
  };

  const onFocus = () => {
    scrollViewRef.current?.scrollToEnd();
  };

  const onBlur = () => {
    if (!duration) {
      setDuration(String(data[activeIndex]));
    }
  };

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
    activeIndex,
    setActiveIndex,
    onChangeText,
    onBlur,
    onFocus,
  };
};
