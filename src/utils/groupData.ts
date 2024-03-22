import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { ExchageRateType } from 'screens/ExchangeRatesScreen/ExchangeRatesScreen.types';
import {
  Account,
  ExchangeRate,
  ExchangeRateTypeEnum,
  AccountTypeEnum,
  BlockedTransactionExtendedType,
  TransactionType,
} from 'services/apis/productsAPI/productsAPI.types';

/**
 * Groups accounts by IBAN.
 * @param {Account[]} accounts - Array of account objects to be grouped.
 * @param {keyof Account} property - The property of the account object to group by (e.g., 'iban').
 * @returns {IGroupedAccountsByIban[]} An array of grouped account objects.
 */

export const groupAccountsByIban = (
  accounts: Account[] = [], // Default value is an empty array
  propery: keyof Account, // Property of the account object to group by
): IGroupedAccountsByIban[] => {
  return Object.values(
    accounts.reduce((result, account) => {
      const iban = account[propery] as string; // Extract the IBAN from the specified property

      if (!result[iban]) {
        // If IBAN doesn't exist in the result, create a new entry
        result[iban] = {
          iban,
          accounts: [], // Initialize an empty array to store accounts with this IBAN
          accountName: account.accountName,
          accountNumber: account.accountNumber,
          isCardAccount: account.accountType === AccountTypeEnum.Card,
          cards: [], // Initialize an empty array to store cards associated with this IBAN
        };
      }
      result[iban].accounts.push(account); // Push the account to the corresponding IBAN group

      // Check if the account has cards
      if (account?.cards) {
        account?.cards?.forEach(card => {
          const index = result?.[iban]?.cards?.findIndex(item => item?.pan === card?.pan); // Check if the card already exists

          // If card doesn't exist in the result, push it
          if (index === -1) {
            result?.[iban]?.cards?.push(card);
          }
        });
      }
      return result;
    }, {} as { [key: string]: IGroupedAccountsByIban }), // Initial value is an empty object
  );
};

export const groupTransactionsByDate = (transactions: TransactionType[]) => {
  return Object.entries(
    transactions.reduce((result: Record<string, TransactionType[]>, item) => {
      const docDate = item.docDate.split('T')[0];

      if (!result[docDate]) {
        result[docDate] = [];
      }

      result[docDate].push(item);

      return result;
    }, {}),
  ).map(([docDate, data]) => ({
    title: docDate,
    data,
  }));
};

export const groupRates = (data?: ExchangeRate[]) => {
  if (!data) return [];

  return Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.currency]) {
        acc[item.currency] = {
          currency: item.currency,
        };
      }

      if (item.type === ExchangeRateTypeEnum.Special) {
        acc[item.currency].special = {
          buy: item.amountBuy,
          sell: item.amountSell,
        };
      }
      if (item.type === ExchangeRateTypeEnum.Standard) {
        acc[item.currency].standard = {
          buy: item.amountBuy,
          sell: item.amountSell,
        };
      }

      if (item.type === ExchangeRateTypeEnum.Official) {
        acc[item.currency].official = {
          buy: item.amountBuy,
          sell: item.amountSell,
        };
      }
      return acc;
    }, {} as Record<string, ExchageRateType>),
  );
};

export const groupBlockedTransactionsByTime = (transactions: BlockedTransactionExtendedType[]) => {
  return Object.entries(
    transactions.reduce((result: Record<string, BlockedTransactionExtendedType[]>, item) => {
      // splits the string at 'T' and takes the first part (the date)
      const dateKey = item.time.split('T')[0];

      if (!result[dateKey]) {
        result[dateKey] = [];
      }

      result[dateKey].push(item);

      return result;
    }, {}),
  ).map(([time, data]) => ({
    title: time,
    data,
  }));
};
