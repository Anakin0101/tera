import { Currency } from 'services/apis/productsAPI/productsAPI.types';

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
}
