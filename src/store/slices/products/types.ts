import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { LoanType, OverdraftType } from 'services/apis/dashboardAPI/dashboardAPI.types';
import {
  CardType,
  DepositType,
  TransactionType,
} from 'services/apis/productsAPI/productsAPI.types';

export type ProductsStateProps = {
  groupedAccountsByIban: IGroupedAccountsByIban[];
  totalAvailableBalanceGEL: number;
  cards: CardType[];
  lastTransactions: TransactionType[];
  overdrafts: OverdraftType[];
  deposits: DepositType[];
  totalDepositsGEL: number;
  loans: LoanType[];
  totalDebtGEL: number;
};
