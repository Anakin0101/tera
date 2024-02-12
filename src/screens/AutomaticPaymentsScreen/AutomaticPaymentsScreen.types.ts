import { ListRenderItem } from 'react-native';
import { AutomPaymentRes } from 'services/apis/paymentsAPI/paymentsAPI.types';

export type RenderItem = ListRenderItem<AutomPaymentRes>;

export type ItemProps = {
  item: AutomPaymentRes;
  onPress: () => void;
};
