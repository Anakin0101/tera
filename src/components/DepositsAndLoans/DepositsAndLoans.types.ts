import { DepositType, LoanType } from 'services/apis/productsAPI/productsAPI.types';

type Variant = 'deposit' | 'loan';

export interface DepositsAndLoansProps {
  data?: DepositType[] | LoanType[];
  variant: Variant;
  totalAmount: number;
  seeAll?: boolean;
  displayDivider?: boolean;
}

export type ListItemProps = {
  item: DepositType | LoanType;
  isLast: boolean;
};

export interface HeaderProps {
  variant: Variant;
  quantity: number;
  totalAmount: number;
}
