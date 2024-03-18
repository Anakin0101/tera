import { SelectedAccountFromCard } from 'components/CardsAndBalance/CardsAndBalance.types';
import { Animated } from 'react-native';
import { Basket } from 'services/apis/paymentsAPI/paymentsAPI.types';

export interface CartItemProps {
  isLast: boolean;
  item: Basket;
  index: number;
  selectedAccountFromCard?: SelectedAccountFromCard;
}

export interface SwipeButtonsActionsProps {
  trans: Animated.AnimatedInterpolation<number>;
  disableButtons: boolean;
  deleteOnPress: () => void;
  editOnPress: () => void;
}
