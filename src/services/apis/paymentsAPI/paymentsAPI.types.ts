import { LanguageKeyForAPIEnum } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { ServiceFieldTypeEnum } from './paymentEnums';

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

export interface GetDebtVerifyBasketResponse extends Array<DebtVerifyBasketResponse> {}
export interface DebtVerifyBasketResponse {
  id: number;
  key: string;
  name: string;
  readonly: boolean;
  required: boolean;
  visible: boolean;
  fieldType: ServiceFieldTypeEnum;
  decimalPlaces: number;
  fieldItems: Array<FieldItem> | null;
  fieldDirection: number;
  value: string;
  relations: any; // ეს ფრონტშიც ეგრეა აღწერილი, რას აყოლებენ ვერ მივხვდი // TODO გავაკეთოთ აღწერა
}

export interface FieldItem {
  key: string;
  name: string;
  value: string;
  relations: any; // ეს ფრონტშიც ეგრეა აღწერილი, რას აყოლებენ ვერ მივხვდი // TODO გავაკეთოთ აღწერა
  order: number;
}

export interface GetDebtVerifyBasketParams {
  serviceId: number;
  culture: string;
}

export interface DebtVerifyInfoResponse {
  debtVerifyResults: Array<DebtVerifyResult>;
}

export interface DebtVerifyResult {
  success: boolean;
  serviceId: number;
  customerNumber: string;
  serviceSubType: string;
  customerName: string;
  description: string;
  payable: number;
  balance: number;
  debt: number;
  feeFormula: string;
  error: string;
  serviceFields: Array<ServiceField>;
}

export interface ServiceField {
  id: number;
  key: string;
  name: string;
  readonly: boolean;
  required: boolean;
  visible: boolean;
  fieldType: number;
  decimalPlaces: number;
  fieldItems: any[]; // ეს ფრონტშიც ეგრეა აღწერილი, რას აყოლებენ ვერ მივხვდი // TODO გავაკეთოთ აღწერა
  fieldDirection: number;
  value: any; // ეს ფრონტშიც ეგრეა აღწერილი, რას აყოლებენ ვერ მივხვდი // TODO გავაკეთოთ აღწერა
  relations: any[]; // ეს ფრონტშიც ეგრეა აღწერილი, რას აყოლებენ ვერ მივხვდი // TODO გავაკეთოთ აღწერა
}

export interface DebtVerifyRequestBody {
  serviceId: number;
  fieldValues: Array<PaymentFieldValue>;
  culture: LanguageKeyForAPIEnum;
}

export interface PaymentFieldValue {
  id: number;
  value: string;
}
