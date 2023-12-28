import { SharedValue } from 'react-native-reanimated';
import { Currency } from 'services/apis/productsAPI/productsAPI.types';

export interface ItemProps {
  item: number;
  index: number;
  scrollX: SharedValue<number>;
  currency?: Currency;
  onPress: (index: number) => void;
}
