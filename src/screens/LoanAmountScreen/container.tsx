import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { openModal } from 'utils/modal';
import { COMMA_OR_PERIOD_REGEX } from 'constants/regex';
import { useGetRequestForLoanConfigQuery } from 'services/apis';
import { DataType, FlatListRef, SelectedProduct } from './LoanAmountScreen.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { SelectLoanTypeModal } from 'components/modals';

const ITEM_SIZE = 86;

export const useLoanAmount = (flatlistRef: FlatListRef) => {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyEnum>(CurrencyEnum.GEL);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: loanConfig, isLoading: isLoanConfigLoading } = useGetRequestForLoanConfigQuery();
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>(null);

  useEffect(() => {
    if (loanConfig) {
      setSelectedProduct(loanConfig[0]);
    }
  }, [loanConfig]);

  const loanPeriod = useMemo(() => {
    try {
      const min = selectedProduct?.products?.[0]?.period?.min;
      const max = selectedProduct?.products?.[0]?.period?.max;

      if (min && max) {
        return Array.from({ length: max - min + 1 }, (_, index) => String(index + min));
      }
    } catch (err) {
      console.warn('Error in loanPeriod useMemo:', err);
    }
  }, [selectedProduct?.products]);

  useEffect(() => {
    if (!loanPeriod) {
      return;
    }
    const timeout = setTimeout(() => setDuration(loanPeriod?.[activeIndex]), 300);
    return () => clearTimeout(timeout);
  }, [activeIndex, loanPeriod]);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(duration), 600);
    return () => clearTimeout(id);
  }, [duration]);

  const scrollToOffset = useCallback(() => {
    try {
      if (debouncedValue && !loanPeriod?.includes(debouncedValue)) {
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
      console.warn('Error in scrollToOffset on LoanAmountScreen', err);
    }
  }, [debouncedValue, flatlistRef, loanPeriod]);

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
    if (loanPeriod && !duration) {
      setDuration(loanPeriod?.[activeIndex]);
    }
  }, [activeIndex, duration, loanPeriod]);

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

  const handleSelectProduct = useCallback(() => {
    openModal({
      element: (
        <SelectLoanTypeModal
          data={loanConfig}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      ),
      title: 'loanRequest.selectProduct',
      disablePanning: true,
    });
  }, [loanConfig, selectedProduct]);

  const minAmount = useMemo(() => {
    const amounts = selectedProduct?.products?.map(item => item.minAmount);
    return amounts ? Math.min(...amounts) : 0;
  }, [selectedProduct?.products]);

  const maxAmount = useMemo(() => {
    const amounts = selectedProduct?.products
      ?.filter(item => item.maxAmount > 0)
      ?.map(item => item.maxAmount);

    return amounts ? Math.max(...amounts) : 0;
  }, [selectedProduct?.products]);

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
    debouncedValue,
    setActiveIndex,
    isLoanConfigLoading,
    selectedProduct,
    minAmount,
    maxAmount,
    handleSelectProduct,
  };
};
