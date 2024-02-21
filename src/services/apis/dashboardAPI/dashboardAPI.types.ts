export type GetTemplatesResponseType = {
  templates: Template[];
};

export type DefaultHeadersRequestType = {
  headers?: Record<string, any>;
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
