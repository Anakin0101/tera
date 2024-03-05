import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { SharedValue } from 'react-native-reanimated';
import { Account } from 'services/apis/productsAPI/productsAPI.types';

export type SelectedAccountFromCard = Account | undefined;
export interface AvailableBalanceProps {
  progress: SharedValue<number>;
  terabytes?: number;
}

export interface ActionButtonsProps {
  children: React.ReactNode;
  progress: SharedValue<number>;
  onSpacePress: () => void;
  selectedAccountFromCard?: SelectedAccountFromCard;
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
  activeCardIndex: number;
  setSelectedAccountFromCard: React.Dispatch<React.SetStateAction<SelectedAccountFromCard>>;
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
