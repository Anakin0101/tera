import { INITIAL_AMOUNT_PLACEHOLDER } from 'constants/common';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useConvertAmountBuyQuery } from 'services/apis';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { debounce } from 'utils/debounce';
import { formatRate } from 'utils/formatRate';

export const useExchangeRateCalculator = (currencies: CurrencyEnum[]) => {
  const [fromCurrency, setFromCurrency] = useState<CurrencyEnum>(CurrencyEnum.GEL);
  const [toCurrency, setToCurrency] = useState<CurrencyEnum>(CurrencyEnum.USD);
  const [amount, setAmount] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>('');
  const [result, setResult] = useState<string>(INITIAL_AMOUNT_PLACEHOLDER);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const { data: defaultRate, isLoading: isLoadingDefaultRate } = useConvertAmountBuyQuery({
    amountBuy: parseFloat(debouncedValue) || 0.001,
    currencyBuy: isReversed ? toCurrency : fromCurrency,
    currencySell: isReversed ? fromCurrency : toCurrency,
  });

  useEffect(() => {
    if (defaultRate && defaultRate?.amountSell > 0) {
      setResult(defaultRate?.amountSell?.toString());
    }
  }, [debouncedValue, defaultRate]);

  useEffect(() => {
    if (!amount) {
      setResult(INITIAL_AMOUNT_PLACEHOLDER);
      setDebouncedValue('');
    }
  }, [amount, debouncedValue]);

  useEffect(() => {
    const handler = debounce(() => {
      if (amount) {
        setDebouncedValue(amount);
      }
    }, 300);
    handler();
    return () => handler.cancel();
  }, [amount]);

  const onChangeAmount = useCallback((text: string) => {
    const replaceMinus = text.replace('-', '');
    const formatted = replaceMinus.replace(',', '.');
    const periodIndex = formatted.indexOf('.');

    if (
      (formatted.length > 1 && formatted[0] === '0' && formatted[1] !== '.') ||
      (periodIndex !== -1 && periodIndex < formatted.length - 3) ||
      (formatted && isNaN(parseFloat(formatted)))
    ) {
      return;
    }

    setAmount(formatted);
  }, []);

  const switchCurrencies = useCallback(() => {
    setIsReversed(prev => !prev);
  }, []);

  const translateProp = useMemo(() => {
    if (defaultRate) {
      return {
        fromSign: CurrencySignMap[toCurrency],
        value: formatRate(defaultRate.standardRate),
        toSign: CurrencySignMap[fromCurrency],
      };
    }
  }, [defaultRate, fromCurrency, toCurrency]);

  const specRateTranslateProp = useMemo(() => {
    if (defaultRate) {
      return {
        fromSign: CurrencySignMap[toCurrency],
        value: formatRate(defaultRate.specialRate),
        toSign: CurrencySignMap[fromCurrency],
      };
    }
  }, [defaultRate, fromCurrency, toCurrency]);

  const currencyListBuy = useMemo(() => {
    const secondCurrency = isReversed ? toCurrency : fromCurrency;
    return currencies.filter(item => item !== secondCurrency);
  }, [currencies, fromCurrency, isReversed, toCurrency]);

  const currencyListSell = useMemo(() => {
    const secondCurrency = isReversed ? fromCurrency : toCurrency;
    return currencies.filter(item => item !== secondCurrency);
  }, [currencies, fromCurrency, isReversed, toCurrency]);

  return {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    onChangeAmount,
    result,
    switchCurrencies,
    isReversed,
    defaultRate,
    isLoadingDefaultRate,
    translateProp,
    debouncedValue,
    specRateTranslateProp,
    currencyListBuy,
    currencyListSell,
  };
};
