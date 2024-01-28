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
