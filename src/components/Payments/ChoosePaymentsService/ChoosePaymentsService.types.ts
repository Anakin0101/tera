import { SelectedAccountFromCard } from 'components/CardsAndBalance/CardsAndBalance.types';
import { ReactNode } from 'react';

export interface ChoosePaymentsListProps {
  id: string;
  title: string;
  icon: ReactNode;
  onPress: () => void;
}

export interface PaymentItemProps {
  item: ChoosePaymentsListProps;
  isLast: boolean;
}

export interface ChoosePaymentsServiceProps {
  selectedAccountFromCard: SelectedAccountFromCard;
}
