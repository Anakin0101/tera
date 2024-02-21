import i18next from 'i18next';

export const MOBILE = 'mobile';
export const IBAN = 'IBAN';
export const PERSONAL = 'PERSONAL';
export const mobileNumberRegex = /^[0-9]{9}$/;
export const personalNumberRegex = /^\d{11}$/;
export const ibanRegex = /^[A-Z]{2}\d{2}[A-Z\d]+$/;
export const isForeignIban = /^GE\d{2}[A-Z]{2}\d{16}$/;

export const transactionTabs = [
  i18next.t('transactionDetails.personal'),
  i18next.t('transactionDetails.iban'),
  i18next.t('transactionDetails.mobile'),
];
export const TRANSFER_TERA = i18next.t('transfers.tera');
export const OTHER_BANK = i18next.t('transfers.otherBanks');
