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
