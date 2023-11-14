import { SharedValue } from 'react-native-reanimated';

export interface IHomeHeaderProps {
  translateY: SharedValue<number>;
  zIndex: SharedValue<number>;
}

export interface IBadgeProps {
  quantity: number;
}
