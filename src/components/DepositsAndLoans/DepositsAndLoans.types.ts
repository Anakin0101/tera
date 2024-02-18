import {
  CreditCardType,
  DepositType,
  LoanType,
  OverdraftType,
} from 'services/apis/productsAPI/productsAPI.types';

type Variant = 'deposit' | 'loan';

export type RenderItemType = DepositType | LoanType | OverdraftType | CreditCardType;

export interface DepositsAndLoansProps {
  data?: RenderItemType[];
  variant: Variant;
  totalAmount: number;
  seeAll?: boolean;
  displayDivider?: boolean;
}

export type ListItemProps = {
  item: RenderItemType;
  isLast: boolean;
  onPress: () => void;
  icon?: string;
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
