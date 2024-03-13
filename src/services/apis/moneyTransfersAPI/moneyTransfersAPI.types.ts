import { CurrencyEnum } from '../transfersAPI/transfersAPI.types';

export interface ReceiverTsMTSystemsResponse {
  success: boolean;
  mtSystem: Array<ReceiverMtSystem>;
  error?: string;
  pending?: boolean;
  transferSendPrepareResponse?: any;
  invalidReceiveCountry?: boolean;
  errorMessage?: string;
}

export interface ReceiverMtSystem {
  currencies: Array<Currency>;
  mtSystem: any; // აქ არ ვიცი რა ბრუნდება
  skipSendCountrySelection: boolean;
  key?: string;
  name?: string;
}

export interface Currency {
  code: string;
  receiveMaxAmount: number;
  receiveMaxAmountSpecified: boolean;
}

export interface FindTransferRequestParams {
  channelCode: string;
  mtSystem: string;
  transferNumber: string;
  currency?: string;
  culture: string;
}

export interface FindTransferResponse {
  success: boolean;
  amount: number;
  countryCode: string;
  currency: CurrencyEnum;
  receiverFirstName: string;
  receiverLastName: string;
  senderFirstName: string;
  senderLastName: string;
  errorMessage: string;
}

export interface TransferFieldValue {
  code: string;
  value: string;
}

export interface ReceiveTransferRequestParams {
  mtSystem: string;
  channelCode: string;
  transferNumber: string;
  receiverCustomerId: number;
  amount: number;
  currency: string;
  receiveBankAccountNumber: string;
  fieldValues: Array<TransferFieldValue>;
  sellAccountId: number;
  buyAccountId: number;
  buyAmount: number;
  buyCurrency: string;
  agreeCreditInfoAgreement: boolean;
  isExchange: boolean;
  otp: string;
  sendOtp: boolean;
  culture: string;
}

export interface ReceiveTransferResponse {
  otpRequired: true;
  transferInfo: TransferInfo;
}

export interface TransferInfo {
  success: boolean;
  amount: number;
  currency: string;
  status: number;
  transferId: number;
  transferNumber: string;
}

export interface GetMoneyTransferListRequestParams {
  transferType: number;
  currency?: string;
  sortField: number;
  sortOrder: number;
  minAmount: number;
  maxAmount: number;
  startDate: string;
  endDate: string;
  page: number;
  itemsPerPage: number;
}

export interface MoneyTransferListResponse {
  customerTransferList: Array<MoneyTransferList>;
}

export interface MoneyTransferList {
  transferId: number;
  amount: number;
  currency: string;
  mtSystem: string;
  mtSystemName?: string;
  receiverFirstName: string;
  receiverLastName: string;
  senderFirstName: string;
  senderLastName: string;
  status: MoneyTransferStatusEnum;
  transactionDate: string;
  transferType: number;
}

export enum MoneyTransferStatusEnum {
  pending = 0,
  rejected = 1,
  success = 2,
  received = 3,
}

export interface TransferInfoRequestParams {
  internalTransferId: number;
}

export interface TransferInfoResponse {
  transfer: Transfer;
  success: boolean;
}

export interface Transfer {
  payoutAmount: number;
  payoutCurrency: string;
  principalAmount: number;
  principalCurrency: string;
  receiveCity: string;
  receiveCountry: string;
  receivePoint: string;
  receiveState: string;
  sendCountry: string;
  totalFee: number;
  transferId: number;
  transferIdSpecified: boolean;
  transferNumber: string;
  transferStatus: MoneyTransferStatusEnum;
}

export interface TransferStatusRequestParams {
  transferId: number;
}

export interface TransferStatusResponse {
  transferInfo: TransferInfo;
}

export interface TransferInfo {
  amount: number;
  amountFieldSpecified: boolean;
  currency: string;
  message: string;
  mtSystem: string;
  receiverFirstName: string;
  receiverLastName: string;
  TransferReceiveStatus: number;
  rejectReasonFieldSpecified: boolean;
  sendCountry: string;
  senderFirstName: string;
  senderLastName: string;
  status: number;
  statusFieldSpecified: boolean;
  statusMessage: string;
  time: Date;
  timeFieldSpecified: boolean;
  transferId: number;
  transferNumber: string;
  receiveBankAccountNumber: string;
}
