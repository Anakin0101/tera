import { ViewToken } from 'react-native';
import { Account, CardType, DepositType } from 'services/apis/productsAPI/productsAPI.types';

export interface AccountsSliderData {
  accounts: Account[];
}

export type ActionType = {
  title: string;
  icon: React.ReactNode;
  handlePress?: () => void;
};

export interface SliderProps {
  iban?: string;
  actions: ActionType[];
  data: AccountsSliderData[] | CardType[] | DepositType[];
  displayCards?: boolean;
  index: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  type?: 'Account' | 'Card' | 'Deposit' | 'Loan';
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
