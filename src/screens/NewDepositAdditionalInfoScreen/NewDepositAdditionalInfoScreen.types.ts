import { SharedValue } from 'react-native-reanimated';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export interface ItemProps {
  item: string;
  index: number;
  scrollX: SharedValue<number>;
  currency?: CurrencyEnum;
  onPress: (index: number) => void;
}
