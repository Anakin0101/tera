import { SharedValue } from 'react-native-reanimated';

export interface ItemProps {
  item: number;
  index: number;
  scrollX: SharedValue<number>;
  onPress: (index: number) => void;
}
