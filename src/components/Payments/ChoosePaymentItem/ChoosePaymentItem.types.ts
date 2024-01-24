import { ReactNode } from 'react';

export interface ChoosePaymentItemProps {
  id: string;
  title: string;
  icon: ReactNode;
  onPress: () => void;
  isLast?: boolean;
}
