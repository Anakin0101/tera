import { Currency, WalletAccount } from 'services/apis/productsAPI/productsAPI.types';

export interface SelectDepositModalProps {
  deposits: WalletAccount[];
  onPress: React.Dispatch<React.SetStateAction<WalletAccount | null>>;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency>>;
  selectedDeposit: WalletAccount | null;
}

export interface ItemProps {
  isSelected: boolean;
  account: WalletAccount;
  onPress: () => void;
}
