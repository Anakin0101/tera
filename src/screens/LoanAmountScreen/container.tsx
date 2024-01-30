import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { openToast } from 'utils/toast';
import { openModal } from 'utils/modal';

import { SelectLoanTypeModal } from 'components/modals';
import { ProductsStackScreenProps } from 'navigation/types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setNewLoanAmountAndDuration } from 'store/slices/loan';
import { useGetRequestForLoanConfigQuery } from 'services/apis';
import { LOAN_REQUEST_TERMS_SCREEN } from 'navigation/ScreenNames';
import { LoanProduct } from 'services/apis/productsAPI/productsAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { DataType, FlatListRef, SelectedProduct } from './LoanAmountScreen.types';
import { CIRCULAR_ITEM_SIZE } from 'constants/common';
import { REGEX } from 'constants/regex';

export const useLoanAmount = (flatlistRef: FlatListRef) => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<ProductsStackScreenProps<'LoanRequestTermsScreen'>>();
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyEnum>(CurrencyEnum.GEL);
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [minPeriod, setMinPeriod] = useState(0);
  const [maxPeriod, setMaxPeriod] = useState(0);
  const { data: loanConfig, isLoading: isLoanConfigLoading } = useGetRequestForLoanConfigQuery();

  useEffect(() => {
    if (loanConfig) {
      setSelectedProduct(loanConfig?.[0]);
    }
  }, [loanConfig]);

  const minAmount = useMemo(() => {
    const amounts = selectedProduct?.products?.map(item => item.minAmount);
    return amounts?.length ? Math.min(...amounts) : 0;
  }, [selectedProduct?.products]);

  const maxAmount = useMemo(() => {
    const amounts = selectedProduct?.products
      ?.filter(item => item.maxAmount > 0)
      ?.map(item => item.maxAmount);

    return amounts?.length ? Math.max(...amounts) : 0;
  }, [selectedProduct]);

  const setInitialMinMaxPeriods = useCallback(() => {
    if (!selectedProduct?.products) {
      return;
    }

    if (selectedProduct?.products?.length > 1) {
      const minPeriods = selectedProduct?.products?.map(item => item.period.min);
      const maxPeriods = selectedProduct?.products?.map(item => item.period.max);

      if (minPeriods?.length) {
        setMinPeriod(Math.min(...minPeriods));
      }

      if (maxPeriods?.length) {
        setMaxPeriod(Math.max(...maxPeriods));
      }
    } else {
      setMinPeriod(selectedProduct?.products?.[0]?.period?.min);
      setMaxPeriod(selectedProduct?.products?.[0]?.period?.max);
    }
  }, [selectedProduct?.products]);

  const setMinMaxPeriodsBasedOnAmount = useCallback(() => {
    if (
      amount &&
      minAmount <= parseFloat(amount) &&
      selectedProduct &&
      selectedProduct?.products?.length > 1
    ) {
      let result: LoanProduct[] = [];
      const parsed = parseFloat(amount);
      const productsWithMaxAmounts = selectedProduct?.products?.filter(item => item.maxAmount > -1);
      const productsWithoutMaxAmounts = selectedProduct?.products?.filter(
        item => item.maxAmount === -1,
      );

      if (productsWithMaxAmounts?.length) {
        result = productsWithMaxAmounts.filter(
          item => item.minAmount <= parsed && parsed <= item.maxAmount,
        );
      }

      if (!result.length) {
        result = productsWithoutMaxAmounts.filter(item => item.minAmount <= parsed);
      }

      if (result.length > 1) {
        const hasCurrencyForWhichIsConfigured = result.every(item =>
          Boolean(item.currencyForWhichIsConfigured),
        );

        if (hasCurrencyForWhichIsConfigured) {
          result = result.filter(item => {
            const currencies = item.currencyForWhichIsConfigured.split(',');
            return currencies.includes(selectedCurrency);
          });
        }
      }

      if (result?.length === 1) {
        setMinPeriod(result?.[0].period.min);
        setMaxPeriod(result?.[0].period.max);
      }
    }
  }, [amount, minAmount, selectedCurrency, selectedProduct]);

  useEffect(() => {
    setInitialMinMaxPeriods();
  }, [setInitialMinMaxPeriods]);

  useEffect(() => {
    setMinMaxPeriodsBasedOnAmount();
  }, [setMinMaxPeriodsBasedOnAmount]);

  const loanPeriod = useMemo(() => {
    try {
      if (minPeriod && maxPeriod) {
        return Array.from({ length: maxPeriod - minPeriod + 1 }, (_, index) =>
          String(index + minPeriod),
        );
      }
    } catch (err) {
      console.warn('Error in loanPeriod useMemo:', err);
    }
  }, [maxPeriod, minPeriod]);

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
          offset: index * CIRCULAR_ITEM_SIZE,
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
      length: CIRCULAR_ITEM_SIZE,
      offset: CIRCULAR_ITEM_SIZE * index,
      index,
    }),
    [],
  );

  const onChangeText = useCallback((value: string) => {
    const formatted = value.replace(REGEX.COMMA_OR_PERIOD, '');
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
          offset: index * CIRCULAR_ITEM_SIZE,
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

  const handleNextPress = useCallback(() => {
    if (!(amount && selectedProduct)) {
      return;
    }

    if (parseFloat(amount) < minAmount) {
      openToast('loanRequest.minAmountWarning', 'error');
      return;
    }

    if (parseFloat(amount) > maxAmount) {
      openToast('loanRequest.maxAmountWarning', 'error');
      return;
    }

    dispatch(
      setNewLoanAmountAndDuration({
        amount,
        duration,
        currency: selectedCurrency,
        loanType: selectedProduct?.displayName,
        productsGroupId: selectedProduct?.productsGroupId,
      }),
    );
    navigate(LOAN_REQUEST_TERMS_SCREEN);
  }, [
    amount,
    dispatch,
    duration,
    maxAmount,
    minAmount,
    navigate,
    selectedCurrency,
    selectedProduct,
  ]);

  const handleCurrencyPress = useCallback(
    (item: CurrencyEnum) => {
      if (selectedProduct && selectedProduct?.products?.length > 1) {
        const hasCurrencyForWhichIsConfigured = selectedProduct?.products.every(i =>
          Boolean(i.currencyForWhichIsConfigured),
        );

        if (hasCurrencyForWhichIsConfigured) {
          const product = selectedProduct?.products?.find(prod => {
            const currencies = prod.currencyForWhichIsConfigured.split(',');
            return currencies.includes(item);
          });

          if (product) {
            setMinPeriod(product.period.min);
            setMaxPeriod(product.period.max);
          }
        }
      }
      setSelectedCurrency(item);
    },
    [selectedProduct],
  );

  const currencies = useMemo(() => {
    const allCurrencies = new Set(selectedProduct?.products?.flatMap(item => item.currencies));

    return [...allCurrencies];
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
    CIRCULAR_ITEM_SIZE,
    debouncedValue,
    setActiveIndex,
    isLoanConfigLoading,
    selectedProduct,
    minAmount,
    maxAmount,
    handleSelectProduct,
    handleNextPress,
    handleCurrencyPress,
    currencies,
  };
};
