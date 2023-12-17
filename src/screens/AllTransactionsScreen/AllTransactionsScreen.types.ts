import { Currency, TransactionType } from 'services/apis/productsAPI/productsAPI.types';

export interface TotalsProps {
  income: number;
  expense: number;
}

export type TransactionFilters = {
  startDate: string;
  endDate: string;
  iban: string;
  currency: Currency | null;
  type: string;
};
export interface HeaderProps {
  setFilters: React.Dispatch<React.SetStateAction<TransactionFilters>>;
  filters: TransactionFilters;
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
