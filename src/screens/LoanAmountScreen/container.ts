import { useCallback, useEffect, useState } from 'react';
import { DataType, FlatListRef } from './LoanAmountScreen.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { COMMA_OR_PERIOD_REGEX } from 'constants/regex';

const ITEM_SIZE = 86;
const loanPeriod = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const currencies = [CurrencyEnum.GEL, CurrencyEnum.USD, CurrencyEnum.EUR];

export const useLoanAmount = (flatlistRef: FlatListRef) => {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('1');
  const [debouncedValue, setDebouncedValue] = useState('1');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyEnum>(CurrencyEnum.GEL);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setDuration(loanPeriod?.[activeIndex]), 300);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(duration), 600);
    return () => clearTimeout(id);
  }, [duration]);

  const scrollToOffset = useCallback(() => {
    try {
      if (debouncedValue && !loanPeriod.includes(debouncedValue)) {
        setDuration('');
        return;
      }
      const index = loanPeriod?.findIndex(item => item === debouncedValue);

      if (typeof index === 'number' && index > -1) {
        flatlistRef.current?.scrollToOffset({
          offset: index * ITEM_SIZE,
          animated: false,
        });
      }
    } catch (err) {
      console.warn('Error in scrollToOffset on NewDepositAdditionalInfoScreen', err);
    }
  }, [debouncedValue, flatlistRef]);

  useEffect(() => {
    scrollToOffset();
  }, [scrollToOffset]);

  const getItemLayout = useCallback(
    (_: DataType, index: number) => ({
      length: ITEM_SIZE,
      offset: ITEM_SIZE * index,
      index,
    }),
    [],
  );

  const onChangeText = useCallback((value: string) => {
    const formatted = value.replace(COMMA_OR_PERIOD_REGEX, '');
    setDuration(formatted);
  }, []);

  const onBlur = useCallback(() => {
    if (!duration) {
      setDuration(loanPeriod?.[activeIndex]);
    }
  }, [activeIndex, duration]);

  const handleItemPress = useCallback(
    (index: number) => {
      try {
        flatlistRef.current?.scrollToOffset({
          offset: index * ITEM_SIZE,
        });
      } catch (err) {
        console.warn('Error in handleItemPress on LoanAmountScreen', err);
      }
    },
    [flatlistRef],
  );

  return {
    getItemLayout,
    onChangeText,
    onBlur,
    handleItemPress,
    duration,
    setDuration,
    amount,
    setAmount,
    selectedCurrency,
    setSelectedCurrency,
    loanPeriod,
    ITEM_SIZE,
    currencies,
    debouncedValue,
    setActiveIndex,
  };
};
