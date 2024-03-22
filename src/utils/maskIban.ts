import { ASTERISKS } from 'constants/common';

export const maskIban = (iban: string, currency?: string) => {
  if (!iban || iban.length <= 8) {
    return iban;
  }
  if (currency) {
    return `${iban.substring(0, 4)}${ASTERISKS}${iban.slice(-4)}${currency}`;
  } else {
  }
  return `${iban.substring(0, 4)}${ASTERISKS}${iban.slice(-4)}`;
};
