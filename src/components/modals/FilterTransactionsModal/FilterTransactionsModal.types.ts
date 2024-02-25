import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { Dispatch, SetStateAction } from 'react';
import { TransactionFilters } from 'screens/AllTransactionsScreen/AllTransactionsScreen.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

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
  setCurrency: Dispatch<SetStateAction<CurrencyEnum | null>>;
  currency: CurrencyEnum | null;
}

export interface AccountProps {
  isSelected: boolean;
  account: IGroupedAccountsByIban;
  onPress: () => void;
}
