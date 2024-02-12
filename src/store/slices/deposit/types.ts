import { OfferDetails } from 'services/apis/productsAPI/productsAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

interface SelectedAccount {
  id: number;
  balance: number;
  iban: string;
}

interface ProductName {
  ka: string;
  en: string;
}

export type NewDepositStateProps = {
  depositType: string;
  initialAmount: number;
  currency: CurrencyEnum;
  duration: number;
  interestRate: number;
  specialInterestRate: number;
  effectiveInterestRate: number;
  benefit: number;
  offer: OfferDetails | null;
  productId: number;
  registrationId: string;
  imageUrl: string;
  creditAccount: SelectedAccount;
  debitAccount: SelectedAccount;
  productName: ProductName;
};

interface InitialAmount {
  initialAmount: number;
  currency: CurrencyEnum;
  creditAccount: SelectedAccount;
  debitAccount: SelectedAccount;
}

export interface InitialAmountPayload {
  payload: InitialAmount;
}

interface DepositDuration {
  duration: number;
  interestRate: number;
  specialInterestRate: number;
  effectiveInterestRate: number;
  benefit: number;
  productId: number;
  productName: ProductName;
}

export interface DepositDurationPayload {
  payload: DepositDuration;
}

export interface OfferDetailsPayload {
  payload: OfferDetails;
}

export interface ActivateDepositReq {}

export interface DepositTypePayload {
  payload: {
    depositType: string;
    imageUrl: string;
  };
}
