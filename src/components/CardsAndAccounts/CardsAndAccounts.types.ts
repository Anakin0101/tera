import { ListRenderItem } from 'react-native';
import { Account, CardType, Currency } from 'services/apis/productsAPI/productsAPI.types';

export interface IGroupedAccountsByIban {
  accountNumber: number;
  accountName: string;
  accounts: Account[];
  iban: string;
  isCardAccount: boolean;
  cards: CardType[];
}

export interface CardsAndAccountsProps {
  accounts?: IGroupedAccountsByIban[];
  showTitle?: boolean;
  showFooter?: boolean;
  showDivider?: boolean;
  groupedUserBalance?: number;
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
  groupedUserBalance: number;
}

export type CurrencyMap = {
  cur: Currency;
  sign: string;
};

export type RenderItem = ListRenderItem<IGroupedAccountsByIban>;

export interface FooterProps {
  groupedUserBalance: number;
  showFooter: boolean;
}
