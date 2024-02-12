import { WalletAccount } from 'services/apis/productsAPI/productsAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface SelectDepositModalProps {
  deposits: WalletAccount[];
  onPress: React.Dispatch<React.SetStateAction<WalletAccount | null>>;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<CurrencyEnum>>;
  selectedDeposit: WalletAccount | null;
}

export interface ItemProps {
  isSelected: boolean;
  account: WalletAccount;
  onPress: () => void;
}
