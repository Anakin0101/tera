import { Account } from 'services/apis/productsAPI/productsAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface MyBalanceProps {
  selectedAccount?: Account;
  selectAccountOnPress: (account: Account) => void;
  currency?: CurrencyEnum;
}
