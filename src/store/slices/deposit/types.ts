import { Currency } from 'services/apis/productsAPI/productsAPI.types';

export type NewDepositStateProps = {
  depositType: string;
  initialAmount: number;
  currency: Currency;
  initAccount: string;
  initAccountAvailableBalance: number;
  finalAccount: string;
  finalAccountAvailableBalance: number;
  duration: number;
  withdrawalPeriod: string;
  interestRate: number;
  specialInterestRate: number;
  effectiveInterestRate: number;
  benefit: number;
};

interface InitialAmount {
  initialAmount: number;
  currency: Currency;
  initAccount: string;
  finalAccount: string;
  initAccountAvailableBalance: number;
  finalAccountAvailableBalance: number;
}

export interface InitialAmountPayload {
  payload: InitialAmount;
}

interface DepositDuration {
  duration: number;
  withdrawalPeriod: string;
  interestRate: number;
  specialInterestRate: number;
  effectiveInterestRate: number;
  benefit: number;
}

export interface DepositDurationPayload {
  payload: DepositDuration;
}
