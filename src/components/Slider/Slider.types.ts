import { StyleProp, ViewStyle, ViewToken } from 'react-native';
import { Account } from 'services/apis/productsAPI/productsAPI.types';

export interface AccountsSliderData {
  accounts: Account[];
}

export type ActionType = {
  title: string;
  icon: React.ReactNode;
  handlePress?: () => void;
};

export type SliderProps<ItemT> = {
  data: ItemT[];
  renderItem: React.FC<{ item: ItemT }>;
  actions: ActionType[];
  index: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  actionButtonsContainer?: StyleProp<ViewStyle>;
};

export type ViewableItems = {
  viewableItems: ViewToken[];
};

export type AccountSliderItemProps = {
  item: AccountsSliderData;
};

export type ActionButtonProps = {
  actions: ActionType[];
  actionButtonsContainer?: StyleProp<ViewStyle>;
};

export type StatusBadgeProps = {
  icon: React.ReactNode;
  text: string;
  textColor?: string;
};
