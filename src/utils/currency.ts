export const getCurrencyIcon = (currency?: string) => {
  switch (currency) {
    case 'GEL':
      return '₾';
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';

    default:
      return currency;
  }
};
