import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export const getCurrencyIcon = (currency?: string) => {
  switch (currency) {
    case CurrencyEnum.GEL:
      return '₾';
    case CurrencyEnum.USD:
      return '$';
    case CurrencyEnum.EUR:
      return '€';
    case CurrencyEnum.GBP:
      return '£';

    default:
      return currency;
  }
};
