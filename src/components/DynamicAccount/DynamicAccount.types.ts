export interface IAccountProps {
  isSelected: boolean;
  onPress: () => void;
  data: TransfersData;
}

export interface TransfersData {
  iban: string;
  accountIban: string;
  accountId: number;
  accountName: string;
  accountNameCustom: string | null;
  accountNameLat: string;
  accountNumber: number;
  accountStatusId: number;
  accountType: number;
  availableBalance: number;
  balance: number;
  blockedAmount: number;
  cards: any;
  ccy: string;
  isCredit: boolean;
  isDebit: boolean;
  isFavorite: boolean;
  positionIndex: number;
}
