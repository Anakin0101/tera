import { CardType } from 'services/apis/productsAPI/productsAPI.types';

export interface CardItemProps {
  item: CardType;
  isLast: boolean;
  onPress?: () => void;
}

export interface BadgeProps {
  icon: React.ReactNode;
  label: string;
}

export interface DetailsItemProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  onPress: () => void;
}

export interface CardSliderItemProps {
  item: any;
  iban?: string;
}

export interface CardsProps {
  cards: CardType[];
  isCardAccount?: boolean;
  fromCardDetails?: boolean;
  iban?: string;
}

export type ActionType = {
  title: string;
  icon: React.ReactNode;
};

export type ActionButtonProps = {
  actions: ActionType[];
};
export interface DetailsProps {
  name: string;
  iban: string;
  blockedAmount?: number;
  displayDivider: boolean;
}
