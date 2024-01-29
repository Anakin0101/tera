import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  useGetInterestRatesQuery,
  useCalculateDepositMutation,
} from 'services/apis/productsAPI/productsAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setDepositDuration } from 'store/slices/deposit';
import { ProductsStackScreenProps } from 'navigation/types';
import { CalculateDeposit } from 'services/apis/productsAPI/productsAPI.types';
import { NEW_DEPOSIT_SUMMARY_SCREEN } from 'navigation/ScreenNames';
import { CIRCULAR_ITEM_SIZE } from 'constants/common';
import { DataType } from 'screens/LoanAmountScreen/LoanAmountScreen.types';
import { REGEX } from 'constants/index';

export const useNewDepositAdditionalInfo = (ref: React.RefObject<FlatList>) => {
  const dispatch = useAppDispatch();
  const [productName, setProductName] = useState({
    ka: '',
    en: '',
  });
  const [productId, setProductId] = useState<number | null>(null);
  const [duration, setDuration] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const lastValue = useRef('');
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewDepositSummaryScreen'>>();
  const { depositType, initialAmount, currency, offer, creditAccount, debitAccount, imageUrl } =
    useAppSelector(state => state.deposit);
  const [calculateDeposit, { data: benefit, isLoading: isLoadingBenefit }] =
    useCalculateDepositMutation();
  const { data: interestRates, isLoading: isLoadingRates } = useGetInterestRatesQuery(
    {
      productId,
      amount: initialAmount,
      creditAccountId: creditAccount.id,
      debitAccountId: debitAccount.id,
      currency,
    },
    { skip: !productId },
  );

  const interestRate = useMemo(() => {
    if (interestRates && offer?.depositProducts?.length === 1) {
      return interestRates[0];
    }
    return interestRates?.find(item => item.periodInMonths === Number(debouncedValue));
  }, [debouncedValue, interestRates, offer]);

  useEffect(() => {
    const min = offer?.depositProducts?.[0]?.minPeriod;

    if (offer && typeof min === 'number') {
      setDuration(min.toString());
      setDebouncedValue(min.toString());
      lastValue.current = min.toString();
    }
  }, [offer]);

  useEffect(() => {
    if (offer?.depositProducts?.length === 1) {
      setProductId(offer?.depositProducts?.[0]?.productId);
      setProductName(offer?.depositProducts?.[0]?.name);
    }
  }, [offer]);

  useEffect(() => {
    if (productId) {
      const depositParams: CalculateDeposit = {
        productId,
        currency,
        amount: initialAmount,
        creditAccountId: creditAccount.id,
        debitAccountId: debitAccount.id,
      };

      if (offer?.depositProducts.length !== 1) {
        depositParams.periodInMonths = Number(debouncedValue);
      }

      calculateDeposit(depositParams);
    }
  }, [
    calculateDeposit,
    currency,
    debouncedValue,
    creditAccount.id,
    debitAccount.id,
    initialAmount,
    productId,
    offer?.depositProducts.length,
  ]);

  const depositPeriod = useMemo(() => {
    try {
      const min = offer?.depositProducts?.[0]?.minPeriod;
      const max = offer?.depositProducts?.[0]?.maxPeriod;

      if (min && max) {
        return Array.from({ length: max - min + 1 }, (_, index) => index + min);
      }
    } catch (err) {
      console.warn('Error in depositPeriod useMemo:', err);
    }
  }, [offer]);

  useEffect(() => {
    if (duration && depositPeriod?.includes(Number(duration))) {
      lastValue.current = duration;
    }
    const timeout = setTimeout(() => setDebouncedValue(duration), 600);

    return () => clearTimeout(timeout);
  }, [depositPeriod, duration]);

  useEffect(() => {
    if (debouncedValue && depositPeriod && !depositPeriod.includes(Number(debouncedValue))) {
      setDuration('');
    }
    try {
      if (debouncedValue && depositPeriod?.includes(Number(debouncedValue))) {
        ref.current?.scrollToOffset({
          offset: (Number(debouncedValue) - 3) * CIRCULAR_ITEM_SIZE,
          animated: false,
        });
      }
    } catch (err) {
      console.warn('Error in scrollToOffset on NewDepositAdditionalInfoScreen', err);
    }
  }, [debouncedValue, depositPeriod, ref]);

  const handleItemPress = useCallback(
    (index: number) => {
      try {
        ref.current?.scrollToOffset({
          offset: index * CIRCULAR_ITEM_SIZE,
        });
      } catch (err) {
        console.warn('Error in handleItemPress on NewDepositAdditionalInfoScreen', err);
      }
    },
    [ref],
  );

  const handleNextPress = () => {
    if (!(productId && interestRate && benefit)) {
      return;
    }
    dispatch(
      setDepositDuration({
        benefit,
        productId,
        specialInterestRate: 0.0,
        duration: offer?.depositProducts.length === 1 ? 0 : Number(duration),
        interestRate: interestRate?.percent,
        effectiveInterestRate: interestRate?.effectivePercent,
        productName: productName,
      }),
    );
    navigate(NEW_DEPOSIT_SUMMARY_SCREEN);
  };

  const onChangeText = (value: string) => {
    const formatted = value.replace(REGEX.COMMA_OR_PERIOD, '');
    setDuration(formatted);
  };

  const onBlur = () => {
    if (!duration) {
      setDuration(lastValue.current);
    }
  };

  const minPeriod = useMemo(() => {
    return offer?.depositProducts?.[0]?.minPeriod ?? 0;
  }, [offer?.depositProducts]);

  const maxPeriod = useMemo(() => {
    return offer?.depositProducts?.[0]?.maxPeriod ?? 0;
  }, [offer?.depositProducts]);

  const getItemLayout = useCallback(
    (_: DataType, index: number) => ({
      length: CIRCULAR_ITEM_SIZE,
      offset: CIRCULAR_ITEM_SIZE * index,
      index,
    }),
    [],
  );

  return {
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
    CIRCULAR_ITEM_SIZE,
    offer,
    setProductId,
    productId,
    depositPeriod,
    interestRate,
    benefit,
    isLoadingBenefit,
    isLoadingRates,
    imageUrl,
    setProductName,
    minPeriod,
    maxPeriod,
    getItemLayout,
  };
};
