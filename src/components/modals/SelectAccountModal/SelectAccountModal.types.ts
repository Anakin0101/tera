import { Account, Currency } from 'services/apis/productsAPI/productsAPI.types';

export interface SelectAccountModalProps {
  selectedAccount: Account | null;
  onPress: React.Dispatch<React.SetStateAction<Account | null>>;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCurrency: Currency;
}

export interface ItemProps {
  isSelected: boolean;
  account: Account;
  onPress: () => void;
}
