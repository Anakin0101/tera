import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { CARD_ACCOUNT } from 'constants/common';
import { ExchageRateType } from 'screens/ExchangeRatesScreen/ExchangeRatesScreen.types';
import {
  Account,
  CardType,
  ExchangeRate,
  ExchangeRateTypeEnum,
  TransactionType,
} from 'services/apis/productsAPI/productsAPI.types';

export const groupCardsByPan = (data: CardType[] = [], property: keyof CardType): CardType[] => {
  return Object.values(
    data.reduce((result, card) => {
      const pan = card[property] as string;

      if (!result[pan]) {
        result[pan] = card;
      }
      return result;
    }, {} as { [key: string]: CardType }),
  );
};

export const groupAccountsByIban = (
  accounts: Account[] = [],
  propery: keyof Account,
): IGroupedAccountsByIban[] => {
  return Object.values(
    accounts.reduce((result, account) => {
      const iban = account[propery] as string;

      if (!result[iban]) {
        result[iban] = {
          iban,
          accounts: [],
          accountName: account.accountName,
          accountNumber: account.accountNumber,
          isCardAccount: account.accountNameLat === CARD_ACCOUNT,
        };
      }
      result[iban].accounts.push(account);
      return result;
    }, {} as { [key: string]: IGroupedAccountsByIban }),
  );
};

export const groupTransactionsByDate = (transactions: TransactionType[]) => {
  return Object.entries(
    transactions.reduce((result: Record<string, TransactionType[]>, item) => {
      const docDate = item.docDate;

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
