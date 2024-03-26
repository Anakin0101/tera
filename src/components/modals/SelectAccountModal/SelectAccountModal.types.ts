import { Account } from 'services/apis/productsAPI/productsAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface SelectAccountModalProps {
  selectedAccount: Account | null;
  onPress: React.Dispatch<React.SetStateAction<Account | null>>;
  setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCurrency: CurrencyEnum;
}

export interface ItemProps {
  isSelected: boolean;
  account: Account;
  onPress: () => void;
}
