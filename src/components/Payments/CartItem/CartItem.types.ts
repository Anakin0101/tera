import { Basket } from 'services/apis/paymentsAPI/paymentsAPI.types';

export interface CartItemProps {
  isLast: boolean;
  item: Basket;
  index: number;
}
