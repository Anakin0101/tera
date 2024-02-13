import { CurrencySignMap } from './CurrencySignMap';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export const formatMoney = (value: number, currency?: CurrencyEnum) => {
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
