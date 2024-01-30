import { Currency } from 'services/apis/productsAPI/productsAPI.types';
import { CurrencySignMap } from './CurrencySignMap';

export const formatMoney = (value: number, currency?: Currency) => {
  const formatted = value?.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  if (currency) {
    return `${formatted} ${CurrencySignMap[currency]}`;
  } else {
    return formatted;
  }
};
