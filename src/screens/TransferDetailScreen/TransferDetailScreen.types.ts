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
