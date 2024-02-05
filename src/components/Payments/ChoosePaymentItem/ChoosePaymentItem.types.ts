import { ProvidersGroup } from 'services/apis/paymentsAPI/paymentsAPI.types';

export interface ChoosePaymentItemProps {
  item: ProvidersGroup;
  isLast?: boolean;
}
