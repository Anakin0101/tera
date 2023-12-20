import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { Dispatch, SetStateAction } from 'react';
import { TransactionFilters } from 'screens/AllTransactionsScreen/AllTransactionsScreen.types';
import { Currency } from 'services/apis/productsAPI/productsAPI.types';

export interface TransactionByAccModalProps {
  setFilters: Dispatch<SetStateAction<TransactionFilters>>;
}

export interface ButtonsProps {
  onClearPress: () => void;
  onSelectPress: () => void;
}

export interface SelectCurrencyProps {
  accountNumber: number | null;
  groupedAccountsByIban: IGroupedAccountsByIban[];
  setCurrency: Dispatch<SetStateAction<Currency | null>>;
  currency: Currency | null;
}
