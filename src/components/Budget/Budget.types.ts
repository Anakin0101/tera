import { TreasuryItem } from 'services/apis/transfersAPI/transfersAPI.types';

export type budgetProps = {
  budgetCode: string;
  onChangeBudgetCode: (code: string) => void;
  treasury: TreasuryItem[] | undefined;
  setClickedCreateCode: (clickedCode: boolean) => void;
};

type Receiver = {
  id: number;
  name: string;
};
export interface budgetReceiverProps {
  isSelected: boolean;
  account: Receiver;
  onPress: () => void;
}

interface SelectedPrice {
  selectedPrice: any;
}

interface AccountFromData {
  accountId: number;
  accountIban: string;
  accountType: number;
  accountNumber: number;
  ccy: string;
  accountName: string;
  accountNameLat: string;
  accountNameCustom: string | null;
  accountStatusId: number;
  isDebit: boolean;
  isCredit: boolean;
  isFavourite: boolean;
  blockedAmount: number;
  availableBalance: number;
  balance: number;
  positionIndex: number;
  cards: any[] | null;
}

export interface BudgetDetailsProps {
  selectedPrice: SelectedPrice;
  accountFromData: AccountFromData;
}
