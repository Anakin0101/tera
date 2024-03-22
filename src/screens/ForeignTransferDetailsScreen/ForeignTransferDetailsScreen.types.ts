import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';

export interface budget {
  payerName: string;
  payerCode: string;
  payForSomeone: boolean;
}
export interface SelectedItemProp {
  selectedPrice: any;
  convertionData: any;
  accountFromData: any;
  accountToData: any;
  receiverInfo: any;
  otpData: any;
  selectedData: any;
  accountIban: any;
  selectedTransactionType: any;
  selectedOtherBankDataTitle: string;
  setBudgetPerson: budget;
  isInternal: boolean;
}
export interface SelectedItem {
  selectedPrice: string | number;
  accountFromData: any;
  accountToData: any;
  convertionData: any;
  selectedData: string;
  selectedOtherBankDataTitle: string;
  receiverInfo: any;
  otpData: any;
  selectedIban: string | null;
  invoiceData: any;
  savedTemplateForIban: any;
  accountIban: string | null;
  selectedTransactionType: {
    name: string;
    isFast: boolean | null;
    selected: number | null;
  };
  setBudgetPerson: {
    payerCode: string;
    payerName: string;
    payForSomeone: boolean;
  };
  wrappedCode: any;
  treasuryFromCode: any;
  foreignIbanData: any;
}
export type sendTreasuryRes = {
  orderId: number;
  otpRequired: boolean;
  templateId: number;
};

export type TreasuryApiResponse = {
  data?: sendTreasuryRes;
  error?: FetchBaseQueryError | SerializedError;
};
