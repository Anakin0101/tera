export enum createBudgetEnum {
  FIRST_VIEW = 1,
  SECOND_VIEW = 2,
  THIRD_VIEW = 3,
  LAST_VIEW = 4,
}

interface TreasuryItem {
  id: string;
  name: string;
}
export interface renderItemProps {
  item: TreasuryItem;
  index: number;
}
export interface FirstViewProps {
  showHideComponent: (index: number) => void;
  setChosenItem: (id: string) => void;
  treasury: TreasuryItem[];
  onChangeBudgetCode: (code: string) => void;
}

export interface SecondViewProps {
  showHideComponent: (index: number) => void;
  setChosenItem: (id: string) => void;
  treasury: TreasuryItem[];
  onChangeBudgetCode: (code: string) => void;
}

export interface ThirdViewProps {
  showHideComponent: (index: number) => void;
  setChosenItem: (id: string) => void;
  onChangeBudgetCode: (code: string) => void;
  treasury: TreasuryItem[];
}
