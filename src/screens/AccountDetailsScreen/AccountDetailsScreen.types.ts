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
}

export interface CardsProps {
  cards: CardType[];
}
