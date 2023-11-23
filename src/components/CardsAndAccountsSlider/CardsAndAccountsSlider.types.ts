import { ViewToken } from 'react-native';
import { Account, CardType } from 'services/apis/productsAPI/productsAPI.types';

export interface AccountsSliderData {
  accounts: Account[];
}

export type ActionType = {
  isUpdate?: boolean;
  title: string;
  icon: React.ReactNode;
  handlePress?: () => void;
};

export interface SliderProps {
  iban: string;
  actions: ActionType[];
  data: AccountsSliderData[] | CardType[];
  displayCards?: boolean;
  index: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export type ViewableItems = {
  viewableItems: ViewToken[];
};

export type CardSliderItemProps = {
  item: CardType;
};

export type AccountSliderItemProps = {
  item: AccountsSliderData;
  iban?: string;
};

export type ActionButtonProps = {
  actions: ActionType[];
};

export type StatusBadgeProps = {
  icon: React.ReactNode;
  text: string;
  textColor?: string;
};
