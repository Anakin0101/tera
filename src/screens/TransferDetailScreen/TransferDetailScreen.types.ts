export interface ConvertionData {
  buyAmount: {
    amountBuy: number;
    amountSell: number;
    specialRate: number;
    currencyBuy: string;
    currencySell: string;
  };
}

export interface SelectedItem {
  id: number;
  name: string;
  otherValue?: any;
}

export interface TransfersState {
  accountFromData: any;
  accountToData: any;
  selectedItem: SelectedItem;
  convertionData: ConvertionData | null;
  selectedData: any;
  selectedPrice: number;
}

interface ErrorData {
  type: string;
  title: string;
  status: number;
  detail: string;
  code: string;
  traceId: string;
  showErrorUi: boolean;
}

export interface ErroResponse {
  error?: {
    status: number;
    data: ErrorData;
  };
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
}

export type CustomTransferResultError = {
  data?: {
    status: number;
    title: string;
    type: string;
    [key: string]: any;
  };
};
