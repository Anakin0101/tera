import { SharedValue } from 'react-native-reanimated';

export interface ICardsAndBalanceProps {
  anim: SharedValue<number>;
  translateY: SharedValue<number>;
  // zIndex: SharedValue<number>;
  // isOpened: SharedValue<boolean>;
}

export interface AvailableBalanceProps {
  progress: SharedValue<number>;
}

export interface ActionButtonsProps {
  children: React.ReactNode;
  progress: SharedValue<number>;
  onSpacePress: () => void;
}

export interface ActionButtonProps {
  actions: ActionType[];
  children: React.ReactNode;
  progress: SharedValue<number>;
  onSpacePress: () => void;
}
export type ActionType = {
  isUpdate?: boolean;
  title: string;
  icon: React.ReactNode;
  handlePress?: () => void;
};

export interface IButton {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

export type Item = {
  color: string;
};

export interface CardProps {
  item: Item;
  index: number;
  onCardPress: () => void;
  progress: SharedValue<number>;
  translateX: SharedValue<number>;
  // zIndex: SharedValue<number>;
}

export interface IndicatorProps {
  data: any[];
  translateX: SharedValue<number>;
  hideFirst?: boolean;
}

export interface DotProps {
  index: number;
  translateX: SharedValue<number>;
}
