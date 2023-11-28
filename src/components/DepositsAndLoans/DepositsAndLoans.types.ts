import { LoanType, OverdraftType } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { DepositType } from 'services/apis/productsAPI/productsAPI.types';

type Variant = 'deposit' | 'loan';

export type RenderItemType = DepositType | LoanType | OverdraftType;

export interface DepositsAndLoansProps {
  data?: RenderItemType[] | (LoanType | OverdraftType)[];
  variant: Variant;
  totalAmount: number;
  seeAll?: boolean;
  displayDivider?: boolean;
}

export type ListItemProps = {
  item: RenderItemType;
  isLast: boolean;
  onPress: () => void;
};

export interface HeaderProps {
  variant: Variant;
  quantity: number;
  totalAmount: number;
  seeAll: boolean;
}

export interface FooterProps {
  variant: Variant;
}
