import { transactionTitles } from 'utils/transactionUtils';
export interface cardSwapProps {
  accountIban: string;
  accountId: number;
  accountName: string;
  accountNameCustom: string;
  accountNameLat: string;
  accountNumber: number;
  accountStatusId: number;
  accountType: number;
  availableBalance: number;
  balance: number;
  isFavourite: boolean;
  positionIndex: number;
}

export interface TransferProps {
  onTextChange: (text: string) => void;
  inputRef: any;
  openTransferScreen: () => void;
  selectedData: any;
  accountFromData: any;
  fromOtherBanks?: boolean;
  transactionTitle?: keyof typeof transactionTitles;
}

export interface TransferData {
  mobile?: string;
  purpose: string;
  extraPurpose: string;
  otp: string;
  fastPayment: string;
  bankCode: string;
  bankName: string;
  debitAccountId: number;
  invoice: any;
  receiverIban: string;
  amount: number;
  receiverName: string;
  saveAsTemplateName?: string;
}

export interface AccountData {
  iban: any;
  accountId: any;
  ccy: string;
}
