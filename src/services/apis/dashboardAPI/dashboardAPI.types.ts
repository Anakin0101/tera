import { Currency } from '../productsAPI/productsAPI.types';

export type GetTemplatesResponseType = {
  templates: Template[];
};

export type GetTemplatesRequestType = {
  //   headers?: Record<string, any>; TODO - update!!
  headers?: any;
};

export type GetCustomerOperationsResponseTypes = {
  ops: Transactions[];
};

export type OverdraftType = {
  id: number;
  accountId: number;
  accountIban: string;
  productName: string;
  agreementNumber: string;
  interestRate: number;
  startDate: string;
  endDate: string;
  overdraftLimit: number;
  currency: Currency;
  totalDebt: number;
  totalInterest: number;
  usedPrincipalAmount: number;
  creditPeriodInMonths: number;
  restCreditPeriodInMonths: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  status: CreditStatus;
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
  docDate: any;
  isIncome: boolean;
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

export enum CreditStatus {
  Current = 60,
  Late = 70,
  Overdue = 80,
  WrittenOff = 90,
  Closed = 255,
}

export type LoanType = {
  accountId: number;
  accountNumber: number;
  accruedInterest: number;
  agreementNumber: string;
  amount: number;
  creditId: number;
  creditIsOn: boolean;
  creditPeriodInMonths: number;
  creditStatus: CreditStatus;
  currency: Currency;
  defferdInterestAmount: number;
  defferdPrincipalAmount: number;
  endDate: string;
  hasInsurance: true;
  hasSubsidizedInterest: boolean;
  interestRate: number;
  nextPaymentAmount: number;
  nextPaymentDate: string;
  nextPaymentsCount: number;
  notUsedPrincipalAmount: number;
  overdueInterestAmount: number;
  overdueInterestPenalty: number;
  overduePrincipalAmount: number;
  overduePrincipalPenalty: number;
  productName: string;
  restCreditPeriodInMonths: number;
  startDate: string;
  totalDebt: number;
  totalInterestPayable: number;
  totalOverduePayable: number;
  totalPayable: number;
  totalPenalty: number;
  totalPrincipalPayable: number;
  usedPrincipalAmount: number;
};

export type CreditCardType = {
  creditId: number;
  accountId: number;
  accountNumber: number;
  agreementNumber: string;
  currency: Currency;
  creditLimit: number;
  interestRate: number;
  creditStartDate: string;
  creditEndDate: string;
  billingDay: number;
  creditStatus: number;
  creditIsOn: true;
  usedPrincipalAmount: number;
  notUsedPrincipalAmount: number;
  accruedInterest: number;
  interestFreeCreditPayable: number;
  minPayable: number;
  minPrincipalPayable: number;
  minInterestPayable: number;
  paymentEndDate: string;
  totalPenalty: number;
  overduePrincipalAmount: number;
  overduePrincipalPenalty: number;
  overdueInterestAmount: number;
  overdueInterestPenalty: number;
  canShowAgreement: false;
  creditPeriodInMonths: number;
  restCreditPeriodInMonths: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  productName: string;
};
