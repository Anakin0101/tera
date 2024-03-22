import { SectionListRenderItem } from 'react-native';
import {
  OpCategoryEnum,
  BlockedTransactionExtendedType,
  TransactionType,
} from 'services/apis/productsAPI/productsAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface TotalsProps {
  income: number;
  expense: number;
}

export type TransactionFilters = {
  startDate: string;
  endDate: string;
  accountNumber: number | null;
  currency: CurrencyEnum | null;
  category: OpCategoryEnum | null;
};
export interface HeaderProps {
  setFilters: React.Dispatch<React.SetStateAction<TransactionFilters>>;
  filters: TransactionFilters;
  search: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  iban?: string;
  requestBlockedTransactions?: () => void;
  blockedTransactionsFilterActive?: boolean;
  clearBlockedTransactions?: () => void;
}

export interface ISections {
  title: string;
  data: TransactionItem[];
}
export interface FooterProps {
  sections?: ISections[];
  loading?: boolean;
  blockedTransactionsFilterActive?: boolean;
}

type SectionHeaderProps = {
  title: string;
};

export type RenderSectionHeader = (section: { section: SectionHeaderProps }) => JSX.Element;

export type TransactionItem = TransactionType | BlockedTransactionExtendedType;

export type KeyExtractor = (item: TransactionItem, index: number) => string;

export type RenderItem = SectionListRenderItem<TransactionItem, ISections>;
