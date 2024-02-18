export type GetTemplatesResponseType = {
  templates: Template[];
};

export type DefaultHeadersRequestType = {
  headers?: Record<string, any>;
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
