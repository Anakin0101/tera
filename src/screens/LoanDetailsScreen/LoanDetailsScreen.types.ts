import {
  CreditCardType,
  LoanType,
  OverdraftType,
} from 'services/apis/dashboardAPI/dashboardAPI.types';
import { Currency } from 'services/apis/productsAPI/productsAPI.types';

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
  currency: Currency;
}

export interface TotalDebtContentProps {
  totalPrincipalPayable: number;
  totalInterestPayable: number;
  totalPenalty: number;
  currency: Currency;
}
export interface OverdueContentProps {
  overduePrincipalAmount: number;
  overduePrincipalPenalty: number;
  overdueInterestAmount: number;
  overdueInterestPenalty: number;
  defferdPrincipalAmount?: number;
  currency: Currency;
}
