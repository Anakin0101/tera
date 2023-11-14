import { Account, Currency } from 'services/apis/productsAPI/productsAPI.types';

export interface IGroupedAccountsByIban {
  accountNumber: number;
  accountName: string;
  accounts: Account[];
  iban: string;
  isCardAccount: boolean;
}

export interface CardsAndAccountsProps {
  accounts?: IGroupedAccountsByIban[];
  showTitle?: boolean;
  showFooter?: boolean;
  showDivider?: boolean;
  totalAvailableBalance?: number;
  seeAllAccounts?: boolean;
  displayDivider?: boolean;
}

export interface AccountProps {
  item: IGroupedAccountsByIban;
  isLast: boolean;
  handlePress?: () => void;
}

export interface HeaderProps {
  amount: number;
  showTitle: boolean;
  totalAvailableBalance: number;
}

export type CurrencyMap = {
  cur: Currency;
  sign: string;
};
