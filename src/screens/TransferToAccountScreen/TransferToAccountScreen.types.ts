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

export interface transferProps {
  onTextChange: (text: string) => void;
  inputRef: any;
  openTransferScreen: () => void;
  selectedData: any;
  selectedItem: any;
}
