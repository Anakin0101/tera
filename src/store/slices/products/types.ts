import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { OverdraftType } from 'services/apis/dashboardAPI/dashboardAPI.types';

export type ProductsStateProps = {
  groupedAccountsByIban: IGroupedAccountsByIban[];
  totalAvailableBalanceGEL: number;
  cards: any;
  lastTransactions: any;
  overdrafts: OverdraftType[];
};
