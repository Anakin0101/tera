import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Currency } from '../productsAPI/productsAPI.types';
import { SerializedError } from '@reduxjs/toolkit';
import { CustomBackendError } from 'services/types';

export type convertAmountType = {
  amountBuy: number;
  amountSell: number;
  conversionAvailableLimit: number;
  currencyBuy: string;
  currencySell: string;
  specialItems: number;
  specialRate?: number;
  specialRateUsed: boolean;
  specialReversed: boolean;
  standardItems: number;
  standardRate: number;
  standardReversed: boolean;
};
export type convertAmountSellType = {
  amountBuy: number;
  amountSell: number;
  conversionAvailableLimit: number;
  currencyBuy: string;
  currencySell: string;
  specialItems: number;
  specialRate: number | undefined;
  specialRateUsed: boolean | undefined;
  specialReversed: boolean;
  standardItems: number;
  standardRate: number | undefined;
  standardReversed: boolean;
};

export type convertAmountBuyRequestType = {
  amountBuy?: number;
  currencyBuy?: string;
  currencySell?: string;
  shouldCallApi?: unknown;
};
export interface SaveTemplateResponseData {
  data: { id: number; otpRequired: boolean; authMethod: string; authorized: boolean };
}

export type convertAmountSellRequestType = {
  amountSell?: number;
  currencyBuy: string;
  currencySell: string;
  shouldCallApi?: boolean;
};

export type GetCustomerOperationsResponseTypes = {
  ops: Transactions[];
};

export type OverdraftType = {
  id: number;
  accountId: number;
  productName: string;
  agreementNumber: string;
  interestRate: number;
  startDate: string | null;
  endDate: string | null;
  overdraftLimit: number;
  currency: Currency;
  totalDebt: number;
  totalInterest: number;
  usedPrincipalAmount: number;
  creditPeriodInMonths: number;
  restCreditPeriodInMonths: number;
  nextPaymentDate: string | null;
  nextPaymentAmount: number;
};
export type GetCustomerOperationsRequestTypes = {
  count: number;
  culture: string;
  currency: string;
  endDate: string;
  startDate: string;
  accountNumber?: number | null;
};
export type Template = {
  id: number;
  name: string;
  type: number;
  imageUrl: string | null;
  conversion: unknown | null;
  internal: InternalTransaction | null;
  bankInternal: BankInternalTransaction | null;
  budget: unknown | null;
  bankExternal: BankExternalTransaction | null;
  mobilePayment: unknown | null;
  p2pTransfer: unknown | null;
};

export type Transactions = {
  amount: number;
  balance: number;
  balanceStart: number;
  description: string;
  docDate: unknown;
  isIncome: boolean;
};
export type TreasuryItem = {
  id: string;
  name: string;
};

export type treasuryRes = TreasuryItem[] | undefined;

export type sendTreasuryRes = {
  orderId: number;
  otpRequired: boolean;
  templateId: number;
};

export type TreasuryApiResponse = {
  data?: sendTreasuryRes;
  error?: FetchBaseQueryError | SerializedError;
};

export type sendTreasuryReq = {
  body: {
    amount: string;
    debitAccountId: number;
    payForSomeone: boolean;
    payerCode: string;
    payerName: string;
    purpose: string;
    sendOtp: boolean;
    treasuryCode: string;
    usedTemplateId: null;
  };
  headers: Headers | string[][] | Record<string, string | undefined> | undefined;
};

type InternalTransaction = {
  debitIban: string;
  creditIban: string;
  currency: string;
  amount: number;
};

type BankInternalTransaction = {
  personalId: string | null;
  debitIban: string;
  creditIban: string;
  currency: string;
  amount: number;
  description: string;
  extraDescription: string | null;
  isTrusted: boolean;
  trustedAddDate: string | null;
};

type BankExternalTransaction = {
  debitIban: string;
  receiverIban: string;
  receiverName: string;
  receiverAddress: string | null;
  receiverBankCode: string;
  receiverBankName: string | null;
  intermedBankCode: string | null;
  intermedBankName: string | null;
  currency: string;
  amount: number;
  description: string;
  extraDescription: string | null;
  insured: boolean;
  isTrusted: boolean;
  trustedAddDate: string | null;
};

export enum DepositTypeEnum {
  Increasing = 5,
  Universal = 10,
  Saving = 11,
}
export enum amountBuyOrSell {
  buy = 'buy',
  sell = 'sell',
}
export enum CurrencyEnum {
  GEL = 'GEL',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

export enum FinancialTransferTypeEnum {
  ToOwnAccount = 1,
  Exchange = 2,
  ToSomeoneInsideBank = 3,
  ToSomeoneInGeorgia = 4,
  ToSomeoneOutOfGeorgia = 5,
  ToTreasury = 6,
  P2pTransfer = 7,
}
export enum TransferTemplateTypeEnum {
  Exchange = 1,

  ToOwnAccount = 2,

  ToSomeoneInsideBank = 3,

  ToSomeoneInGeorgiaGEL = 4,

  ToSomeoneInGeorgia = 5,

  ToTreasury = 6,

  ToSomeoneOutOfGeorgia = 7,

  MobilePayment = 8,

  P2p = 17,
}
export enum OtherBanksTransactionsTabsEnum {
  PERSONAL_TRANSACTION = 1,
  IBAN_TRANACTION = 0,
  MOBILE_TRANSACTION = 2,
}

export type Asset = {
  accountId: number;
  accountNumber: number;
  agreementNumber: string;
  amount: number;
  canCredit: boolean;
  canDebit: boolean;
  currency: Currency;
  depositId: number;
  depositName: string;
  depositNameEng: string;
  depositType: string;
  depositTypeEng: string;
  endDate: string;
  iban: string;
  interestPercent: number;
  isCD: boolean;
  nominalAmount: number;
  period: number;
  productId: number;
  startDate: string;
  totalAccrualPercent: number;
  totalCapitalizedPercent: number;
  totalInterest: number;
  typeId: DepositTypeEnum;
};

export type TransferToOwnAccountRequestType = {
  amount: string;
  creditAccountId: number;
  debitAccountId: number;
};

export type TransferToOwnAccountResponseType = {
  data?: {};
  error?: CustomBackendError | FetchBaseQueryError | SerializedError;
};

export type TransferToSomeoneResultResponseType = {
  data?: {};
  error?: CustomBackendError | FetchBaseQueryError | SerializedError;
};

export type treasuryReq = {
  a?: string;
  b?: string;
  c?: string;
};
