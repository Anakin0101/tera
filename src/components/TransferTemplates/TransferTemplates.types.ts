export interface ITemplate {
  p2pTransfer: P2PTransfer;
  internal: InternalTransaction;
  bankInternal: BankInternalTransaction;
  bankExternal: BankExternalTransaction;
  name: string;
  iban: string;
}
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
  mobile: string;
  personalId: string;
  creditIban: string;
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

export interface ITemplateProps {
  item: ITemplate;
  index: number;
  fromOtherBanks?: boolean;
  selectedData?: string | null;
  fromPin?: boolean;
  setSelectedData: (iban: string) => void;
  setChosenTemplateIban?: (chosenTemplate: string) => void;
}
