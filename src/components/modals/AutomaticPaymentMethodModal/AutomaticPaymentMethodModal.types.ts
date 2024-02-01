import { ListRenderItem } from 'react-native';
import { AutoPaymentTypeEnum } from 'services/apis/productsAPI/productsAPI.types';

export type ItemT = {
  name: string;
  type: AutoPaymentTypeEnum;
};

export type ItemProps = {
  item: ItemT;
  isSelected: boolean;
  onPress: () => void;
};

export type RenderItem = ListRenderItem<ItemT>;

export type SelectedMethod = ItemT | null;

export type ModalProps = {
  onPress: (item: SelectedMethod) => void;
  selectedMethod: SelectedMethod;
};

export type FooterProps = {
  handleSelectPress: () => void;
};
