import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import {
  LoanType,
  DepositType,
  OverdraftType,
  CreditCardType,
  TransactionType,
  ProductServiceCondition,
  CardProcessingCondition,
} from 'services/apis/productsAPI/productsAPI.types';

export type ProductsStateProps = {
  groupedAccountsByIban: IGroupedAccountsByIban[];
  totalAvailableBalanceGEL: number;
  overdrafts: OverdraftType[];
  deposits: DepositType[];
  totalDepositsGEL: number;
  loans: LoanType[];
  totalDebtGEL: number;
  creditCards: CreditCardType[];
  selectedTransaction: TransactionType | null;
  selectedCardData: SelectedCardData | null;
  selectedIban: IbanInfo | null;
  selectedBranch: BranchInfo | null;
  transferAccounts: IGroupedAccountsByIban[];
  selectedPackage: PackageInfo | null;
};
export interface SelectedCardData {
  canUpdate: boolean | null;
  cardHolderName: string | null;
  cardId: number | null;
  cardImageUrl: string | null;
  cardKind: string | null;
  cardProcessingConditions: CardProcessingCondition[] | null; // Replace with the actual type
  cardProductId: number | null;
  cardQuickPrintEnabled: boolean | null;
  endDate: string | null;
  name: string | null;
  productServiceConditions: ProductServiceCondition[] | null; // Replace with the actual type
  productUpdateServiceConditions: Record<string, ProductServiceCondition[]> | null; // Replace with the actual type
  serviceFee: string | null;
  validityPeriodYears: number | null;
}
export interface IbanInfo {
  accountIban: string;
  accountId: string;
}

export interface BranchInfo {
  id: number;
  branchName: string;
}
export interface PackageInfo {
  packageId: string;
  packageServiceId: string;
}
