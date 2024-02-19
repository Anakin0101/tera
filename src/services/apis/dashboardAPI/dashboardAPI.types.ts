import { Currency, TransactionType } from '../productsAPI/productsAPI.types';
import { CurrencyEnum } from '../transfersAPI/transfersAPI.types';

export type DefaultHeadersRequestType = {
  headers?: Record<string, any>;
};

export type GetCustomerOperationsResponseTypes = {
  ops: TransactionType[];
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
  currency: CurrencyEnum;
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
  culture?: string;
  currency?: Currency | null;
  endDate: string;
  startDate: string;
  accountNumber?: number | null;
  opCategory?: OpCategoryEnum | null;
  searchWords?: string;
  splitOps?: boolean;
};
type Conversion = {
  debitIban: string;
  debitCurrency: string;
  creditIban: string;
  creditCurrency: string;
};

type BudgetTransaction = {
  debitIban: string;
  treasuryCode: string;
  amount: number;
  payerCode: string;
  payerName: string;
  description: string;
  extraDescription: string;
  isTrusted: boolean;
  trustedAddDate: string;
};
type MobilePaymentTransaction = {
  customerNumber: string;
  debitAccountId: number;
  serviceId: number;
  serviceSubType: string;
  amount: number;
  isTrusted?: null;
};
type P2PTransfer = {
  mobile: string;
  email: string;
  receiverName: string;
  debitIban: string;
  currency: string;
  amount: number;
  description: string;
  extraDescription: string;
  isTrusted?: null;
};
type InternalTransaction = {
  debitIban: string;
  creditIban: string;
  currency: string;
  amount: number;
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
  otpRequired?: boolean;
};

export type Template = {
  id: number;
  name: string;
  type: number;
  icon: any;
  internalIban: any;
  internalAmount: any;
  currency: any;
  imageUrl?: string | null;
  conversion: Conversion | null;
  internal: InternalTransaction | null;
  bankInternal: BankInternalTransaction | null;
  budget: BudgetTransaction | null;
  bankExternal: BankExternalTransaction | null;
  mobilePayment: MobilePaymentTransaction | null;
  p2pTransfers: P2PTransfer | null;
  [key: string]: any;
};

export type GetTemplatesResponseType = {
  templates: Template[];
};

// ... (other types remain unchanged)

export type Transactions = {
  opId: number;
  opUId: string;
  amount: number;
  balance: number;
  balanceStart: number;
  description: string;
  docDate: string;
  isIncome: boolean;
  id: number;
  currency: string;
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
  currency: CurrencyEnum;
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
  currency: CurrencyEnum;
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
  currency: CurrencyEnum;
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

export enum OpCategoryEnum {
  Income = 1,
  ToSomeone = 2,
  ToOwnAccount = 3,
  Exchange = 4,
  ToTreasure = 5,
  Payments = 6,
}

export type GetBankerAPIResponseType = {
  firstName?: string;
  lastName?: string;
  branchName?: string;
  phone?: string;
  branchPhone?: string;
  email?: string;
  imageId?: string;
};

export type BannerDataTypes = {
  bannerLink?: string;
  imageBase64?: string;
};
export type BannerDataResponse = {
  data: BannerDataTypes[];
};
