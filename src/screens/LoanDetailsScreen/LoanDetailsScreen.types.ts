import {
  CreditCardType,
  Currency,
  LoanType,
  OverdraftType,
} from 'services/apis/productsAPI/productsAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface LoanSliderItemProps {
  item: OverdraftType | LoanType | CreditCardType;
}

export interface NextPaymentProps {
  nextPaymentAmount: number;
  nextPaymentDate: string;
  currency: Currency;
}

export interface LoanDetailsProps {
  loan: LoanType;
}

export interface DetailsProps {
  data: OverdraftType | LoanType | CreditCardType;
}

export interface CollapsibleHeaderProps {
  title: string;
  total: number;
  currency: CurrencyEnum;
}

export interface TotalDebtContentProps {
  totalPrincipalPayable: number;
  totalInterestPayable: number;
  totalPenalty: number;
  currency: CurrencyEnum;
}
export interface OverdueContentProps {
  overduePrincipalAmount: number;
  overduePrincipalPenalty: number;
  overdueInterestAmount: number;
  overdueInterestPenalty: number;
  defferdPrincipalAmount?: number;
  currency: CurrencyEnum;
}

export interface CreditCardDetailsProps {
  creditCard: CreditCardType;
}
export interface OverdraftDetailsProps {
  overdraft: OverdraftType;
}
