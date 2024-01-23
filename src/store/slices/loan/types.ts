import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export type NewLoanStateProps = {
  loanType: string;
  amount: string;
  duration: string;
  currency: CurrencyEnum;
  paymentDate: string;
  typeOfIncome: any[];
  income: string;
  workplace: string;
  position: string;
};

type NewLoanAmountAndDuration = {
  loanType: string;
  amount: string;
  duration: string;
  currency: CurrencyEnum;
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
