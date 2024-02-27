import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { SharedValue } from 'react-native-reanimated';

export interface AvailableBalanceProps {
  progress: SharedValue<number>;
  terabytes?: number;
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

export interface CardProps {
  item: IGroupedAccountsByIban;
  index: number;
  onCardPress: () => void;
  progress: SharedValue<number>;
  translateX: SharedValue<number>;
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
