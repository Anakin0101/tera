import { PaymentResult, ProviderItemProps } from 'services/apis/paymentsAPI/paymentsAPI.types';

export interface CartPayItemWithStatusProps {
  item: ProviderItemProps;
  paymentResults: Array<PaymentResult>;
}
