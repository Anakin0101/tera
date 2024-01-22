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
