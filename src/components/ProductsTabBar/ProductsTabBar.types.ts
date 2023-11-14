import { SharedValue } from 'react-native-reanimated';

export interface ProductsTabBarProps {
  translateX: SharedValue<number>;
  onTabPress: (index: number) => void;
}
