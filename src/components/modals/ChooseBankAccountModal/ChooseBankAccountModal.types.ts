import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { Account } from 'services/apis/productsAPI/productsAPI.types';

export interface ChooseBankAccountModalProps {
  confirm: (account: Account) => void;
  cancel: () => void;
  modalVisible: boolean;
  selectedAccount?: Account;
}

export interface ChooseBankAccountItemProps {
  item: IGroupedAccountsByIban;
  selectedAccount?: Account;
  selectAccountOnPress: (account: Account) => void;
}

export interface BankAccountItemProps {
  account: Account;
  isLast: boolean;
  selectedAccount?: Account;
  selectAccountOnPress: (account: Account) => void;
}
