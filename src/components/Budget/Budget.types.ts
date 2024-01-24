import { TreasuryItem } from 'services/apis/transfersAPI/transfersAPI.types';

export type budgetProps = {
  budgetCode: string;
  onChangeBudgetCode: (code: string) => void;
  treasury: TreasuryItem[] | undefined;
};
