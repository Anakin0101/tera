import { Basket, Provider } from 'services/apis/paymentsAPI/paymentsAPI.types';

export interface ChooseProviderItemProps {
  item: Provider;
  isLast?: boolean;
  isAutomaticPayment?: boolean;
  basket?: Basket;
}
