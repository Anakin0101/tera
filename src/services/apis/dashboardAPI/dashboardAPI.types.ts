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
export type GetLiabilityResponseType = {
  liabilities: Liability[];
};

export type Liability = {
  id: number;
  accountId: number;
  productName: string;
  agreementNumber: string;
  interestRate: number;
  startDate: string | null;
  endDate: string | null;
  overdraftLimit: number;
  currency: string;
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
