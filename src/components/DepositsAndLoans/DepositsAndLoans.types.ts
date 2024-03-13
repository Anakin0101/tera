import { ListRenderItem } from 'react-native';
import {
  CreditCardType,
  DepositType,
  LoanType,
  OfferType,
  OverdraftType,
} from 'services/apis/productsAPI/productsAPI.types';

export interface HeaderProps {
  title: string;
  quantity: number;
  totalAmount: number;
  seeAll: boolean;
}

export interface FooterProps {
  onPress: () => void;
}

export type DepositItemProps = {
  item: DepositType;
  isLast: boolean;
  index: number;
};

export type LoanItemProps = {
  item: LoanType | OverdraftType | CreditCardType | OfferType;
  isLast: boolean;
  index: number;
};

export type DepositsListProps = {
  data?: DepositType[];
  totalAmount: number;
  seeAll?: boolean;
  displayDivider?: boolean;
};

export type RenderDepositItemType = ListRenderItem<DepositType>;

export type LoansListProps = {
  data?: (LoanType | OverdraftType | CreditCardType | OfferType)[];
  totalAmount: number;
  seeAll?: boolean;
  displayDivider?: boolean;
  creditDisbursements?: OfferType[];
};

export type RenderLoanItemType = ListRenderItem<
  LoanType | OverdraftType | CreditCardType | OfferType
>;

export type CreditDisbursementItemProps = {
  item: OfferType;
};
