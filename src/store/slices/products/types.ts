import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { OverdraftType } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { CardType, TransactionType } from 'services/apis/productsAPI/productsAPI.types';

export type ProductsStateProps = {
  groupedAccountsByIban: IGroupedAccountsByIban[];
  totalAvailableBalanceGEL: number;
  cards: CardType[];
  lastTransactions: TransactionType[];
  overdrafts: OverdraftType[];
};
