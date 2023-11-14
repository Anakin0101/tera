import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';

export type ProductsStateProps = {
  groupedAccountsByIban: IGroupedAccountsByIban[];
  totalAvailableBalanceGEL: number;
};
