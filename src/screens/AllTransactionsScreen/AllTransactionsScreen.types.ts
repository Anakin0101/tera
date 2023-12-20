import { OpCategoryEnum } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { Currency, TransactionType } from 'services/apis/productsAPI/productsAPI.types';

export interface TotalsProps {
  income: number;
  expense: number;
}

export type TransactionFilters = {
  startDate: string;
  endDate: string;
  accountNumber: number | null;
  currency: Currency | null;
  category: OpCategoryEnum | null;
};
export interface HeaderProps {
  setFilters: React.Dispatch<React.SetStateAction<TransactionFilters>>;
  filters: TransactionFilters;
  search: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  iban?: string;
}

export interface ISections {
  title: string;
  data: TransactionType[];
}
export interface FooterProps {
  sections?: ISections[];
}

type SectionHeaderProps = {
  title: string;
};

export type RenderSectionHeader = (section: { section: SectionHeaderProps }) => JSX.Element;

export type KeyExtractor = (item: TransactionType, index: number) => string;
