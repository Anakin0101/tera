import { LayoutChangeEvent } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export interface ITabBarLabelProps {
  tab: string;
  index: number;
  translateX: SharedValue<number>;
  onTabPress: (index: number) => void;
  onLayout: (event: LayoutChangeEvent, index: number) => void;
}
