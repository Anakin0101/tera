import { SelectedIncomeType } from 'components/modals/IncomeTypeModal/IncomeTypeModal.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export type NewLoanStateProps = {
  loanType: string;
  amount: string;
  duration: string;
  currency: CurrencyEnum;
  paymentDate: string;
  typeOfIncome: SelectedIncomeType;
  income: string;
  workplace: string;
  position: string;
  productsGroupId: number | null;
  maxPaymentDayAfterRequested: number;
  minPaymentDayAfterRequested: number;
};

type NewLoanAmountAndDuration = {
  loanType: string;
  amount: string;
  duration: string;
  currency: CurrencyEnum;
  productsGroupId: number | null;
};

export type NewLoanAmountAndDurationPayload = {
  payload: NewLoanAmountAndDuration;
};

type NewLoanAdditionalData = {
  paymentDate: string;
  typeOfIncome: any[];
  income: string;
  workplace: string;
  position: string;
};

export type NewLoanAdditionalDataPayload = {
  payload: NewLoanAdditionalData;
};

export type MinMaxPaymentDay = {
  maxPaymentDayAfterRequested: number;
  minPaymentDayAfterRequested: number;
};

export type MinMaxPaymentDayPayload = {
  payload: MinMaxPaymentDay;
};
