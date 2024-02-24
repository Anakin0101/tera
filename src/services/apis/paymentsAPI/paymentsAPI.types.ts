import { LanguageKeyForAPIEnum } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { ServiceFieldTypeEnum } from './paymentEnums';

export interface GetPaymentsServiceResponse {
  providersGroups: Array<ProvidersGroup> | null;
}

export interface GetPaymentsServiceParams {
  isAdult: boolean;
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

export interface PayRequestBody {
  accountId: number | null;
  isTeraBytes: any;
  payments: Array<Payment>;
  sendOtp: boolean;
  otp: string | null;
  culture: LanguageKeyForAPIEnum;
}

export interface Payment {
  serviceId: number;
  fieldValues: Array<PaymentFieldValue>;
  saveIntoBasketId: number | null;
  basketItemName: string | null;
  basketItemDescription: string | null;
}

export interface PayResponse {
  otpRequired: boolean;
  paymentResults: Array<PaymentResult>;
  error?: {
    data?: {
      detail?: string;
    };
  };
}

export interface PaymentResult {
  serviceId: number;
  serviceName: string;
  amount: number;
  fee: number;
  saveIntoBasketSuccessed: boolean;
  saveIntoBasketError: any;
}

export interface AutoPayment {
  userId: number;
  culture: string;
  name: string;
  serviceId: number;
  type: number;
  fixedAmount: number | null;
  maxAmount: number | null;
  payDay: number;
  startDate: string;
  endDate: string;
  debtVerifyFieldValues: PaymentFieldValue[];
  accountId: number;
  getAuthMethod: boolean;
  sendOtp: boolean;
  otp: string;
  appHash: string;
  headers: Record<string, string>;
}

export type AutoPaymentReq = Partial<AutoPayment>;

export interface AutoPayments {
  culture: string;
}

export interface AutomPaymentRes {
  account: number;
  altaClientId: number;
  autoPaymentTypeEnum: number;
  cardAccount: number;
  customerNumber: string;
  endDate: string;
  fixedAmount: number;
  id: number;
  largeImageId: string;
  lastPayAmount: number;
  lastPayDate: string;
  maxAmount: number;
  name: string;
  payDay: number;
  serviceId: number;
  smallImageId: string;
  startDate: string;
}

export interface AutoPaymentDetailsReq {
  culture: string;
  id: number;
}

export interface AutoPaymentDetailsRes {
  autoPayment: any;
}

export interface AutoPaymentDetails {
  account: number;
  customerNumber: string;
  debtVerifyFields: Array<ServiceField>;
  debtVerifyResponse: DebtVerifyInfoResponse;
  endDate: string;
  fixedAmount: number;
  id: number;
  lastPayAmount: number;
  lastPayDate: string;
  maxAmount: number;
  name: string;
  nextPayDate: string;
  payDay: number;
  serviceId: number;
  startDate: string;
  type: number;
}

export interface AutoPaymentCancelPayload {
  culture: string;
  autoPaymentId: number;
  getAuthMethod: boolean;
  sendOtp: boolean;
  otp: string;
}

export type AutoPaymentCancelReq = Partial<AutoPaymentCancelPayload>;

export interface AddAutoPaymentRes {
  autoPaymentFee: number;
  autoPaymentTariffFee: number;
  channelData: any;
  error: any;
  otpRequired: boolean;
  pending: boolean;
  success: boolean;
}

export interface GetBasketResponse {
  baskets: Array<Basket>;
}
export interface Basket {
  id: number;
  name: string;
  basketServices?: Array<BasketService>;
}

export interface BasketService {
  customerNumbers: Array<FieldValue>;
  largeImage: string;
  name: {
    en: string;
    ka: string;
  };
  servicesId: number;
  smallImage: string;
}

export interface AddBasketResponse {
  basketId: number;
}

export interface AddBasketRequest {
  name: string;
}

export interface BasketItemsResponse {
  basketItems: Array<BasketItem>;
}
export interface BasketItem {
  id: number;
  name: any;
  serviceId: number;
  customerNumber: string;
  description: any;
  fieldValues: Array<FieldValue>;
  provider?: any; // ეს ინტერფეისები ვებიდან არის და ამ ფილდებზე არ ვიცი ზუსტად რა მოდელი ბრუნდება // TODO გავაკეთოთ აღწერა
  debtVerifyResult?: any; // ეს ინტერფეისები ვებიდან არის და ამ ფილდებზე არ ვიცი ზუსტად რა მოდელი ბრუნდება // TODO გავაკეთოთ აღწერა
  amount?: number;
  fee?: number;
  payFieldValues?: any; // ეს ინტერფეისები ვებიდან არის და ამ ფილდებზე არ ვიცი ზუსტად რა მოდელი ბრუნდება // TODO გავაკეთოთ აღწერა
  isItemChecked?: boolean;
}

export interface FieldValue {
  id: number;
  value: string;
}

export interface GetBasketItemsRequestParams {
  basketId: number;
  culture: string;
}

export interface AddBasketItemRequestParams {
  name: string;
  basketId: number;
  serviceId: number | null;
  debitAccountId: number | null;
  description: string;
  fieldValues: Array<PaymentFieldValue>;
  culture: string;
}

export interface AddBasketItemRequestResponse {
  error?: {
    data?: {
      detail?: string;
      title?: string;
    };
  };
}

export interface EditBasketRequestParams {
  basketId: number;
  name: string;
}

export interface DeleteBasketRequestBody {
  basketIds: Array<number>;
  culture: string;
}

export interface DeleteBasketItemRequestParams {
  itemsIds: Array<string>;
  culture: string;
}
