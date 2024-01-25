export interface GetPaymentsServiceResponse {
  providersGroups: Array<ProvidersGroup> | null;
}

export interface GetPaymentsServiceParams {
  isAdult: boolean;
}

export interface Basket {
  id: number;
  name: string;
}

export interface ProvidersGroup {
  id: number;
  name: NameByLang;
  imageId: string;
  order: number;
  isVisible: boolean;
  providers: Array<Provider>;
  autoPaymentsLength?: number;
}

export interface NameByLang {
  en: string;
  ka: string;
}

export interface Provider {
  id: number;
  name: NameByLang;
  smallImageId: string;
  largeImageId: string;
  canAddToBasket: boolean;
  otpRequired: boolean;
  order: number;
  isVisible: boolean;
  directDebitType: number;
  feeRules: Array<FeeRule>;
  providerGroupId?: number;
}

export interface FeeRule {
  amountFrom: number;
  fixedAmount: number;
  rate: number;
  minAmount: number;
  maxAmount: number;
}
