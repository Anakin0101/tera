import { LoanType } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { Currency } from 'services/apis/productsAPI/productsAPI.types';

export interface LoanSliderItemProps {
  item: LoanType;
}

export interface NextPaymentProps {
  nextPaymentAmount: number;
  nextPaymentDate: string;
  currency: Currency;
}

export interface LoanDetailsProps {
  loan: LoanType;
}
