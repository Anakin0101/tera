import { Account } from 'services/apis/productsAPI/productsAPI.types';

export interface MyBalanceProps {
  selectedAccount?: Account;
  selectAccountOnPress: (account: Account) => void;
}
